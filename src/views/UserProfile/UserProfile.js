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
import { getUserByIdApi } from '../../apis/User/getAllUser';
import RenderImage from '../../Components/Render/RenderImage';
import FileDetail from '../ProjectDetailsPage/components/FileDetail';

const UserProfile = (props) => {
  const { id } = useParams();
  console.log(id);
  const [userId, setUserId] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listUser = await getUserByIdApi(id, 'BY_ID');
        setUserId(listUser.data);
      } catch (error) {
        console.log('Không thể lấy danh sách người dùng');
      }
    })();
  }, []);
  console.log(userId);
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
            Trang cá nhân
          </Typography>
          <Divider sx={{ marginBottom: '20px' }}></Divider>
          {userId ? (
            <Grid container spacing={2}>
              <Grid item xs="4">
                <Typography variant="body1">{userId.username}</Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1">{userId.fullname}</Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1">{userId.email}</Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1">{userId.phone}</Typography>
              </Grid>
              <Grid item xs="4">
                Giới tính
                <Typography variant="body1">{userId.gender}</Typography>
              </Grid>
            </Grid>
          ) : (
            <div>Không có dữ liệu của yêu cầu!!</div>
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default UserProfile;
