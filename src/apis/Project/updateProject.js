import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const updateProjectApi = (data) => {
  console.log(data);
  return axiosService.put(`${API_LINK.UPDATE_PROJECT}`, data);
};
export const getProjectByParam = (projectId, searchType) => {
  console.log(projectId, searchType);
  return axiosService.get(
    `${API_LINK.GET_BY_PARAM}?searchParam=${projectId}&searchType=${searchType}`
  );
};
