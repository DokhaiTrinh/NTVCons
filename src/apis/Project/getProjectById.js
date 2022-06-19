import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getProjectByIdApi = (data) => {
    return axiosService.get(
      `${API_LINK.GET_ALL_BY_ID}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&projectId=${data.projectId}&sortBy=${data.sortBy}&sortType=${data.sortType}`
    );
  };
