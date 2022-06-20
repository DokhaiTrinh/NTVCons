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
import swal from 'sweetalert2-react';
import moment from 'moment';
import { createProjectApi } from '../../apis/Project/createProject';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { getUserForDropDownApi } from '../../apis/Project/getUserForDropDown';
import 'react-datepicker/dist/react-datepicker.css';

const CreateProjectPage = (props) => {
  const [userId, userName] = useState('');

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
  // const [imageSelected, setImageSelected] = useState('');
  // const [imageData, setImageData] = useState('');
  // const date = `${current.getDate()}/${
  //   current.getMonth() + 1
  // }/${current.getFullYear()}`;
  const handleGetDate = (date) => {
    const getDate = date.substring(0, 10);
    const getDateCom = getDate.split('-');
    const getDateReformat = ''.concat(
      getDateCom[2],
      '-',
      getDateCom[1],
      '-',
      getDateCom[0]
    );
    return getDateReformat;
  };

  const [loading, setLoading] = useState('');
  const submitForm = (data) => {
    const actualStartDate =
      moment(valueActualStartDate).format('YYYY-MM-DD HH:mm');
    const actualEndDate = moment(valueActualEndDate).format('YYYY-MM-DD HH:mm');
    const planStartDate = moment(valuePlanStartDate).format('YYYY-MM-DD HH:mm');
    const planEndDate = moment(valuePlanEndDate).format('YYYY-MM-DD HH:mm');
    handleCreateProject(
      actualEndDate,
      actualStartDate,
      data.addressNumber,
      data.area,
      data.blueprintEstimateCost,
      data.city,
      data.coordinate,
      data.country,
      data.designerName,
      data.district,
      planEndDate,
      planStartDate,
      data.projectActualCost,
      data.projectBlueprintName,
      data.projectEstimateCost,
      data.projectName,
      data.province,
      data.street,
      data.userId,
      data.ward
    );
    console.log(data);
  };
  const handleCreateProject = async (
    actualEndDate,
    actualStartDate,
    addressNumber,
    area,
    blueprintEstimateCost,
    city,
    coordinate,
    country,
    designerName,
    district,
    planEndDate,
    planStartDate,
    projectActualCost,
    projectBlueprintName,
    projectEstimateCost,
    projectName,
    province,
    street,
    userId,
    ward
  ) => {
    try {
      setLoading(true);
      await createProjectApi({
        actualEndDate,
        actualStartDate,
        addressNumber,
        area,
        blueprintEstimateCost,
        city,
        coordinate,
        country,
        designerName,
        district,
        planEndDate,
        planStartDate,
        projectActualCost,
        projectBlueprintName,
        projectEstimateCost,
        projectName,
        province,
        street,
        userId,
        ward,
      });
      setLoading(false);
      await swal.fire({
        icon: 'success',
        text: 'Tạo dự án thành công',
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      await swal.fire({
        icon: 'error',
        text: error.response.data,
        timer: 3000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
  };
  const valideSchema = yup
    .object({
      addressNumber: yup.string(),
      blueprintEstimateCost: yup
        .number()
        .min(1, 'Giá tiền phải lớn hơn 0')
        .typeError('Giá tiền phải là số tính theo VNĐ'),
      city: yup
        .string()
        .min(5, 'Tên thành phố phải lớn hơn 5')
        .max(50, 'Tên thành phố không được quá 50'),
      designerName: yup
        .string()
        .min(5, 'Người thiết kế phải có tên lớn hon 5')
        .required('Phải nhập tên người thiết kế'),
      district: yup
        .string()
        .min(5, 'Tên quận phải lớn hon 5')
        .max(50, ' Tên quận không được lớn hơn 50'),
      projectActualCost: yup
        .number()
        .min(1, 'Số lượng phải lớn hơn 0')
        .typeError('Giá tiền phải là số tính theo VNĐ'),
      projectBlueprintName: yup
        .string()
        .min(5, 'Tên bản vẽ phải lớn hơn 5')
        .required('Phải nhập bản vẽ'),
      projectEstimateCost: yup
        .number()
        .min(1, 'Số lượng phải lớn hơn 0')
        .typeError('Giá tiền phải là số tính theo VNĐ'),
      projectName: yup
        .string()
        .min(5, 'Tên dự án phải lớn hơn 5')
        .max(50, 'Tên dự án không được lớn hơn 50')
        .required(),
      province: yup.string(),
      street: yup.string(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valideSchema),
  });

  // const handleChangeDate = (date) => {
  //   console.log(date);
  //   var options = { year: 'numeric', month: 'long', day: 'numeric' };
  //   let dateString = new Date(date).toLocaleDateString([], options);
  // };
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

  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: "30px" }}
      >
        TẠO MỚI DỰ ÁN
      </Typography>
      <Divider></Divider>
      <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
      <Box sx={{ paddingLeft: '10px', paddingTop: '10px', width: '40%', marginBottom: "30px" }}>
        <Typography variant="body1" color="#DD8501" fontWeight="bold">
          Thông tin dự án
        </Typography>
        <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
        <Box sx={{ width: '100%', height: '20px' }}></Box>
        <form onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Mã dự án
              </Typography>
              <TextField
                id="project-name"
                placeholder="Mã dự án"
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid> */}
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
                Tên Bản vẽ
              </Typography>
              <TextFieldComponent
                register={register}
                name="projectBlueprintName"
                errors={errors.projectBlueprintName}
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Giá bản vẽ
              </Typography>
              <TextFieldComponent
                register={register}
                name="blueprintEstimateCost"
                errors={errors.blueprintEstimateCost}
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Người thiết kế
              </Typography>
              <TextFieldComponent
                register={register}
                name="designerName"
                errors={errors.designerName}
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
                    value={valuePlanStartDate}
                    onChange={(newValue) => {
                      setValuePlanStartDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...register('planStartDate')}
                        fullWidth
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Kết thúc dự kiến</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    value={valuePlanEndDate}
                    onChange={(newValue) => {
                      setValuePlanEndDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...register('planEndDate')}
                        fullWidth
                      />
                    )}
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
                    value={valueActualStartDate}
                    onChange={(newValue) => {
                      setValueActualStartDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...register('actualStartDate')}
                        fullWidth
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Kết thúc chính thức</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    value={valueActualEndDate}
                    onChange={(newValue) => {
                      setValueActualEndDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...register('actualEndDate')}
                        fullWidth
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            {/* <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Kỹ sư phụ trách
              </Typography>
              <TextFieldComponent
                register={register}
                name="city"
                label="Địa chỉ"
                errors={errors.city}
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid> */}
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Thành phố
              </Typography>
              <TextFieldComponent
                register={register}
                name="city"
                label="Địa chỉ"
                errors={errors.city}
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Coordinate
              </Typography>
              <TextFieldComponent
                register={register}
                name="coordinate"
                label="Địa chỉ"
                errors={errors.coordinate}
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Country
              </Typography>
              <TextFieldComponent
                register={register}
                name="country"
                label="Địa chỉ"
                errors={errors.country}
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Tên đường
              </Typography>
              <TextFieldComponent
                register={register}
                name="street"
                label=""
                errors={errors.street}
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Số nhà
              </Typography>
              <TextFieldComponent
                register={register}
                name="addressNumber"
                label=""
                errors={errors.addressNumber}
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Tỉnh
              </Typography>
              <TextFieldComponent
                register={register}
                name="province"
                label=""
                errors={errors.province}
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Quốc gia
              </Typography>
              <TextFieldComponent
                register={register}
                name="country"
                label=""
                errors={errors.country}
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                UserId
              </Typography>
              <TextFieldComponent
                register={register}
                name="userId"
                label=""
                errors={errors.userId}
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Ward
              </Typography>
              <TextFieldComponent
                register={register}
                name="ward"
                label=""
                errors={errors.ward}
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Diện tích
              </Typography>
              <TextFieldComponent
                register={register}
                name="area"
                label="Địa chỉ"
                errors={errors.area}
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Giá dự kiến
              </Typography>
              <TextFieldComponent
                register={register}
                name="projectEstimateCost"
                label="Giá dự kiến"
                errors={errors.projectEstimateCost}
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Giá thực tế
              </Typography>
              <TextFieldComponent
                register={register}
                name="projectActualCost"
                label="Giá thực té"
                errors={errors.projectActualCost}
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
                  Lưu
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
      </Box>
    </div>
  );
};

export default CreateProjectPage;
