import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { deleteProjectApi } from '../../../apis/Project/deleteProject';
import ProjectDetailsPage from '../../ProjectDetailsPage/ProjectDetailsPage';
import { useStateValue } from '../../../common/StateProvider/StateProvider';

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
    id: 'nguoiquantri',
    numeric: false,
    disablePadding: false,
    label: 'Người quản trị',
  },
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
  {
    id: 'nguoithamgia',
    numeric: false,
    disablePadding: false,
    label: 'Người tham gia',
  },
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
    label: 'Chi tiết',
  },
  {
    id: 'xoa',
    numeric: false,
    disablePadding: false,
    label: 'Xóa',
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) =>
          userInfor.authorID !== '54' && index === 7 ? null : (
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

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const handleGetDate = (date) => {
  const getDate = date.substring(0, 10);
  const getDateCom = getDate.split('-');
  const getDateReformat = ''.concat(
    getDateCom[2],
    '/',
    getDateCom[1],
    '/',
    getDateCom[0]
  );
  return getDateReformat;
};

export const ProjectTable = (props) => {
  const { managerProject } = props;

  const [{ loading }, dispatch] = useStateValue();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('maduan');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
  const handleClick = (event, admin) => {
    const selectedIndex = selected.indexOf(admin);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, admin);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const isSelected = (admin) => selected.indexOf(admin) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {managerProject.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.admin)}
                    role="checkbox"
                    // aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    // selected={isItemSelected}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      align="left"
                    >
                      {row.createdBy}
                    </TableCell>
                    <TableCell align="left">{row.projectId}</TableCell>
                    <TableCell align="left">{row.projectName}</TableCell>
                    <TableCell align="left">{row.manager}</TableCell>
                    {/* <TableCell align="left">{row.works}</TableCell> */}
                    <TableCell align="left">{row.planStartDate}</TableCell>
                    <TableCell align="left">{row.planEndDate}</TableCell>
                    <TableCell align="left">
                      <IconButton
                        edge="end"
                        size="large"
                        component={Link}
                        to={`/projectDetailsManager/${row.projectId}`}
                      >
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                    {/* {userInfor.authorID === '54' ? (
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
                    ) : null} */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};