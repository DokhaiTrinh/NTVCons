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
import { updateTaskApi } from '../../apis/Task/updateTask';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { getTaskByProjectIdApi } from '../../apis/Task/getTaskByProjectId';


const UpdateTaskProject = (props) => {
  const { id } = useParams();
  //   const [allProjectDetails, setAllProjectDetails] = React.useState([]);
  const [valueActualStartDate, setValueActualStartDate] = React.useState(
    new Date()
  );
  const [valueActualEndDate, setValueActualEndDate] = React.useState(
    new Date()
  );
  const [valuePlanStartDate, setValuePlanStartDate] = React.useState(
    new Date()
  );
  const [valuePlanEndDate, setValuePlanEndDate] = React.useState(new Date());
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
  //   React.useEffect(() => {
  //     (async () => {
  //       try {
  //         const listAllProjectDetails = await getProjectByIdApi(
  //           0,
  //           10,
  //           id,
  //           'createdAt',
  //           true
  //         );
  //         setAllProjectDetails(listAllProjectDetails.data);
  //       } catch (error) {
  //         console.log('Không thể lấy danh sách công việc');
  //       }
  //     })();
  //   }, []);
  const [loading, setLoading] = useState('');
  const submitForm = (data) => {
    const actualStartDate =
      moment(valueActualStartDate).format('YYYY-MM-DD HH:mm');
    const actualEndDate = moment(valueActualEndDate).format('YYYY-MM-DD HH:mm');
    const planStartDate = moment(valuePlanStartDate).format('YYYY-MM-DD HH:mm');
    const planEndDate = moment(valuePlanEndDate).format('YYYY-MM-DD HH:mm');
    swal
      .fire({
        title: 'Cập nhật công việc ?',
        target: document.getElementById('form-modal12'),
        text: 'Lưu ý cập nhật sẽ thay đổi dữ liệu của dự án!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#25723F',
        cancelButtonColor: '#d33',
        confirmButtonText: 'CẬP NHẬT',
        cancelButtonText: 'HỦY',
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleUpdateTask(
            actualEndDate,
            actualStartDate,
            planEndDate,
            planStartDate,
            data.projectId,
            data.taskDesc,
            data.taskName
          );
          console.log(data);
        }
      });
  };
  const handleUpdateTask = async (
    actualEndDate,
    actualStartDate,
    planEndDate,
    planStartDate,
    projectId,
    taskDesc,
    taskName
  ) => {
    try {
      setLoading(true);
      await updateTaskApi({
        actualEndDate,
        actualStartDate,
        planEndDate,
        planStartDate,
        projectId,
        taskDesc,
        taskName,
      });
      setLoading(false);
      await swal.fire({
        icon: 'success',
        text: 'Cập nhật công việc thành công',
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      await swal.fire({
        icon: 'error',
        text: 'Cập nhật thất bại',
        target: document.getElementById('form-modal'),
        timer: 3000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
    console.log(planStartDate);
  };
  const valideSchema = yup.object({}).required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valideSchema),
  });
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
       CẬP NHẬT CÔNG VIỆC
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
            Thông tin công việc
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Tên công việc
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="taskDesk"
                  errors={errors.taskDesc}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Thông tin công việc
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="taskName"
                  errors={errors.taskName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid container item xs={12} spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="#DD8501">
                    Thời gian
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Bắt đầu dự kiến</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      value={valuePlanStartDate}
                      onChange={(newValue) => {
                        setValuePlanStartDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Kết thúc dự kiến</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      value={valuePlanEndDate}
                      onChange={(newValue) => {
                        setValuePlanEndDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="#DD8501">
                    Thời gian chính thức
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Bắt đầu chính thức</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      value={valueActualStartDate}
                      onChange={(newValue) => {
                        setValueActualStartDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Kết thúc chính thức</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      value={valueActualEndDate}
                      onChange={(newValue) => {
                        setValueActualEndDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
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

export default UpdateTaskProject;
