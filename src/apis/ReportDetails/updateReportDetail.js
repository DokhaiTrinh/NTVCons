import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const updateReportDetailApi = (data) => {
  return axiosService.put(`${API_LINK.UPDATE_REPORT_DETAILS}`, data);
};