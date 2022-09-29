import React from 'react';
import {
  Card,
  CardActions,
  CardMedia,
  IconButton,
  Paper,
  AppBar,
  Dialog,
  Toolbar,
  Typography,
  Button,
  Slide,
} from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CloseIcon from '@mui/icons-material/Close';
const options = ['Xóa'];
const ITEM_HEIGHT = 48;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const ImageCard = (image) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [zoom, setZoom] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDialogOpen = () => {
    setZoom(true);
  };
  const handleDialogClose = () => {
    setZoom(false);
    console.log(zoom);
  };

  return (
    <Paper elevation={5}>
      <Card className="card">
        <CardMedia component="img" src={image} className="img" />
        <CardActions className="cardActions">
          <IconButton onClick={handleDialogOpen}>
            <ZoomInIcon />
          </IconButton>
          <Dialog
            open={zoom}
            onClose={handleDialogClose}
            TransitionComponent={Transition}
            PaperProps={{
              sx: {
                width: '100%',
                maxWidth: '1300px!important',
              },
            }}
          >
            <img src={image} />
          </Dialog>
          {window.location.pathname.includes('projectDetails') ? (
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          ) : null}

          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default ImageCard;
