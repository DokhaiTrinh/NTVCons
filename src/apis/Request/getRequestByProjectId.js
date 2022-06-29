import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getRequestByProjectIdApi = (data) => {
  return axiosService.get(
    `${API_LINK.GET_REQUEST_BY_PROJECT_ID}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&projectId=${data.projectId}&sortBy=${data.sortBy}&sortType=${data.sortType}`
  );
};
