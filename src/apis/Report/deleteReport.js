import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const deleteReportApi = (id) => {
  return axiosService.delete(`${API_LINK.DELETE_REPORT}/${id}`);
};
