import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const updateProjectApi = (data) => {
  return axiosService.put(`${API_LINK.UPDATE_PROJECT}`, data);
};
export const getProjectByIdApi = (
  pageNo,
  pageSize,
  projectId,
  sortBy,
  sortType
) => {
  return axiosService.get(
    `${API_LINK.GET_ALL_BY_ID}?pageNo=${pageNo}&pageSize=${pageSize}&projectId=${projectId}&sortBy=${sortBy}&sortType=${sortType}`
  );
};
