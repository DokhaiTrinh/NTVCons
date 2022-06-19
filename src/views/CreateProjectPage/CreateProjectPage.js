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
import Moment from 'react-moment';
import { createProjectApi } from '../../apis/Project/createProject';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateProjectPage = (props) => {
  const [valueStart, setValueStart] = React.useState(new Date());
  const [valueEnd, setValueEnd] = React.useState(new Date());

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
  console.log(valueStart);

  const submitForm = (data) => {
    console.log(data);
    handleCreateProject(
      data.actualEndDate,
      data.actualStartDate,
      data.addressNumber,
      data.area,
      data.blueprintEstimateCost,
      data.city,
      data.coordinate,
      data.country,
      data.designerName,
      data.district,
      data.planEndDate,
      data.planStartDate,
      data.projectActualCost,
      data.projectBlueprintName,
      data.projectEstimateCost,
      data.projectName,
      data.province,
      data.street,
      data.ward
    );
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
      addressNumber: yup.number(),
      area: yup.string().min(5, 'Tên khu vực phải lớn hơn 5'),
      blueprintEstimateCost: yup
        .number()
        .min(1, 'Giá tiền phải lớn hơn 0')
        .typeError('Giá tiền phải là số tính theo VNĐ'),
      city: yup
        .string()
        .min(5, 'Tên thành phố phải lớn hơn 5')
        .max(50, 'Tên thành phố không được quá 50'),
      coordinate: yup
        .string()
        .min(5, 'Tên điều phối phải lớn hơn 5')
        .max(50, 'Tên thành phố không được quá 50'),
      country: yup
        .string()
        .min(5, 'Tên quốc gia phải lớn hơn 5')
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
      ward: yup.string(),
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
  //   // console.log(date);
  //   var options = { year: 'numeric', month: 'long', day: 'numeric' };
  //   let dateString =  new Date(date).toLocaleDateString([],options);
    
  // } 
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
        sx={{ marginTop: '20px', marginBottom: '20px' }}
      >
        TẠO MỚI DỰ ÁN
      </Typography>
      <Divider></Divider>
      <Box sx={{ paddingLeft: '10px', paddingTop: '10px', width: '40%' }}>
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
                label="Tên dự án"
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
                <DatePicker
                  
                  openTo="year"
                  views={['year', 'month', 'day']}
                  value={valueEnd}
                  format="DD-MM-YYYY HH:ss"
                  onChange={(newValue) => {
                    setValueStart(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth />
                  )}
                />
                </LocalizationProvider>
              </Grid>
              {/* <Grid item xs={6}>
                <Typography variant="body2">Kết thúc dự kiến</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                  
                    openTo="year"
                    views={['year', 'month', 'day']}
                    value={valueEnd}
                    onChange={(newValue) => {
                      setValueEnd(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid> */}
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Địa chỉ
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
    </div>
  );
};

export default CreateProjectPage;
