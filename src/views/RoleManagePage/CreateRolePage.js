import { Divider, Typography, Box, TextField, Grid, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';

const CreateRolePage = (props) => {
    const [date, setDate] = React.useState(new Date());
    return <div>

        <Typography variant="h6" color="#DD8501" sx={{ marginTop: "20px", marginBottom: "20px", marginLeft: "30px" }}>
            TẠO MỚI VAI TRÒ
        </Typography>
        <Divider></Divider>
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box sx={{ paddingLeft: "10px", paddingTop: "10px", width: "40%" }}>
                <Typography variant="body1" color="#DD8501" fontWeight="bold">Thông tin vai trò</Typography>
                <Divider sx={{ bgcolor: "#DD8501" }}></Divider>
                <Box sx={{ width: "100%", height: "20px" }}></Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Tên vai trò</Typography>
                        <TextField id="project-name" placeholder="Tên vai trò" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" >Ngày được thêm vào</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableFuture
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={date}

                                onChange={(newValue) => {
                                    setDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex"
                        }}>
                            <Button variant="contained"
                                style={{
                                    backgroundColor: "#DD8501", borderRadius: 50, width: "200px",
                                    alignSelf: "center"
                                }}>Lưu</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </div>;
};

export default CreateRolePage;