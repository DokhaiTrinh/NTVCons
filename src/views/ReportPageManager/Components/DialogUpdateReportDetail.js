import { Divider, Typography, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import TextFieldComponent from '../../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { getReportById } from '../../../apis/Report/getReportByProjectId';
import { useParams } from 'react-router-dom';

const DialogUpdateReportDetail = (props) => {
  const {
    updateReportDetail,
    setUpdateReportDetail,
    actionUpdateReport,
    itemDetailReportUpdate,
  } = props;
  const [loading, setLoading] = useState('');
  const valideSchema = yup
    .object({
      itemAmount: yup
        .number()
        .typeError('Phải nhập số lượng!!')
        .min(1, 'Số lượng phải lớn hơn 0!')
        .required(),
      itemDesc: yup.string().required(),
      itemPrice: yup
        .number()
        .typeError('Phải nhập giá!!')
        .min(1, 'Giá tiền phải lớn hơn 0!')
        .required(),
      itemUnit: yup.string().required('Đơn vị đo lường'),
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
    const createDetailReport = {
      itemAmount: data.itemAmount,
      itemDesc: data.itemDesc,
      itemPrice: data.itemPrice,
      itemUnit: data.itemUnit,
      reportId: null,
    };
    console.log(updateReportDetail);
    if (!updateReportDetail) {
      if (actionUpdateReport === 'CreateNewReport') {
        setUpdateReportDetail([createDetailReport]);
      }
    } else {
      if (actionUpdateReport === 'CreateNewReport') {
        setUpdateReportDetail((updateReportDetail) => [
          ...updateReportDetail,
          createDetailReport,
        ]);
      } else {
        let updateListReport = [...updateReportDetail];
        updateListReport = updateListReport.map((u) =>
          u.reportDetailId === itemDetailReportUpdate.reportDetailId
            ? (u = {
                ...u,
                itemAmount: data.itemAmount,
                itemDesc: data.itemDesc,
                itemPrice: data.itemPrice,
                itemUnit: data.itemUnit,
              })
            : u
        );
        setUpdateReportDetail(updateListReport);
      }
    }
    props.handleCloseUpdateReportDetailDialog();
  };
  console.log(updateReportDetail);
  console.log(itemDetailReportUpdate);
  return (
    <div className='dialog'>
      <Typography
        variant="h6"
        color="#DD8501"
      >
        BÁO CÁO CHI TIẾT
      </Typography>
      <Divider></Divider>
          <Typography variant="body1" color="#DD8501" fontWeight="bold">
            Thông tin báo cáo chi tiết
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Thông tin báo cáo chi tiết
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="itemDesc"
                  defaultValue={
                    itemDetailReportUpdate
                      ? itemDetailReportUpdate.itemDesc
                      : null
                  }
                  errors={errors.itemDesc}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Số lượng
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="itemAmount"
                  defaultValue={
                    itemDetailReportUpdate
                      ? itemDetailReportUpdate.itemAmount
                      : null
                  }
                  errors={errors.itemAmount}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Giá tiền
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="itemPrice"
                  label="Giá tiền (VNĐ)"
                  defaultValue={
                    itemDetailReportUpdate
                      ? itemDetailReportUpdate.itemPrice
                      : null
                  }
                  errors={errors.itemPrice}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Đơn vị tính
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="itemUnit"
                  label="Đơn vị"
                  defaultValue={
                    itemDetailReportUpdate
                      ? itemDetailReportUpdate.itemUnit
                      : null
                  }
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
                  {actionUpdateReport ? (
                    actionUpdateReport === 'UpdateReport' ? (
                      <Button
                        type="submit"
                        variant="contained"
                        className='submitButton'
                      >
                        Cập nhật
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        className='submitButton'
                      >
                        Tạo mới
                      </Button>
                    )
                  ) : null}
                </Box>
              </Grid>
            </Grid>
          </form>
    </div>
  );
};

export default DialogUpdateReportDetail;
