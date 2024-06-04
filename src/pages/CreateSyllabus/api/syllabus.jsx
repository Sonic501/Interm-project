import api from "./api";


//create sylabus
export const createSyllabusAPI = async (data) => {
  const response = await api.post("/dbPlayers", data);
  return response.data;
};

