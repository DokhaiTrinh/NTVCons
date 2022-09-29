import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const addFileToProject = (id, files) => {
  const idInt = parseInt(id);
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.postSendFiles(
    `${API_LINK.ADD_FILE_TO_PROJECT}/${idInt}`,
    files,
    userInfor.token
  );
};
