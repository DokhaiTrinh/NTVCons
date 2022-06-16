import { Divider, Typography, Box, TextField, Grid, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';

const CreateProjectPage = (props) => {
    const [expectedStart, setExpectedStart] = React.useState(new Date());
    const [expectedEnd, setExpectedEnd] = React.useState(new Date());
    const [actualStart, setActualStart] = React.useState(new Date());
    const [actualEnd, setActualEnd] = React.useState(new Date());
    return <div>

        <Typography variant="h6" color="#DD8501" sx={{ marginTop: "20px", marginBottom: "20px", marginLeft: "30px" }}>
            TẠO MỚI DỰ ÁN
        </Typography>
        <Divider></Divider>
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box sx={{ paddingLeft: "10px", paddingTop: "10px", width: "40%", marginBottom: "30px" }}>
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
                        <Typography variant="body2" color="#DD8501">Tên bảng thiết kế dự án</Typography>
                        <TextField id="project-name" placeholder="Tên bảng thiết kế dự án" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Người quản trị</Typography>
                        <TextField id="project-name" placeholder="Người quản trị" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Địa chỉ</Typography>
                        <TextField id="project-name" placeholder="Địa chỉ" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Vùng</Typography>
                        <TextField id="project-name" placeholder="Vùng" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Phố</Typography>
                        <TextField id="project-name" placeholder="Phố" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Đường</Typography>
                        <TextField id="project-name" placeholder="Đường" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Quận/Huyện</Typography>
                        <TextField id="project-name" placeholder="Quận/Huyện" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Thành phố</Typography>
                        <TextField id="project-name" placeholder="Thành phố" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Tỉnh</Typography>
                        <TextField id="project-name" placeholder="Tỉnh" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Quốc gia</Typography>
                        <TextField id="project-name" placeholder="Quốc gia" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">"coordinate"</Typography>
                        <TextField id="project-name" placeholder="coordinate" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Người thiết kế</Typography>
                        <TextField id="project-name" placeholder="Người thiết kế" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Chi phí thiết kế ước tính</Typography>
                        <TextField id="project-name" placeholder="Chi phí ước tính" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Chi phí dự án ước tính</Typography>
                        <TextField id="project-name" placeholder="Chi phí dự án ước tính" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Chi phí dự án thực tế</Typography>
                        <TextField id="project-name" placeholder="Chi phí dự án thực tế" variant="outlined" sx={{ width: "100%" }} />
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
                                    value={expectedStart}

                                    onChange={(newValue) => {
                                        setExpectedStart(newValue);
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
                                    value={expectedEnd}
                                    onChange={(newValue) => {
                                        setExpectedEnd(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="#DD8501">Thời gian thực tế</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" >Bắt đầu</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disableFuture
                                    openTo="year"
                                    views={['year', 'month', 'day']}
                                    value={actualStart}

                                    onChange={(newValue) => {
                                        setActualStart(newValue);
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
                                    value={actualEnd}
                                    onChange={(newValue) => {
                                        setActualEnd(newValue);
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
        </Box>
    </div>;
};

export default CreateProjectPage;