import axioClient from "./axioClient.js";
function Request(table) {
  const route = {
    getAll: async () => await axioClient.get(`/${table}`),
    getOne: async (id) => await axioClient.get(`/${table}/${id}`),
    create: async (data) => await axioClient.post(`/${table}`, data),
    update: async (data, id) => await axioClient.put(`/${table}/${id}`, data),
  };
  return route;
}

export default Request;
