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

function RequestDetailPage() {
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
  const { id } = useParams();
  console.log(id);
  const [allRequestId, setAllRequestId] = React.useState([]);
  const [requestDetail, setRequestDetail] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listAllRequestDetail = await getRequestIdApi(id);
        setAllRequestId(listAllRequestDetail.data);
        setRequestDetail(listAllRequestDetail.data.requestDetailList);
      } catch (error) {
        console.log('Không thể lấy dữ liệu của báo cáo');
      }
    })();
  }, []);
  console.log(requestDetail);
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
          {allRequestId ? (
            <Grid container spacing={2}>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Mã dự án
                </Typography>
                <Typography variant="body1">
                  {allRequestId.projectId}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Tên dự án
                </Typography>
                <Typography variant="body1">
                  {allRequestId.projectName}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Mã yêu cầu
                </Typography>
                <Typography variant="body1">
                  {allRequestId.requestId}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Thông tin yêu cầu
                </Typography>
                <Typography variant="body1">
                  {/* {handleGetDate(allRequestId.reportDate)} */}
                  {allRequestId.requestDesc}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Kiểu yêu cầu
                </Typography>
                <Typography variant="body1">
                  {allRequestId.requestTypeName}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Người yêu cầu
                </Typography>
                <Typography variant="body1" paragraph>
                  {allRequestId.requesterName}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Ngày yêu cầu
                </Typography>
                <Typography variant="body1" paragraph>
                  {allRequestId.requestDate}
                </Typography>
              </Grid>
              <Grid item container xs="4">
                <Typography variant="body1" color="gray">
                  Chi tiết yêu cầu
                </Typography>
                {requestDetail.length > 0 ? (
                  requestDetail.map((req, index) => (
                    <Box sx={{ width: '100%' }} key={index}>
                      <Card sx={{ width: '100%' }}>
                        <CardContent>
                          <Typography>
                            Mã yêu cầu chi tiết: {req.requestDetailId}
                          </Typography>
                          <Typography>
                            Thông tin yêu cầu chi tiết: {req.itemDesc}
                          </Typography>
                          <Typography>
                            Số lượng:
                            {req.itemAmount}
                          </Typography>
                          <Typography>Giá tiền: {req.itemPrice} </Typography>
                          <Typography>Đơn vị: {req.itemUnit}</Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  ))
                ) : (
                  <div>Không có chi tiết</div>
                )}
              </Grid>
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
