import { Divider, Typography, Box, TextField, Grid, Button } from '@mui/material';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';
import {Link} from 'react-router-dom';
// import * as image from '../../assets/images'
import image1 from '../../assets/images/nha-cap-4.jpeg';


const itemData = [
    {
      img: image1,
      title: 'Nhà cấp 4',
    },

  ];
const EditProductPage = (props) => {
    return <div>

        <Typography variant="h6" color="#DD8501" sx={{ marginTop: "20px", marginBottom: "20px", marginLeft: "30px" }}>
            CHỈNH SỬA SẢN PHẨM
        </Typography>
        <Divider></Divider>
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box sx={{ paddingLeft: "10px", paddingTop: "10px", width: "40%", marginBottom: "30px" }}>
                <Typography variant="body1" color="#DD8501" fontWeight="bold">Thông tin sản phẩm</Typography>
                <Divider sx={{ bgcolor: "#DD8501" }}></Divider>
                <Box sx={{ width: "100%", height: "20px" }}></Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ImageList sx={{ width: "100%"}} cols={3} rowHeight={164}>
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
                        <Box sx={{width: 164, height: 164}} display="flex" justifyContent="center" alignItems="center">
                        <IconButton aria-label="add" sx={{ alignSelf: "center", backgroundColor: "#DD8501" }} component={Link} to={('/createProject')}>
              <Add sx={{ color: "white" }}></Add>
            </IconButton>
                            </Box>            
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Kiểu dáng</Typography>
                        <TextField id="project-name" value="Nhà cấp 4" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="#DD8501">Đơn giá trọn gói</Typography>
                        <TextField id="project-name" value="7.500.000 vnđ/m2" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex"
                        }}>
                            <Button variant="contained"
                                style={{
                                    backgroundColor: "#DD8501", borderRadius: 50, width: "200px",
                                    alignSelf: "center"
                                }}>Lưu</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </div>;
};

export default EditProductPage;