import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const updateBlueprintApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.putUpdateBlueprint(
    `${API_LINK.UPDATE_BLUEPRINT_WITH_FILE}`,
    data,
    userInfor.token
  );
};
