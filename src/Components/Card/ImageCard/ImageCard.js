import React from 'react'
import { Card, CardActions, CardMedia, IconButton, Paper } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
export const ImageCard = (image) => {
    return (
        <Paper elevation={8}>
            <Card className='card'>
                <CardMedia
                    component="img"
                    src={image}
                    className='img'
                />
                <CardActions className='cardActions'>
                    <IconButton>
                        <ZoomInIcon />

                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />

                    </IconButton>
                </CardActions>

            </Card>
        </Paper>
    )
}

export default ImageCard