import React from 'react'
import {Card, CardActions, CardMedia, IconButton} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
export const ImageCard = (image) => {
    return (
        <Card>
            <CardMedia
                component="img"
                src={image}
            />
            <CardActions>
                <IconButton>
                    <DownloadIcon/>
                </IconButton>
                <IconButton>
                    <ZoomInIcon/>

                </IconButton>
            </CardActions>
            
        </Card>
    )
}

export default ImageCard