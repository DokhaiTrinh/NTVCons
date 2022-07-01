import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const deleteRoleApi = (data) => {
  return axiosService.delete(`${API_LINK.DELETE_ROLE}`, data);
};
