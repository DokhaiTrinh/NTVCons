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
const ReportDetailPage = (props) => {
  const [{ loading }, dispatch] = useStateValue();
  const { id } = useParams();
  const [allReportDetail, setAllReportDetail] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listAllReportDetail = await getReportById(id, 'REPORT_BY_ID');
        setAllReportDetail(listAllReportDetail.data);
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
          sx={{ width: '90%', mp: 2, borderRadius: '30px', padding: '20px', margin: "5%" }}
          variant="elevation"
        >
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            Thông tin chung
          </Typography>
          <Divider sx={{ marginBottom: '20px' }}></Divider>
          {allReportDetail ? (
            allReportDetail.length > 0 ? (
              <Grid container spacing={2} >
                <Grid item xs="4">
                  <Typography variant="body1" color="gray">
                    Mã dự án
                  </Typography>
                  <Typography variant="body1">
                    {allReportDetail[0].projectId}
                  </Typography>
                </Grid>
                <Grid item xs="4">
                  <Typography variant="body1" color="gray">
                    Mã báo cáo
                  </Typography>
                  <Typography variant="body1">
                    {allReportDetail[0].reportId}
                  </Typography>
                </Grid>
                <Grid item xs="4">
                  <Typography variant="body1" color="gray">
                    Tên báo báo cáo
                  </Typography>
                  <Typography variant="body1">
                    {allReportDetail[0].reportName}
                  </Typography>
                </Grid>
                <Grid item xs="4">
                  <Typography variant="body1" color="gray">
                    Ngày báo cáo
                  </Typography>
                  <Typography variant="body1">
                    {handleGetDate(allReportDetail[0].reportDate)}
                  </Typography>
                </Grid>
                <Grid item xs="4">
                  <Typography variant="body1" color="gray">
                    Mô tả báo cáo
                  </Typography>
                  <Typography variant="body1">
                    {allReportDetail[0].reportDesc}
                  </Typography>
                </Grid>
                <Grid item xs="4">
                  <Typography variant="body1" color="gray">
                    Người báo cáo
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {allReportDetail[0].reporterId}
                  </Typography>
                </Grid>
                <Grid item xs="4">
                  <Typography variant="body1" color="gray">
                    Báo cáo chi tiết
                  </Typography>
                  <Card sx={{ width: '100%', height: "200px" }}>
                    <CardContent>
                      <Card sx={{ witdh: '90%', padding: '10px' }}>

                        <Typography>
                          Thông tin báo cáo chi tiết:{' '}
                          {allReportDetail[0].reportDetailList[2].itemDesc}
                        </Typography>
                        <Typography>
                          Số lượng:
                          {allReportDetail[0].reportDetailList[2].itemAmount}
                        </Typography>
                        <Typography>
                          Giá tiền:{' '}
                          {allReportDetail[0].reportDetailList[2].itemPrice}{' '}
                        </Typography>
                        <Typography>
                          Đơn vị:{' '}
                          {allReportDetail[0].reportDetailList[2].itemUnit}
                        </Typography>
                      </Card>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs="4">
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="body1" color="gray">
                      Loại báo cáo
                    </Typography>
                    <Card sx={{ width: '100%', height: "200px" }}>
                      <CardContent>
                        <Typography>
                          Mã : {allReportDetail[0].reportType.reportTypeId}
                        </Typography>

                        <Typography>
                          Tên loại báo cáo:{' '}
                          {allReportDetail[0].reportType.reportTypeName}
                        </Typography>
                        <Typography>
                          Chi tiết loại báo cáo:{' '}
                          {allReportDetail[0].reportType.reportTypeDesc}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
                <Grid item xs="4" >
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="body1" color="gray">
                      Công việc chi tiết
                    </Typography>
                    <Card sx={{ width: '100%', height: "200px" }}>
                      <CardContent>
                        <Card sx={{ witdh: '90%', padding: '10px' }}>
                          <Typography>
                            <Typography>
                              Mã công việc chi tiết:{' '}
                              {
                                allReportDetail[0].taskReportList[0]
                                  .taskReportId
                              }
                            </Typography>
                            Tên công việc :{' '}
                            {allReportDetail[0].taskReportList[0].taskNote}
                          </Typography>
                        </Card>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <div>Không có dữ liệu để hiển thị!!</div>
            )
          ) : null}
        </Paper>
      </Box>
    </div>
  );
};

export default ReportDetailPage;
