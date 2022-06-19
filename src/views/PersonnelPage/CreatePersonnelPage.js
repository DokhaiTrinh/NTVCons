import { Divider, Typography, Box, TextField, Grid, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';
const gender = [
    { label: 'Nam' },
    { label: 'Nữ' },
]
const relationship = [
    { label: 'Độc thân' },
    { label: 'Đã kết hôn' },
]
const role = [
    { label: 'Quản trị viên' },
    { label: 'Nhân viên' },
]
const CreatePersonnelPage = (props) => {
    const [dob, setDob] = React.useState(new Date());
    const [joinDate, setJoinDate] = React.useState(new Date());
    return <div>

        <Typography variant="h6" color="#DD8501" sx={{ marginTop: "20px", marginBottom: "20px", marginLeft: "30px" }}>
            Tạo mới hồ sơ nhân viên
        </Typography>
        <Divider></Divider>
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>

            <Box sx={{ paddingLeft: "10px", paddingTop: "10px", width: "40%", marginBottom: "30px" }}>
                <Typography variant="body1" color="#DD8501" fontWeight="bold">Ảnh đại diện</Typography>
                <Divider sx={{ bgcolor: "#DD8501" }}></Divider>
                <Box sx={{ width: "100%", height: "20px" }}></Box>
                <Grid container>

                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <Avatar sx={{ height: "150px", width: "150px", zIndex: 0 }} variant="square" src="src/assets/images/non-avatar.png">
                        </Avatar>
                        <IconButton aria-label="add" sx={{ alignSelf: "center", backgroundColor: "#DD8501", zIndex: 1 }}>
                            <Add sx={{ color: "white" }}></Add>
                        </IconButton>
                    </Box>

                </Grid>
                <Typography variant="body1" color="#DD8501" fontWeight="bold">Sơ yếu lý lịch</Typography>
                <Divider sx={{ bgcolor: "#DD8501" }}></Divider>
                <Box sx={{ width: "100%", height: "20px" }}></Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Mã nhân viên</Typography>
                        <TextField id="project-name" placeholder="Mã nhân viên" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Họ và tên</Typography>
                        <TextField id="project-name" placeholder="Họ và tên" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" >Ngày sinh</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableFuture
                                openTo="year"
                                views={['year', 'month', 'day']}
                                placeholder={dob}

                                onChange={(newValue) => {
                                    setDob(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Giới tính</Typography>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={gender}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} placeholder="Chọn giới tính" />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Tình trạng hôn nhân</Typography>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={relationship}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} placeholder="Chọn tình trạng hôn nhân" />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Quốc tịch</Typography>
                        <TextField id="project-name" placeholder="Quốc tịch" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Điện thoại</Typography>
                        <TextField id="project-name" placeholder="Số điện thoại" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Email</Typography>
                        <TextField id="project-name" placeholder="Địa chỉ email" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>

                </Grid>
                <Typography variant="body1" color="#DD8501" fontWeight="bold" sx={{ marginTop: "30px" }}>Thông tin khác</Typography>
                <Divider sx={{ bgcolor: "#DD8501" }}></Divider>
                <Box sx={{ width: "100%", height: "20px" }}></Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Dân tộc</Typography>
                        <TextField id="project-name" placeholder="Dân tộc" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Tôn giáo</Typography>
                        <TextField id="project-name" placeholder="Tôn giáo" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">CMT/Căn cước/Hộ chiếu</Typography>
                        <TextField id="project-name" placeholder="Số CMT/Căn cước/Hộ chiếu" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Ngày cấp, Nơi cấp</Typography>
                        <TextField id="project-name" placeholder="Tháng/Ngày/Năm, Nơi cấp" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Nơi sinh</Typography>
                        <TextField id="project-name" placeholder="Nơi sinh" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Nguyên quán</Typography>
                        <TextField id="project-name" placeholder="Nguyên quán" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Thường trú</Typography>
                        <TextField id="project-name" placeholder="Địa chỉ thường trú" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Chỗ ở hiện tại</Typography>
                        <TextField id="project-name" placeholder="Địa chỉ chỗ ở hiện tại" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                </Grid>
                <Typography variant="body1" color="#DD8501" fontWeight="bold" sx={{ marginTop: "30px" }}>Hồ sơ nhân viên</Typography>
                <Divider sx={{ bgcolor: "#DD8501" }}></Divider>
                <Box sx={{ width: "100%", height: "20px" }}></Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Phòng ban</Typography>
                        <TextField id="project-name" placeholder="Phòng ban" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Vị trí</Typography>
                        <TextField id="project-name" placeholder="Vị trí" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Chức vụ</Typography>
                        <TextField id="project-name" placeholder="Chức vụ" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Vai trò</Typography>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={role}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} placeholder="Chọn vai trò" />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" >Ngày vào</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableFuture
                                openTo="year"
                                views={['year', 'month', 'day']}
                                placeholder={joinDate}

                                onChange={(newValue) => {
                                    setJoinDate(newValue);
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

export default CreatePersonnelPage;