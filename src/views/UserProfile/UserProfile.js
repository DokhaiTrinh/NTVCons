import React from 'react';
import { Paper, Divider, Stack, Typography, Grid, Box, TextField, FormControl, Select, MenuItem, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getUserByIdApi } from '../../apis/User/getAllUser';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../Components/Tab/Tab.css';

const UserProfile = (props) => {
  const { id } = useParams();
  console.log(id);
  const [userId, setUserId] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listUser = await getUserByIdApi(id, 'BY_ID');
        setUserId(listUser.data);
      } catch (error) {
        console.log('Không thể lấy danh sách người dùng');
      }
    })();
  }, []);
  const [gender, setGender] = React.useState('');
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div>
      <Tabs>
        <Paper sx={{ width: 'min-content', borderRadius: '10px 10px 0 0' }}>
          <TabList>
            <Stack direction='row'>
              <Tab>Hồ sơ</Tab>
              <Tab>Mật khẩu</Tab>
            </Stack>
          </TabList>
        </Paper>
        <Paper
          sx={{
            width: '100%',
            // top: '205px',
            padding: '32px',
            borderRadius: '0'
          }}
        >
          <TabPanel>
            <Typography variant="h6" sx={{ marginBottom: '20px' }}>
              Chỉnh sửa hồ sơ
            </Typography>
            <Divider sx={{ marginBottom: '20px' }}></Divider>
            {userId ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '500px' }}>
                  <Stack direction='column' spacing={2}>
                    <Stack direction='column'>
                      <Typography variant='body2'>
                        Họ và tên
                      </Typography>
                      <TextField
                        sx={{ width: '100%' }}
                        variant="outlined"
                      />
                    </Stack>
                    <Stack direction='column'>
                      <Typography variant='body2'>
                        Tên đăng nhập
                      </Typography>
                      <TextField
                        sx={{ width: '100%' }}
                        variant="outlined"
                      />
                    </Stack>
                    <Stack direction='column'>
                      <Typography variant='body2'>
                        Email
                      </Typography>
                      <TextField
                        sx={{ width: '100%' }}
                        variant="outlined"
                      />
                    </Stack>
                    <Stack direction='column'>
                      <Typography variant='body2'>
                        Số điện thoại
                      </Typography>
                      <TextField
                        sx={{ width: '100%' }}
                        variant="outlined"
                      />
                    </Stack>
                    <Stack direction='column'>
                      <Typography variant='body2'>
                        Giới tính
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          value={gender}
                          onChange={handleChange}
                        >
                          <MenuItem
                          // value={ }
                          >Nam</MenuItem>
                          <MenuItem
                          // value={ }
                          >Nữ</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                    <Stack justifyContent='center'>
                      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                      <Button
                        variant='contain'
                        className='submitButton'>
                        Lưu
                      </Button>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            ) : (
              <div>Không có dữ liệu của yêu cầu!!</div>
            )}
          </TabPanel>
          <TabPanel>
            <Typography variant="h6" sx={{ marginBottom: '20px' }}>
              Đặt lại mật khẩu
            </Typography>
            <Divider sx={{ marginBottom: '20px' }}></Divider>
            {userId ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '500px' }}>
                  <Stack direction='column' spacing={2}>
                    <Stack direction='column'>
                      <Typography variant='body2'>
                        Mật khẩu cũ
                      </Typography>
                      <TextField
                        type='password'
                        sx={{ width: '100%' }}
                        variant="outlined"
                      />
                    </Stack>
                    <Stack direction='column'>
                      <Typography variant='body2'>
                        Mật khẩu mới
                      </Typography>
                      <TextField
                        type='password'
                        sx={{ width: '100%' }}
                        variant="outlined"
                      />
                    </Stack>
                    <Stack direction='column'>
                      <Typography variant='body2'>
                        Xác nhận mật khẩu mới
                      </Typography>
                      <TextField
                        type='password'
                        sx={{ width: '100%' }}
                        variant="outlined"
                      />
                    </Stack>
                    <Stack justifyContent='center'>
                      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                      <Button
                        variant='contain'
                        className='submitButton'>
                        Lưu
                      </Button>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            ) : (
              <div>Không có dữ liệu của yêu cầu!!</div>
            )}
          </TabPanel>
        </Paper>
      </Tabs>

    </div>
  );
};

export default UserProfile;
