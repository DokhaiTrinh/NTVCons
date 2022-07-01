import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../contants/ApiLinks/apiLinks";

export const createReportApi = (data) => {
    return axiosService.post(`${API_LINK.CREATE_REPORT}`, data)
}