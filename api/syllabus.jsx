import api from "./api";

//get all sylabuses
export const getSyllabuses = async () => {
  const response = await api.get("/syllabus");
  return response.data;
};

//get sylabus with id
export const getSyllabus = async (id) => {
  const response = await api.get(`/syllabus/${id}`);
  return response.data;
};

//create sylabus
export const createSyllabusAPI = async (data) => {
  const response = await api.post("/syllabus", data);
  return response.data;
};

//update sylabus with id
export const updateSyllabus = async (id, data) => {
  const response = await api.put(`/syllabus/${id}`, data);
  return response.data;
};

//delete sylabus with id
export const deleteSyllabusAPI = async (id) => {
  const response = await api.delete(`/syllabus/${id}`);
  return response.data;
};

//get drafts
export const getSyllabusesDraft = async () => {
  const response = await api.get("/draft");
  return response.data;
};
