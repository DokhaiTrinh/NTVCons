import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CategoryIcon from '@mui/icons-material/Category';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { ProductTable } from './components/ProductTable';
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
  const [totalPage, setTotalPage] = React.useState();
  const handleChangePage = (event, value) => {
    dispatch({ type: 'CHANGE_PAGENO', newPageNo: value - 1 });
  };
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
        setTotalPage(listAllProduct.data[0].totalPage);
      } catch (error) {
        console.log('Không thể lấy danh sách sản phẩm');
      }
      try {
      } catch (error) {
        const listAllCategory = await getAllPostApi({
          pageNo,
          pageSize,
          sortBy,
          sortTypeAsc,
        });
        setAllProduct(listAllCategory.data);
      }
    })();
  }, [pageNo, pageSize, sortBy, sortTypeAsc]);
  console.log(totalPage);
  console.log(allProduct);
  return (
    <div>
      {/* <Grid container justify="center">
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
                      <MenuItem
                        onClick={() => {
                          history.push('/createBlueprint');
                        }}
                      >
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
      </Grid> */}
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
                <Grid container>
                  <Grid item xs={12}>
                    <IconButton
                      aria-label="category manage"
                      component={Link}
                      to={'/categoryManage'}
                      sx={{ height: '100%' }}
                    >
                      <Box sx={{ height: '30px' }}>
                        <CategoryIcon fontSize="large" />
                      </Box>
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="button">Thể loại</Typography>
                  </Grid>
                </Grid>
              </Box>
            </IconButton>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {allProduct ? (
            <Box width="100%">
              <ProductTable
                allProduct={allProduct}
                totalPage={totalPage}
              ></ProductTable>
            </Box>
          ) : (
            <div>Không có dữ liệu</div>
          )}
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
