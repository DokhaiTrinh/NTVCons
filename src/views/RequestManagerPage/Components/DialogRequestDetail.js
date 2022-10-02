import { Divider, Typography, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import TextFieldComponent from '../../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import moment from 'moment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';

const DialogRequestProject = (props) => {
  const { requestDetail, setRequestDetail } = props;
  const [loading, setLoading] = useState('');

  const valideSchema = yup
    .object({
      itemAmount: yup
        .number()
        .typeError('Nhập sai số lượng!!')
        .min(1, 'Số lượng phải lớn hơn 0!')
        .required(),
      itemDesc: yup
        .string()
        .min(2, 'Số ký tự phải lớn hơn 2')
        .max(50, 'Ký tự nhỏ hơn 50 ký tự')
        .required(),
      itemPrice: yup
        .number()
        .typeError('Giá tiền không đúng!!!')
        .min(1, 'Giá tiền phải lớn hơn 0!')
        .required(),
      itemUnit: yup
        .string()
        .min(3, 'Số ký tự phải lớn hơn 3')
        .max(50, 'Ký tự nhỏ hơn 50 ký tự')
        .required('Đơn vị đo lường'),
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
    const detailRequest = {
      itemAmount: data.itemAmount,
      itemDesc: data.itemDesc,
      itemPrice: data.itemPrice,
      itemUnit: data.itemUnit,
      requestId: null,
    };

    setRequestDetail((requestDetail) => [...requestDetail, detailRequest]);

    props.handleCloseRequestDetailDialog();
  };

  return (
    <div className="dialog">
      <Typography variant="h6" color="#DD8501">
        CHI TIẾT YÊU CẦU
      </Typography>
      <Divider></Divider>
      <Typography variant="body1" color="#DD8501" fontWeight="bold">
        Thông tin yêu cầu chi tiết
      </Typography>
      <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
      <form onSubmit={handleSubmit(submitForm)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2">Thông tin yêu cầu chi tiết</Typography>
            <TextFieldComponent
              register={register}
              name="itemDesc"
              errors={errors.itemDesc}
              variant="outlined"
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">Số lượng</Typography>
            <TextFieldComponent
              register={register}
              name="itemAmount"
              errors={errors.itemAmount}
              variant="outlined"
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">Đơn vị tính</Typography>
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
            <Typography variant="body2">Giá tiền</Typography>
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
                className="submitButton"
              >
                Lưu
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default DialogRequestProject;
