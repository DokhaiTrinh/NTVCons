import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getReportByProjectIdApi = (data) => {
  return axiosService.get(
    `${API_LINK.GET_REPORT_BY_PROJECT_ID}?searchParam=${data.projectId}&searchType=${data.searchType}`
  );
};
