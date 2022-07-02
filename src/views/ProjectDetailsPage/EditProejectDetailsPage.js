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
import Swal from 'sweetalert2';
import moment from 'moment';
import { updateProjectApi } from '../../apis/Project/updateProject';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DiaglogEditProject from './components/DialogEditProject';
import { useParams } from 'react-router-dom';
import { getProjectByIdApi } from '../../apis/Project/updateProject';
const EditProejectDetailsPage = (props) => {
  const { id } = useParams();
  console.log(id);
  var idN = parseInt(id);
  const [valueActualStartDate, setValueActualStartDate] = React.useState();
  const [valueActualEndDate, setValueActualEndDate] = React.useState(
    new Date()
  );
  const [valuePlanStartDate, setValuePlanStartDate] = React.useState();
  const [valuePlanEndDate, setValuePlanEndDate] = React.useState();
  const [locationDetail, setLocationDetail] = React.useState();
  const [openLocationDialog, setOpenLocationDialog] = useState(false);
  const [loading, setLoading] = useState('');
  const [allProjectDetails, setAllProjectDetails] = React.useState([]);
  // const [imageSelected, setImageSelected] = useState('');
  // const [imageData, setImageData] = useState('');
  React.useEffect(() => {
    (async () => {
      try {
        const listAllProjectDetails = await getProjectByIdApi(
          0,
          10,
          id,
          'createdAt',
          true
        );
        setAllProjectDetails(listAllProjectDetails.data);
        setValueActualStartDate(listAllProjectDetails.data.actualStartDate);
        setValueActualEndDate(listAllProjectDetails.data.actualEndDate);
        setValuePlanStartDate(listAllProjectDetails.data.planStartDate);
        setValuePlanEndDate(listAllProjectDetails.data.planEndDate);
      } catch (error) {
        console.log('Không thể lấy danh sách dự án');
      }
    })();
  }, []);
  console.log(allProjectDetails);
  const submitForm = (data) => {
    const actualStartDate =
      moment(valueActualStartDate).format('YYYY-MM-DD HH:mm');
    const actualEndDate = moment(valueActualEndDate).format('YYYY-MM-DD HH:mm');
    const planStartDate = moment(valuePlanStartDate).format('YYYY-MM-DD HH:mm');
    const planEndDate = moment(valuePlanEndDate).format('YYYY-MM-DD HH:mm');
    const projectId = idN;
    Swal.fire({
      title: 'Bạn có chắc là muốn cập nhật?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Cập nhật',
      denyButtonText: `Không cập nhật`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdateProject(
          projectId,
          actualEndDate,
          actualStartDate,
          planEndDate,
          planStartDate,
          locationDetail,
          data.updatedBy,
          data.actualCost,
          data.estimatedCost,
          data.projectName
        );
      }
    });
  };
  const handleUpdateProject = async (
    projectId,
    actualEndDate,
    actualStartDate,
    planEndDate,
    planStartDate,
    location,
    updatedBy,
    actualCost,
    estimatedCost,
    projectName
  ) => {
    try {
      setLoading(true);
      console.log(
        typeof projectId,
        typeof actualEndDate,
        typeof actualStartDate,
        typeof planEndDate,
        typeof planStartDate,
        typeof location,
        typeof updatedBy,
        typeof actualCost,
        typeof estimatedCost,
        typeof projectName
      );
      await updateProjectApi({
        projectId,
        actualEndDate,
        actualStartDate,
        planEndDate,
        planStartDate,
        location,
        updatedBy,
        actualCost,
        estimatedCost,
        projectName,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Cập nhật dự án thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      window.location.replace(`/projectDetails/${id}`);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        text: 'Cập nhật thất bại',
        timer: 3000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
    console.log(planStartDate);
  };
  const valideSchema = yup
    .object({
      actualCost: yup
        .number()
        .min(1, 'Số lượng phải lớn hơn 0')
        .typeError('Giá tiền phải là số tính theo VNĐ')
        .required(),
      estimatedCost: yup
        .number()
        .min(1, 'Số lượng phải lớn hơn 0')
        .typeError('Giá tiền phải là số tính theo VNĐ'),
      projectName: yup
        .string()
        .min(5, 'Tên dự án phải lớn hơn 5')
        .max(50, 'Tên dự án không được lớn hơn 50')
        .required('Dự án '),
      updatedBy: yup.number().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valideSchema),
  });
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
  const handleOpenLocationDialog = () => {
    setOpenLocationDialog(true);
  };
  const handleCloseLocationDialog = () => {
    setOpenLocationDialog(false);
  };
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        CẬP NHẬT DỰ ÁN
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
            Thông tin dự án
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          {allProjectDetails ? (
            allProjectDetails.length > 0 ? (
              <form onSubmit={handleSubmit(submitForm)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">
                      Mã dự án
                    </Typography>
                    <TextField
                      {...register('projectId')}
                      inputProps={{ readOnly: true }}
                      name="projectId"
                      variant="outlined"
                      autoComplete="projectId"
                      autoFocus
                      defaultValue={allProjectDetails[0].projectId}
                      error={errors.projectName != null}
                      helperText={errors.projectId?.message}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">
                      Tên dự án
                    </Typography>
                    <TextField
                      {...register('projectName')}
                      name="projectName"
                      variant="outlined"
                      autoComplete="projectName"
                      autoFocus
                      defaultValue={allProjectDetails[0].projectName}
                      error={errors.projectName != null}
                      helperText={errors.projectName?.message}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">
                      Chi phí ước tính
                    </Typography>
                    <TextField
                      {...register('estimatedCost')}
                      name="estimatedCost"
                      variant="outlined"
                      autoComplete="estimatedCost"
                      autoFocus
                      defaultValue={allProjectDetails[0].estimatedCost}
                      error={errors.estimatedCost != null}
                      helperText={errors.estimatedCost?.message}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="#DD8501">
                        Thời gian dự kiến
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Bắt đầu dự kiến</Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          renderInput={(props) => <TextField {...props} fullWidth />}
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
                          renderInput={(props) => <TextField {...props} fullWidth />}
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
                      <Typography variant="body2">
                        Bắt đầu chính thức
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          renderInput={(props) => <TextField {...props} fullWidth />}
                          value={valueActualStartDate}
                          onChange={(newValue) => {
                            setValueActualStartDate(newValue);
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Kết thúc chính thức
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          renderInput={(props) => <TextField {...props} fullWidth />}
                          value={valueActualEndDate}
                          onChange={(newValue) => {
                            setValueActualEndDate(newValue);
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
                    ></Box>
                  </Grid>
                  <Box sx={{ width: '100%' }}>
                    <Card sx={{ width: '100%' }}>
                      <CardContent>
                        <Grid item container spacing={2}>
                          <Grid item xs={4}>
                            <TextField
                              {...register('addressNumber')}
                              name="addressNumber"
                              variant="outlined"
                              autoComplete="addressNumber"
                              autoFocus
                              defaultValue={allProjectDetails[0].addressNumber}
                              error={errors.addressNumber != null}
                              helperText={errors.addressNumber?.message}
                              sx={{ width: '100%' }}
                              disabled="true"
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              {...register('street')}
                              name="street"
                              variant="outlined"
                              autoComplete="street"
                              autoFocus
                              defaultValue={allProjectDetails[0].street}
                              error={errors.street != null}
                              helperText={errors.street?.message}
                              sx={{ width: '100%' }}
                              disabled="true"
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              {...register('district')}
                              name="district"
                              variant="outlined"
                              autoComplete="district"
                              autoFocus
                              defaultValue={allProjectDetails[0].district}
                              error={errors.district != null}
                              helperText={errors.district?.message}
                              sx={{ width: '100%' }}
                              disabled="true"

                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              {...register('city')}
                              name="city"
                              variant="outlined"
                              autoComplete="city"
                              autoFocus
                              defaultValue={allProjectDetails[0].city}
                              error={errors.city != null}
                              helperText={errors.city?.message}
                              sx={{ width: '100%' }}
                              disabled="true"

                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              {...register('ward')}
                              name="ward"
                              variant="outlined"
                              autoComplete="ward"
                              autoFocus
                              defaultValue={allProjectDetails[0].ward}
                              error={errors.ward != null}
                              helperText={errors.ward?.message}
                              sx={{ width: '100%' }}
                              disabled="true"

                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              {...register('province')}
                              name="province"
                              variant="outlined"
                              autoComplete="province"
                              autoFocus
                              defaultValue={allProjectDetails[0].province}
                              error={errors.province != null}
                              helperText={errors.province?.message}
                              sx={{ width: '100%' }}
                              disabled="true"

                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              {...register('country')}
                              name="country"
                              variant="outlined"
                              autoComplete="country"
                              autoFocus
                              defaultValue={allProjectDetails[0].country}
                              error={errors.country != null}
                              helperText={errors.country?.message}
                              sx={{ width: '100%' }}
                              disabled="true"

                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              {...register('area')}
                              name="area"
                              variant="outlined"
                              autoComplete="area"
                              autoFocus
                              defaultValue={allProjectDetails[0].area}
                              error={errors.area != null}
                              helperText={errors.area?.message}
                              sx={{ width: '100%' }}
                              disabled="true"

                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              {...register('coordinate')}
                              name="coordinate"
                              variant="outlined"
                              autoComplete="coordinate"
                              autoFocus
                              defaultValue={allProjectDetails[0].coordinate}
                              error={errors.coordinate != null}
                              helperText={errors.coordinate?.message}
                              sx={{ width: '100%' }}
                              disabled="true"

                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              {...register('locationId')}
                              name="locationId"
                              inputProps={{ readOnly: true }}
                              variant="outlined"
                              autoComplete="locationId"
                              autoFocus
                              defaultValue={allProjectDetails[0].locationId}
                              error={errors.locationId != null}
                              helperText={errors.locationId?.message}
                              sx={{ width: '100%' }}
                              disabled="true"

                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Box>

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
                        onClick={() => handleOpenLocationDialog()}
                      >
                        Chi tiết địa điểm
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item container columns={12} spacing={2}>
                    {locationDetail ? (
                      <Grid item xs={4}>
                        <Box sx={{ width: '100%' }}>
                          <Card sx={{ width: '100%' }}>
                            <CardContent>
                              <Typography>
                                Số nhà: {locationDetail.addressNumber}
                              </Typography>
                              <Typography>
                                Tên đường:{locationDetail.street}
                              </Typography>
                              <Typography>
                                Quận: {locationDetail.district}{' '}
                              </Typography>
                              <Typography>
                                Thành phố: {locationDetail.city}
                              </Typography>
                              <Typography>
                                Khu vực: {locationDetail.ward}
                              </Typography>
                              <Typography>
                                Địa bàn tỉnh: {locationDetail.province}
                              </Typography>
                              <Typography>
                                Quốc gia: {locationDetail.country}
                              </Typography>
                              <Typography>
                                Diện tích: {locationDetail.area}
                              </Typography>
                              <Typography>
                                Điều phối: {locationDetail.coordinate}
                              </Typography>
                              <Typography>
                                Người tạo: {locationDetail.createdBy}
                              </Typography>
                              <Typography>
                                Người tạo: {locationDetail.locationId}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </Grid>
                    ) : (
                      <Grid item sx={12}>
                        <div>Không có dữ liệu của báo cáo chi tiết!</div>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">
                      Người thay đổi
                    </Typography>
                    <TextFieldComponent
                      register={register}
                      name="updatedBy"
                      errors={errors.updatedBy}
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">
                      Giá chính thức
                    </Typography>
                    <TextField
                      {...register('actualCost')}
                      name="actualCost"
                      variant="outlined"
                      autoComplete="actualCost"
                      autoFocus
                      defaultValue={allProjectDetails[0].actualCost}
                      error={errors.actualCost != null}
                      helperText={errors.actualCost?.message}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Chọn file
              </Typography>
              <input
                type="file"
                name="file"
                onChange={(event) => {
                  setImageSelected(event.target.files[0]);
                }}
              />
            </Grid> */}
                  {/* <Grid>
              {imageData && (
                <Image
                  cloudName="niem-tin-vang"
                  publicId={`http://res.cloudinary.com/niem-tin-vang/image/upload/v1655116089/${imageData.public_id}`}
                />
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
                        style={{
                          backgroundColor: '#DD8501',
                          borderRadius: 50,
                          width: '200px',
                          alignSelf: 'center',
                        }}
                      // onClick={uploadImage}
                      >
                        Cập nhật dự án
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            ) : (
              'Không có dữ liệu để hiển thị'
            )
          ) : null}
        </Box>
      </Box>
      <Dialog open={openLocationDialog} onClose={handleCloseLocationDialog}>
        <DiaglogEditProject
          handleCloseLocationDialog={handleCloseLocationDialog}
          setLocationDetail={setLocationDetail}
          locationDetail={locationDetail}
        ></DiaglogEditProject>
      </Dialog>
    </div>
  );
};

export default EditProejectDetailsPage;
