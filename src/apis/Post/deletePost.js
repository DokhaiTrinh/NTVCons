import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const deletePostApi = (id) => {
  console.log(typeof id);
  return axiosService.delete(`${API_LINK.DELETE_POST}/${id}`);
};
