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
  handleError(error) {
    if (error.response.status == 401) {
      Swal.fire({
        icon: 'error',
        text: 'Thời gian đăng nhập hết hạn, vui lòng đăng nhập để được sử dụng lại',
        timer: 5000,
      });
      localStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
  get(url, token) {
    return this.intance.get(url, {
      headers: { Authorization: `Bearer &{token}` },
    });
  }

  post(url, body, token) {
    return this.intance.post(url, body, {
      headers: { Authorization: `Bearer &{token}` },
    });
  }

  post2(url, body, token) {
    return this.intance.post(url, body, {
      headers: {
        Authorization: `Bearer &{token}`,
        'content-type': 'multipart/form-data',
      },
    });
  }
  post3(url, body, token) {
    const formData = new formData();

    for (let index = 0; index < body.length; index++) {
      formData.append('file', body[index]);
    }

    return this.intance.post(url, formData, {
      headers: { Authorization: `Bearer &{token}` },
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
