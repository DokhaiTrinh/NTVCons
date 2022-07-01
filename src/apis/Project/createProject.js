import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../contants/ApiLinks/apiLinks";

export const createProjectApi = (data) => {
    console.log(data);
    return axiosService.post(`${API_LINK.CREATE_PROJECT}`, data)
}