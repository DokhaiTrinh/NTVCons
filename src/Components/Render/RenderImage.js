import React, { useState } from 'react';
import { Box, Badge, Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { sr } from 'date-fns/locale';
import CancelIcon from '@mui/icons-material/Cancel';

export default function RenderImage(props) {
  const {src, setFilesImage} = props;
  const [isShown, setIsShown] = useState(false);
  const handleDeleteImage = (photo, indexImage) => {
    const index = src.indexOf(photo);
    if (index > -1) {
      src.splice(index, 1);
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
  if (src) {
    // return src.map((photo, index) => {
    return (
      <Box sx={{height: '180px', overflowX: 'scroll', overflowY: 'hidden', display: "flex", flexDirection: "row", alignItems: 'end'}}>

        {src.map((photo, index) => (
      <Badge
      badgeContent={<CancelIcon />}
      onClick={() => handleDeleteImage(photo, index)}
      >
        {/* <img
                style={{
                  width: '50%',
                  // height: '100%',
                  // borderRadius: "50%",
                  marginRight: '5px',
                  marginBottom: '5px',
                  borderRadius: '10px'
                }}
                onClick
                src={photo}
                key={index}
              /> */}
              <img
                src={photo}
                key={index}
                style={{ objectFit: 'fill', width: "150px", height: "150px" }}
                // onMouseOver={() => setIsShown(true)}
                // onMouseOut={() => setIsShown(false)}
              />
      </Badge>
          ))}
      </Box>
    );
    // });
  }
}
