import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { getBlueprintByProjectIdApi } from '../../../apis/Blueprint/getBlueprintByProjectId';
const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

export const Blueprint = (props) => {
  const { id } = useParams();
  console.log(id);
  const [blueprintDetail, setBlueprintDetail] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listAllBlueprint = await getBlueprintByProjectIdApi(
          id,
          'BY_PROJECT_ID'
        );
        setBlueprintDetail(listAllBlueprint.data);
      } catch (error) {
        console.log('Không thể lấy dữ liệu của bản vẽ!');
      }
    })();
  }, []);
  console.log(blueprintDetail);
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
                Thông tin bản vẽ
              </Typography>
            </Grid>
            {/* {userInfor.authorID !== '54' ? null : (
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
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="button">Chỉnh sửa bản vẽ</Typography>
                  </Box>
                </Grid>
              </Grid>
            )} */}
          </Grid>
          <Divider sx={{ marginBottom: '20px' }}></Divider>
          <Grid container rowSpacing={{ xs: 5 }}>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Tên bản vẽ
              </Typography>
              <Typography variant="body1">
                {blueprintDetail.blueprintName}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Người thiết kế
              </Typography>
              <Typography variant="body1">
                {blueprintDetail.designerName}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Giá bản vẽ
              </Typography>
              <Typography variant="body1">
                {blueprintDetail.estimatedCost}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default Blueprint;
