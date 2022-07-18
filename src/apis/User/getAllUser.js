import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getAllUserApi = (data) => {
  return axiosService.get(
    `${API_LINK.GET_ALL_USER}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&sortTypeAsc=${data.sortTypeAsc}`
  );
};
export const getAllUserApi1 = (pageNo, pageSize, sortBy, sortTypeAsc) => {
  return axiosService.get(
    `${API_LINK.GET_ALL_USER}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`
  );
};
