import React from 'react';
import {Box, IconButton} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchField() {
    return (
        <Box>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Tìm kiếm"
                inputProps={{ 'aria-label': 'tìm kiếm' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Box>
    )
}
