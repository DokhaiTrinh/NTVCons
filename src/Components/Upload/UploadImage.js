import React from 'react';
import { Button } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const UploadImage = (props) => {
  const {onChange} = props;
  const valideSchema = yup.object({}).required();
  const { register } = useForm({
    resolver: yupResolver(valideSchema),
  });
  // const handleChangeFile = (e) => {
  //   props.setFilesImage(e.target.files);

  //   console.log("sfas");
  //   if (e.target.files) {
  //     const fileArray = Array.from(e.target.files).map((file) =>
  //       URL.createObjectURL(file)
  //     );
  //     props.setSelectedImage((prevImages) => prevImages.concat(fileArray));
  //     Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
  //     console.log(props.selectedImages)
  //   }
  // };
  return (
    <Button aria-label="upload picture" component="label" variant="contained" sx={{width: "150px", height: "150px"}}>
      <input
        {...register('files')}
        type="file"
        id="files"
        multiple
        hidden
        accept="image/*"
        onChange={onChange}
      />
      <PhotoCamera fontSize="large" />
    </Button>
  );
}

export default UploadImage;
