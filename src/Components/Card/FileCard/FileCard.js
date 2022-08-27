import React from 'react'
import {Card, CardActions, CardMedia, IconButton, CardContent, Typography} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import docIcon from '../../../assets/images/Docs-icon.png';
import { useHistory } from 'react-router';
import './style.css';

export const FileCard = (file) => {
    const history = useHistory();
    return (
        <Card>
            <CardMedia
                component="img"
                src={docIcon}
            />
            <CardContent>
                <Typography variant='h6' style={{fontWeight: 'bold'}}>{file.name}</Typography>
            </CardContent>
            <CardActions>
                <IconButton onClick={() => history.push(file.link)}>
                    <DownloadIcon/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default FileCard