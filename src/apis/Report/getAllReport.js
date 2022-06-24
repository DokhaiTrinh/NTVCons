import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getAllReportApi = (data) => {
  return axiosService.get(
    `${API_LINK.GET_ALL_REPORT}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&sortType=${data.sortType}`
  );
};
