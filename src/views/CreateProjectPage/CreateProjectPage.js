import { Divider, Typography, Box, TextField, Grid, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';

const CreateProjectPage = (props) => {
    const [value, setValue] = React.useState(new Date());
    return <div>

        <Typography variant="h6" color="#DD8501" sx={{ marginTop: "20px", marginBottom: "20px" }}>
            TẠO MỚI DỰ ÁN
        </Typography>
        <Divider></Divider>
        <Box sx={{ paddingLeft: "10px", paddingTop: "10px", width: "40%" }}>
            <Typography variant="body1" color="#DD8501" fontWeight="bold">Thông tin dự án</Typography>
            <Divider sx={{ bgcolor: "#DD8501" }}></Divider>
            <Box sx={{ width: "100%", height: "20px" }}></Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">Mã dự án</Typography>
                    <TextField id="project-name" placeholder="Mã dự án" variant="outlined" sx={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">Tên dự án</Typography>
                    <TextField id="project-name" placeholder="Tên dự án" variant="outlined" sx={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">Người quản trị</Typography>
                    <TextField id="project-name" placeholder="Người quản trị" variant="outlined" sx={{ width: "100%" }} />
                </Grid>
                <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Thời gian dự kiến</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" >Bắt đầu</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableFuture
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={value}

                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" >Kết thúc</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableFuture
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">Người tham gia</Typography>
                    <TextField
                        id="outlined-multiline-static"
                        placeholder="Người tham gia"
                        multiline
                        rows={4}
                        sx={{ width: "100%" }}
                    />
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
    </div>;
};

export default CreateProjectPage;