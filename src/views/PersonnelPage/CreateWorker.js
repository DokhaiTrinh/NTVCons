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
import { createWorkerApi } from './../../apis/Worker/createWorker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { Add } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextFieldComponent from '../../Components/TextField/textfield';
import Dialog from '@mui/material/Dialog';
import { DialogAddress } from './components/DialogAddress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
export const CreateWorker = (props) => {
  const [loading, setLoading] = useState(false);
  const [locationDetail, setLocationDetail] = React.useState();
  const [openLocationDialog, setOpenLocationDialog] = useState(false);

  const citizensExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const socialSecurityCodeExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validateSchema = yup
    .object({
      fullName: yup
        .string()
        .min(5, 'Tên đăng nhập phải lớn hoặc hoặc bàng 6 kí tự')
        .required('Tên đăng nhập không được để trống'),
      citizenId: yup
        .string()
        .required('Căn cước công dân không được để trống!')
        .matches(citizensExp, 'Số căn cước công dân không xác thực !')
        .min(12, 'Phải đúng 12 số')
        .max(12, 'Không được quá 12 số'),
      socialSecurityCode: yup
        .string()
        .matches(socialSecurityCodeExp, 'Số bảo hiểm công dân không xác thực !')
        .min(12, 'Phải đúng 12 số')
        .max(12, 'Không được quá 12 số'),
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
    handleCreateWorker(
      locationDetail,
      data.citizenId,
      data.fullName,
      data.socialSecurityCode
    );
  };
  const handleCreateWorker = async (
    address,
    citizenId,
    fullName,
    socialSecurityCode
  ) => {
    try {
      setLoading(true);
      await createWorkerApi({
        address,
        citizenId,
        fullName,
        socialSecurityCode,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Tạo công nhân thành công',
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
  const handleOpenLocationDialog = () => {
    setOpenLocationDialog(true);
  };
  const handleCloseLocationDialog = () => {
    setOpenLocationDialog(false);
  };
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        Tạo mới hồ sơ công nhân
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
                    Họ và tên
                  </Typography>
                  <TextFieldComponent
                    register={register}
                    name="fullName"
                    // label="Tên vai trò"
                    errors={errors.fullName}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="#DD8501">
                    Căn cước công dân
                  </Typography>
                  <TextFieldComponent
                    register={register}
                    name="citizenId"
                    // label="Tên vai trò"
                    errors={errors.citizenId}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="#DD8501">
                    Số bảo hiểm
                  </Typography>
                  <TextFieldComponent
                    register={register}
                    name="socialSecurityCode"
                    // label="Tên vai trò"
                    errors={errors.socialSecurityCode}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item container sx={12}>
                  <Box
                    sx={{
                      width: '100%',
                      justifyContent: 'left',
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: '',
                        borderRadius: 50,
                        width: '200px',
                        alignSelf: 'center',
                      }}
                      onClick={() => handleOpenLocationDialog()}
                    >
                      Địa điểm thi công
                    </Button>
                  </Box>
                </Grid>
                <Grid item container columns={12} spacing={2}>
                  {locationDetail ? (
                    <Grid item xs={4}>
                      <Box sx={{ width: '100%' }}>
                        <Card sx={{ width: '100%' }}>
                          <CardContent>
                            <Typography>
                              Số nhà: {locationDetail.addressNumber}
                            </Typography>
                            <Typography>
                              Tên đường:{locationDetail.street}
                            </Typography>
                            <Typography>
                              Quận: {locationDetail.district}{' '}
                            </Typography>
                            <Typography>
                              Thành phố: {locationDetail.city}
                            </Typography>
                            <Typography>
                              Khu vực: {locationDetail.ward}
                            </Typography>
                            <Typography>
                              Địa bàn tỉnh: {locationDetail.province}
                            </Typography>
                            <Typography>
                              Quốc gia: {locationDetail.country}
                            </Typography>
                            <Typography>
                              Diện tích: {locationDetail.area}
                            </Typography>
                            <Typography>
                              Điều phối: {locationDetail.coordinate}
                            </Typography>
                            <Typography>
                              Người tạo: {locationDetail.createdBy}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </Grid>
                  ) : (
                    <Grid item sx={12}>
                      <div>Không có dữ liệu của báo cáo chi tiết!</div>
                    </Grid>
                  )}
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
      <Dialog open={openLocationDialog} onClose={handleCloseLocationDialog}>
        <DialogAddress
          handleCloseLocationDialog={handleCloseLocationDialog}
          setLocationDetail={setLocationDetail}
          locationDetail={locationDetail}
        ></DialogAddress>
      </Dialog>
      ;
    </div>
  );
};

export default CreateWorker;
