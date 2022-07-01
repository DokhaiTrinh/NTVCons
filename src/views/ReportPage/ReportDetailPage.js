import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { getReportById } from '../../apis/Report/getReportByProjectId';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import { useParams } from 'react-router-dom';

const handleGetDate = (date) => {
  const getDate = date.substring(0, 10);
  const getDateCom = getDate.split('-');
  const getDateReformat = ''.concat(
    getDateCom[2],
    '/',
    getDateCom[1],
    '/',
    getDateCom[0]
  );
  return getDateReformat;
};
const ReportDetailPage = (props) => {
  const [{ reportId, searchType, loading }, dispatch] = useStateValue();
  const [allReportDetail, setAllReportDetail] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listAllReportDetail = await getReportById(reportId, searchType);
        setAllReportDetail(listAllReportDetail);
      } catch (error) {
        console.log('Không thể lấy dữ liệu của báo cáo');
      }
      console.log(allReportDetail);
    })();
  }, [searchType]);

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Paper
          sx={{ width: '100%', mp: 2, borderRadius: '30px', padding: '20px' }}
          variant="elevation"
        >
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            Thông tin chung
          </Typography>
          <Divider sx={{ marginBottom: '20px' }}></Divider>
          <Grid container rowSpacing={{ xs: 5 }}>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Mã dự án
              </Typography>
              <Typography variant="body1">{}</Typography>
            </Grid>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Tên dự án
              </Typography>
              <Typography variant="body1">{}</Typography>
            </Grid>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Người quản trị
              </Typography>
              <Typography variant="body1">Đỗ Nam Trung</Typography>
            </Grid>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Trạng thái
              </Typography>
              {/* <Box
            sx={{
              width: '50%',
              borderRadius: '10px',
              backgroundColor: 'pink',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'gray',
              }}
            >
              Đang thực hiện
            </Typography>
          </Box> */}
            </Grid>
            <Grid item xs="6">
              <Typography variant="body1" color="gray">
                Người tham gia
              </Typography>
              <Typography variant="body1" paragraph>
                {}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default ReportDetailPage;
