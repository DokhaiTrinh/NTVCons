import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const createTaskApi = (data) => {
  return axiosService.post(`${API_LINK.CREATE_TASK}`, data);
};
