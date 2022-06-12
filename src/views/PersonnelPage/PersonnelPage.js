import * as React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { PersonnelTable } from './components/PersonnelTable';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
const PersonnelPage = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return <div>
        <Grid container justify="center">
            <Grid container md="8">
                <Grid item>
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ margin: "20px" }}>
                        <IconButton aria-label="add" sx={{ alignSelf: "center", backgroundColor: "#DD8501" }}>
                            <Add sx={{ color: "white" }}></Add>
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item>
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ height: "100%" }}>
                        <Typography variant="body1">Danh sách nhân sự</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Grid item md="4">
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ margin: "20px", border: 2, borderColor: "#DD8501", borderRadius: "10px" }}>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Tìm kiếm"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Box>
            </Grid>
        </Grid>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', height: "70px" }}>
                <Tabs variant="scrollable"
                    scrollButtons="auto" value={value} onChange={handleChange} aria-label="" sx={{ height: "100%" }}>
                    <Tab label="Tất cả" {...a11yProps(0)} />
                    <Box sx={{ flex: 1 }}></Box>
                    <Box>
                        <Grid container>
                            <Grid item xs={12}>
                                <IconButton aria-label="role manage" component={Link} to={('/roleManage')} sx={{ height: "100%"}}>
                                    <Box sx={{height: "30px" }}>

                                        <SupervisedUserCircleOutlinedIcon fontSize="large" />

                                    </Box>
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>

                                <Typography variant="button">
                                    Vai trò
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box width="100%">

                    <PersonnelTable></PersonnelTable>
                </Box>
            </TabPanel>
        </Box>
    </div>;
};

export default PersonnelPage;