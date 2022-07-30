import { Grid, Avatar, Typography } from '@mui/material'
import React, { Component } from 'react'
import '../styles/ChatPage.styles.css';

export class Conversation extends Component {
  render() {
    return (
      <div className="conversation">
          <Grid container>
              <Grid item xs={3}>
                <Avatar />
              </Grid>
              <Grid item xs={7}>
                <Typography>Millie Bobby Brown</Typography>
                <Typography>See u later.</Typography>
              </Grid>
              <Grid item xs={2}>
                  <Typography>02:11</Typography>
              </Grid>
          </Grid>
      </div>
    )
  }
}

export default Conversation