import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const deleteReporttApi = (data) => {
  return axiosService.delete(`${API_LINK.DELETE_REPORT}`, data);
};
