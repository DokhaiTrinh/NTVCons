import {
  Divider,
  Typography,
  Box,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
export const DialogWorkerList = (props) => {
  const { allWorker, workerListDetail, setWorkerListDetail } = props;

  const [checked, setChecked] = React.useState(workerListDetail);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleSaveListWorker = () => {
    setWorkerListDetail(checked);
    props.handleCloseWorkerDialog();
  };
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        DANH SÁCH KỸ SƯ
      </Typography>
      <Divider></Divider>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            paddingLeft: '10px',
            paddingTop: '10px',
            width: '40%',
            marginBottom: '30px',
          }}
        >
          <Typography variant="body1" color="#DD8501" fontWeight="bold">
            Thông tin công nhân
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>

          <Grid container spacing={2}>
            <List
              dense
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
              }}
            ></List>
            {allWorker ? (
              allWorker.length > 0 ? (
                allWorker.map((worker) =>
                  worker.isAvailable ? (
                    <ListItem
                      key={worker.workerId}
                      secondaryAction={
                        workerListDetail.length > 0 ? (
                          <Checkbox
                            onChange={handleToggle(worker.workerId)}
                            checked={checked.indexOf(worker.workerId) !== -1}
                          />
                        ) : (
                          <Checkbox
                            onChange={handleToggle(worker.workerId)}
                            checked={checked.indexOf(worker.workerId) !== -1}
                          />
                        )
                      }
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemAvatar>
                          {/* <Avatar
              alt={`Avatar n°${value + 1}`}
              src={`/static/images/avatar/${value + 1}.jpg`}
            /> */}
                        </ListItemAvatar>
                        <ListItemText primary={`${worker.fullName}`} />
                      </ListItemButton>
                    </ListItem>
                  ) : null
                )
              ) : (
                <p>Không có dữ liệu!!</p>
              )
            ) : (
              <div>Loading...</div>
            )}
            <Grid item xs={12}>
              <Box
                sx={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: '#DD8501',
                    borderRadius: 50,
                    width: '200px',
                    alignSelf: 'center',
                  }}
                  onClick={handleSaveListWorker}
                >
                  Lưu
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default DialogWorkerList;
