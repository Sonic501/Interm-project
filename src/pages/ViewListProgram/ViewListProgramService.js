import { logout } from "/src/redux/slices/authSlice";
import axios from "axios";

const url = 'https://f-m-c-v3.azurewebsites.net';

const instance = axios.create({
  baseURL: url,
});

export const getAllTranningProgramByID = async (id) => {
  try {
    return await (
      await instance.get(url + "/api/training-program" + '/' + id)
    ).data;
  } catch (error) {
    console.log(error.response);
  }
};

export const getAllTranningProgramWithName = async (name, page, rowsPerPage, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    return await (
      await instance.post(url + "/api/training-program/search-training-program-by-keywords", { search: [name] }, {params: { pageNo: page, pageSize: rowsPerPage }, headers})
    ).data;
  } catch (error) {
    if (error.response.status === 401) 
    dispatch(logout())
    console.log(error.response);
  }
};

export const deActiveProgram = async (id, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    return await (
      await instance.put(url + "/api/training-program/de-active-training-program" + '/' + id, null, {headers})
    ).data;
  } catch (error) {
    if (error.response.status === 401) 
    dispatch(logout())
    console.log(error.response);
  }
};

export const activeProgram = async (id, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    return await (
      await instance.put(url + "/api/training-program/active-training-program" + '/' + id, null, {headers})
    ).data;
  } catch (error) {
    if (error.response.status === 401) 
    dispatch(logout())
    console.log(error.response);
  }
};

export const duplicateTrainingProgram = async (id, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    return await (
      await instance.post(url + "/api/training-program/duplicate-training-program" + '/' + id, null, {headers})
    ).data;
  } catch (error) {
    if (error.response.status === 401) 
    dispatch(logout())
    console.log(error.response);
  }
};

export const deleteTrainingProgram = async (id, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    return await (
      await instance.put(url + "/api/training-program/delete-training-program" + '/' + id, null, {headers})
    ).data;
  } catch (error) {
    if (error.response.status === 401) 
    dispatch(logout())
    console.log(error.response);
  }
};

export const editTrainingProgram = async (id, nameUser , token) => {
  const headers = { Authorization: `Bearer ${token}` };
  console.log(token)
  try {
    return await (
      await instance.put(url + `/api/training-program/edit-training-program` + "/" + id + "/" + nameUser, null, {headers})
    ).data;
  } catch (error) {
    if (error.response.status === 401) 
    dispatch(logout())
    console.log(error.response);
  }
};