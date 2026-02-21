import axioClient from "./axioClient.js";
function Request(table) {
  const route = {
    getAll: async () => await axioClient.get(`/${table}`),
    getOne: async (id) => await axioClient.get(`/${table}/${id}`),
    create: async (data) => await axioClient.post(`/${table}`, data),
    update: async (data, id) => await axioClient.put(`/${table}/${id}`, data),
    delete: async (id) => await axioClient.delete(`/${table}/${id}`),
  };
  return route;
}

export default Request;
