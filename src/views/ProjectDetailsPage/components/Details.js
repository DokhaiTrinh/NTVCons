import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Link, useParams } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

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
  const { id } = useParams();
    return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Paper
          sx={{ width: '100%', mp: 2, borderRadius: '30px', padding: '20px' }}
          variant="elevation"
        >
          <Grid container spacing={0} alignItems="center" justify="center">
            <Grid item xs={11}>
              <Typography variant="h6" sx={{ marginBottom: '20px' }}>
                Thông tin chung
              </Typography>
            </Grid>
            <Grid item container xs={1}>
              <Grid item xs={12}>
                <Box
                  sx={{ width: '100%' }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <IconButton
                    aria-label="edit report"
                    component={Link}
                    to={`/editProjectDetails/${id}`}
                    sx={{ height: '100%' }}
                  >
                    <Box sx={{ height: '30px' }}>
                      <EditOutlinedIcon fontSize="large" />
                    </Box>
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12} justify="start">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography variant="button">Chỉnh sửa</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ marginBottom: '20px' }}></Divider>
          <Grid container rowSpacing={{ xs: 5 }}>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Mã dự án
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.projectId}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Tên dự án
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.projectName}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Người quản trị
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.createdBy}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Kỹ sư quản lý
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.userId}
              </Typography>
            </Grid>
            <Grid item xs="4">
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
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Người tham gia
              </Typography>
              <Typography variant="body1" paragraph>
                {allProjectDetails.userId}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Thời gian bắt đầu dự kiến
              </Typography>
              <Typography variant="body1">
                {handleGetDate(allProjectDetails.actualStartDate)}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Thời gian kết thúc dự kiến
              </Typography>
              <Typography variant="body1">
                {handleGetDate(allProjectDetails.actualEndDate)}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Địa chỉ
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.addressNumber} {allProjectDetails.street}{' '}
                {allProjectDetails.district} {allProjectDetails.city}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Thành phố
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.country}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Thời gian bắt đầu thực tế
              </Typography>
              <Typography variant="body1">
                {handleGetDate(allProjectDetails.planStartDate)}
              </Typography>
            </Grid>
            <Grid item xs="4">
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
