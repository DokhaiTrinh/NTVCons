import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../contants/ApiLinks/apiLinks";

export const createRequestDetailApi = (data) => {
    return axiosService.post(`${API_LINK.CREATE_REQUEST_DETAIL}`, data)
}