import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { getProjectByIdApi } from '../../apis/Project/updateProject';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import { useParams } from 'react-router-dom';
import TextFieldComponent from '../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import swal from 'sweetalert2-react';
import moment from 'moment';
import { updateProjectApi } from '../../apis/Project/updateProject';

const status = [
  { label: 'Hoàn thành' },
  { label: 'Đang thực hiện' },
  { label: 'Tạm dừng' },
  { label: 'Đã hủy' },
];
const EditProjectDetailsPage = (props) => {
  const [actualStart, setActualStart] = React.useState();
  const [actualEnd, setActualEnd] = React.useState();
  const [expectedStart, setExpectedStart] = React.useState();
  const [expectedEnd, setExpectedEnd] = React.useState();
  const today = moment().format('YYYY-MM-DD HH:mm');
  const { id } = useParams();
  console.log(id);
  const [allProjectDetails, setAllProjectDetails] = React.useState([]);
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
      } catch (error) {
        console.log('Không thể lấy danh sách dự án');
      }
    })();
  }, []);
  console.log(allProjectDetails);
  const valideSchema = yup
    .object({
      addressNumber: yup.number(),
      area: yup.string().min(5, 'Tên khu vực phải lớn hơn 5'),
      blueprintEstimateCost: yup
        .number()
        .min(1, 'Giá tiền phải lớn hơn 0')
        .typeError('Giá tiền phải là số tính theo VNĐ'),
      city: yup
        .string()
        .min(5, 'Tên thành phố phải lớn hơn 5')
        .max(50, 'Tên thành phố không được quá 50'),
      coordinate: yup
        .string()
        .min(5, 'Tên điều phối phải lớn hơn 5')
        .max(50, 'Tên thành phố không được quá 50'),
      country: yup
        .string()
        .min(5, 'Tên quốc gia phải lớn hơn 5')
        .max(50, 'Tên thành phố không được quá 50'),
      designerName: yup
        .string()
        .min(5, 'Người thiết kế phải có tên lớn hon 5')
        .required('Phải nhập tên người thiết kế'),
      district: yup
        .string()
        .min(5, 'Tên quận phải lớn hon 5')
        .max(50, ' Tên quận không được lớn hơn 50'),
      projectActualCost: yup
        .number()
        .min(1, 'Số lượng phải lớn hơn 0')
        .typeError('Giá tiền phải là số tính theo VNĐ'),
      projectBlueprintName: yup
        .string()
        .min(5, 'Tên bản vẽ phải lớn hơn 5')
        .required('Phải nhập bản vẽ'),
      projectEstimateCost: yup
        .number()
        .min(1, 'Số lượng phải lớn hơn 0')
        .typeError('Giá tiền phải là số tính theo VNĐ'),
      projectName: yup
        .string()
        .min(5, 'Tên dự án phải lớn hơn 5')
        .max(50, 'Tên dự án không được lớn hơn 50')
        .required(),
      province: yup.string(),
      street: yup.string(),
      ward: yup.string(),
      actualStartDate: yup.date(moment),
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
    const actualStartDate =
      moment(valueActualStartDate).format('YYYY-MM-DD HH:mm');
    const actualEndDate = moment(valueActualEndDate).format('YYYY-MM-DD HH:mm');
    const planStartDate = moment(valuePlanStartDate).format('YYYY-MM-DD HH:mm');
    const planEndDate = moment(valuePlanEndDate).format('YYYY-MM-DD HH:mm');
    swal
      .fire({
        title: 'Cập nhật dự án ?',
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
          handleUpdateProject(
            actualEndDate,
            actualStartDate,
            data.addressNumber,
            data.area,
            data.blueprintEstimateCost,
            data.city,
            data.coordinate,
            data.country,
            data.designerName,
            data.district,
            planEndDate,
            planStartDate,
            data.projectActualCost,
            data.projectBlueprintName,
            data.projectEstimateCost,
            data.projectName,
            data.province,
            data.street,
            data.ward
          );
        }
      });
  };
  const handleUpdateProject = async (
    actualCost,
    actualEndDate,
    actualStartDate,
    addressNumber,
    area,
    blueprintEstimateCost,
    blueprintId,
    blueprintName,
    city,
    coordinate,
    country,
    designerName,
    district,
    locationId,
    planEndDate,
    plantStartDate,
    projectEstimateCost,
    projectId,
    projectName,
    province,
    street,
    userId,
    ward
  ) => {
    try {
      await updateProjectApi({
        actualCost,
        actualEndDate,
        actualStartDate,
        addressNumber,
        area,
        blueprintEstimateCost,
        blueprintId,
        blueprintName,
        city,
        coordinate,
        country,
        designerName,
        district,
        locationId,
        planEndDate,
        plantStartDate,
        projectEstimateCost,
        projectId,
        projectName,
        province,
        street,
        userId,
        ward,
      });
      await swal.fire({
        icon: 'success',
        text: 'Cập nhật thành công',
        target: document.getElementById('form-modal'),
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      swal.fire({
        icon: 'error',
        text: 'Cập nhật thất bại',
        target: document.getElementById('form-modal'),
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px' }}
      >
        CHỈNH SỬA DỰ ÁN
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
                      name="projectId"
                      variant="outlined"
                      autoComplete="projectId"
                      autoFocus
                      defaultValue={allProjectDetails[0].projectId}
                      error={errors.projectId != null}
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
                      Tên bản vẽ
                    </Typography>
                    <TextField
                      {...register('projectBlueprintName')}
                      name="projectBlueprintName"
                      variant="outlined"
                      autoComplete="projectBlueprintName"
                      autoFocus
                      defaultValue={allProjectDetails[0].projectBlueprintName}
                      error={errors.projectBlueprintName != null}
                      helperText={errors.projectBlueprintName?.message}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">
                      Giá bản vẽ
                    </Typography>
                    <TextField
                      {...register('projectBlueprintCost')}
                      name="projectBlueprintCost"
                      variant="outlined"
                      autoComplete="projectBlueprintCost"
                      autoFocus
                      defaultValue={allProjectDetails[0].projectBlueprintCost}
                      error={errors.projectBlueprintCost != null}
                      helperText={errors.projectBlueprintCost?.message}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">
                      Người thiết kế
                    </Typography>
                    <TextField
                      {...register('designerName')}
                      name="designerName"
                      variant="outlined"
                      autoComplete="designerName"
                      autoFocus
                      defaultValue={allProjectDetails[0].designerName}
                      error={errors.designerName != null}
                      helperText={errors.designerName?.message}
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
                          value={valueActualStartDate}
                          onChange={(newValue) => {
                            setValueActualStartDate(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Kết thúc dự kiến</Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          value={valueActualEndDate}
                          onChange={(newValue) => {
                            setValueActualEndDate(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="#DD8501">
                        Thời gian thực tế
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Bắt đầu chính thức
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          value={valuePlanStartDate}
                          onChange={(newValue) => {
                            setValuePlanStartDate(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Kết thúc chính thức
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          value={valuePlanEndDate}
                          onChange={(newValue) => {
                            setValuePlanEndDate(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">
                      Kỹ sư phụ trách
                    </Typography>
                    <TextField
                      {...register('designerName')}
                      name="userId"
                      variant="outlined"
                      autoComplete="userId"
                      autoFocus
                      defaultValue={allProjectDetails[0].userId}
                      error={errors.userId != null}
                      helperText={errors.userId?.message}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">
                      Thành phố
                    </Typography>
                    <TextField
                      {...register('designerName')}
                      name="city"
                      variant="outlined"
                      autoComplete="city"
                      autoFocus
                      defaultValue={allProjectDetails[0].city}
                      error={errors.city != null}
                      helperText={errors.city?.message}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">
                      Tên đường
                    </Typography>
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">
                      Số nhà
                    </Typography>
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">
                      Tỉnh
                    </Typography>
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">
                      Quốc gia
                    </Typography>
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">
                      Diện tích
                    </Typography>
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="#DD8501">
                      Giá dự kiến
                    </Typography>
                    <TextField
                      {...register('projectEstimateCost')}
                      name="projectEstimateCost"
                      variant="outlined"
                      autoComplete="projectEstimateCost"
                      autoFocus
                      defaultValue={allProjectDetails[0].projectEstimateCost}
                      error={errors.projectEstimateCost != null}
                      helperText={errors.projectEstimateCost?.message}
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
            ) : (
              'Không có dữ liệu để hiển thị'
            )
          ) : null}
        </Box>
      </Box>
    </div>
  );
};

export default EditProjectDetailsPage;
