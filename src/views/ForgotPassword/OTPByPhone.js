import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import background from '../../assets/images/phong-thuy-dat-nha-o-1.jpeg';
import logo from '../../assets/images/FILE_20220108_160017_GOLDEN TRUST-01.png';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loginApi } from '../../apis/authentication/login';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const OTPByPhone = (props) => {
    const history = useHistory();
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    // const handleClickShowPassword = () => setShowPassword(!showPassword);
    // const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const validationSchema = yup
        .object({
            username: yup
                .string()
                .min(3, 'Tên đăng nhập phải lớn hơn hoặc bằng 6 kí tự')
                .required('Tên đăng nhập không được để trống!'),
            password: yup
                .string()
                .min(3, 'Mật khẩu phải lớn hơn hoặc bằng 6 kí tự')
                .required('Mật khẩu không được để trống!'),
        })
        .required();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const submitForm = (data) => {
        setLoading(true);
        handleLoginAction(data.username, data.password);
        setLoading(false);
    };

    const handleLoginAction = async (username, password) => {
        try {
            const authenInfor = await loginApi({ password, username });
            if (authenInfor.status === 200) {
                const decodeToken = parseJwt(authenInfor.data.token);

                const userInforObject = {
                    token: authenInfor.data.token,
                    id: decodeToken.id,
                    username: decodeToken.userName,
                    email: decodeToken.email,
                    phone: decodeToken.phone,
                    authorID: decodeToken.role[0].authority,
                };

                await localStorage.setItem(
                    'USERINFOR',
                    JSON.stringify(userInforObject)
                );
                await Swal.fire({
                    icon: 'success',
                    title: 'Đăng nhập thành công!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                window.location.replace('home');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Đăng nhập thất bại, vui lòng thử lại!!',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        return JSON.parse(jsonPayload);
    }
    useEffect(() => {
        localStorage.clear();
    }, []);
    const paperStyle = { height: '70vh', width: '60vh', margin: 'auto' };
    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',
                paddingTop: '15vh',
            }}
        >
            <Grid align="center">
                <Paper elevation={10} style={paperStyle}>
                    <img src={logo} alt="logo" style={{ width: '204px' }} />

                    <Box sx={{ flexGrow: 1, width: '400px' }}>
                        <Grid container>
                            <Grid>
                                <Typography variant="h5" color="#DD8501">
                                    Đặt lại mật khẩu
                                </Typography>
                            </Grid>
                        </Grid>
                        <form onSubmit={handleSubmit(submitForm)}>
                            <Grid container alignItems="center"
                                justify="center">
                                <Grid item xs={9}>
                                    <TextField
                                        {...register('username')}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Số điện thoại*"
                                        autoComplete="username"
                                        autoFocus
                                        name="phone"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Button type="submit"
                                        variant="contained"
                                        style={{
                                            backgroundColor: '#DD8501',
                                            borderRadius: 10,
                                        }}>
                                        Gửi OTP
                                    </Button>
                                </Grid>
                            </Grid>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="otp"
                                label="Mã OTP*"
                            />
                            <Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{
                                        backgroundColor: '#DD8501',
                                        paddingRight: '50px',
                                        paddingLeft: '50px',
                                        borderRadius: 50,
                                        marginTop: '22px',
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <CircularProgress color="white" size={24} /> &nbsp; Đang
                                            xử lí...
                                        </>
                                    ) : (
                                        'Tiếp tục'
                                    )}
                                </Button>
                            </Grid>
                        </form>
                    </Box>
                </Paper>
            </Grid>
        </div>
    );
};
export default OTPByPhone;
