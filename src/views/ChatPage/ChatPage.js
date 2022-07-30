import { Grid, DialogContent } from "@mui/material";
import React from "react";
import ChatArea from './components/ChatArea';
import MsgBox from "./components/MsgBox";
import './styles/ChatPage.styles.css';

const ChatPage = () => (
    <div>
        <Grid container>
            <Grid item xs={3}>
                <MsgBox/>
            </Grid>
            <Grid item xs={6}>
                <ChatArea></ChatArea>
            </Grid>
            <Grid item xs={3}>

            </Grid>
        </Grid>
    </div>
);

export default ChatPage;