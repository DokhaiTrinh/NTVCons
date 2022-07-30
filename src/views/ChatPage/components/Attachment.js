import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { Component } from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import '../styles/ChatPage.styles.css';
export class Attachment extends Component {
  render() {
    return (
      <div className="right">
          <Grid container>
            <Grid item xs={3}>
                <Box sx={{height: "50px", width: "50px", borderRadius: "10px", bgcolor: "#DDE2F9", display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                    <InsertDriveFileIcon style={{color: '#5968DE'}}/>
                </Box>
            </Grid>
            <Grid item xs={7}>  
                <Typography>Tài Liệu</Typography>
                <Typography>126 tệp</Typography>
            </Grid>
            <Grid item xs={2}>
                <Box sx={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ArrowForwardIosIcon/>
                </Box>
            </Grid>
          </Grid>
          <Box height="30px"/>
          <Grid container>
            <Grid item xs={3}>
                <Box sx={{height: "50px", width: "50px", borderRadius: "10px", bgcolor: "#F4DAE0", display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                    <InsertPhotoIcon style={{color: '#C4B079'}}/>
                </Box>
            </Grid>
            <Grid item xs={7}>  
                <Typography>Ảnh</Typography>
                <Typography>126 ảnh</Typography>
            </Grid>
            <Grid item xs={2}>
                <Box sx={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ArrowForwardIosIcon/>
                </Box>
            </Grid>
          </Grid>
          <Box height="30px"/>
          <Grid container>
            <Grid item xs={3}>
                <Box sx={{height: "50px", width: "50px", borderRadius: "10px", bgcolor: "#E5F7FA", display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                    <VideoLibraryIcon style={{color: '#52B0B9'}}/>
                </Box>
            </Grid>
            <Grid item xs={7}>  
                <Typography>Video</Typography>
                <Typography>126 video</Typography>
            </Grid>
            <Grid item xs={2}>
                <Box sx={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ArrowForwardIosIcon/>
                </Box>
            </Grid>
          </Grid>
      </div>
    )
  }
}

export default Attachment