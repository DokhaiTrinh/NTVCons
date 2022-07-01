import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const deleteProjectApi = (id) => {
  console.log(typeof id);
  return axiosService.delete(`${API_LINK.DELETE_PROJECT}/${id}`);
};
