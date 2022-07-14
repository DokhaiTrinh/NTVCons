import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { getReportById } from '../../apis/Report/getReportByProjectId';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const ReportDetailPage = (props) => {
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
  const [{ loading }, dispatch] = useStateValue();
  const { id } = useParams();
  const [allReportDetail, setAllReportDetail] = React.useState([]);
  const [allReportList, setAllReportList] = React.useState([]);
  const [taskReportList, setTaskReportList] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listAllReportDetail = await getReportById(id, 'BY_ID');
        setAllReportDetail(listAllReportDetail.data);
        setAllReportList(listAllReportDetail.data.reportDetailList);
        setTaskReportList(listAllReportDetail.data.taskReportList);
      } catch (error) {
        console.log('Không thể lấy dữ liệu của báo cáo');
      }
    })();
  }, []);
  console.log(allReportDetail);
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Paper
          sx={{
            width: '90%',
            mp: 2,
            borderRadius: '30px',
            padding: '20px',
            margin: '5%',
          }}
          variant="elevation"
        >
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            Thông tin chung
          </Typography>
          <Divider sx={{ marginBottom: '20px' }}></Divider>
          {allReportDetail ? (
            <Grid container spacing={2}>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Mã dự án
                </Typography>
                <Typography variant="body1">
                  {allReportDetail.projectId}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Mã báo cáo
                </Typography>
                <Typography variant="body1">
                  {allReportDetail.reportId}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Tên báo báo cáo
                </Typography>
                <Typography variant="body1">
                  {allReportDetail.reportName}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Ngày báo cáo
                </Typography>
                <Typography variant="body1">
                  {allReportDetail.reportDate}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Mô tả báo cáo
                </Typography>
                <Typography variant="body1">
                  {allReportDetail.reportDesc}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Người báo cáo
                </Typography>
                <Typography variant="body1" paragraph>
                  {allReportDetail.reporterId}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Loại báo cáo
                </Typography>
                <Typography variant="body1" paragraph>
                  {allReportDetail.reportType ? (
                    allReportDetail.reportType.reportTypeName
                  ) : (
                    <div>Chua co du lieu</div>
                  )}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Báo cáo chi tiết
                </Typography>
                <Card sx={{ width: '100%' }}>
                  <CardContent>
                    {allReportList.length > 0 ? (
                      allReportList.map((reportDetail, index) => (
                        <Card
                          sx={{
                            witdh: '100%',
                            marginBottom: '10px',
                            padding: '10px',
                          }}
                        >
                          <Typography>
                            Thông tin báo cáo chi tiết: {reportDetail.itemDesc}
                          </Typography>
                          <Typography>
                            Số lượng:
                            {reportDetail.itemAmount}
                          </Typography>
                          <Typography>
                            Giá tiền: {reportDetail.itemPrice}{' '}
                          </Typography>
                          <Typography>
                            Đơn vị: {reportDetail.itemUnit}
                          </Typography>
                        </Card>
                      ))
                    ) : (
                      <div>Không có dữ liệu!!</div>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs="4">
                <Box sx={{ width: '100%' }}>
                  <Typography variant="body1" color="gray">
                    Công việc chi tiết
                  </Typography>
                  <Card sx={{ width: '100%' }}>
                    <CardContent>
                      {taskReportList.length > 0 ? (
                        taskReportList.map((taskReport, index) => (
                          <Card
                            sx={{
                              witdh: '100%',
                              padding: '10px',
                              marginBottom: '10px',
                            }}
                          >
                            <Typography>
                              <Typography>
                                Mã công việc chi tiết: {taskReport.taskReportId}
                              </Typography>
                              Tên công việc : {taskReport.taskNote}
                            </Typography>
                          </Card>
                        ))
                      ) : (
                        <div>No data!</div>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <div>Loading ...</div>
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default ReportDetailPage;
