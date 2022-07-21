import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getTaskByProjectIdApi = (
  pageNo,
  pageSize,
  projectId,
  searchType,
  soryBy,
  sortTypeAsc
) => {
  return axiosService.get(
    `${API_LINK.GET_TASK_BY_PROJECT_ID}?pageNo=${pageNo}&pageSize=${pageSize}&searchParam=${projectId}&searchType=${searchType}&sortBy=${soryBy}&sortTypeAsc=${sortTypeAsc}`
  );
};

export const getTaskByIdApi = (taskId, searchType) => {
  return axiosService.get(
    `${API_LINK.GET_TASK_BY_ID}?searchParam=${taskId}&searchType=${searchType}`
  );
};
