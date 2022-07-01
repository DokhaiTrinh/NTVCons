import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getTaskByProjectIdApi = (projectId, searchType) => {
  return axiosService.get(
    `${API_LINK.GET_TASK_BY_PROJECT_ID}?searchParam=${projectId}&searchType=${searchType}`
  );
};

export const getTaskByIdApi = (taskId, searchType) => {
  return axiosService.get(
    `${API_LINK.GET_TASK_BY_PROJECT_ID}?searchParam=${taskId}&searchType=${searchType}`
  );
};
