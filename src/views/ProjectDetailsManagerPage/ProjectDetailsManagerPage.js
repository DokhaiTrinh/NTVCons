import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Details from './components/Details';
import ReportTable from './components/ReportTable';
import TaskTable from './components/TaskTable';
import { getProjectByIdApi } from '../../apis/Project/getProjectById';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import RequestTable from './components/RequestTable';
import { getReportByProjectIdApi } from '../../apis/Report/getReportByProjectId';
import { getRequestByProjectIdApi } from '../../apis/Request/getRequestByProjectId';
import { getProjectByParam } from '../../apis/Project/getProjectById';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useParams } from 'react-router-dom';
function TabPanel(props) {
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
}

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
const ProjectDetailsPage = (props) => {
  const { row } = props;
  const [value, setValue] = React.useState(0);
  const [age, setAge] = React.useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [
    { projectId, pageNo, pageSize, sortBy, sortTypeAsc, searchType },
    dispatch,
  ] = useStateValue();
  const [allProjectDetails, setAllProjectDetails] = React.useState();
  const [allReportDetails, setAllReportDetails] = React.useState([]);
  const [allRequestDetails, setAllRequestDetails] = React.useState([]);
  const [managerList, setManagerList] = React.useState();
  const [workerList, setWorkerList] = React.useState();
  const [blueprint, setBlueprint] = React.useState();
  const [projectName, setProjectName] = React.useState();
  // const handleChange1 = (event) => {
  //   setAge(event.target.value);
  // };

  React.useEffect(() => {
    (async () => {
      try {
        const listAllProjectDetails = await getProjectByParam(
          projectId,
          'BY_ID'
        );
        setAllProjectDetails(listAllProjectDetails.data);
        setManagerList(listAllProjectDetails.data.projectManagerList);
        setWorkerList(listAllProjectDetails.data.projectWorkerList);
        setBlueprint(listAllProjectDetails.data.blueprint);
      } catch (error) {
        console.log('Không thể lấy danh sách dự án');
      }
    })();
    (async () => {
      try {
        const listAllReportDetails = await getReportByProjectIdApi({
          pageNo,
          pageSize,
          projectId,
          searchType,
          sortBy,
          sortTypeAsc,
        });
        setAllReportDetails(listAllReportDetails.data);
      } catch (error) {
        console.log('Không thể lấy danh sách báo cáo');
      }
    })();
  }, [projectId, pageNo, pageSize, sortBy, sortTypeAsc, searchType]);
  console.log(projectName);
  return (
    <div>
      <Grid container justify="center">
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
              >
                <Add sx={{ color: 'white' }}></Add>
                {allProjectDetails.projectName} asdsadsadsad
              </IconButton>
            </Box>
          </Grid>
          <Grid item>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: '100%' }}
            ></Box>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ minWidth: 120 }}></Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={value}
            onChange={handleChange}
            aria-label=""
          >
            <Tab label="Chi tiết" {...a11yProps(0)} />
            <Tab label="Báo cáo" {...a11yProps(1)} />
            <Tab label="Công việc" {...a11yProps(2)} />
            <Tab label="Yêu cầu" {...a11yProps(3)} />
            <Box sx={{ flex: 1 }}></Box>
            <Box></Box>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {allProjectDetails ? (
            <Details
              allProjectDetails={allProjectDetails}
              managerList={managerList}
              workerList={workerList}
              blueprint={blueprint}
            />
          ) : (
            <div>Không có dữ liệu!!</div>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ReportTable
            projectId={projectId}
            allReportDetails={allReportDetails}
          ></ReportTable>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TaskTable projectId={projectId}></TaskTable>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <RequestTable
            projectId={projectId}
            allRequestDetails={allRequestDetails}
          ></RequestTable>
        </TabPanel>
      </Box>
    </div>
  );
};

export default ProjectDetailsPage;
