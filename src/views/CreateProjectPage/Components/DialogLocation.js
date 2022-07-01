import { Divider, Typography, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import TextFieldComponent from '../../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';

const DialogLocation = (props) => {
  const { locationDetail, setLocationDetail } = props;
  const validateSchema = yup
    .object({
      addressNumber: yup
        .string()
        .min(0, 'Địa chỉ phải là số lớn hơn 0!')
        .required(),
      area: yup.string().required(),
      city: yup.string().required('Phải có tên thành phố'),
      coordinate: yup
        .string()
        .required('Tên vùng phải khác biệt')
        .typeError('Tên vùng đã bị trùng!!!'),
      country: yup.string().required('Phải có tên quốc gia!'),
      createdBy: yup.number().required(),
      district: yup.string().required('Phải có tên đường!!!'),
      province: yup.string(),
      street: yup.string().required('Phải có tên đường'),
      ward: yup.string().required('Phải có tên khu vực'),
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
    console.log(data.addressNumber);
    const detailLocation = {
      addressNumber: data.addressNumber,
      area: data.area,
      city: data.city,
      coordinate: data.coordinate,
      country: data.country,
      createdBy: data.createdBy,
      district: data.district,
      province: data.province,
      street: data.street,
      ward: data.ward,
    };
    setLocationDetail(detailLocation);
    props.handleCloseLocationDialog();
  };
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        ĐỊA CHỈ
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
            Thông tin địa chỉ
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Số nhà
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="addressNumber"
                  errors={errors.addressNumber}
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
                  errors={errors.street}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Quận
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="district"
                  errors={errors.district}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Thành phố
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="city"
                  errors={errors.city}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Khu vực
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="ward"
                  errors={errors.ward}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Địa bàn tỉnh
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="province"
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
                  errors={errors.country}
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
                  errors={errors.area}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Điều phối
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="coordinate"
                  errors={errors.coordinate}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Người tạo
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
            </Grid>
          </form>
        </Box>
      </Box>
    </div>
  );
};
export default DialogLocation;
