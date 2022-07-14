import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getRequestByProjectIdApi = (
  pageNo,
  pageSize,
  projectId,
  searchType,
  soryBy,
  sortTypeAsc
) => {
  return axiosService.get(
    `${API_LINK.GET_REQUEST_BY_PROJECT_ID}?pageNo=${pageNo}&pageSize=${pageSize}&searchParam=${projectId}&searchType=${searchType}&sortBy=${soryBy}&sortTypeAsc=${sortTypeAsc}`
  );
};
export const getRequestIdApi = (requestId) => {
  return axiosService.get(`${API_LINK.GET_REQUEST_ID}?requestId=${requestId}`);
};
