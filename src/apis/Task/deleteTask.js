import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const deleteTaskApi = (id) => {
  return axiosService.delete(`${API_LINK.DELETE_TASK}/${id}`);
};
