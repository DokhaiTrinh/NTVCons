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
import { createReportApi } from '../../apis/Report/createReport';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogReportDetail from './Components/DialogReportDetail';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createReportDetailApi } from '../../apis/ReportDetails/createReportDetails';
import { getAllReportTypeApi } from '../../apis/ReportTypes/getAllReportTypes';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import { parse } from 'date-fns';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const CreateReportProject = (props) => {
  const { id } = useParams();
  const idN = parseFloat(id);
  //   const [allProjectDetails, setAllProjectDetails] = React.useState([]);
  const [valueReportDate, setValueReportDate] = React.useState(new Date());

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
  const [openReportDetailDialog, setOpenReportDetailDialog] = useState(false);
  const [reportDetail, setReportDetail] = React.useState([]);
  const [allReportType, setAllReportType] = React.useState([]);
  const [reportTypeSelected, setReportTypeSelected] = React.useState();
  const submitForm = (data) => {
    const reportDate = moment(valueReportDate).format('YYYY-MM-DD HH:mm');
    handleCreateReport(
      idN,
      reportDate,
      data.reportDesc,
      reportDetail,
      reportTypeSelected,
      data.reporterId,
      null
    );
    console.log(reportDetail);
    if (reportDetail.length > 0) {
      for (let rp of reportDetail) {
        handleCreateReportDetails(
          rp.itemAmount,
          rp.itemDesc,
          rp.itemPrice,
          rp.itemUnit,
          rp.reportId
        );
      }
    }
    console.log(data);
  };
  const handleCreateReport = async (
    projectId,
    reportDate,
    reportDesc,
    reportDetailList,
    reportTypeId,
    reporterId,
    taskReportList
  ) => {
    try {
      setLoading(true);
      console.log(
        typeof projectId,
        typeof reportDate,
        typeof reportDesc,
        typeof reportDetailList,
        typeof reportTypeId,
        typeof reporterId,
        typeof taskReportList
      );
      await createReportApi({
        projectId,
        reportDate,
        reportDesc,
        reportDetailList,
        reportTypeId,
        reporterId,
        taskReportList,
      });
      setLoading(false);
      await swal.fire({
        icon: 'success',
        text: 'Tạo báo cáo thành công',
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
  const handleCreateReportDetails = async (
    itemAmount,
    itemDesc,
    itemPrice,
    itemUnit,
    reportId
  ) => {
    try {
      setLoading(true);
      await createReportDetailApi({
        itemAmount,
        itemDesc,
        itemPrice,
        itemUnit,
        reportId,
      });

      setLoading(false);
      await swal.fire({
        icon: 'success',
        text: 'Tạo báo cáo chi tiết thành công',
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
      reportDesc: yup
        .string()
        .min(5, 'Thông tin báo cáo phải có thông tin nhiều hơn 5 ký tự!')
        .required(),
      reporterId: yup.number(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valideSchema),
  });
  const handleChange = (event) => {
    setReportTypeSelected(event.target.value);
  };

  const handleOpenReportDetailDialog = () => {
    setOpenReportDetailDialog(true);
  };
  const handleCloseReportDetailDialog = () => {
    setOpenReportDetailDialog(false);
  };
  React.useEffect(() => {
    (async () => {
      try {
        const listAllReportType = await getAllReportTypeApi(
          0,
          15,
          'createdAt',
          true
        );
        setAllReportType(listAllReportType.data);
      } catch (error) {
        console.log('Không thể lấy danh sách dự án');
      }
    })();
  }, []);
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        TẠO BÁO CÁO
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
            Thông tin báo cáo
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Thông tin báo cáo
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="reportDesc"
                  errors={errors.reportDesc}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item container xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Ngày báo cáo
                </Typography>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} fullWidth />}
                      value={valueReportDate}
                      onChange={(newValue) => {
                        setValueReportDate(newValue);
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
                    onClick={() => handleOpenReportDetailDialog()}
                  >
                    Chi tiết báo cáo
                  </Button>
                </Box>
              </Grid>
              <Grid item container columns={12} spacing={2}>

                {reportDetail.length ? (
                  reportDetail.map((report, index) => (
                    <Grid item xs={4}>
                      <Box sx={{ width: "100%" }}>
                        <Card sx={{ width: "100%" }}>
                          <CardContent>
                            <Typography>
                              Thông tin báo cáo chi tiết: {report.itemDesc}
                            </Typography>
                            <Typography>Số lượng:{report.itemAmount}</Typography>
                            <Typography>Giá tiền: {report.itemPrice} </Typography>
                            <Typography>Đơn vị: {report.itemUnit}</Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Grid item sx={12}>

                  <div>Không có dữ liệu của báo cáo chi tiết!</div>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Loại báo cáo
                </Typography>
                <FormControl sx={{ width: "100%" }}>
                  <Select
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    value={reportTypeSelected}
                  >
                    {allReportType.length > 0 ? (
                      allReportType.map((reportType, index) => (
                        <MenuItem value={reportType.reportTypeId} key={index}>
                          {reportType.reportTypeName}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>
                        Không có dữ liệu kiểu báo cáo! Vui lòng xem lại!
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Người báo cáo
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="reporterId"
                  errors={errors.reportDesc}
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
      <Dialog
        open={openReportDetailDialog}
        onClose={handleCloseReportDetailDialog}
      >
        <DialogReportDetail
          handleCloseReportDetailDialog={handleCloseReportDetailDialog}
          setReportDetail={setReportDetail}
          reportDetail={reportDetail}
        ></DialogReportDetail>
      </Dialog>
    </div>
  );
};

export default CreateReportProject;
