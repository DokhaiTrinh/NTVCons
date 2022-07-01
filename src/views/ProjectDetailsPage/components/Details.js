import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
const Details = (props) => {
  const { allProjectDetails } = props;
  console.log(props);
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
          <Grid container rowSpacing={{ xs: 5 }}>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Mã dự án
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.projectId}
              </Typography>
            </Grid>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Tên dự án
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.projectName}
              </Typography>
            </Grid>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Người quản trị
              </Typography>
              <Typography variant="body1">{allProjectDetails.createdBy}</Typography>
            </Grid>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Kỹ sư quản lý
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.userId}
              </Typography>
            </Grid>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Trạng thái
              </Typography>
              <Box
                sx={{
                  width: '50%',
                  borderRadius: '10px',
                  backgroundColor: 'pink',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'gray',
                  }}
                >
                  Đang thực hiện
                </Typography>
              </Box>
            </Grid>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Người tham gia
              </Typography>
              <Typography variant="body1" paragraph>
                {allProjectDetails.userId}
              </Typography>
            </Grid>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Thời gian bắt đầu dự kiến
              </Typography>
              <Typography variant="body1">
                {handleGetDate(allProjectDetails.actualStartDate)}
              </Typography>
            </Grid>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Thời gian kết thúc dự kiến
              </Typography>
              <Typography variant="body1">
                {handleGetDate(allProjectDetails.actualEndDate)}
              </Typography>
            </Grid>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Địa chỉ
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.addressNumber} {allProjectDetails.street}{' '}
                {allProjectDetails.district} {allProjectDetails.city}
              </Typography>
            </Grid>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Thành phố
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.country}
              </Typography>
            </Grid>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Thời gian bắt đầu thực tế
              </Typography>
              <Typography variant="body1">
                {handleGetDate(allProjectDetails.planStartDate)}
              </Typography>
            </Grid>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Thời gian kết thúc thực tế
              </Typography>
              <Typography variant="body1">
                {handleGetDate(allProjectDetails.planEndDate)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default Details;
