import React from 'react';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import { useParams } from 'react-router-dom';
import { getRequestIdApi } from '../../apis/Request/getRequestByProjectId';
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
function RequestDetailPage() {
  const { id } = useParams();
  console.log(id);
  const [allRequestId, setAllRequestId] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listAllRequestDetail = await getRequestIdApi(id);
        setAllRequestId(listAllRequestDetail.data);
      } catch (error) {
        console.log('Không thể lấy dữ liệu của báo cáo');
      }
    })();
  }, []);
  console.log(allRequestId);
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Paper
          sx={{ width: '100%', mp: 2, borderRadius: '30px', padding: '20px' }}
          variant="elevation"
        >
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            Thông tin chung
          </Typography>
          <Divider sx={{ marginBottom: '20px' }}></Divider>
          {allRequestId ? (
            <Grid container rowSpacing={{ xs: 5 }}>
              <Grid item xs="6">
                <Typography variant="body1" color="gray">
                  Mã dự án
                </Typography>
                <Typography variant="body1">
                  {allRequestId.projectId}
                </Typography>
              </Grid>
              <Grid item xs="6">
                <Typography variant="body1" color="gray">
                  Tên dự án
                </Typography>
                <Typography variant="body1">
                  {allRequestId.projectName}
                </Typography>
              </Grid>
              <Grid item xs="6">
                <Typography variant="body1" color="gray">
                  Mã yêu cầu
                </Typography>
                <Typography variant="body1">
                  {allRequestId.requestId}
                </Typography>
              </Grid>
              <Grid item xs="6">
                <Typography variant="body1" color="gray">
                  Thông tin yêu cầu
                </Typography>
                <Typography variant="body1">
                  {/* {handleGetDate(allRequestId.reportDate)} */}
                  {allRequestId.requestDesc}
                </Typography>
              </Grid>
              <Grid item xs="6">
                <Typography variant="body1" color="gray">
                  Kiểu yêu cầu
                </Typography>
                <Typography variant="body1">
                  {allRequestId.requestTypeName}
                </Typography>
              </Grid>
              <Grid item xs="6">
                <Typography variant="body1" color="gray">
                  Người yêu cầu
                </Typography>
                <Typography variant="body1" paragraph>
                  {allRequestId.requesterName}
                </Typography>
              </Grid>
              <Grid item xs="6">
                <Typography variant="body1" color="gray">
                  Ngày yêu cầu
                </Typography>
                <Typography variant="body1" paragraph>
                  {handleGetDate(allRequestId.requestDate)}
                </Typography>
              </Grid>
              {allRequestId.requestDetailList ? (
                <Grid item container columns={12} spacing={2}>
                  <Grid item xs={4}>
                    <Box sx={{ width: '100%' }}>
                      <Card sx={{ width: '100%' }}>
                        <CardContent>
                          <Typography>
                            Mã yêu cầu chi tiết:{' '}
                            {allRequestId.requestDetailList[0].requestDetailId}
                          </Typography>
                          <Typography>
                            Thông tin yêu cầu chi tiết:{' '}
                            {allRequestId.requestDetailList[0].itemDesc}
                          </Typography>
                          <Typography>
                            Số lượng:
                            {allRequestId.requestDetailList[0].itemAmount}
                          </Typography>
                          <Typography>
                            Giá tiền:{' '}
                            {allRequestId.requestDetailList[0].itemPrice}{' '}
                          </Typography>
                          <Typography>
                            Đơn vị: {allRequestId.requestDetailList[0].itemUnit}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <div>Không có chi tiết</div>
              )}
            </Grid>
          ) : (
            <div>Không có dữ liệu của yêu cầu!!</div>
          )}
        </Paper>
      </Box>
    </div>
  );
}

export default RequestDetailPage;
