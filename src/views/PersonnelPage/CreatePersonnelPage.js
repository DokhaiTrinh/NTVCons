import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { createUserApi } from './../../apis/User/createUser';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { Add } from '@mui/icons-material';
import { getAllRoleApi1 } from '../../apis/Role/GetAllRole';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextFieldComponent from '../../Components/TextField/textfield';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreatePersonnelPage = (props) => {
  const [dob, setDob] = React.useState(new Date());
  const [joinDate, setJoinDate] = React.useState(new Date());
  const [loading, setLoading] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [allRole, setAllRole] = React.useState([]);
  const [roleSelected, setRoleSelected] = React.useState();
  React.useEffect(() => {
    (async () => {
      try {
        const listAllRole = await getAllRoleApi1(0, 15, 'createdAt', true);
        setAllRole(listAllRole.data);
      } catch (error) {
        console.log('Không thể lấy danh sách role');
      }
    })();
  }, []);
  console.log(allRole);

  const validateSchema = yup
    .object({
      username: yup
        .string()
        .min(5, 'Tên đăng nhập phải lớn hoặc hoặc bàng 6 kí tự')
        .required('Tên đăng nhập không được để trống'),
      phone: yup
        .string()
        .required('Số điện thoại không được để trống!')
        .matches(phoneRegExp, 'Số điện thoại không xác thực !')
        .min(10, 'Phải đúng 10 số')
        .max(10, 'Không được quá 10 số'),
      password: yup
        .string()
        .min(6, 'Mật khẩu phải lớn hơn 6 kí tự')
        .required('Mật khẩu không được để trống'),
      fullName: yup
        .string()
        .min(6, 'Tên người dùng phải lớn hơn 6 kí tự')
        .required('Tên người dùng không được để trống'),
      email: yup.string().email('Email không chính xác'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });

  const submitForm = (data) => {
    handleCreateUser(
      data.email,
      data.phone,
      roleSelected,
      data.username,
      data.password,
      data.fullName
    );
  };
  const handleCreateUser = async (
    email,
    phone,
    roleId,
    username,
    password,
    fullName
  ) => {
    try {
      setLoading(true);
      await createUserApi({
        email,
        phone,
        roleId,
        username,
        password,
        fullName,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Tạo nhân viên thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      window.location.replace('/personnel');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error.response.data,
        timer: 2000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
  };
  const handleChange = (event) => {
    setRoleSelected(event.target.value);
  };

  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        Tạo mới hồ sơ nhân viên
      </Typography>
      <Divider></Divider>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            paddingLeft: '10px',
            paddingTop: '10px',
            width: '40%',
            marginBottom: '30px',
          }}
        >
          {/* <Typography variant="body1" color="#DD8501" fontWeight="bold">
            Ảnh đại diện
          </Typography> */}
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <form onSubmit={handleSubmit(submitForm)}>
            <Box sx={{ width: '100%', height: '20px' }}>
              <Grid container>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar
                    sx={{ height: '150px', width: '150px', zIndex: 0 }}
                    variant="square"
                    src="src/assets/images/non-avatar.png"
                  ></Avatar>
                  <IconButton
                    aria-label="add"
                    sx={{
                      alignSelf: 'center',
                      backgroundColor: '#DD8501',
                      zIndex: 1,
                    }}
                  >
                    <Add sx={{ color: 'white' }}></Add>
                  </IconButton>
                </Box>
              </Grid>
              <Typography variant="body1" color="#DD8501" fontWeight="bold">
                Sơ yếu lý lịch
              </Typography>
              <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
              <Box sx={{ width: '100%', height: '20px' }}></Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="#DD8501">
                    Tên đăng nhập
                  </Typography>
                  <TextFieldComponent
                    register={register}
                    name="username"
                    errors={errors.username}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="#DD8501">
                    Mật khẩu
                  </Typography>
                  <TextFieldComponent
                    register={register}
                    name="password"
                    errors={errors.password}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="#DD8501">
                    Họ và tên
                  </Typography>
                  <TextFieldComponent
                    register={register}
                    name="fullName"
                    errors={errors.fullName}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="#DD8501">
                    Điện thoại
                  </Typography>
                  <TextFieldComponent
                    register={register}
                    name="phone"
                    // label="Tên vai trò"
                    errors={errors.phone}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="#DD8501">
                    Email
                  </Typography>
                  <TextFieldComponent
                    register={register}
                    name="email"
                    // label="Tên vai trò"
                    errors={errors.email}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="#DD8501">
                    Chức vụ
                  </Typography>
                  <FormControl sx={{ width: '100%' }}>
                    <Select
                      onChange={handleChange}
                      MenuProps={MenuProps}
                      value={roleSelected}
                    >
                      {allRole.length > 0 ? (
                        allRole.map((roleType, index) => (
                          <MenuItem value={roleType.roleId} key={index}>
                            {roleType.roleName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem>
                          Không có dữ liệu của danh sách công việc!
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: '#DD8501',
                      borderRadius: 50,
                      width: '200px',
                      alignSelf: 'center',
                    }}
                  >
                    Lưu
                  </Button>
                </Box>
              </Grid>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default CreatePersonnelPage;
