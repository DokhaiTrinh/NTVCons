import React from 'react'
import {Card, CardActions, CardMedia, IconButton} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
export const FileCard = (file) => {
    const image = '';
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
            </CardActions>
        </Card>
    )
}

export default FileCard