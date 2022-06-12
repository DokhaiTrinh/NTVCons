import React from 'react';
import { Grid, Paper } from '@material-ui/core'
import background from "../../assets/images/phong-thuy-dat-nha-o-1.jpeg";
import logo from "../../assets/images/FILE_20220108_160017_GOLDEN TRUST-01.png";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
// import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MuiPhoneNumber from 'material-ui-phone-number';
const LoginPage = (props) => {
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
    const paperStyle = { height: '70vh', width: '60vh', margin: "auto" }
    return <div style={{
        backgroundImage: `url(${background})`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        paddingTop: '15vh'
    }}>
        <Grid align="center">
            <Paper elevation={10} style={paperStyle}>
                <img src={logo} alt="logo" style={{ width: "204px" }} />
                <Box sx={{ flexGrow: 1, width: "400px" }}>
                    <Grid container>
                        <Grid>
                            <Typography variant="h5">Log</Typography>
                        </Grid>

                        &nbsp;
                        <Grid>
                            <Typography variant="h5" color="#DD8501">In</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={4}>
                            <Box style={{ textAlign: "left" }}><Typography color="#DD8501" variant="body1">Can't log in?</Typography></Box>
                        </Grid>
                        <Grid item md={8}>
                            <Box style={{ textAlign: "right" }}><Typography color="#DD8501" variant="body1">Sign up for account</Typography></Box>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Typography variant="body1" marginTop="22px">Phone Number</Typography>
                    </Grid>
                    <MuiPhoneNumber defaultCountry={'vn'} onChange={(e) => {
                        this.setState({ number: e });
                    }} fullWidth />
                    {/* <Grid container> */}
                    {/* <TextField
                            id="full-width-text-field"
                            label="Number"
                            placeholder="Phone Number"
                            // margin="normal"
                            fullWidth // this may override your custom width
                        /> */}
                    {/* </Grid> */}
                    <Grid container>
                        <Typography variant="body1" marginTop="22px">Password</Typography>
                    </Grid>
                    <Grid container>
                        <FormControl fullWidth sx={{ width: 'wrap-parent' }} variant="outlined">
                            <InputLabel></InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </Grid>
                    <Grid>
                        <Button variant="contained" style={{ backgroundColor: "#DD8501", paddingRight: "50px", paddingLeft: "50px", borderRadius: 50, marginTop: "22px" }}>Log In</Button>
                    </Grid>
                </Box>
            </Paper>
        </Grid>
    </div>;
};
export default LoginPage;
