import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getAllProjectApi = (data) => {
  return axiosService.delete(`${API_LINK.DELETE_PROJECT}`, data);
};
