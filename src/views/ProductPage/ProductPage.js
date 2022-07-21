import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { ProductTable } from './components/ProductTable';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useHistory } from 'react-router-dom';
import { getAllPostApi } from './../../apis/Post/getAllPost';
import { useStateValue } from '../../common/StateProvider/StateProvider';

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
const ProductPage = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const history = useHistory();
  const [{ pageNo, pageSize, sortBy, sortTypeAsc, loading }, dispatch] =
    useStateValue();
  const [allProduct, setAllProduct] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listAllProduct = await getAllPostApi({
          pageNo,
          pageSize,
          sortBy,
          sortTypeAsc,
        });
        setAllProduct(listAllProduct.data);
      } catch (error) {
        console.log('Không thể lấy danh sách sản phẩm');
      }
    })();
  }, [pageNo, pageSize, sortBy, sortTypeAsc]);
  console.log(allProduct);
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
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <IconButton
                      aria-label="add"
                      sx={{ alignSelf: 'center', backgroundColor: '#DD8501' }}
                      {...bindTrigger(popupState)}
                    >
                      <Add sx={{ color: 'white' }}></Add>
                    </IconButton>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem
                        onClick={() => {
                          history.push('/createProduct');
                        }}
                      >
                        Tạo mới dịch vụ
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        Tạo mới sản phẩm
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </Box>
          </Grid>
          <Grid item>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: '100%' }}
            >
              <Typography variant="body1">
                Danh sách sản phẩm và dịch vụ
              </Typography>
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
            <Tab label="Dịch vụ" {...a11yProps(0)} />
            <Tab label="Sản phẩm" {...a11yProps(1)} />
            <Box sx={{ flex: 1 }}></Box>
            <IconButton aria-label="addCategory">
              <Box>
                <Add></Add>
                <div>
                  <Typography variant="button">Thêm loại</Typography>
                </div>
              </Box>
            </IconButton>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box width="100%">
            <ProductTable allProduct={allProduct}></ProductTable>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
        <TabPanel value={value} index={2}>
          Product
        </TabPanel>
      </Box>
    </div>
  );
};

export default ProductPage;
