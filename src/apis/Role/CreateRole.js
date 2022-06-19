import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../contants/ApiLinks/apiLinks";

export const createRoleApi = (data) => {
    console.log(data);
    return axiosService.post(`${API_LINK.CREATE_ROLE}`, data);
}