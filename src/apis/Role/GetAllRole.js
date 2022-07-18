import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getAllRoleApi = (data) => {
  return axiosService.get(
    `${API_LINK.GET_ALL_ROLE}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&sortTypeAsc=${data.sortTypeAsc}`
  );
};
export const getAllRoleApi1 = (pageNo, pageSize, sortBy, sortTypeAsc) => {
  return axiosService.get(
    `${API_LINK.GET_ALL_ROLE}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`
  );
};
