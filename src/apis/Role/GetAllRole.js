import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../contants/ApiLinks/apiLinks";

export const getAllRoleApi = (data) => {
    console.log(data);
    return axiosService.get(`${API_LINK.GET_ALL_ROLE}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&sortType=${data.sortType}`)
}