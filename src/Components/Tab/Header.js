import React from 'react'
import { Paper, Stack } from '@mui/material'
import SearchField from '../TextField/SearchField'
import AddButton from '../Button/AddButton'

export const Header = (link) => {
    return (
        <Paper sx={{ width: '100%', mb: 2, padding: '20px', boxShadow: 'none'}}>
            <Stack direction='row' justifyContent='space-between'>
                {AddButton(link)}
                <SearchField />
            </Stack>
        </Paper>
    )
}

export default Header