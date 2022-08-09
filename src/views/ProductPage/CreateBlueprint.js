import React, { useState } from 'react';
import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import Swal from 'sweetalert2';
import { yupResolver } from '@hookform/resolvers/yup';
import { createBlueprintApi } from '../../apis/Blueprint/createBlueprint';
import * as yup from 'yup';
import TextFieldComponent from '../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { getAllProjectApi1 } from '../../apis/Project/getAllProject';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Badge from '@mui/material/Badge';
import CancelIcon from '@mui/icons-material/Cancel';
import Select from '@mui/material/Select';
import { useStateValue } from '../../common/StateProvider/StateProvider';
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
const CreateBlueprint = (props) => {
  const [blueprint, setBlueprint] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [allProject, setAllProject] = React.useState([]);
  const [projectSelected, setProjectSelected] = React.useState();
  const [filesImage, setFilesImage] = useState([]);
  const [selectedImages, setSelectedImage] = useState([]);
  //   const [{ loading }, dispatch] = useStateValue();
  React.useEffect(() => {
    (async () => {
      try {
        const listAllProject = await getAllProjectApi1(
          0,
          15,
          'createdAt',
          true
        );
        setAllProject(listAllProject.data);
      } catch (error) {
        console.log('Không thể lấy danh sách');
      }
    })();
  }, []);
  const validateSchema = yup
    .object({
      designerName: yup
        .string()
        .min(5, 'Tên người thiết kế')
        .required('Phải có tên người thiết kế!'),
      blueprintName: yup.string().required('Phải có tên bản vẽ'),
      estimatedCost: yup.number().required('Phải có giá tiền'),
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
    console.log(filesImage);
    handleCreateBlueprint(
      projectSelected,
      data.designerName,
      data.blueprintName,
      data.estimatedCost,
      filesImage
    );
  };
  const handleCreateBlueprint = async (
    projectId,
    desginerName,
    blueprintName,
    estimatedCost,
    file
  ) => {
    try {
      setLoading(true);
      await createBlueprintApi({
        projectId,
        desginerName,
        blueprintName,
        estimatedCost,
        file,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Tạo bản vẽ thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      window.location.replace('/product');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Tạo bản vẽ không thành công',
        timer: 2000,
        showConfirmButton: false,
      });
      //   setLoading(false);
    }
  };
  const handleChange = (event) => {
    setProjectSelected(event.target.value);
  };
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
  const renderPhotos = (src) => {
    return src.map((photo, index) => {
      return (
        <Badge
          badgeContent={<CancelIcon />}
          onClick={() => handleDeleteImage(photo, index)}
        >
          <img
            style={{
              width: '150px',
              height: '150px',
              // borderRadius: "50%",
              marginRight: '5px',
              marginBottom: '5px',
            }}
            src={photo}
            key={index}
          />
        </Badge>
      );
    });
  };
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        TẠO MỚI BẢN VẼ
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
            Thông tin bản vẽ
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <form onSubmit={handleSubmit(submitForm)}>
            <Box sx={{ width: '100%', height: '20px' }}></Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* <ImageList sx={{ width: '100%' }} cols={3} rowHeight={164}>
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
                </ImageList> */}
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Tên bản vẽ
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="blueprintName"
                  // label="Tên vai trò"
                  errors={errors.blueprintName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Người thiết kế
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="designerName"
                  // label="Tên vai trò"
                  errors={errors.designerName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#DD8501">
                  Tên dự án
                </Typography>
                <FormControl sx={{ width: '100%' }}>
                  <Select
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    value={projectSelected}
                  >
                    {allProject ? (
                      allProject.map((projectType, index) => (
                        <MenuItem value={projectType.projectId} key={index}>
                          {projectType.projectName}
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
                    Giá bản vẽ
                  </Typography>
                  <TextFieldComponent
                    register={register}
                    name="estimatedCost"
                    // label="Tên vai trò"
                    errors={errors.estimatedCost}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>
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

                <div className="result">{renderPhotos(selectedImages)}</div>
                {/* <input type="file" multiple {...register("file")} /> */}
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
export default CreateBlueprint;
