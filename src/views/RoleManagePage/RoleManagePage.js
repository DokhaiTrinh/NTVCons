import * as React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { RoleTable } from './components/RoleTable';
import { Link } from 'react-router-dom';
import { getAllRoleApi } from './../../apis/Role/GetAllRole';
import { useStateValue } from '../../common/StateProvider/StateProvider';

const TabPanel = (props) => {
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
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};
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
const RoleManagePage = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [{ pageNo, pageSize, sortBy, sortType, loading }, dispatch] =
    useStateValue();

  const [allRole, setAllRole] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const listAllRole = await getAllRoleApi({
          pageNo,
          pageSize,
          sortBy,
          sortType,
        });
        setAllRole(listAllRole.data);
      } catch (error) {
        console.log('Không thể lấy danh sách role');
      }
    })();
  }, [pageNo, pageSize, sortBy, sortType]);
  console.log(allRole);
  return (
    <div>
      <Grid container justify="center">
        <Grid container md="8">
          <Grid item>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ margin: '20px' }}
            >
              <IconButton
                aria-label="add"
                sx={{ alignSelf: 'center', backgroundColor: '#DD8501' }}
                component={Link}
                to={'/createRole'}
              >
                <Add sx={{ color: 'white' }}></Add>
              </IconButton>
            </Box>
          </Grid>
          <Grid item>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: '100%' }}
            >
              <Typography variant="body1">Danh sách vai trò</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item md="4">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              margin: '20px',
              border: 2,
              borderColor: '#DD8501',
              borderRadius: '10px',
            }}
          >
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={value}
            onChange={handleChange}
            aria-label=""
          >
            <Tab label="Tất cả" {...a11yProps(0)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box width="100%">
            {/* {allRole ? (
              allRole.length > 0 ? (
                <RoleTable allRole={allRole}></RoleTable>
              ) : (
                <div>Khong co du lieu</div>
              )
            ) : null} */}
          </Box>
        </TabPanel>
      </Box>
    </div>
  );
};

export default RoleManagePage;
