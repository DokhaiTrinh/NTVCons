import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined';
import InputBase from '@mui/material/InputBase';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ProjectTable } from './Components/ProjectTable';
//Get all s
import { getAllProjectByManageApi } from '../../apis/Project/getAllProject';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import { toHaveFormValues } from '@testing-library/jest-dom/dist/matchers';
const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const ProjectByManagerPage = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [
    { pageNo, pageSize, searchParam, searchType, sortBy, sortTypeAsc, loading },
    dispatch,
  ] = useStateValue();
  console.log(searchParam);
  const [managerProject, setManagerProject] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listManagerProject = await getAllProjectByManageApi({
          pageNo,
          pageSize,
          searchParam,
          searchType,
          sortBy,
          sortTypeAsc,
        });
        setManagerProject(listManagerProject.data);
      } catch (error) {
        console.log('Không thể lấy danh sách dự án');
      }
    })();
  }, [pageNo, pageSize, searchParam, searchType, sortBy, sortTypeAsc, loading]);
  console.log(managerProject);
  return (
    <div>
      <Grid container justify="center">
        {userInfor.authorID !== '54' && userInfor.authorID !== '24' ? null : (
          <Grid container md="8">
            <Grid item>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ margin: '20px' }}
              >
                <IconButton
                  aria-label="add"
                  sx={{ alignSelf: 'center', backgroundColor: '#DD8501' }}
                  component={Link}
                  to={'/createProject'}
                >
                  <Add sx={{ color: 'white' }}></Add>
                </IconButton>
              </Box>
            </Grid>
            {/* <Grid item>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ height: '100%' }}
              >
                <Typography variant="body1">Tạo dự án mới</Typography>
              </Box>
            </Grid> */}
          </Grid>
        )}
        <Grid item md="4">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              margin: '20px',
              border: 2,
              borderColor: '#DD8501',
              borderRadius: '10px',
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Tìm kiếm"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={value}
            onChange={handleChange}
            aria-label=""
          >
            <Tab label="Tất cả" {...a11yProps(0)} />
            <Tab label="Chờ" {...a11yProps(1)} />
            <Tab label="Đang thực hiện" {...a11yProps(2)} />
            <Tab label="Hoàn thành" {...a11yProps(3)} />
            <Tab label="Tạm dừng" {...a11yProps(4)} />
            <Tab label="Đã hủy" {...a11yProps(5)} />
            <Box sx={{ flex: 1 }}></Box>
            <IconButton aria-label="export">
              <Box>
                <OutputOutlinedIcon />
                <div>
                  <Typography variant="button">Xuất</Typography>
                </div>
              </Box>
            </IconButton>
            <IconButton aria-label="import">
              <Box>
                <InputOutlinedIcon />
                <div>
                  <Typography variant="button">Nhập</Typography>
                </div>
              </Box>
            </IconButton>
            <IconButton aria-label="setting">
              <Box>
                <SettingsOutlinedIcon />
                <div>
                  <Typography variant="button">Cài đặt</Typography>
                </div>
              </Box>
            </IconButton>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box width="100%">
            {managerProject ? (
              managerProject.length > 0 ? (
                <ProjectTable managerProject={managerProject}></ProjectTable>
              ) : (
                <div>Không có dữ liệu để hiển thị</div>
              )
            ) : null}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProjectTable></ProjectTable>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
      </Box>
    </div>
  );
};

export default ProjectByManagerPage;
