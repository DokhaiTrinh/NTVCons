import React from 'react';
import Paper from '@mui/material/Paper';
import { Divider, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextFieldComponent from '../../Components/TextField/textfield';
import CardContent from '@mui/material/CardContent';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import { useParams } from 'react-router-dom';
import { getRequestIdApi } from '../../apis/Request/getRequestByProjectId';
import { verifyRequestApi1 } from '../../apis/Request/verifyRequest';
import RenderImage from '../../Components/Render/RenderImage';
import FileDetail from '../ProjectDetailsPage/components/FileDetail';

const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

const RequestDetailPage = () => {
  const { id } = useParams();
  const [allRequestList, setAllRequestList] = React.useState();
  const [requestDetail, setRequestDetail] = React.useState([]);
  const [imageGet, setImageGet] = React.useState([]);
  const [docGet, setDocGet] = React.useState([]);
  const [violation, setViolation] = React.useState(true);
  const [requestId, setRequestId] = React.useState();
  const submitForm = (data) => {
    handleVerifyReport(requestId, data.verifyNote, violation);
  };

  const handleVerifyReport = async (requestId, verifyNote, isApproved) => {
    try {
      await verifyRequestApi1(requestId, verifyNote, isApproved);
      Swal.fire({
        icon: 'success',
        text: 'Xử lí báo cáo thành công',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Xử lí tác vụ không thành công',
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };
  const ValidationSchema = yup
    .object({
      verifyNote: yup.string().required('Xin vui lòng gửi thông báo!'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ValidationSchema),
  });

  const ConfirmNotViolation = () => {
    setViolation(false);
  };
  const ConfirmViolation = () => {
    setViolation(true);
  };
  React.useEffect(() => {
    (async () => {
      try {
        const listAllRequestDetail = await getRequestIdApi(id, 'BY_ID');
        setAllRequestList(listAllRequestDetail.data);
        setRequestDetail(listAllRequestDetail.data.requestDetailList);
        setRequestId(listAllRequestDetail.data.requestId);
        if (listAllRequestDetail.data) {
          if (listAllRequestDetail.data.fileList.length > 0) {
            let arrayImgLink = [];
            let arrayDocLink = [];
            for (
              let index = 0;
              index < listAllRequestDetail.data.fileList.length;
              index++
            ) {
              const element = listAllRequestDetail.data.fileList[index];
              if (element.fileName.split('.')[1] === 'docx') {
                let objectDoc = {
                  name: element.fileName,
                  link: element.fileLink,
                  id: element.fileId,
                };
                arrayDocLink.push(objectDoc);
              } else {
                arrayImgLink.push(element.fileLink);
              }
            }
            setDocGet(arrayDocLink);
            setImageGet(arrayImgLink);
          }
        }
      } catch (error) {
        console.log('Không thể lấy dữ liệu của yêu cầu!');
      }
    })();
  }, []);
  console.log(requestId);
  return (
    <Paper className="bodynonetab" elevation="none">
      <Typography variant="h6" sx={{ marginBottom: '20px' }}>
        Thông tin chung
      </Typography>
      <Divider sx={{ marginBottom: '20px' }}></Divider>
      {allRequestList ? (
        <Grid container spacing={2}>
          {/* <Grid item xs="4">
                <Typography variant="caption">
                  Mã dự án
                </Typography>
                <Typography variant="body1">
                  {allRequestList.projectId}
                </Typography>
              </Grid> */}
          <Grid item xs="4">
            <Typography variant="caption">Tên yêu cầu</Typography>
            <Typography variant="body1">
              {allRequestList.requestName}
            </Typography>
          </Grid>
          <Grid item xs="4">
            <Typography variant="caption">Mã yêu cầu</Typography>
            <Typography variant="body1">{allRequestList.requestId}</Typography>
          </Grid>
          <Grid item xs="4">
            <Typography variant="caption">Thông tin yêu cầu</Typography>
            <Typography variant="body1">
              {/* {handleGetDate(allRequestList.reportDate)} */}
              {allRequestList.requestDesc}
            </Typography>
          </Grid>
          <Grid item xs="4">
            <Typography variant="caption">Kiểu yêu cầu</Typography>
            <Typography variant="body1">
              {allRequestList.requestType ? (
                allRequestList.requestType.requestTypeName
              ) : (
                <div>Chưa có dữ liệu !!</div>
              )}
            </Typography>
          </Grid>
          <Grid item xs="4">
            <Typography variant="caption">Người yêu cầu</Typography>
            <Typography variant="body1" paragraph>
              {allRequestList.requester.username}
            </Typography>
          </Grid>
          <Grid item xs="4">
            <Typography variant="caption">Ngày yêu cầu</Typography>
            <Typography variant="body1" paragraph>
              {allRequestList.requestDate}
            </Typography>
          </Grid>
          <Grid item container xs="4">
            <Typography variant="caption">Chi tiết yêu cầu</Typography>
          </Grid>
          <Grid item container xs="12" spacing={1}>
            {requestDetail ? (
              requestDetail.map((req, index) => (
                <Grid item xs="4">
                  <Paper sx={{ padding: '10px' }}>
                    {/* <Typography>
                            Mã yêu cầu chi tiết: {req.requestDetailId}
                          </Typography> */}
                    <Typography>{req.itemDesc}</Typography>
                    <Typography>
                      Số lượng:
                      {req.itemAmount}
                    </Typography>
                    <Typography>Giá tiền: {req.itemPrice} VNĐ</Typography>
                    <Typography>Đơn vị: {req.itemUnit}</Typography>
                  </Paper>
                </Grid>
              ))
            ) : (
              <div>Không có dữ liệu!!</div>
            )}
          </Grid>
          <Grid container item xs="12">
            <FileDetail
              // projectId={projectId}
              imageGet={imageGet}
              docGet={docGet}
            ></FileDetail>
          </Grid>
        </Grid>
      ) : (
        <div>Không có dữ liệu của yêu cầu!!</div>
      )}

      <Divider sx={{ marginBottom: '20px' }}></Divider>
      {userInfor.authorID === '54' ? (
        <form onSubmit={handleSubmit(submitForm)}>
          <TextFieldComponent
            register={register}
            name="staffMessage"
            label="Lời nhắn của quản trị viên*"
            errors={errors.verifyNote}
            multiline={true}
            maxRows={5}
            isPassword={false}
          />
          {/* {reportStatus === 'DONE' ? null : ( */}
          <div>
            <Button
              autoFocus
              variant="contained"
              type="submit"
              onClick={ConfirmViolation}
              sx={{ backgroundColor: '#FF0000' }}
            >
              Đồng ý
            </Button>
            &nbsp;
            <Button
              autoFocus
              variant="contained"
              type="submit"
              onClick={ConfirmNotViolation}
            >
              Không đồng ý
            </Button>
          </div>
          {/* )} */}
        </form>
      ) : null}
    </Paper>
  );
};

export default RequestDetailPage;
