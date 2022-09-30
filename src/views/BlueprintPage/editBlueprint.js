import React, { useState, useEffect } from 'react';
import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { yupResolver } from '@hookform/resolvers/yup';
import { createBlueprintApi } from '../../apis/Blueprint/createBlueprint';
import * as yup from 'yup';
import TextFieldComponent from '../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { updateBlueprintApi } from '../../apis/Blueprint/updateBlueprint';
import { getBlueprintByProjectIdApi } from '../../apis/Blueprint/getBlueprintByProjectId';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Badge from '@mui/material/Badge';
import CancelIcon from '@mui/icons-material/Cancel';
import Select from '@mui/material/Select';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import RenderImage from '../../Components/Render/RenderImage';
import { useParams } from 'react-router-dom';

const EditBlueprint = (props) => {
  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = useState(false);
  const [filesImage, setFilesImage] = useState([]);
  const [imageGet, setImageGet] = React.useState([]);
  const [selectedImages, setSelectedImage] = useState([]);
  const [blueprint, setBlueprint] = React.useState();
  const [blueprintId, setBlueprintId] = React.useState();
  React.useEffect(() => {
    (async () => {
      try {
        const listBlueprintById = await getBlueprintByProjectIdApi(
          id,
          'BY_PROJECT_ID'
        );
        setBlueprint(listBlueprintById.data);
        setBlueprintId(listBlueprintById.data.blueprintId);
        if (listBlueprintById.data.file) {
          let arrayLinkImg = [];
          arrayLinkImg.push(listBlueprintById.data.file.fileLink);
          setImageGet(arrayLinkImg);
        }
      } catch (error) {
        console.log('Không thể lấy danh sách');
      }
    })();
  }, []);
  console.log(imageGet);
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
    handleUpdateBlueprint(
      blueprintId,
      id,
      data.designerName,
      data.blueprintName,
      data.estimatedCost,
      filesImage
    );
  };
  const handleUpdateBlueprint = async (
    blueprintId,
    projectId,
    desginerName,
    blueprintName,
    estimatedCost,
    file
  ) => {
    try {
      setLoading(true);
      await updateBlueprintApi({
        blueprintId,
        projectId,
        desginerName,
        blueprintName,
        estimatedCost,
        file,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Cập nhật bản vẽ thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      await window.location.replace(`/projectDetails/${id}`);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Cập nhật bản vẽ không thành công',
        timer: 2000,
        showConfirmButton: false,
      });
      //   setLoading(false);
    }
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
  const renderPhotos1 = (src) => {
    return src.map((photo, index) => {
      return (
        <Badge
        // badgeContent={<CancelIcon />}
        // onClick={() => handleDeleteImage(photo, index)}
        >
          <img
            style={{
              width: '100%',
              height: '100%',
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
      <Divider></Divider>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {blueprint ? (
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
                  <div className="result">{renderPhotos1(imageGet)}</div>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Tên bản vẽ</Typography>
                  <TextFieldComponent
                    register={register}
                    name="blueprintName"
                    // label="Tên vai trò"
                    defaultValue={blueprint.blueprintName}
                    errors={errors.blueprintName}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Người thiết kế</Typography>
                  <TextFieldComponent
                    register={register}
                    name="designerName"
                    // label="Tên vai trò"
                    errors={errors.designerName}
                    defaultValue={blueprint.designerName}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2">Giá bản vẽ</Typography>
                  <TextFieldComponent
                    register={register}
                    name="estimatedCost"
                    // label="Tên vai trò"
                    defaultValue={blueprint.estimatedCost}
                    errors={errors.estimatedCost}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Hình ảnh cập nhật</Typography>
                  <input
                    {...register('files')}
                    type="file"
                    id="files"
                    // multiple
                    accept="image/*"
                    onChange={handleChangeFile}
                  />
                  <div className="label-holder">
                    <label htmlFor="file" className="img-upload"></label>
                  </div>
                  <div className="result">{renderPhotos(selectedImages)}</div>
                </Grid>

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
                      width: '400px',
                      alignSelf: 'center',
                    }}
                  >
                    Cập nhật
                  </Button>
                </Box>
              </Grid>
            </form>
          </Box>
        ) : (
          <div>Không có dữ liệu của yêu cầu!!</div>
        )}
      </Box>
    </div>
  );
};

export default EditBlueprint;
