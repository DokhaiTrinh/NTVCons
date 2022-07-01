import { Divider, Typography, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import TextFieldComponent from '../../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { getReportById } from '../../../apis/Report/getReportByProjectId';


const DialogReportProject = (props) => {
  const { updateReportDetail, setUpdateReportDetail } = props;
  const [loading, setLoading] = useState('');

  const valideSchema = yup
    .object({
      itemAmount: yup
        .number()
        .typeError('amount is invalide')
        .min(1, 'Số lượng phải lớn hơn 0!')
        .required(),
      itemDesc: yup.string().required(),
      itemPrice: yup
        .number()
        .typeError('Price is invalide')
        .min(1, 'Giá tiền phải lớn hơn 0!')
        .required(),
      itemUnit: yup.string().required('Đơn vị đo lườngf'),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valideSchema),
  });

  const submitForm = (data) => {
    const updateDetailReport = {
      itemAmount: data.itemAmount,
      itemDesc: data.itemDesc,
      itemPrice: data.itemPrice,
      itemUnit: data.itemUnit,
      reportId: null,
      // reportDetailId: reportDetailId,
    };

    setUpdateReportDetail((updateReportDetail) => [...updateReportDetail, updateDetailReport]);

    props.handleCloseReportDetailDialog();
  };

  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        BÁO CÁO CHI TIẾT
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
            Thông tin báo cáo chi tiết
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Thông tin báo cáo chi tiết
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="itemDesc"
                  errors={errors.itemDesc}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Số lượng
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="itemAmount"
                  errors={errors.itemAmount}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Giá tiền
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="itemPrice"
                  label="Giá tiền (VNĐ)"
                  errors={errors.itemPrice}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Đơn vị tính
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="itemUnit"
                  label="Đơn vị"
                  errors={errors.itemUnit}
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

export default DialogReportProject;