import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const createReportTypeApi = (data) => {
  return axiosService.post(`${API_LINK.CREATE_REPORT_TYPES}`, data);
};
