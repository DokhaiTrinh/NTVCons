import './styles.css';
import * as React from 'react';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Paper,
  Checkbox,
  Autocomplete,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  AvatarGroup,
  Button,
  Conversation,
  ConversationHeader,
  StarButton,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
  ConversationList,
  InputToolbox,
  Loader,
  TypingIndicator,
  StatusList,
  Status,
  Sidebar,
  Search,
  MessageSeparator,
  action,
  ExpansionPanel,
} from '@chatscope/chat-ui-kit-react';
import { getUserConversations } from '../../apis/Message/getUserConversations';
import { getConversationsById } from '../../apis/Message/getConversationById';
import { sendMessageAuthenticated } from '../../apis/Message/sendMessageAuthenticated';
import { getAllUserApi1 } from './../../apis/User/getAllUser';

import axios from 'axios';
const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

const ChatPage = (props) => {
  const [allUser, setAllUser] = React.useState([]);
  const [managerListChoice, setManagerListChoice] = React.useState([]);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [searchTerm, setSearchTerm] = React.useState('');
  const [messageInputValue, setMessageInputValue] = React.useState('');
  const avatarIco =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEUOHCyclYufmI0AECZvbGkAACCjm5AIGCoxOUIAEycAFSgLGisNHCwEFykDFyljY2N9enUlLjkACCKWkIc+Q0lmZmWIhH0bJjN/e3YVIjGSjYRAREpbXF0tND54dXGEgHpKTVFTVVcfARIMAAADVklEQVR4nO3ciXaiMABA0ZA4lhBEcV+r/v9PTtA6FUVGLXOyzLtf4DtktVghAAAAAAAAAAAAAAAAAAAAAABAuIwej9XAuP4Y/4xR5XY+6U11pI1GL4ZrmSQyGaXZIHf9cTqXa7Gt+ipSfqZ64PoTdcuoYjj56js3jtJxRM/RqMUwueo7Ny6nqohjPtr1Zbi+6Ts1JqNpFsGak2eLxr5z4zItAp+PRtfn313jaT66/pTvM2p1N//uGvv7YOdjNf/ant/VWJ3qABsv+/szzmtOWHtHrldP950a7XwM6QxglJk9Mz7rjcvpOJCxWs2/v60vzY37qc78b7R9s1fGZ60xWW58PwMYu7+/Oj5vGr0+A9yer99qrM4AheuSZnZ/n8kf9p0a7RnAyzVHly+vnw8bq/no3faYbd5dX5obe749xNy8s0G0NW6166a6bNttYJJMxq6b6lSv68L+L9dNdRRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FL5Oxl4oR8p1U13XhXJdevb6ZbeFUo5K396E7rJQyvlBfLguutVdoUyWB+PfO9BdFUopZztV+NfXUaHs749KebbCXHTwFrScfKbGs5e7r5iy/7M8uR7ulNe/0Bt//uTHQNXq6evwvMjz+buJMumlYw9Xz1sfi7cS7ePbikB+XJntXk+Uk9FmpT0fnt+K3frFxzeZpdrLze+RbPdKX39+XKmPkPqsLJ0825d82tUlmOH5LZs+k2gf37DMwlhd7mSbJx7f/mBXl8CG5x+5PvzlcCP3UxXi8Pymju17xjys1bOJaj2Ey6O/h+tnGT1s+38taaArzLU8m7Ukpt59P/GGvO0+HEWhMC13qTgKRV48TIykUBgxepAYS6Ew+b45MZpCu2k0XxfjKRRm1ZgYUaEoyqbEmArtjbjhv4FEVdh46Y+rsCkxskKhN7eX/tgKhTrEXmgTZeSFuap/rxFf4e33GjEW1i/9MRbWL/1RFopc9/pxF15/rxFpoR2ol0t/rIX2Rvx16Y+20F4Xz5f+eAvtUzxdFyMuFKaw10Xp2zuHnRqU8/5chf53mVaDxSHqRyiqgRp5IAAAAAAAAAAAAAAAAAAAAAAA/4Hf0gU2cK/EibwAAAAASUVORK5CYII=';
  const [userConversation, setUserConversation] = React.useState([]);
  const [conversationById, setConversationById] = React.useState([]);
  const [conversationId, setConversationId] = React.useState();
  // const [ip, setIP] = React.useState('');
  const [msgInputValue, setMsgInputValue] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  // const [value, setValue] = React.useState('');
  // const getData = async () => {
  //   const res = await axios.get('https://geolocation-db.com/json/');
  //   setIP(res.data.IPv4);
  // };

  // React.useEffect(() => {
  //   //passing getData method to the lifecycle method
  //   getData();
  // }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const listAllConversation = await getUserConversations();
        setUserConversation(listAllConversation.data);
      } catch (error) {
        console.log('Không có dữ liệu của tin nhắn!!');
      }
      try {
        const listAllUser = await getAllUserApi1(0, 200, 'createdAt', false);
        setAllUser(listAllUser.data);
      } catch (error) {
        console.log('Không thể lấy danh sách người dùng');
      }
    })();
    if (conversationId) {
      (async () => {
        try {
          const listConversationById = await getConversationsById(
            conversationId,
            0,
            100,
            'messageId',
            true
          );
          setConversationById(listConversationById.data);
        } catch (error) {
          console.log('Không có dữ liệu của tin nhắn!!');
        }
      })();
    }
  }, [conversationId]);
  const handleGetConversationById = async (conversationId) => {
    try {
      const listConversationById = await getConversationsById(
        conversationId,
        0,
        20,
        'messageId',
        true
      );
      setConversationById(listConversationById.data);
      setConversationId(conversationId);
    } catch (error) {
      console.log('Không có dữ liệu của tin nhắn!!');
    }
  };
  const handleSend = (message) => {
    handleSendMessage(conversationId, message);
    setMsgInputValue('');
    // dispatchAction(
    //   getAllMessagesActions.getAllMessages(chatRoomId, page, perPage)
    // );
  };
  const handleSelectUser = (options) => {
    let getIdList = [];
    for (const option of options) {
      getIdList.push(option.userId);
    }
    setManagerListChoice(getIdList);
    console.log(managerListChoice);
  };
  const handleSendMessage = async (conversationId, message) => {
    try {
      await sendMessageAuthenticated(conversationId, message);
      await handleGetConversationById(conversationId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        height: '600px',
        position: 'relative',
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Autocomplete
            options={allUser}
            disableCloseOnSelect
            getOptionLabel={(option) => option.fullName}
            onChange={(e, option) => handleSelectUser(option)}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                {/* <Checkbox
                  // icon={icon}
                  // checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                /> */}
                {option.fullName}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Tìm kiếm.."
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
          <ConversationList>
            {userConversation.length > 0 ? (
              userConversation.map((userConver, index) => (
                <Conversation
                  name={userConver.name}
                  lastSenderName={userConver.name}
                  info={userConver.lastMessage}
                  onClick={() =>
                    handleGetConversationById(userConver.conversationId)
                  }
                >
                  <Avatar src={userConver.avatar} />
                </Conversation>
              ))
            ) : (
              <div>Không có dữ liệu!!</div>
            )}
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          {/* <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={avatarIco} name="Zoe" />
            <ConversationHeader.Content
              userName="Zoe"
              info="Active 10 mins ago"
            />
            <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader> */}
          <MessageList>
            <MessageSeparator content="Saturday, 30 November 2019" />
            {conversationById.length > 0 ? (
              conversationById.map((m) => (
                <Message
                  key={m.senderId}
                  model={{
                    message: m.message,
                    sentTime: '15 mins ago',
                    // sender: 'Zoe',
                    direction:
                      m.senderId === userInfor.id ? 'outgoing' : 'incoming',
                  }}
                ></Message>
              ))
            ) : (
              <div>Không có dữ liệu!!</div>
            )}
          </MessageList>
          <MessageInput
            placeholder="Nhập gì đó.."
            onSend={handleSend}
            onChange={setMsgInputValue}
            value={msgInputValue}
          />
        </ChatContainer>

        {/* <Sidebar position="right">
          <ExpansionPanel open title="INFO">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
          <ExpansionPanel title="LOCALIZATION">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
          <ExpansionPanel title="MEDIA">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
          <ExpansionPanel title="SURVEY">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
          <ExpansionPanel title="OPTIONS">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
        </Sidebar> */}
      </MainContainer>
    </div>
  );
};
export default ChatPage;
