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
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { deleteProjectApi } from '../../../apis/Project/deleteProject';
import { useStateValue } from '../../../common/StateProvider/StateProvider';
import Pagination from '@mui/material/Pagination';
import { TableBody, Table } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import Header from '../../../Components/Tab/Header';
import DetailButton from '../../../Components/Button/DetailButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

function createData(admin, code, name, workers, process, works, start, end) {
  return {
    admin,
    code,
    name,
    workers,
    process,
    works,
    start,
    end,
  };
}
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'maduan',
    numeric: false,
    disablePadding: false,
    label: 'Mã dự án',
  },
  {
    id: 'tenduan',
    numeric: false,
    disablePadding: false,
    label: 'Tên dự án',
  },
  // {
  //   id: 'nguoithamgia',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Người tham gia',
  // },
  {
    id: 'batdau',
    numeric: false,
    disablePadding: false,
    label: 'Bắt đầu',
  },
  {
    id: 'ketthuc',
    numeric: false,
    disablePadding: false,
    label: 'Kết thúc',
  },
  {
    id: 'chitiet',
    numeric: false,
    disablePadding: false,
    label: '',
  },
  {
    id: 'xoa',
    numeric: false,
    disablePadding: false,
    label: '',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) =>
          userInfor.authorID !== '54' && index === 6 ? null : (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
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

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Dự án
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export const ProjectTable = (props) => {
  const { projectId } = props;
  const { allProject, totalPage } = props;
  const [{ loading, sortBy, sortTypeAsc }, dispatch] = useStateValue();
  console.log(allProject);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('maduan');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [alignment, setAlignment] = React.useState(sortBy);

  const handleChangePage = (event, value) => {
    dispatch({ type: 'CHANGE_PAGENO', newPageNo: value - 1 });
  };
  const handleChangeViewByStatus = (event, newAlignment) => {
    setAlignment(newAlignment);
    dispatch({ type: 'CHANGE_SORTBY', newSortBy: newAlignment });
  };
  const handleChangeViewTime = () => {
    if (sortTypeAsc) {
      dispatch({ type: 'CHANGE_SORTTYPEASC', newSortTypeAsc: false });
      // handleSearch(title, sortBy, false);
    } else if (sortTypeAsc === false) {
      dispatch({ type: 'CHANGE_SORTTYPEASC', newSortTypeAsc: true });
      // handleSearch(title, sortBy, true);
    }
  };

  const handleDeleteProject = (id) => {
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
        DeleteProject(id);
      }
    });
  };

  const DeleteProject = async (id) => {
    try {
      await deleteProjectApi(id);
      await Swal.fire(
        'Xóa thành công!',
        'Dự án của bạn đã được xóa thành công.',
        'success'
      );
      dispatch({ type: 'LOADING', newLoading: !loading });
    } catch (error) {}
  };

  return (
    <Box sx={{ width: '100%' }}>
      {Header(`/createProject`)}
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead order={order} orderBy={orderBy} />
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              size="small"
              onChange={handleChangeViewTime}
            >
              <ToggleButton value="createdAt">Xếp theo ngày</ToggleButton>

              {/* <ToggleButton value="">Bị hủy</ToggleButton> */}
            </ToggleButtonGroup>
            <TableBody
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: 'none',
                },
              }}
            >
              {allProject.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    style={
                      index % 2
                        ? { background: '#FAFAFA' }
                        : { background: 'white' }
                    }
                  >
                    <TableCell align="left">{row.projectId}</TableCell>
                    <TableCell align="left">{row.projectName}</TableCell>
                    <TableCell align="left">{row.planStartDate}</TableCell>
                    <TableCell align="left">{row.planEndDate}</TableCell>
                    <TableCell align="left">
                      {DetailButton(`/projectDetails/${row.projectId}`)}
                    </TableCell>
                    {userInfor.authorID === '54' ? (
                      <TableCell align="left">
                        <IconButton
                          aria-label="delete"
                          color="warning"
                          edge="start"
                          size="large"
                          onClick={() => handleDeleteProject(row.projectId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    ) : null}
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
        sx={{ marginBottom: '10px', marginTop: '10px' }}
      />
    </Box>
  );
};
