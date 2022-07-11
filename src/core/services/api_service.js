import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`
  }
});

client.interceptors.request.use((req) => {
  console.log('Axios request: ', req);
  return req;
});

client.interceptors.response.use((res) => {
  console.log('Axios response: ', res);
});

const getResource = (src) => {
  return client.get(src);
}

const postResource = (src, body) => {
  return client.post(src, body);
}

const putResource = (src, body) => {
  return client.put(src, body);
}

const deleteResource = (src) => {
  return client.delete(src);
}

export { getResource, postResource, putResource, deleteResource }