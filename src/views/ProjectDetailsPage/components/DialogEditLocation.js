import { Divider, Typography, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import TextFieldComponent from '../../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField } from '@mui/material';
const DialogEditLocation = (props) => {
  const {
    updateLocationDetail,
    setUpdateLocationDetail,
    actionUpdateLocation,
    itemDetailLocationUpdate,
  } = props;
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
    const updateDetailLocation = {
      addressNumber: data.addressNumber,
      area: data.area,
      city: data.city,
      coordinate: data.coordinate,
      country: data.country,
      district: data.district,
      province: data.province,
      street: data.street,
      ward: data.ward,
    };
    if (!updateLocationDetail) {
      if (actionUpdateLocation === 'CreateNewReport') {
        setUpdateLocationDetail([updateLocationDetail]);
      }
    } else {
      if (actionUpdateLocation === 'CreateNewLocation') {
        setUpdateLocationDetail((updateLocationDetail) => [
          ...updateLocationDetail,
          updateDetailLocation,
        ]);
      } else {
        let updateLocation = [...updateLocationDetail];
        updateLocation = updateLocation.map((u) =>
          u.locationId === updateLocationDetail.locationId
            ? (u = {
                ...u,
                addressNumber: data.addressNumber,
                area: data.area,
                city: data.city,
                coordinate: data.coordinate,
                country: data.country,
                district: data.district,
                province: data.province,
                street: data.street,
                ward: data.ward,
              })
            : u
        );
        setUpdateLocationDetail(updateLocation);
      }
    }
    props.handleCloseUpdateLocationDialog();
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
            Thông tin địa chỉ mới
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">Số nhà mới</Typography>
                <TextFieldComponent
                  register={register}
                  name="addressNumber"
                  errors={errors.addressNumber}
                  defaultValue={
                    updateLocationDetail
                      ? updateLocationDetail.addressNumber
                      : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Tên đường</Typography>
                <TextFieldComponent
                  register={register}
                  name="street"
                  errors={errors.street}
                  defaultValue={
                    updateLocationDetail ? updateLocationDetail.street : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Quận</Typography>
                <TextFieldComponent
                  register={register}
                  name="district"
                  errors={errors.district}
                  defaultValue={
                    updateLocationDetail ? updateLocationDetail.district : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Thành phố</Typography>
                <TextFieldComponent
                  register={register}
                  name="city"
                  errors={errors.city}
                  defaultValue={
                    updateLocationDetail ? updateLocationDetail.city : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Khu vực</Typography>
                <TextFieldComponent
                  register={register}
                  name="ward"
                  errors={errors.ward}
                  defaultValue={
                    updateLocationDetail ? updateLocationDetail.ward : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Địa bàn tỉnh</Typography>
                <TextFieldComponent
                  register={register}
                  name="province"
                  errors={errors.province}
                  defaultValue={
                    updateLocationDetail ? updateLocationDetail.province : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Quốc gia</Typography>
                <TextFieldComponent
                  register={register}
                  name="country"
                  errors={errors.country}
                  defaultValue={
                    updateLocationDetail ? updateLocationDetail.country : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Diện tích</Typography>
                <TextFieldComponent
                  register={register}
                  name="area"
                  errors={errors.area}
                  defaultValue={
                    updateLocationDetail ? updateLocationDetail.area : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Điều phối</Typography>
                <TextFieldComponent
                  register={register}
                  name="coordinate"
                  errors={errors.coordinate}
                  defaultValue={
                    updateLocationDetail
                      ? updateLocationDetail.coordinate
                      : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <Typography variant="body2">Mã địa chỉ</Typography>
                <TextFieldComponent
                  register={register}
                  name="locationId"
                  errors={errors.locationId}
                  defaultValue={
                    itemDetailLocationUpdate
                      ? itemDetailLocationUpdate.locationId
                      : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
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
                  {actionUpdateLocation ? (
                    actionUpdateLocation === 'UpdateLocation' ? (
                      <Button
                        type="submit"
                        variant="contained"
                        className="submitButton"
                      >
                        Cập nhật
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        className="submitButton"
                      >
                        Tạo mới
                      </Button>
                    )
                  ) : null}
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </div>
  );
};
export default DialogEditLocation;
