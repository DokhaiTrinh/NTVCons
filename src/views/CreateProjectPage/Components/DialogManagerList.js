import {
  Divider,
  Typography,
  Box,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import TextFieldComponent from '../../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';

const DialogManagerList = (props) => {
  const { managerListDetail, setManagerListDetail } = props;
  const [valueReportDate, setValueReportDate] = React.useState(new Date());

  const validateSchema = yup.object({
    createdBy: yup.number().required(),
    managerId: yup.number().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });
  const submitForm = (data) => {
    const assignDate = moment(valueReportDate).format('YYYY-MM-DD HH:mm');
    const detailManagerList = {
      assignDate,
      createdBy: data.createdBy,
      managerId: data.managerId,
      projectId: 0,
    };
    setManagerListDetail((managerListDetail) => [
      ...managerListDetail,
      detailManagerList,
    ]);
    props.handleCloseManagerListDialog();
  };
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        DANH SÁCH KỸ SƯ
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
            Thông tin kỹ sư
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Tên kỹ sư
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="managerId"
                  errors={errors.managerId}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item container xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Ngày tạo
                </Typography>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField {...props} fullWidth />
                      )}
                      value={valueReportDate}
                      onChange={(newValue) => {
                        setValueReportDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
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

export default DialogManagerList;
