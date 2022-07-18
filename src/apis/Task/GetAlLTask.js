import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getAllTaskApi = (pageNo, pageSize, sortBy, sortTypeAsc) => {
  return axiosService.get(
    `${API_LINK.GET_ALL_TASK}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`
  );
};
