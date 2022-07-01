import axiosService from '../../axios/axiosService';
import * as API_LINK from '../../contants/ApiLinks/apiLinks';

export const getAllReportDetailsApi = (data) => {
  return axiosService.get(
    `${API_LINK.GET_ALL_REPORT_DETAILS}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&sortType=${data.sortType}`
  );
};
