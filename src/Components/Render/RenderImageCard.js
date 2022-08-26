import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ImageCard from '../Card/ImageCard';

export default function RenderImageCard(src) {
  if (src) {
    // return src.map((photo, index) => {
    return (
        <ImageList sx={{display: 'flex', justifyContent: 'start', padding: '5px'}}>
          {src.map((photo, index) => (
            <ImageListItem key={photo} sx={{margin: '20px'}}>
                {
                    ImageCard(photo)
                }
            </ImageListItem>
          ))}
        </ImageList>
    );
    // });
  }
}
