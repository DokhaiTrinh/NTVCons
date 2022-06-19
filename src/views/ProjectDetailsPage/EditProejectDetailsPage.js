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
  const today = moment().format('YYYY-MM-DD HH:ms');
  const { id } = useParams();
  console.log(id);
  const [allProjectDetails, setAllProjectDetails] = React.useState([]);
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Mã dự án
              </Typography>
              <TextField
                id="project-name"
                value="1"
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Tên dự án
              </Typography>
              <TextField
                id="project-name"
                value="Xây dựng tòa nhà văn phòng ABC"
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Người quản trị
              </Typography>
              <TextField
                id="project-name"
                value="Đỗ Nam Trung"
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Tiến độ
              </Typography>
              <TextField
                id="project-name"
                value="10%"
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="#DD8501">
                Trạng thái
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={status}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} value="Đang thực hiện" />
                )}
              />
            </Grid>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Thời gian dự kiến
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Bắt đầu</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    value={expectedStart}
                    onChange={(newValue) => {
                      setExpectedStart(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Kết thúc</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                  
                    value={expectedEnd}
                    onChange={(newValue) => {
                      setExpectedEnd(newValue);
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
                <Typography variant="body2">Bắt đầu</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    selected={actualStart}
                    value={actualStart}
                    onChange={(newValue) => {
                      setActualStart(newValue);
                    }}
                   
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Kết thúc</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    disableFuture
                    value={actualEnd}
                    onChange={(newValue) => {
                      setActualEnd(newValue);
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
                Người tham gia
              </Typography>
              <TextField
                id="outlined-multiline-static"
                value="Nguyễn Văn A, Trần Thị B, Vũ Văn C, Huỳnh Thị N, Đỗ Văn T"
                multiline
                rows={4}
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
        </Box>
      </Box>
    </div>
  );
};

export default EditProjectDetailsPage;
