import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import TextFieldComponent from '../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import moment from 'moment';
import { createProjectApi } from '../../apis/Project/createProject';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DialogLocation from './Components/DialogLocation';
import { getProjectByIdApi } from '../../apis/Project/updateProject';
const CreateProjectPage = (props) => {
  const [valueActualStartDate, setValueActualStartDate] = React.useState(
    new Date()
  );
  const [valueActualEndDate, setValueActualEndDate] = React.useState(
    new Date()
  );
  const [valuePlanStartDate, setValuePlanStartDate] = React.useState(
    new Date()
  );
  const [valuePlanEndDate, setValuePlanEndDate] = React.useState(new Date());
  const [locationDetail, setLocationDetail] = React.useState();
  const [openLocationDialog, setOpenLocationDialog] = useState(false);
  const [loading, setLoading] = useState('');
  // const [imageSelected, setImageSelected] = useState('');
  // const [imageData, setImageData] = useState('');
  const submitForm = (data) => {
    const actualStartDate =
      moment(valueActualStartDate).format('YYYY-MM-DD HH:mm');
    const actualEndDate = moment(valueActualEndDate).format('YYYY-MM-DD HH:mm');
    const planStartDate = moment(valuePlanStartDate).format('YYYY-MM-DD HH:mm');
    const planEndDate = moment(valuePlanEndDate).format('YYYY-MM-DD HH:mm');
    handleCreateProject(
      actualEndDate,
      actualStartDate,
      planEndDate,
      planStartDate,
      locationDetail,
      data.createdBy,
      data.actualCost,
      data.estimatedCost,
      data.projectName
    );
  };
  const handleCreateProject = async (
    actualEndDate,
    actualStartDate,
    planEndDate,
    planStartDate,
    location,
    createdBy,
    actualCost,
    estimatedCost,
    projectName
  ) => {
    try {
      setLoading(true);
      console.log(
        actualEndDate,
        actualStartDate,
        planEndDate,
        planStartDate,
        location,
        createdBy,
        actualCost,
        estimatedCost,
        projectName
      );
      await createProjectApi({
        actualEndDate,
        actualStartDate,
        planEndDate,
        planStartDate,
        location,
        createdBy,
        actualCost,
        estimatedCost,
        projectName,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Tạo dự án thành công',
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        text: error.response.data,
        timer: 3000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
    console.log(planStartDate);
  };
  const valideSchema = yup
    .object({
      actualCost: yup
        .number()
        .min(1, 'Số lượng phải lớn hơn 0')
        .typeError('Giá tiền phải là số tính theo VNĐ')
        .required(),
      estimatedCost: yup
        .number()
        .min(1, 'Số lượng phải lớn hơn 0')
        .typeError('Giá tiền phải là số tính theo VNĐ'),
      projectName: yup
        .string()
        .min(5, 'Tên dự án phải lớn hơn 5')
        .max(50, 'Tên dự án không được lớn hơn 50')
        .required('Dự án '),
      createdBy: yup.number().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valideSchema),
  });
  // const uploadImage = () => {
  //   const formData = new FormData();
  //   formData.append('file', imageSelected);
  //   formData.append('upload_preset', 'u78fm100');

  //   const postImage = async () => {
  //     try {
  //       const response = await axios.post(
  //         'https://api.cloudinary.com/v1_1/niem-tin-vang/upload',
  //         formData
  //       );
  //       console.log(response);
  //       setImageData(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   postImage();
  // };
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
        TẠO MỚI DỰ ÁN
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
          <Typography variant="body1" color="#DD8501" fontWeight="bold">
            Thông tin dự án
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Tên dự án
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="projectName"
                  errors={errors.projectName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Chi phí ước tính
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="estimatedCost"
                  errors={errors.estimatedCost}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid container item xs={12} spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="#DD8501">
                    Thời gian dự kiến
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Bắt đầu dự kiến</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      value={valuePlanStartDate}
                      onChange={(newValue) => {
                        setValuePlanStartDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Kết thúc dự kiến</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      value={valuePlanEndDate}
                      onChange={(newValue) => {
                        setValuePlanEndDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="#DD8501">
                    Thời gian chính thức
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Bắt đầu chính thức</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      value={valueActualStartDate}
                      onChange={(newValue) => {
                        setValueActualStartDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Kết thúc chính thức</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      value={valueActualEndDate}
                      onChange={(newValue) => {
                        setValueActualEndDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
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
                    Chi tiết địa điểm
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
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Người quản lý
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="createdBy"
                  errors={errors.createdBy}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Giá chính thức
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="actualCost"
                  errors={errors.actualCost}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              {/* <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Chọn file
              </Typography>
              <input
                type="file"
                name="file"
                onChange={(event) => {
                  setImageSelected(event.target.files[0]);
                }}
              />
            </Grid> */}
              {/* <Grid>
              {imageData && (
                <Image
                  cloudName="niem-tin-vang"
                  publicId={`http://res.cloudinary.com/niem-tin-vang/image/upload/v1655116089/${imageData.public_id}`}
                />
              )}
            </Grid> */}
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
                    // onClick={uploadImage}
                  >
                    Tạo mới dự án
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Dialog open={openLocationDialog} onClose={handleCloseLocationDialog}>
        <DialogLocation
          handleCloseLocationDialog={handleCloseLocationDialog}
          setLocationDetail={setLocationDetail}
          locationDetail={locationDetail}
        ></DialogLocation>
      </Dialog>
    </div>
  );
};

export default CreateProjectPage;
