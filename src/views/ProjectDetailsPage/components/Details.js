import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
const Details = (props) => {
  return <div>
    <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: "100%", mp: 2, borderRadius: "30px", padding: "20px" }} variant="elevation">
                        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                            Thông tin chung
                        </Typography>
                        <Divider sx={{ marginBottom: "20px" }}></Divider>
                        <Grid container rowSpacing={{ xs: 5 }}>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Mã dự án</Typography>
                                <Typography variant="body1" >1</Typography>
                            </Grid>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Tên dự án</Typography>
                                <Typography variant="body1" >Dự án - Xây dựng tòa nhà văn phòng ABC</Typography>
                            </Grid>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Người quản trị</Typography>
                                <Typography variant="body1" >Đỗ Nam Trung</Typography>
                            </Grid>
                            <Grid item  xs="6">
                                    <Typography variant="body1" color="gray">Trạng thái</Typography>
                                    <Typography variant="body1" >10%</Typography>
                            </Grid>
                                <Grid item xs="6">
                                <Typography variant="body1" color="gray">Trạng thái</Typography>
                                    <Box sx={{ width: '50%', borderRadius: "10px", backgroundColor: "pink" }}>
                                        <Typography variant="body1" sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'gray'
                                        }}>Đang thực hiện</Typography>
                                    </Box>
                                </Grid>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Người tham gia</Typography>
                                <Typography variant="body1" paragraph >Nguyễn Văn A, Trần Thị B, Vũ Văn C, Huỳnh Thị N, Đỗ Văn T</Typography>
                            </Grid>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Thời gian dự kiến</Typography>
                                <Typography variant="body1" >06/09/2021 - 24/09/2021</Typography>
                            </Grid>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Thời gian thực tế</Typography>
                                <Typography variant="body1" >06/09/2021 - 24/09/2021</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
  </div>;
};

export default Details;
