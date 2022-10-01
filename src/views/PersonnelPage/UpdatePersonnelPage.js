import {
  Divider,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { getAllRoleApi1 } from '../../apis/Role/GetAllRole';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextFieldComponent from '../../Components/TextField/textfield';
import moment from 'moment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import RenderImage from '../../Components/Render/RenderImage';
import UploadImage from '../../Components/Upload/UploadImage';
import Badge from '@mui/material/Badge';
import CancelIcon from '@mui/icons-material/Cancel';
import { updateUserApi } from '../../apis/User/updateUser';
import { getUserByIdApi } from '../../apis/User/getAllUser';
import { useParams } from 'react-router-dom';

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

const UpdatePersonnelPage = (props) => {
  const { id } = useParams();
  const idN = parseFloat(id);
  const [dob, setDob] = React.useState(new Date());
  const [joinDate, setJoinDate] = React.useState(new Date());
  const [loading, setLoading] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [allRole, setAllRole] = React.useState([]);
  const [roleSelected, setRoleSelected] = React.useState();
  const [filesImage, setFilesImage] = useState([]);
  const [selectedImages, setSelectedImage] = useState([]);
  const [userId, setUserId] = React.useState();
  const [userName, setUserName] = React.useState();
  const [roleId, setRoleId] = React.useState();
  const [password, setPassword] = React.useState();
  const [email, setEmail] = React.useState();
  const [phone, setPhone] = React.useState();
  const [fullName, setFullName] = React.useState();
  const [gender1, setGender] = React.useState();
  const [imageGet, setImageGet] = React.useState([]);
  const [valueBirthDate, setValueBirthDate] = React.useState(new Date());
  React.useEffect(() => {
    (async () => {
      try {
        const listAllRole = await getAllRoleApi1(0, 15, 'createdAt', true);
        setAllRole(listAllRole.data);
      } catch (error) {
        console.log('Không thể lấy danh sách role');
      }
      try {
        const listUser = await getUserByIdApi(id, 'BY_ID');
        setUserId(listUser.data);
        setValueBirthDate(listUser.data.birthdate);
        setUserName(listUser.data.username);
        setPassword(listUser.data.password);
        setEmail(listUser.data.email);
        setPhone(listUser.data.phone);
        setFullName(listUser.data.fullName);
        setGender(listUser.data.gender);
        if (listUser.data.file) {
          let arrayLinkImg = [];
          arrayLinkImg.push(listUser.data.file.fileLink);
          setImageGet(arrayLinkImg);
        }
      } catch (error) {
        console.log('Không thể lấy danh sách người dùng');
      }
    })();
  }, []);
  console.log(userId);
  console.log(imageGet);
  const validateSchema = yup
    .object({
      phone: yup
        .string()
        .required('Số điện thoại không được để trống!')
        .matches(phoneRegExp, 'Số điện thoại không xác thực !')
        .min(10, 'Phải đúng 10 số')
        .max(10, 'Không được quá 10 số'),
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
    const planBirthDate = moment(valueBirthDate).format('YYYY-MM-DD');
    Swal.fire({
      title: 'Cập nhật yêu cầu ?',
      target: document.getElementById('form-modal12'),
      text: 'Lưu ý cập nhật sẽ thay đổi dữ liệu của yêu cầu!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#25723F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'CẬP NHẬT',
      cancelButtonText: 'KHÔNG CẬP NHẬT',
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdateUser(
          idN,
          userName,
          roleSelected,
          // password,
          email,
          phone,
          fullName,
          gender1,
          planBirthDate,
          filesImage
        );
      }
    });
  };
  const handleUpdateUser = async (
    userId,
    username,
    roleId,
    // password,
    email,
    phone,
    fullName,
    gender1,
    birthdate,
    file
  ) => {
    try {
      setLoading(true);
      await updateUserApi({
        userId,
        username,
        roleId,
        // password,
        email,
        phone,
        fullName,
        gender1,
        birthdate,
        file,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Cập nhật thành viên thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      window.location.replace('/personnel');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: "Cập nhật thành viên không thành công!!",
        timer: 2000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
  };
  const gender = [
    {
      value: 'MALE',
      label: 'Nam',
    },
    {
      value: 'FEMALE',
      label: 'Nữ',
    },
  ];
  const handleChange = (event) => {
    setRoleSelected(event.target.value);
  };
  const handleChangeFile = (e) => {
    setFilesImage(e.target.files);

    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImage((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };
  const handleDeleteImage = (photo, indexImage) => {
    const index = selectedImages.indexOf(photo);
    if (index > -1) {
      selectedImages.splice(index, 1);
      // dispatch({ type: "LOADING", newLoading: !loading });
    }

    const dt = new DataTransfer();
    const input = document.getElementById('files');
    const { files } = input;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) dt.items.add(file); // here you exclude the file. thus removing it.
    }

    input.files = dt.files;
    setFilesImage(input.files);

    // dispatch({ type: 'LOADING', newLoading: !loading });
  };
  const renderPhotos = (src) => {
    return src.map((photo, index) => {
      return (
        <Badge
          badgeContent={<CancelIcon />}
          onClick={() => handleDeleteImage(photo, index)}
        >
          <img
            style={{
              width: '150px',
              height: '150px',
              // borderRadius: "50%",
              marginRight: '5px',
              marginBottom: '5px',
            }}
            src={photo}
            key={index}
          />
        </Badge>
      );
    });
  };
  const renderPhotos1 = (src) => {
    return src.map((photo, index) => {
      return (
        <Badge
        // badgeContent={<CancelIcon />}
        // onClick={() => handleDeleteImage(photo, index)}
        >
          <img
            style={{
              width: '100%',
              height: '100%',
              // borderRadius: "50%",
              marginRight: '5px',
              marginBottom: '5px',
            }}
            src={photo}
            key={index}
          />
        </Badge>
      );
    });
  };
  return (
    <Paper className="bodynonetab" elevation="none">
      <Typography variant="h6" color="#DD8501">
        Cập nhật hồ sơ nhân viên
      </Typography>
      <Divider></Divider>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {userId ? (
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
            <Typography variant="body1" color="#DD8501" fontWeight="bold">
              Sơ yếu lý lịch
            </Typography>
            <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
            <form onSubmit={handleSubmit(submitForm)}>
              <Box sx={{ width: '500px' }}>
                <Stack direction="column" spacing={2}>
                  <Grid item xs={12}>
                    <div className="result">{renderPhotos1(imageGet)}</div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">Tên đăng nhập</Typography>
                    <TextFieldComponent
                      register={register}
                      name="username"
                      inputProps={{ readOnly: true }}
                      defaultValue={userId.username}
                      errors={errors.username}
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">Họ và tên</Typography>
                    <TextFieldComponent
                      register={register}
                      name="fullName"
                      inputProps={{ readOnly: true }}
                      defaultValue={userId.fullName}
                      errors={errors.fullName}
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">Điện thoại</Typography>
                    <TextFieldComponent
                      register={register}
                      name="phone"
                      // label="Tên vai trò"
                      defaultValue={userId.phone}
                      inputProps={{ readOnly: true }}
                      errors={errors.phone}
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">Email</Typography>
                    <TextFieldComponent
                      register={register}
                      name="email"
                      // label="Tên vai trò"
                      inputProps={{ readOnly: true }}
                      defaultValue={userId.email}
                      errors={errors.email}
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">Chức vụ</Typography>
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
                  <Grid item xs={12}>
                    <Typography variant="body2">Hình ảnh cập nhật</Typography>
                    <input
                      {...register('files')}
                      type="file"
                      id="files"
                      accept="image/*"
                      onChange={handleChangeFile}
                    />
                    <div className="result">{renderPhotos(selectedImages)}</div>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        marginTop: '30px',
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        className="submitButton"
                      >
                        Lưu
                      </Button>
                    </Box>
                  </Grid>
                </Stack>
              </Box>
            </form>
          </Box>
        ) : (
          <div>Không có dữ liệu của yêu cầu!!</div>
        )}
      </Box>
    </Paper>
  );
};

export default UpdatePersonnelPage;
