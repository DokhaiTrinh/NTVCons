import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../contants/ApiLinks/apiLinks";

export const createReportDetailApi = (data) => {
    return axiosService.post(`${API_LINK.CREATE_REPORT_DETAILS}`, data)
}