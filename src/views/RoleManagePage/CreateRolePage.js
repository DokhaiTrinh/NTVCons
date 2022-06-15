import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import swal from 'sweetalert2-react';
import { createRoleApi } from '../../apis/Role/CreateRole';
import TextFieldComponent from '../../Components/TextField/textfield';
const CreateRolePage = (props) => {
  //   const [date, setDate] = React.useState(new Date());
  //   const idN = parseInt(id);
  const [editorState, setEditorState] = React.useState('');
  const [loading, setLoading] = useState(false);

  const validateSchema = yup
    .object({
      roleName: yup
        .string()
        .min(5, 'Tên vai trò phải lớn hơn hoặc bằng 6 kí tự')
        .required('Tên vai trò không được để trống'),
      roleDesc: yup.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });

  const submitForm = (data) => {
    handleCreateRole(data.roleName, data.roleDesc);
  };
  const handleCreateRole = async (roleName, roleDesc) => {
    try {
      setLoading(true);
      await createRoleApi({ roleName, roleDesc });
      setLoading(false);
      await swal.fire({
        icon: 'success',
        text: 'Tạo vai trò thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      window.location.replace('/createRole');
    } catch (error) {
      swal.fire({
        icon: 'error',
        text: error.response.data,
        timer: 2000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
  };
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        TẠO MỚI VAI TRÒ
      </Typography>
      <Divider></Divider>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ paddingLeft: '10px', paddingTop: '10px', width: '40%' }}>
          <Typography variant="body1" color="#DD8501" fontWeight="bold">
            Thông tin vai trò
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>

          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Tên vai trò
                </Typography>
                <TextFieldComponent
                  resgister={register}
                  name="roleName"
                  label="RoleName"
                  errors={error.roleName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Chi tiết vai trò</Typography>
                <TextFieldComponent
                  register={register}
                  name="roleDesc"
                  label="roleDesc"
                  errors={error.roleDesc}
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
                    {loading ? (
                      <>
                        <CircularProgress color="secondary" size={24} /> &nbsp;
                        Đang xử lí...
                      </>
                    ) : (
                      'Lưu'
                    )}
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

export default CreateRolePage;
