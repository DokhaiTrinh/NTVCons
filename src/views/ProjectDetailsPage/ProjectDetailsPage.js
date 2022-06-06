import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';

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
const ProjectDetailsPage = (props) => {
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
                        <Typography variant="body1">Dự án - Xây dựng tòa nhà văn phòng ABC</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs variant="scrollable"
                    scrollButtons="auto" value={value} onChange={handleChange} aria-label="">
                    <Tab label="Chi tiết" {...a11yProps(0)} />
                    <Tab label="Danh mục" {...a11yProps(1)} />
                    <Tab label="Báo cáo" {...a11yProps(2)} />
                    <Tab label="Liên quan" {...a11yProps(3)} />
                    <Tab label="Đính kèm" {...a11yProps(4)} />
                    <Box sx={{ flex: 1 }}></Box>
                    <IconButton aria-label="status">
                        <Box>
                            <PauseCircleOutlineOutlinedIcon />
                            <div>
                                <Typography variant="button">
                                    Trạng thái
                                </Typography>
                            </div>
                        </Box>
                    </IconButton>
                    <IconButton aria-label="join">
                        <Box>
                            <PersonAddAltOutlinedIcon />
                            <div>
                                <Typography variant="button">
                                    Tham gia
                                </Typography>
                            </div>
                        </Box>
                    </IconButton>
                    <IconButton aria-label="category">
                        <Box>

                            <FormatListBulletedOutlinedIcon />
                            <div>
                                <Typography variant="button">
                                    Danh mục
                                </Typography>
                            </div>
                        </Box>
                    </IconButton>
                    <IconButton aria-label="addWork">
                        <Box>

                            <Add />
                            <div>
                                <Typography variant="button">
                                    Thêm việc
                                </Typography>
                            </div>
                        </Box>
                    </IconButton>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: "100%", mp: 2, borderRadius: "30px", padding: "20px" }} variant="elevation">
                        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                            Thông tin chung
                        </Typography>
                        <Divider sx={{ marginBottom: "20px" }}></Divider>
                        <Grid container rowSpacing={{ xs: 5 }}>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Mã dự án</Typography>
                                <Typography variant="body1" >1</Typography>
                            </Grid>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Tên dự án</Typography>
                                <Typography variant="body1" >Dự án - Xây dựng tòa nhà văn phòng ABC</Typography>
                            </Grid>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Người quản trị</Typography>
                                <Typography variant="body1" >Đỗ Nam Trung</Typography>
                            </Grid>
                            <Grid item  xs="6">
                                    <Typography variant="body1" color="gray">Trạng thái</Typography>
                                    <Typography variant="body1" >10%</Typography>
                            </Grid>
                                <Grid item xs="6">
                                <Typography variant="body1" color="gray">Trạng thái</Typography>
                                    <Box sx={{ width: '50%', borderRadius: "10px", backgroundColor: "pink" }}>
                                        <Typography variant="body1" sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'gray'
                                        }}>Đang thực hiện</Typography>
                                    </Box>
                                </Grid>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Người tham gia</Typography>
                                <Typography variant="body1" paragraph >Nguyễn Văn A, Trần Thị B, Vũ Văn C, Huỳnh Thị N, Đỗ Văn T</Typography>
                            </Grid>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Thời gian dự kiến</Typography>
                                <Typography variant="body1" >06/09/2021 - 24/09/2021</Typography>
                            </Grid>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Thời gian thực tế</Typography>
                                <Typography variant="body1" >06/09/2021 - 24/09/2021</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
        </Box>
    </div>;
};

export default ProjectDetailsPage;