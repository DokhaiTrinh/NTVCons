import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getAllManagerApi = (pageNo, pageSize, sortBy, sortTypeAsc) => {
  return axiosService.get(
    `${API_LINK.GET_ALL_MANAGER}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`
  );
};
