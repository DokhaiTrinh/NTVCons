import axiosService from '../../axios/axiosService';
import * as API_LINK from '../../contants/ApiLinks/apiLinks';

export const verifyRequestApi1 = (data) => {
  console.log(data);
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.put(`${API_LINK.VERIFY_REQUEST}`, data, userInfor.token);
};
