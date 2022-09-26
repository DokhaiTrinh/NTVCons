import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  Paper,
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
import Swal from 'sweetalert2';
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import { createTaskApi } from '../../apis/Task/createTask';
import { createTaskApi1 } from '../../apis/Task/createTask';
import { getUserByIdApi } from '../../apis/User/getAllUser';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { getProjectByManagerApi } from '../../apis/ProjectManager/getAllManager';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import RenderImage from '../../Components/Render/RenderImage';
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
const CreateTaskProject = (props) => {
  const { id } = useParams();
  const [userListDetail, setUserListDetail] = React.useState();
  const [openUserListDialog, setOpenUserListDialog] = useState(false);
  const [valuePlanStartDate, setValuePlanStartDate] = React.useState(
    new Date()
  );
  const [userById, setUserById] = React.useState();
  const [valuePlanEndDate, setValuePlanEndDate] = React.useState(new Date());
  const [loading, setLoading] = useState('');
  const [projectByManager, setProjcetByManager] = React.useState();
  const [managerTypeSelected, setManagerTypeSelected] = React.useState();
  const [filesImage, setFilesImage] = useState([]);
  const [selectedImages, setSelectedImage] = useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listProjectByManager = await getProjectByManagerApi(
          0,
          15,
          id,
          'BY_PROJECT_ID',
          'createdAt',
          true
        );
        setProjcetByManager(listProjectByManager.data);
      } catch (error) {
        console.log('Không thể lấy danh sách dự án');
      }
    })();
  }, []);
  // React.useEffect(() => {
  //   (async () => {
  //     try {
  //       if (userListDetail) {
  //         const listUserById = await getUserByIdApi(
  //           userListDetail.assigneeId.toString(),
  //           'BY_ID'
  //         );
  //         setUserById(listUserById.data);
  //       }
  //     } catch (error) {
  //       console.log('Không thể lấy danh sách kỹ sư');
  //     }
  //   })();
  // }, [userListDetail]);
  const submitForm = (data) => {
    const planStartDate = moment(valuePlanStartDate).format('YYYY-MM-DD HH:mm');
    const planEndDate = moment(valuePlanEndDate).format('YYYY-MM-DD HH:mm');
    handleCreateTask(
      planEndDate,
      planStartDate,
      id,
      managerTypeSelected,
      data.taskDesc,
      data.taskName,
      filesImage
    );
  };
  const handleCreateTask = async (
    planEndDate,
    planStartDate,
    projectId,
    assigneeId,
    taskDesc,
    taskName,
    fileList
  ) => {
    try {
      setLoading(true);
      await createTaskApi1({
        planEndDate,
        planStartDate,
        projectId,
        assigneeId,
        taskDesc,
        taskName,
        fileList,
      });

      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Tạo công việc thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      // window.location.replace(`/projectDetails/${id}`);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        text: 'Tạo công việc thất bại',
        timer: 3000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
  };
  const valideSchema = yup
    .object({
      taskName: yup
        .string()
        .min(5, 'Tên công việc phải lớn hơn 5')
        .max(50, 'Tên công việc không được lớn hơn 50')
        .required(),
      taskDesc: yup
        .string()
        .min(5, 'Mô tả công việc phải lớn hơn 5')
        .max(50, 'Mô tả công việc không được lớn hơn 50')
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
    setManagerTypeSelected(event.target.value);
  };
  // const handleOpenUserDialog = () => {
  //   setOpenUserListDialog(true);
  // };
  // const handleCloseUserDialog = () => {
  //   setOpenUserListDialog(false);
  // };
  // const handleChangeDate = (date) => {
  //   console.log(date);
  //   var options = { year: 'numeric', month: 'long', day: 'numeric' };
  //   let dateString = new Date(date).toLocaleDateString([], options);
  // };
  // const uploadImage = () => {
  //   const formData = new FormData();
  //   formData.append('file', imageSelected);
  //   formData.append('upload_preset', 'u78fm100');

  //   const postImage = async () => {
  //     try {
  //       const response = await axios.post(
  //         'https://api.cloudinary.com/v1_1/niem-tin-vang/upload',
  //         formData
  //       );
  //       console.log(response);
  //       setImageData(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   postImage();
  // };
  const handleChangeFile = (e) => {
    setFilesImage(e.target.files);

    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImage((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };
  const handleDeleteImage = (photo, indexImage) => {
    const index = selectedImages.indexOf(photo);
    if (index > -1) {
      selectedImages.splice(index, 1);
      // dispatch({ type: "LOADING", newLoading: !loading });
    }
    const dt = new DataTransfer();
    const input = document.getElementById('files');
    const { files } = input;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) dt.items.add(file); // here you exclude the file. thus removing it.
    }
    input.files = dt.files;
    setFilesImage(input.files);

    // dispatch({ type: 'LOADING', newLoading: !loading });
  };
  return (
    <Paper className='bodynonetab'>
      <Typography
        variant="h5"
      >
        TẠO CÔNG VIỆC
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
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">Tên công việc</Typography>
                <TextFieldComponent
                  register={register}
                  name="taskName"
                  errors={errors.taskName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Thông tin công việc</Typography>
                <TextFieldComponent
                  register={register}
                  name="taskDesc"
                  errors={errors.taskDesc}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid container item xs={12} spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="body2">Thời gian</Typography>
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
              <Grid item xs={12}>
                <Typography variant="body2">Kỹ sư quản lý</Typography>
                <FormControl sx={{ width: '100%' }}>
                  <Select
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    value={managerTypeSelected}
                  >
                    {projectByManager ? (
                      projectByManager.map((managerType, index) => (
                        <MenuItem
                          value={managerType.manager.userId}
                          key={index}
                        >
                          {managerType.manager.username}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>Không có dữ liệu! Vui lòng xem lại!</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item container xs={12}>
                <input
                  {...register('files')}
                  type="file"
                  id="files"
                  multiple
                  onChange={handleChangeFile}
                />
                <div className="label-holder">
                  <label htmlFor="file" className="img-upload"></label>
                </div>

                <div className="result">{RenderImage(selectedImages)}</div>
                {/* <input type="file" multiple {...register("file")} /> */}
              </Grid>
              {/* <Grid item container sx={12}>
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
                    onClick={() => handleOpenUserDialog()}
                  >
                    Phân công nhiệm vụ
                  </Button>
                </Box>
              </Grid>
              <Grid item container columns={12} spacing={2}>
                {userListDetail && userById ? (
                  <Grid item xs={4}>
                    <Box sx={{ width: '100%' }}>
                      <Card sx={{ width: '100%' }}>
                        <CardContent>
                          <Typography>Kỹ sư: {userById.username}</Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                ) : (
                  <Grid item sx={12}>
                    <div>Không có dữ liệu của báo cáo chi tiết!</div>
                  </Grid>
                )}
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
                  <Button
                    type="submit"
                    variant="contained"
                    className='submitButton'
                    // onClick={uploadImage}
                  >
                    Lưu
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      {/* <Dialog open={openUserListDialog} onClose={handleCloseUserDialog}>
        <DialogTaskAssgin
          handleCloseUserDialog={handleCloseUserDialog}
          setUserListDetail={setUserListDetail}
          userListDetail={userListDetail}
        ></DialogTaskAssgin>
      </Dialog> */}
    </Paper>
  );
};

export default CreateTaskProject;
