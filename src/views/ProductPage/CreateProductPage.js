import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import TextFieldComponent from '../../Components/TextField/textfield';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { yupResolver } from '@hookform/resolvers/yup';
import { createPostApi } from '../../apis/Post/createPost';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getAllCategoryApi1 } from './../../apis/CategoryPost/getAllCategory';
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

const itemData = [];
const CreateProductPage = (props) => {
  const [allCategory, setAllCategory] = React.useState([]);
  const [categorySelected, setCategorySelected] = React.useState();
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      try {
        const listAllCategory = await getAllCategoryApi1(
          0,
          15,
          'createdAt',
          true
        );
        setAllCategory(listAllCategory.data);
      } catch (error) {
        console.log('Không thể lấy danh sách');
      }
    })();
  }, []);
  console.log(allCategory);
  const validateSchema = yup
    .object({
      address: yup
        .string()
        .min(5, 'Địa chỉ phải lớn hoặc hoặc bằng 6 kí tự')
        .required('Địa chỉ không được để trống'),
      authorName: yup
        .string()
        .min(5, 'Tên tác giả phải lớn hoặc hoặc bằng 6 kí tự')
        .required('Tên tác giả không được để trống'),
      ownerName: yup
        .string()
        .min(5, 'Tên chủ đầu tư phải lớn hoặc hoặc bằng 6 kí tự')
        .required('Tên chủ đầu tư không được để trống'),
      postTitle: yup
        .string()
        .min(5, 'Tên bài đăng phải lớn hoặc hoặc bằng 6 kí tự')
        .required('Tên bài đăng tư không được để trống')
        .typeError('Tên bài đăng đã trùng!!'),
      scale: yup
        .string()
        .min(5, 'Tên quy mô phải lớn hoặc hoặc bằng 6 kí tự')
        .required('Tên quy mô không được để trống'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });

  const submitForm = (data) => {
    handleCreatePost(
      data.address,
      data.authorName,
      data.ownerName,
      categorySelected,
      data.postTitle,
      data.scale
    );
  };
  const handleCreatePost = async (
    address,
    authorName,
    ownerName,
    postCategoryId,
    postTitle,
    scale
  ) => {
    try {
      setLoading(true);
      await createPostApi({
        address,
        authorName,
        ownerName,
        postCategoryId,
        postTitle,
        scale,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Tạo bài đăng thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      window.location.replace('/product');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error.response.data,
        timer: 2000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
  };
  const handleChange = (event) => {
    setCategorySelected(event.target.value);
  };

  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        TẠO MỚI DỊCH VỤ
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
            Thông tin dịch vụ
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <form onSubmit={handleSubmit(submitForm)}>
            <Box sx={{ width: '100%', height: '20px' }}></Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Hình ảnh
                </Typography>
                <ImageList sx={{ width: '100%' }} cols={3} rowHeight={164}>
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{ width: 164, height: 164 }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <IconButton
                    aria-label="add"
                    sx={{ alignSelf: 'center', backgroundColor: '#DD8501' }}
                    component={Link}
                    to={'/createProject'}
                  >
                    <Add sx={{ color: 'white' }}></Add>
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Tên dự án
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="postTitle"
                  // label="Tên vai trò"
                  errors={errors.postTitle}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Chủ đầu tư
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="ownerName"
                  // label="Tên vai trò"
                  errors={errors.ownerName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Vị trí
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="address"
                  // label="Tên vai trò"
                  errors={errors.address}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Quy mô
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="scale"
                  // label="Tên vai trò"
                  errors={errors.scale}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Thể loại
                </Typography>
                <FormControl sx={{ width: '100%' }}>
                  <Select
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    value={categorySelected}
                  >
                    {allCategory.length > 0 ? (
                      allCategory.map((cateType, index) => (
                        <MenuItem value={cateType.postCategoryId} key={index}>
                          {cateType.postCategoryName}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>
                        Không có dữ liệu của danh sách công việc!
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
                <Grid item xs={12}>
                  <Typography variant="body2" color="#DD8501">
                    Tác giả
                  </Typography>
                  <TextFieldComponent
                    register={register}
                    name="authorName"
                    // label="Tên vai trò"
                    errors={errors.authorName}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
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

export default CreateProductPage;
