import './styles.css';
import React, { useRef } from 'react';
import {
  TextField,
  Paper,
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
  Conversation,
  ConversationList,
  Sidebar,
} from '@chatscope/chat-ui-kit-react';
import Swal from 'sweetalert2';

import { getUserConversations } from '../../apis/Message/getUserConversations';
import { getConversationsById } from '../../apis/Message/getConversationById';
import { sendMessageAuthenticated } from '../../apis/Message/sendMessageAuthenticated';
import { createConversationByAuthenticated } from '../../apis/Message/createConverstationByAuthenticate';
import { getAllUserApi1 } from './../../apis/User/getAllUser';
import { setConsultantForChat } from '../../apis/Message/setConsultantForChat';
import { seenMessageAuthenticated } from '../../apis/Message/seenMessageAuthenticated';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

const ChatPage = (props) => {
  const [allUser, setAllUser] = React.useState([]);
  const [managerChoice, setManagerChoice] = React.useState();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [searchTerm, setSearchTerm] = React.useState('');
  const [messageInputValue, setMessageInputValue] = React.useState('');
  const avatarIco =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEUOHCyclYufmI0AECZvbGkAACCjm5AIGCoxOUIAEycAFSgLGisNHCwEFykDFyljY2N9enUlLjkACCKWkIc+Q0lmZmWIhH0bJjN/e3YVIjGSjYRAREpbXF0tND54dXGEgHpKTVFTVVcfARIMAAADVklEQVR4nO3ciXaiMABA0ZA4lhBEcV+r/v9PTtA6FUVGLXOyzLtf4DtktVghAAAAAAAAAAAAAAAAAAAAAABAuIwej9XAuP4Y/4xR5XY+6U11pI1GL4ZrmSQyGaXZIHf9cTqXa7Gt+ipSfqZ64PoTdcuoYjj56js3jtJxRM/RqMUwueo7Ny6nqohjPtr1Zbi+6Ts1JqNpFsGak2eLxr5z4zItAp+PRtfn313jaT66/pTvM2p1N//uGvv7YOdjNf/ant/VWJ3qABsv+/szzmtOWHtHrldP950a7XwM6QxglJk9Mz7rjcvpOJCxWs2/v60vzY37qc78b7R9s1fGZ60xWW58PwMYu7+/Oj5vGr0+A9yer99qrM4AheuSZnZ/n8kf9p0a7RnAyzVHly+vnw8bq/no3faYbd5dX5obe749xNy8s0G0NW6166a6bNttYJJMxq6b6lSv68L+L9dNdRRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FL5Oxl4oR8p1U13XhXJdevb6ZbeFUo5K396E7rJQyvlBfLguutVdoUyWB+PfO9BdFUopZztV+NfXUaHs749KebbCXHTwFrScfKbGs5e7r5iy/7M8uR7ulNe/0Bt//uTHQNXq6evwvMjz+buJMumlYw9Xz1sfi7cS7ePbikB+XJntXk+Uk9FmpT0fnt+K3frFxzeZpdrLze+RbPdKX39+XKmPkPqsLJ0825d82tUlmOH5LZs+k2gf37DMwlhd7mSbJx7f/mBXl8CG5x+5PvzlcCP3UxXi8Pymju17xjys1bOJaj2Ey6O/h+tnGT1s+38taaArzLU8m7Ukpt59P/GGvO0+HEWhMC13qTgKRV48TIykUBgxepAYS6Ew+b45MZpCu2k0XxfjKRRm1ZgYUaEoyqbEmArtjbjhv4FEVdh46Y+rsCkxskKhN7eX/tgKhTrEXmgTZeSFuap/rxFf4e33GjEW1i/9MRbWL/1RFopc9/pxF15/rxFpoR2ol0t/rIX2Rvx16Y+20F4Xz5f+eAvtUzxdFyMuFKaw10Xp2zuHnRqU8/5chf53mVaDxSHqRyiqgRp5IAAAAAAAAAAAAAAAAAAAAAAA/4Hf0gU2cK/EibwAAAAASUVORK5CYII=';
  const [userConversation, setUserConversation] = React.useState([]);
  const [conversationById, setConversationById] = React.useState([]);
  const [statusChange, setStatusChange] = React.useState(false);
  const [conversationId, setConversationId] = React.useState();
  // const [ip, setIP] = React.useState('');
  const [msgInputValue, setMsgInputValue] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [filesImage, setFilesImage] = React.useState([]);
  const [selectedImages, setSelectedImage] = React.useState([]);
  const fileInput = useRef();

  // const [value, setValue] = React.useState('');
  // const getData = async () => {
  //   const res = await axios.get('https://geolocation-db.com/json/');
  //   setIP(res.data.IPv4);
  // };

  // React.useEffect(() => {
  //   //passing getData method to the lifecycle method
  //   getData();
  // }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(valideSchema),
  });
  const handleChangeFile = (e) => {
    let allFileSize = 0;
    for (const file of e.target.files) {
      allFileSize += file.size;
    }
    console.log(allFileSize);
    if (allFileSize >= 52428800) {
      Swal.fire('', 'File quá lớn xin vui lòng chọn nhỏ hơn 50MB', 'warning');
    } else {
      setFilesImage(e.target.files);

      if (e.target.files) {
        const fileArray = Array.from(e.target.files).map((file) =>
          URL.createObjectURL(file)
        );
        setSelectedImage((prevImages) => prevImages.concat(fileArray));
        Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
      }
    }
  };
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
    // if (conversationId) {
    //   (async () => {
    //     try {
    //       const listConversationById = await getConversationsById(
    //         conversationId,
    //         0,
    //         200,
    //         'messageId',
    //         true
    //       );
    //       setConversationById(listConversationById.data);
    //     } catch (error) {
    //       console.log('Không có dữ liệu của tin nhắn!!');
    //     }
    //   })();
    // }
  }, [conversationId, conversationById, statusChange]);

  const handleGetConversationById = async (conversationId) => {
    try {
      console.log(managerChoice);
      if (conversationId) {
        console.log('convert ' + conversationId);
        const listConversationById = await getConversationsById(
          conversationId,
          0,
          200,
          'messageId',
          true
        );
        if (listConversationById.data.length > 0) {
          setConversationById(listConversationById.data);
          setConversationId(conversationId);
        }
      } else {
        if (managerChoice) {
          let listConversationById = null;
          for (const user of userConversation) {
            if (
              user.user1Id === managerChoice.userId ||
              user.user2Id === managerChoice.userId
            ) {
              listConversationById = await getConversationsById(
                user.conversationId,
                0,
                200,
                'messageId',
                true
              );
              setConversationById(listConversationById.data);
              setConversationId(user.conversationId);
            }
          }
          if (listConversationById === null) {
            console.log('HIII');
            setConversationById([]);
          }
        }
      }
    } catch (error) {
      console.log('Không có dữ liệu của tin nhắn!!');
      setConversationById([]);
    }
  };
  console.log(conversationById);
  const handleSend = async (message) => {
    try {
      if (conversationId) {
        await sendMessageAuthenticated(conversationId, message, filesImage);
        await handleGetConversationById(conversationId);
        setMsgInputValue('');
      } else {
        await createConversationByAuthenticated(
          managerChoice.userId,
          message,
          filesImage
        );

        const listAllConversation = await getUserConversations();
        console.log(listAllConversation.data);
        for (const user of listAllConversation.data) {
          if (
            user.user1Id === managerChoice.userId ||
            user.user2Id === managerChoice.userId
          ) {
            const listConversationById = await getConversationsById(
              user.conversationId,
              0,
              200,
              'messageId',
              true
            );
            setConversationById(listConversationById.data);
            setConversationId(user.conversationId);
          }
        }
        setUserConversation(listAllConversation.data);
        setMsgInputValue('');
      }
    } catch (error) {
      console.log('Lỗi sảy ra khi gửi tin nhắn ' + error.message);
    }
  };
  const handleSelectUser = async (options) => {
    setConversationId(undefined);
    setManagerChoice(options);
  };

  return (
    <Paper
      style={{
        position: 'absolute',
        top: '92px',
        bottom: '32px',
        right: '32px',
        left: '92px',
      }}
      elevation={0}
    >

      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Autocomplete
            options={allUser}
            disableCloseOnSelect
            getOptionLabel={(option) => option.fullName}
            onChange={(e, option) => handleSelectUser(option)}
            renderOption={(props, option, { selected }) => (
              <li {...props}>{option.fullName}</li>
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
            {!managerChoice ? (
              userConversation.length > 0 ? (
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
                <></>
              )
            ) : (
              <Conversation
                name={managerChoice.username}
                lastSenderName={managerChoice.username}
                info={managerChoice.lastMessage}
                onClick={() => handleGetConversationById()}
              >
                <Avatar src="#" />
              </Conversation>
            )}
          </ConversationList>
        </Sidebar>
        <input
          {...register('files')}
          type="file"
          hidden
          ref={fileInput}
          id="files"
          multiple
          onChange={handleChangeFile}
        />
        <div className="label-holder">
          <label htmlFor="file" className="img-upload"></label>
        </div>
        <ChatContainer>
          <MessageList>
            {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
            {conversationById.length > 0 ? (
              conversationById.map((m) => (
                <>
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
                  {m.fileList
                    ? m.fileList.length > 0
                      ? m.fileList.map((fileImage) => (
                        <Message
                          type="image"
                          model={{
                            direction:
                              m.senderId === userInfor.id
                                ? 'outgoing'
                                : 'incoming',
                            payload: {
                              src: fileImage.fileLink,
                              width: '100%',
                            },
                          }}
                        >
                          {/* <Avatar src={m.avatarLink} name="Joe" /> */}
                        </Message>
                      ))
                      : null
                    : null}
                </>
              ))
            ) : (
              <div>Bắt đầu cuộc trò chuyện...</div>
            )}
          </MessageList>
          <MessageInput
            placeholder="Nhập tin nhắn của bạn.."
            onSend={handleSend}
            onChange={setMsgInputValue}
            value={msgInputValue}
            onAttachClick={() => { fileInput.current.click(); }}
          />

        </ChatContainer>
      </MainContainer>
    </Paper>
  );
};
export default ChatPage;
