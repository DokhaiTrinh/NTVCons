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
import { createRequestApi } from '../../apis/Request/createRequest';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogRequestProject from './Components/DialogRequestDetail';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { getAllRequestTypeApi } from '../../apis/RequestType/getAllRequestType';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import { createRequestDetailApi } from '../../apis/RequestDetail/createRequestDetail';
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
const CreateRequestProject = (props) => {
  const { id } = useParams();
  const [valueRequestDate, setValueRequestDate] = React.useState(new Date());
  const [loading, setLoading] = useState('');
  const [openRequestDetailDialog, setOpenRequestDetailDialog] = useState(false);
  const [requestDetail, setRequestDetail] = React.useState([]);
  const [allRequestType, setAllRequestType] = React.useState([]);
  const [requestTypeSelected, setRequestTypeSelected] = React.useState();
  const submitForm = (data) => {
    const requestDate = moment(valueRequestDate).format('YYYY-MM-DD HH:mm');
    handleCreateRequest(
      id,
      requestDate,
      data.reportDesc,
      data.reportDetailList,
      requestTypeSelected,
      data.reporterId,
      data.taskReportList
    );
    handleCreateRequestDetails(
      data.itemAmount,
      data.itemDesc,
      data.itemPrice,
      data.itemUnit,
      data.reportId
    );
  };
  const handleCreateRequest = async (
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
      await createRequestApi({
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
        text: 'Tạo yêu cầu thành công',
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
  const handleCreateRequestDetails = async (
    itemAmount,
    itemDesc,
    itemPrice,
    itemUnit,
    reportId
  ) => {
    try {
      setLoading(true);
      await createRequestDetailApi({
        itemAmount,
        itemDesc,
        itemPrice,
        itemUnit,
        reportId,
      });

      setLoading(false);
      await swal.fire({
        icon: 'success',
        text: 'Tạo yêu cầu chi tiết thành công',
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
        .min(5, 'Thông tin yêu cầu phải có thông tin nhiều hơn 5 ký tự!')
        .required(),
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
    setRequestTypeSelected(event.target.value);
  };

  const handleOpenRequestDetailDialog = () => {
    setOpenRequestDetailDialog(true);
  };
  const handleCloseRequestDetailDialog = () => {
    setOpenRequestDetailDialog(false);
  };
  React.useEffect(() => {
    (async () => {
      try {
        const listAllRequestType = await getAllRequestTypeApi(
          0,
          15,
          'createdAt',
          true
        );
        setAllRequestType(listAllRequestType.data);
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
        TẠO YÊU CẦU
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
            Thông tin yêu cầu
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Thông tin yêu cầu
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="reportDesc"
                  errors={errors.reportDesc}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Ngày báo cáo
                </Typography>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      value={valueRequestDate}
                      onChange={(newValue) => {
                        setValueRequestDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Grid item sx={12}>
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
                    onClick={() => handleOpenRequestDetailDialog()}
                  >
                    Chi tiết báo cáo
                  </Button>
                </Box>
                <Grid item xs={3} md={2.4}>
                  {requestDetail.length ? (
                    requestDetail.map((request) => (
                      <Card sx={{ width: 200 }}>
                        <CardContent>
                          <Typography>
                            Thông tin báo cáo chi tiết: {request.itemDesc}
                          </Typography>
                          <Typography>Số lượng:{request.itemAmount}</Typography>
                          <Typography>
                            Giá tiền: {request.itemPrice}{' '}
                          </Typography>
                          <Typography>Đơn vị: {request.itemUnit}</Typography>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div>Không có dữ liệu của báo cáo chi tiết!</div>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Loại báo cáo
                </Typography>
                <FormControl sx={{ width: 580 }}>
                  <Select
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    value={requestTypeSelected}
                  >
                    {allRequestType.length > 0 ? (
                      allRequestType.map((requestType, index) => (
                        <MenuItem value={requestType.requestTypeId} key={index}>
                          {requestType.requestTypeName}
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
        open={openRequestDetailDialog}
        onClose={handleCloseRequestDetailDialog}
      >
        <DialogRequestProject
          handleCloseRequestDetailDialog={handleCloseRequestDetailDialog}
          setRequestDetail={setRequestDetail}
          requestDetail={requestDetail}
        ></DialogRequestProject>
      </Dialog>
    </div>
  );
};

export default CreateRequestProject;