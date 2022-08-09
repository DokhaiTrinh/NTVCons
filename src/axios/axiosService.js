import axios from 'axios';
import Swal from 'sweetalert2';

class AxiosService {
  constructor() {
    //axios bộ thư viện hỗ trợ call api
    const intance = axios.create();
    intance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.intance = intance;
  }

  handleSuccess(response) {
    return response;
  }
  // handleError(error) {
  //   if (error.response.status == 401) {
  //     Swal.fire({
  //       icon: 'error',
  //       text: 'Thời gian đăng nhập hết hạn, vui lòng đăng nhập để được sử dụng lại',
  //       timer: 5000,
  //     });
  //     localStorage.clear();
  //     // window.location.href = '/';
  //   }
  //   return Promise.reject(error);
  // }
  get(url, token) {
    return this.intance.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  post(url, body, token) {
    return this.intance.post(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  post2(url, body, token) {
    return this.intance.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'multipart/form-data',
      },
    });
  }
  post3(url, body, token) {
    const formData = new FormData();
    const blueprintDTO = {
      projectId: body.projectId,
      designerName: body.desginerName,
      blueprintName: body.blueprintName,
      estimatedCost: body.estimatedCost,
    };
    const json = JSON.stringify(blueprintDTO);
    formData.append(
      'blueprintDTO',
      new Blob([json], { type: 'application/json' })
    );
    for (let index = 0; index < body.file.length; index++) {
      formData.append('blueprintDoc', body.file[index]);
    }
    return this.intance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  post4(url, body, token) {
    const formData = new FormData();
    const reportDTO = {
      projectId: body.projectId,
      reportTypeId: body.reportTypeId,
      reporterId: body.reporterId,
      reportName: body.reportName,
      reportDesc: body.reportDesc,
      reportDate: body.reportDate,
      reportDetailList: body.reportDetailList,
      taskReportList: body.taskReportList,
    };
    const json = JSON.stringify(reportDTO);
    formData.append(
      'reportDTO',
      new Blob([json], { type: 'application/json' })
    );
    for (let index = 0; index < body.file.length; index++) {
      formData.append('reportDocList', body.file[index]);
    }
    return this.intance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  post5(url, body, token) {
    const formData = new FormData();
    const requestDTO = {
      projectId: body.projectId,
      requestTypeId: body.requestTypeId,
      requestName: body.requestName,
      requestDate: body.requestDate,
      requestDesc: body.requestDesc,
      requestDetailList: body.requestDetailList,
      requesterId: body.requesterId,
    };
    const json = JSON.stringify(requestDTO);
    formData.append(
      'requestDTO',
      new Blob([json], { type: 'application/json' })
    );
    for (let index = 0; index < body.file.length; index++) {
      formData.append('requestDocList', body.file[index]);
    }
    return this.intance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  post6(url, body, token) {
    const formData = new FormData();
    const taskDTO = {
      projectId: body.projectId,
      taskName: body.taskName,
      taskDesc: body.taskDesc,
      planStartDate: body.planStartDate,
      planEndDate: body.planEndDate,
      assigneeId: body.assigneeId,
    };
    const json = JSON.stringify(taskDTO);
    formData.append('taskDTO', new Blob([json], { type: 'application/json' }));
    for (let index = 0; index < body.file.length; index++) {
      formData.append('taskDocList', body.file[index]);
    }
    return this.intance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  put(url, body, token) {
    return this.intance.put(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  put2(url, body, token) {
    const formData = new FormData();

    for (let index = 0; index < body.length; index++) {
      formData.append('file', body[index]);
    }

    return this.intance.put(url, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  put3(url, body, token) {
    const formData = new FormData();
    formData.append('file', body[0]);
    return this.intance.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'multipart/form-data',
      },
    });
  }

  delete(url, token) {
    return this.intance.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new AxiosService();
