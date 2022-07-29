import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

// export const getAllManagerApi = (pageNo, pageSize, sortBy, sortTypeAsc) => {
//   const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
//   return axiosService.get(
//     `${API_LINK.GET_ALL_MANAGER}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`,
//     userInfor.token
//   );
// };
export const getAllManagerApi1 = (
  pageNo,
  pageSize,
  roleId,
  searchType,
  sortBy,
  sortTypeAsc
) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_MANAGER}?pageNo=${pageNo}&pageSize=${pageSize}&searchParam=${roleId}&searchType=${searchType}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`,
    userInfor.token
  );
};