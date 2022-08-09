import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Badge from '@mui/material/Badge';
import CancelIcon from '@mui/icons-material/Cancel';
import { getBlueprintByProjectIdApi } from '../../../apis/Blueprint/getBlueprintByProjectId';
const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

export const Blueprint = (props) => {
  const { id } = useParams();
  const [blueprintDetail, setBlueprintDetail] = React.useState({});
  const [filesImage, setFilesImage] = React.useState([]);
  const [imageGet, setImageGet] = React.useState([]);
  const [selectedImages, setSelectedImage] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listAllBlueprint = await getBlueprintByProjectIdApi(
          id,
          'BY_PROJECT_ID'
        );
        console.log(listAllBlueprint);
        setBlueprintDetail(listAllBlueprint.data);
        if (listAllBlueprint.data.file) {
          let arrayLinkImg = [];
          arrayLinkImg.push(listAllBlueprint.data.file.fileLink);
          setImageGet(arrayLinkImg);
        }
      } catch (error) {
        console.log('Không thể lấy dữ liệu của bản vẽ!');
      }
    })();
  }, []);
  console.log(imageGet);
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
    if (src) {
      return src.map((photo, index) => {
        return (
          <Badge
            // badgeContent={<CancelIcon />}
            onClick={() => handleDeleteImage(photo, index)}
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
    }
  };
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Paper
          sx={{ width: '100%', mp: 2, borderRadius: '30px', padding: '20px' }}
          variant="elevation"
        >
          <Grid container spacing={0} alignItems="center" justify="center">
            <Grid item xs={11}>
              <Typography variant="h6" sx={{ marginBottom: '20px' }}>
                Thông tin bản vẽ
              </Typography>
            </Grid>
            {userInfor.authorID !== '54' ? null : (
              <Grid item container xs={1}>
                <Grid item xs={12}>
                  <Box
                    sx={{ width: '100%' }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton
                      aria-label="edit report"
                      component={Link}
                      to={`/editBlueprint/${id}`}
                      sx={{ height: '100%' }}
                    >
                      <Box sx={{ height: '30px' }}>
                        <EditOutlinedIcon fontSize="large" />
                      </Box>
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={12} justify="start">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="button">Chỉnh sửa bản vẽ</Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Divider sx={{ marginBottom: '20px' }}></Divider>
          <Grid container rowSpacing={{ xs: 5 }}>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Tên bản vẽ
              </Typography>
              <Typography variant="body1">
                {blueprintDetail.blueprintName}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Người thiết kế
              </Typography>
              <Typography variant="body1">
                {blueprintDetail.designerName}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Giá bản vẽ
              </Typography>
              <Typography variant="body1">
                {blueprintDetail.estimatedCost}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography>Bản vẽ</Typography>
              {/* <input
                type="file"
                id="files"
                multiple
                onChange={handleChangeFile}
              /> */}
              <div className="label-holder">
                <label htmlFor="file" className="img-upload"></label>
              </div>

              {/* <div className="result">{renderPhotos(selectedImages)}</div> */}
              <div className="result">{renderPhotos(imageGet)}</div>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default Blueprint;
