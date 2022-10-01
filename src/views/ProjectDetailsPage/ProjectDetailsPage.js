import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Details from './components/Details';
import ReportTable from './components/ReportTable';
import TaskTable from './components/TaskTable';
import Blueprint from './components/Blueprint';
import FileDetail from './components/FileDetail';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import RequestTable from './components/RequestTable';
import { getReportByProjectIdApi } from '../../apis/Report/getReportByProjectId';
import { getProjectByParam } from '../../apis/Project/getProjectById';
import FloatingAddButton from '../../Components/Button/Add/FloatingAddButton';
const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

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
  const [value, setValue] = React.useState(0);
  const [age, setAge] = React.useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [
    { projectId, pageNo, pageSize, sortBy, sortTypeAsc, searchType, loading },
    dispatch,
  ] = useStateValue();
  const [allProjectDetails, setAllProjectDetails] = React.useState();
  const [allReportDetails, setAllReportDetails] = React.useState();
  const [allRequestDetails, setAllRequestDetails] = React.useState([]);
  const [managerList, setManagerList] = React.useState();
  const [workerList, setWorkerList] = React.useState();
  const [userList, setUserList] = React.useState();
  const [blueprint, setBlueprint] = React.useState();
  const [totalPage, setTotalPage] = React.useState();
  const [imageGet, setImageGet] = React.useState([]);
  const [docGet, setDocGet] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listAllProjectDetails = await getProjectByParam(
          projectId,
          'BY_ID'
        );
        setAllProjectDetails(listAllProjectDetails.data);
        setManagerList(listAllProjectDetails.data.ntvManagerList);
        setWorkerList(listAllProjectDetails.data.projectWorkerList);
        setUserList(listAllProjectDetails.data.userManagerList);
        if (listAllProjectDetails.data) {
          if (listAllProjectDetails.data.fileList.length > 0) {
            let arrayImgLink = [];
            let arrayDocLink = [];
            for (
              let index = 0;
              index < listAllProjectDetails.data.fileList.length;
              index++
            ) {
              const element = listAllProjectDetails.data.fileList[index];
              if (element.fileName.split('.')[1] === 'docx') {
                let objectDoc = {
                  name: element.fileName,
                  link: element.fileLink,
                  id: element.fileId,
                };
                arrayDocLink.push(objectDoc);
              } else {
                arrayImgLink.push(element.fileLink);
              }
            }
            setDocGet(arrayDocLink);
            setImageGet(arrayImgLink);
          }
        }
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
        setTotalPage(listAllReportDetails.data.totalPage);
      } catch (error) {
        console.log('Không thể lấy danh sách báo cáo');
      }
    })();
  }, [projectId, pageNo, pageSize, sortBy, sortTypeAsc, searchType, loading]);
  return (
    <div>
      <Box sx={{ minWidth: 120 }}></Box>
      <Box sx={{ width: '100%' }}>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={value}
          onChange={handleChange}
          aria-label=""
        >
          {userInfor.authorID === '54' ||
          userInfor.authorID === '44' ||
          userInfor.authorID === '24' ||
          userInfor.authorID === '14' ? (
            <Tab label="Chi tiết" {...a11yProps(0)} />
          ) : null}
          {userInfor.authorID === '54' ||
          userInfor.authorID === '44' ||
          userInfor.authorID === '24' ||
          userInfor.authorID === '14' ? (
            <Tab label="Bản vẽ" {...a11yProps(1)} />
          ) : null}
          {userInfor.authorID === '54' ||
          userInfor.authorID === '44' ||
          userInfor.authorID === '24' ? (
            <Tab label="Công việc" {...a11yProps(2)} />
          ) : null}
          {userInfor.authorID === '54' ||
          userInfor.authorID === '44' ||
          userInfor.authorID === '24' ? (
            <Tab label="Báo cáo" {...a11yProps(3)} />
          ) : null}
          {userInfor.authorID === '54' ||
          userInfor.authorID === '44' ||
          userInfor.authorID === '24' ? (
            <Tab label="Yêu cầu" {...a11yProps(4)} />
          ) : null}
          {userInfor.authorID === '54' ||
          userInfor.authorID === '44' ||
          userInfor.authorID === '24' ? (
            <Tab label="Tệp đi kèm" {...a11yProps(5)} />
          ) : null}
          <Box sx={{ flex: 1 }}></Box>
          <Box></Box>
        </Tabs>
        <div className="body">
          {userInfor.authorID === '54' ||
          userInfor.authorID === '44' ||
          userInfor.authorID === '24' ||
          userInfor.authorID === '14' ? (
            <TabPanel value={value} index={0}>
              {allProjectDetails ? (
                <Details
                  allProjectDetails={allProjectDetails}
                  managerList={managerList}
                  workerList={workerList}
                  userList={userList}
                  blueprint={blueprint}
                />
              ) : (
                <div>Không có dữ liệu!!</div>
              )}
            </TabPanel>
          ) : null}
          {userInfor.authorID === '54' ||
          userInfor.authorID === '44' ||
          userInfor.authorID === '24' ||
          userInfor.authorID === '14' ? (
            <TabPanel value={value} index={3}>
              {allReportDetails ? (
                <ReportTable
                  projectId={projectId}
                  allReportDetails={allReportDetails}
                  totalPage={totalPage}
                ></ReportTable>
              ) : (
                <div>Không có dữ liệu!</div>
              )}
            </TabPanel>
          ) : null}
          {userInfor.authorID === '54' ||
          userInfor.authorID === '44' ||
          userInfor.authorID === '24' ? (
            <TabPanel value={value} index={2}>
              <TaskTable projectId={projectId}></TaskTable>
            </TabPanel>
          ) : null}
          {userInfor.authorID === '54' ||
          userInfor.authorID === '44' ||
          userInfor.authorID === '24' ? (
            <TabPanel value={value} index={4}>
              <RequestTable
                projectId={projectId}
                allRequestDetails={allRequestDetails}
              ></RequestTable>
            </TabPanel>
          ) : null}
          {userInfor.authorID === '54' ||
          userInfor.authorID === '44' ||
          userInfor.authorID === '24' ||
          userInfor.authorID === '14' ? (
            <TabPanel value={value} index={1}>
              <Blueprint projectId={projectId}></Blueprint>
            </TabPanel>
          ) : null}
          <TabPanel value={value} index={5}>
            <FileDetail
              projectId={projectId}
              imageGet={imageGet}
              docGet={docGet}
            ></FileDetail>
            {userInfor.authorID === '54' || userInfor.authorID === '44' ? (
              <FloatingAddButton projectId={projectId} />
            ) : null}
          </TabPanel>
        </div>
      </Box>
    </div>
  );
};

export default ProjectDetailsPage;
