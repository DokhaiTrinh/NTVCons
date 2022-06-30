import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import { useParams } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import TextFieldComponent from '../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateReportApi } from '../../apis/Report/updateReports';
import { updateReportDetailApi } from '../../apis/ReportDetails/updateReportDetail';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { getAllReportTypeApi } from '../../apis/ReportTypes/getAllReportTypes';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import moment from 'moment';
import DialogUpdateReportDetail from './Components/DialogUpdateReportDetail';
import DialogUpdateTaskReport from './Components/DialogUpdateTaskReport';
import DialogNewReportDetail from './Components/DialogNewReportDetail';
import DialogNewTaskDetail from './Components/DialogNewTaskReport';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
const UpdateReportProject = (props) => {
  const { id } = useParams();
  console.log(id);
  const idN = parseFloat(id);
  const [valueReportDate, setValueReportDate] = React.useState(new Date());
  const [loading, setLoading] = useState('');
  const [allReportType, setAllReportType] = React.useState([]);
  const [reportTypeSelected, setReportTypeSelected] = React.useState();
  const [openUpdateReportDetailDialog, setOpenUpdateReportDetailDialog] =
    React.useState(false);
  const [openUpdateTaskReportDialog, setOpenUpdateTaskReportDialog] =
    React.useState(false);
  const [openNewReportDialog, setOpenNewReportDialog] = React.useState(false);
  const [openNewTaskDialog, setOpenNewTaskDialog] = React.useState(false);
  const [updateReportDetail, setUpdateReportDetail] = React.useState([]);
  const [updateTaskReportDetail, setUpdateTaskReportDetail] = React.useState(
    []
  );
  const [newReportDetail, setNewReportDetail] = React.useState([]);
  const [newTaskReport, setNewTaskReport] = React.useState([]);

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
  const submitForm = (data) => {
    const reportDate = moment(valueReportDate).format('YYYY-MM-DD HH:mm');
    handleUpdateReport(
      newReportDetail,
      newTaskReport,
      idN,
      reportDate,
      data.reportDesc,
      data.reportId,
      data.reportName,
      reportTypeSelected,
      data.reporerId,
      updateReportDetail,
      updateTaskReportDetail
    );
  };
  const handleUpdateReport = async (
    newReportDetailList,
    newTaskReportList,
    projectId,
    reportDate,
    reportDesc,
    reportId,
    reportName,
    reportTypeId,
    reporerId,
    updateReportDetailList,
    updateTaskReportList
  ) => {
    try {
      setLoading(true);
      await updateReportApi({
        newReportDetailList,
        newTaskReportList,
        projectId,
        reportDate,
        reportDesc,
        reportId,
        reportName,
        reportTypeId,
        reporerId,
        updateReportDetailList,
        updateTaskReportList,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Cập nhật báo cáo thành công',
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      await Swal.fire({
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
      reporterId: yup.number().required(),
      reportName: yup
        .string()
        .min(5, 'Tên báo cáo phải có ít nhất 5 ký tự')
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
    setReportTypeSelected(event.target.value);
  };
  const handleOpenUpdateReportDetailDialog = () => {
    setOpenUpdateReportDetailDialog(true);
  };
  const handleCloseUpdateReportDetailDialog = () => {
    setOpenUpdateReportDetailDialog(false);
  };
  const handleOpenUpdateTaskReportDetailDialog = () => {
    setOpenUpdateTaskReportDialog(true);
  };
  const handleCloseUpdateTaskReportDetailDialog = () => {
    setOpenUpdateTaskReportDialog(false);
  };
  const handleOpenNewReportDetailDialog = () => {
    setOpenNewReportDialog(true);
  };
  const handleCloseNewReportDetailDialog = () => {
    setOpenNewReportDialog(false);
  };
  const handleOpenNewTaskDetailDialog = () => {
    setOpenNewTaskDialog(true);
  };
  const handleCloseNewTaskDetailDialog = () => {
    setOpenNewTaskDialog(false);
  };
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        CẬP NHẬT BÁO CÁO
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
                  Tên báo cáo
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="reportName"
                  errors={errors.reportName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
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
                    onClick={() => handleOpenUpdateReportDetailDialog()}
                  >
                    Chi tiết báo cáo
                  </Button>
                </Box>
              </Grid>
              <Grid item container columns={12} spacing={2}>
                {updateReportDetail.length ? (
                  updateReportDetail.map((report, index) => (
                    <Grid item xs={4}>
                      <Box sx={{ width: '100%' }}>
                        <Card sx={{ width: '100%' }}>
                          <CardContent></CardContent>
                            <Typography>Thông tin báo cáo chi tiết:</Typography>
                            <Typography>Số lượng:</Typography>
                            <Typography>Giá tiền:</Typography>
                            <Typography>Đơn vị:</Typography>
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
                    onClick={() => handleOpenNewTaskDetailDialog()}
                  >
                    Chi tiết báo cáo
                  </Button>
                </Box>
              </Grid>
              <Grid item container columns={12} spacing={2}>
                {updateReportDetail.length ? (
                  updateReportDetail.map((report, index) => (
                    <Grid item xs={4}>
                      <Box sx={{ width: '100%' }}>
                        <Card sx={{ width: '100%' }}>
                          <CardContent>
                            <Typography>
                              Thông tin báo cáo chi tiết: 
                            </Typography>
                            <Typography>
                              Số lượng:
                            </Typography>
                            <Typography>
                              Giá tiền:
                            </Typography>
                            <Typography>Đơn vị: </Typography>
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
                    onClick={() => handleOpenNewReportDetailDialog()}
                  >
                    Chi tiết báo cáo new
                  </Button>
                </Box>
              </Grid>
              <Grid item container columns={12} spacing={2}>
                {newReportDetail.length ? (
                  newReportDetail.map((report, index) => (
                    <Grid item xs={4}>
                      <Box sx={{ width: '100%' }}>
                        <Card sx={{ width: '100%' }}>
                          <CardContent>
                            <Typography>Thông tin báo cáo chi tiết:</Typography>
                            <Typography>Số lượng:</Typography>
                            <Typography>Giá tiền:</Typography>
                            <Typography>Đơn vị: </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Grid item sx={12}>
                    <div>Không có dữ liệu của báo cáo mới chi tiết!</div>
                  </Grid>
                )}
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
                    onClick={() => handleOpenNewTaskDetailDialog()}
                  >
                    Chi tiết cong viec new
                  </Button>
                </Box>
              </Grid>
              <Grid item container columns={12} spacing={2}>
                {newTaskReport.length ? (
                  newTaskReport.map((report, index) => (
                    <Grid item xs={4}>
                      <Box sx={{ width: '100%' }}>
                        <Card sx={{ width: '100%' }}>
                          <CardContent>
                            <Typography>Thông tin báo cáo chi tiết:</Typography>
                            <Typography>Số lượng:</Typography>
                            <Typography>Giá tiền:</Typography>
                            <Typography>Đơn vị:</Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Grid item sx={12}>
                    <div>Không có dữ liệu của mới của báo cáo</div>
                  </Grid>
                )}
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
                    onClick={() => handleOpenUpdateTaskReportDetailDialog()}
                  >
                    Chi tiết công việc
                  </Button>
                </Box>
              </Grid>
              <Grid item container columns={12} spacing={2}>
                {updateTaskReportDetail.length ? (
                  updateTaskReportDetail.map((task, index) => (
                    <Grid item xs={4}>
                      <Box sx={{ width: '100%' }}>
                        <Card sx={{ width: '100%' }}>
                          <CardContent>
                            <Typography>
                              Thông tin báo cáo chi tiết: {task.taskId}
                            </Typography>
                            <Typography>Số lượng:{task.taskNote}</Typography>
                            <Typography>
                              Giá tiền: {task.taskProgress}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Grid item sx={12}>
                    <div>Không có dữ liệu mới của công việc</div>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Loại báo cáo
                </Typography>
                <FormControl sx={{ width: '100%' }}>
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
        open={openUpdateReportDetailDialog}
        onClose={handleCloseUpdateReportDetailDialog}
      >
        <DialogUpdateReportDetail
          handleCloseUpdateReportDetailDialog={
            handleCloseUpdateReportDetailDialog
          }
          setUpdateReportDetail={setUpdateReportDetail}
          updateReportDetail={updateReportDetail}
        ></DialogUpdateReportDetail>
      </Dialog>
      <Dialog
        open={openUpdateTaskReportDialog}
        onClose={handleCloseUpdateReportDetailDialog}
      >
        <DialogUpdateTaskReport
          handleCloseUpdateTaskReportDetailDialog={
            handleCloseUpdateTaskReportDetailDialog
          }
          setUpdateTaskReportDetail={setUpdateTaskReportDetail}
          updateTaskReportDetail={updateTaskReportDetail}
        ></DialogUpdateTaskReport>
      </Dialog>
      <Dialog
        open={openNewReportDialog}
        onClose={handleCloseNewReportDetailDialog}
      >
        <DialogNewReportDetail
          handleCloseNewReportDetailDialog={handleCloseNewReportDetailDialog}
          setNewReportDetail={setNewReportDetail}
          newReportDetail={newReportDetail}
        ></DialogNewReportDetail>
      </Dialog>
      <Dialog open={openNewTaskDialog} onClose={handleCloseNewTaskDetailDialog}>
        <DialogNewTaskDetail
          handleCloseNewTaskDetailDialog={handleCloseNewTaskDetailDialog}
          setNewTaskReport={setNewTaskReport}
          newTaskReport={newTaskReport}
        ></DialogNewTaskDetail>
      </Dialog>
    </div>
  );
};
export default UpdateReportProject;
