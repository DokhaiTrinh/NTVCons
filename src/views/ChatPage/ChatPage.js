import { Grid, Paper } from "@mui/material";
import React from "react";
import Attachment from "./components/Attachment";
import ChatArea from './components/ChatArea';
import MsgBox from "./components/MsgBox";
import './styles/ChatPage.styles.css';

const ChatPage = () => (
    <Paper className='bodynonetab' elevation='none'>
        <Grid container>
            <Grid item xs={3}>
                <MsgBox/>
            </Grid>
            <Grid item xs={6}>
                <ChatArea></ChatArea>
            </Grid>
            <Grid item xs={3}>
                <Attachment/>
            </Grid>
        </Grid>
    </Paper>
);

export default ChatPage;