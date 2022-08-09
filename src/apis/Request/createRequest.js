import axiosService from '../../axios/axiosService';
import * as API_LINK from '../../contants/ApiLinks/apiLinks';

export const createRequestApi1 = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.post5(
    `${API_LINK.CREATE_REQUEST_WITH_FILE}`,
    data,
    userInfor.token
  );
};
export const createRequestApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.post(`${API_LINK.CREATE_REQUEST}`, data, userInfor.token);
};
