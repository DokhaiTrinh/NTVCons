import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';
import { visuallyHidden } from '@mui/utils';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useStateValue } from '../../../common/StateProvider/StateProvider';
import { deleteReportApi } from '../../../apis/Report/deleteReport';
import Pagination from '@mui/material/Pagination';
import { tableCellClasses } from "@mui/material/TableCell";
import { Table, TableBody } from '@mui/material';
import IconButtonCus from '../../../Components/Button/IconButtonCus';
import { useHistory } from 'react-router';
import Header from '../../../Components/Tab/Header';

const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Mã báo cáo',
  },
  {
    id: 'tenconviec',
    numeric: false,
    disablePadding: false,
    label: 'Tên báo cáo',
  },
  {
    id: 'ngay',
    numeric: false,
    disablePadding: false,
    label: 'Ngày',
  },
  {
    id: 'theloai',
    numeric: false,
    disablePadding: false,
    label: 'Loại báo cáo',
  },
  {
    id: 'Chitiet',
    numeric: false,
    disablePadding: false,
    label: '',
  },
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) =>
          (userInfor.authorID !== '54' && index === 4) || index === 5 ? null : (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'center' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// const EnhancedTableToolbar = (props) => {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(
//               theme.palette.primary.main,
//               theme.palette.action.activatedOpacity
//             ),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Báo cáo
//         </Typography>
//       )}

//       {/* {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )} */}
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

export default function ReportTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const { allReportDetails, totalPage } = props;
  const [{ loading }, dispatch] = useStateValue();
  const history = useHistory();

  console.log(allReportDetails);
  const handleChangePage = (event, value) => {
    dispatch({ type: 'CHANGE_PAGENO', newPageNo: value - 1 });
  };
  const handleDeleteReport = (id) => {
    Swal.fire({
      title: 'Bạn có chắc chứ?',
      text: 'Bạn không thể thu hổi lại khi ấn nút!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, hãy xóa nó!',
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteReport(id);
      }
    });
  };
  const DeleteReport = async (id) => {
    try {
      await deleteReportApi(id);
      await Swal.fire(
        'Xóa thành công!',
        'Dự án của bạn đã được xóa thành công.',
        'success'
      );
      dispatch({ type: 'LOADING', newLoading: !loading });
    } catch (error) {}
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allReportDetails.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  return (
    <Box sx={{ width: '100%' }}>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          marginBottom: '30px',
        }}
      >
        {/* {userInfor.authorID !== '44' ? null : (
          <Button
            sx={{ alignSelf: 'center', backgroundColor: '#DD8501' }}
            component={Link}
            to={`/createReport/${projectId}`}
          >
            <Typography color="white">Tạo báo cáo</Typography>
          </Button>
        )} */}
      </Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
            />
            <TableBody sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none"
              }
            }}>
              {allReportDetails.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow style={index % 2 ? { background: "#FAFAFA" } : { background: "white" }}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      align="left"
                    >
                      {row.reportId}
                    </TableCell>
                    <TableCell align="left">{row.reportName}</TableCell>
                    <TableCell align="left">
                      {(row.reportDate)}
                    </TableCell>
                    <TableCell align="left">
                      {row.reportType.reportTypeName}
                    </TableCell>
                    <TableCell align="left">
                      <IconButtonCus onClick={() => history.push(`/reportDetails/${row.reportId}`)} icon={<InfoIcon style={{color: 'gray'}}/>}/>
                    </TableCell>
                    {/* {userInfor.authorID === '44' ? (
                      <TableCell align="left">
                        <IconButton
                          component={Link}
                          // edge="start"
                          size="large"
                          to={`/updateReportDetails/${row.reportId}`}
                        >
                          <UpdateIcon />
                        </IconButton>
                      </TableCell>
                    ) : null}
                    {userInfor.authorID === '44' ? (
                      <TableCell align="left">
                        <IconButton
                          aria-label="delete"
                          color="warning"
                          edge="start"
                          size="large"
                          onClick={() => handleDeleteReport(row.reportId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    ) : null} */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
        <Pagination
          count={totalPage + 1}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
          default={1}
        />
    </Box>
  );
}
