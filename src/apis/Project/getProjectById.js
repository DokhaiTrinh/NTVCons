import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getProjectByIdApi = (data) => {
  return axiosService.get(
    `${API_LINK.GET_ALL_BY_ID}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&projectId=${data.projectId}&sortBy=${data.sortBy}&sortTypeAsc=${data.sortTypeAsc}`
  );
};
export const getProjectByParam = (projectId, searchType) => {
  console.log(projectId, searchType);
  return axiosService.get(
    `${API_LINK.GET_BY_PARAM}?searchParam=${projectId}&searchType=${searchType}`
  );
};
