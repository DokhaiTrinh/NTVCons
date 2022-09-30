import React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import AddIcon from '@mui/icons-material/Add';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ImageIcon from '@mui/icons-material/Image';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import RenderImage from '../../../Components/Render/RenderImage';
import { addFileToProject } from '../../../apis/ProjectManager/addFileToProject';
import { useStateValue } from '../../../common/StateProvider/StateProvider';

const actions = [
  { icon: <ImageIcon />, name: 'Hình ảnh: ', operation: 'image' },
  { icon: <FilePresentIcon />, name: 'Tệp: ', operation: 'file' },
];
export const FloatingAddButton = ({ projectId }) => {
  const inputRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [filesImage, setFilesImage] = React.useState([]);
  const [selectedImages, setSelectedImage] = React.useState([]);

  const [fileDocx, setFileDocx] = React.useState([]);
  const [{ loading }, dispatch] = useStateValue();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    console.log(e.target.files);

    if (e.target.files) {
      setFilesImage(e.target.files);
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImage((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
      setOpen(!open);
    }
  };

  const handleChangeDoc = (e) => {
    if (e.target.files) {
      setFileDocx(e.target.files);
    }
  };

  const handleCancel = () => {
    setFilesImage([]);
    setSelectedImage([]);
    setFileDocx([]);
  };

  const handleAccept = async () => {
    if (filesImage || fileDocx) {
      console.log(fileDocx);
      let files;
      if (filesImage && !fileDocx) {
        files = filesImage;
      } else if (filesImage && fileDocx) {
        files = [...filesImage, ...fileDocx];
      } else {
        console.log('C');
        files = fileDocx;
      }
      await addFileToProject(projectId, files);
      await handleCancel();
      await window.location.reload();
    }
  };

  function UploadSpeedDialAction(props) {
    const { action } = props;
    return (
      <React.Fragment>
        <input
          style={{ display: 'none' }}
          id="icon-button-file"
          type="file"
          multiple
          ref={inputRef}
          onChange={handleChange}
        />
        <label htmlFor="icon-button-file">
          <SpeedDialAction
            icon={action.icon}
            tooltipTitle="Upload"
            component="span"
            {...props}
            onChange={handleChange}
          />
        </label>
      </React.Fragment>
    );
  }
  return (
    <div>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        Những tệp thêm vào:
        <div className="label-holder">
          Hình ảnh: 
          {selectedImages ? (
            <div className="result">{RenderImage(selectedImages)}</div>
          ) : null}
        </div>
        <div>
          Tài liệu: 
          {fileDocx
            ? fileDocx.length > 0
              ? Array.from(fileDocx).map((file) => (
                  <div>
                    <InsertDriveFileIcon /> {file.name}
                  </div>
                ))
              : null
            : null}
        </div>
        {fileDocx.length > 0 || filesImage.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
            <Button
              variant="contained"
              sx={{
                color: 'white !important',
                backgroundColor: '#36912C !important',
              }}
              onClick={handleAccept}
            >
              Xác nhận
            </Button>
            <Button
              variant="contained"
              sx={{
                color: 'white !important',
                backgroundColor: '#912C2C !important',
              }}
              onClick={handleCancel}
            >
              Hủy
            </Button>
          </div>
        ) : null}
      </div>
      <Box sx={{ marginBottom: '20px' }}>
        {open === true ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              position: 'fixed',
              bottom: 70,
              right: 55,
            }}
          >
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                multiple
                accept="image/*"
                type="file"
                onChange={handleChange}
              />
              <ImageIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden multiple type="file" onChange={handleChangeDoc} />
              <FilePresentIcon />
            </IconButton>
          </Box>
        ) : null}
        <IconButton
          variant="contained"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 50,
            width: '50px',
            height: '50px',
            bgcolor: '#D08617FB',
            '&:hover': {
              backgroundColor: '#B17317FB',
            },
          }}
          onClick={handleOpen}
        >
          <AddIcon sx={{ color: 'white !important' }} />
        </IconButton>
      </Box>
    </div>
  );
};

export default FloatingAddButton;
