import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const deleteTaskApi = (data) => {
  return axiosService.delete(`${API_LINK.DELETE_TASK}`, data);
};
