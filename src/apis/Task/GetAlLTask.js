import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getAllTaskApi = (data) => {
  return axiosService.get(
    `${API_LINK.GET_ALL_TASK}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&sortType=${data.sortType}`
  );
};
