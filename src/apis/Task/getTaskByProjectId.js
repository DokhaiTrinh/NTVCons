import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getTaskByProjectIdApi = (data) => {
  return axiosService.get(
    `${API_LINK.GET_TASK_BY_PROJECT_ID}?searchParam=${data.searchParam}&searchType=${data.searchType}`
  );
};
