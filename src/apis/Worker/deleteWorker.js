import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const deleteWorkerApi = (id) => {
  return axiosService.delete(`${API_LINK.DELETE_WORKER}/${id}`);
};
