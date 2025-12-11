import axioClient from "./axioClient.js";
function Request(table) {
  const route = {
    getAll: () => axioClient.get(`/${table}`),
    getOne: (id) => axioClient.get(`/${table}/${id}`),
    create: (data) => axioClient.post(`/${table}`, data),
    update: (data, id) => axioClient.put(`/${table}/${id}`, data),
  };
  return route;
}

export default Request;
