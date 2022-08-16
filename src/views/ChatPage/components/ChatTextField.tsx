import React from 'react';
import { TextField, Box, Grid, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import '../styles/ChatPage.styles.css';

const ChatTextField = () => {
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <div className="textField">
      <Grid container>
        <Grid item xs={11}>
          <TextField
            id="chat-field"
            placeholder="Aa"
            multiline
            fullWidth
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: {
                backgroundColor: 'white',
                borderRadius: '10px',
                height: '50px',
                paddingLeft: '30px',
              },
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <IconButton aria-label="send" sx={{ color: '#DD8501' }} edge="end">
              <SendIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChatTextField;
