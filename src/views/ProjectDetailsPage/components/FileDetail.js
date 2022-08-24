import React, { Component } from 'react';
import RenderImage from '../../../Components/Render/RenderImage';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
const FileDetail = (props) => {
  const { imageGet, docGet } = props;
  console.log(imageGet);
  console.log(docGet);
  return (
    <div>
      <Grid container item xs="12">
        <Grid item xs="4">
          <Typography variant="body1" color="gray">
            Hình ảnh
          </Typography>
          <Box sx={{ width: '200px', height: '300px' }}>
            <div className="label-holder" style={{ height: '200px' }}>
              <label htmlFor="file" className="img-upload"></label>
              <div className="result">{RenderImage(imageGet)}</div>
            </div>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs="4">
        <Typography variant="body1" color="gray">
          Tài liệu
        </Typography>
        {docGet.length > 0 ? (
          docGet.map((item, index) => (
            <>
              <a href={item}>Tải xuống</a>
            </>
          ))
        ) : (
          // <div>Không có tệp đi kèm!!</div>
          <></>
        )}
      </Grid>
    </div>
  );
};

export default FileDetail;
