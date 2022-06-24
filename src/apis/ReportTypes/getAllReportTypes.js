import axiosService from '../../axios/axiosService';
import * as API_LINK from '../../contants/ApiLinks/apiLinks';

export const getAllReportTypeApi = (pageNo, pageSize, sortBy, sortType) => {
  return axiosService.get(
    `${API_LINK.GET_ALL_REPORT_TYPES}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortType=${sortType}`
  );
};
