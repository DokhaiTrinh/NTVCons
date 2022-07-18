import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getReportByProjectIdApi = (data) => {
  return axiosService.get(
    `${API_LINK.GET_REPORT_BY_PROJECT_ID}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&searchParam=${data.projectId}&searchType=${data.searchType}&sortTypeAsc=${data.sortTypeAsc}`
  );
};
export const getReportById = (reportId, searchType) => {
  return axiosService.get(
    `${API_LINK.GET_REPORT_BY_PROJECT_ID1}?searchParam=${reportId}&searchType=${searchType}`
  );
};
