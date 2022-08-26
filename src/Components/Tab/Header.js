import React from 'react';
import { Paper, Stack } from '@mui/material';
import SearchField from '../TextField/SearchField';
import AddButton from '../Button/AddButton';
const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

export const Header = (link) => {
  return (
    <Paper sx={{ width: '100%', mb: 2, padding: '32px', boxShadow: 'none'}}>
      <Stack direction="row" justifyContent="space-between">
        {userInfor.authorID === '54' || userInfor.authorID === '24'
          ? AddButton(link)
          : null}
          <SearchField />
      </Stack>
    </Paper>
  );
};

export default Header;
