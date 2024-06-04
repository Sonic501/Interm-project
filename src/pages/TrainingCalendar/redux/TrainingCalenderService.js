import axios from "axios";
import { setIsLoading, setTrainingPrograms } from "./trainingCalendarSilce";
import { logout } from "../../../redux/slices/authSlice";
const URL = "https://f-m-c-v3.azurewebsites.net";
// const URL = "http://127.0.0.1:3000";

/**
 *
 * @param {Object} params - { method: string, url: string, data: object, headers: object}
 * @param {Function} dispatch - dispatch function from redux
 * @returns {Promise} - Promise object represents the response from the server
 */
const api = async (params, dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const response = await axios({ ...params, baseURL: `${URL}/api/class-schedule` });
    return response;
  } catch (error) {
    if (error.status === 401) {
      dispatch(logout());
    }
    throw error;
  } finally {
    dispatch(setIsLoading(false));
  }
};

/**
 * The function sends a POST request to the /day endpoint with the nowDate parameter.
 * @param {string} nowDate - The date of the day for which the calendar is requested
 *
 * @returns
 */
function getCalendarByDay(nowDate, token) {
  const headers = { Authorization: `Bearer ${token}` };
  return async (dispatch) => {
    try {
      const data = await api(
        { method: "post", url: "day", data: { nowDate: nowDate.toLocaleDateString("fr-CA") }, headers },
        dispatch
      );
      dispatch(setTrainingPrograms(data));
    } catch (error) {
      dispatch(setTrainingPrograms([]));
    }
  };
}

function getCalendarByWeek(date, token) {
  const headers = { Authorization: `Bearer ${token}` };
  const firstDayOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
  const lastDayOfWeek = new Date(date.setDate(firstDayOfWeek.getDate() + 6));
  return async (dispatch) => {
    try {
      const data = await api(
        {
          method: "post",
          url: "week",
          data: { startDate: firstDayOfWeek.toLocaleDateString("fr-CA"), endDate: lastDayOfWeek.toLocaleDateString("fr-CA") },
          headers,
        },
        dispatch
      );
      dispatch(setTrainingPrograms(data));
    } catch (error) {
      dispatch(setTrainingPrograms([]));
      console.log(error);
    }
  };
}

function searchCalendarByDay(nowDate, searchText, token) {
  const headers = { Authorization: `Bearer ${token}` };
  return async (dispatch) => {
    try {
      const data = await api(
        { method: "post", url: "search/day", data: { nowDate: nowDate.toLocaleDateString("fr-CA"), searchText }, headers },
        dispatch
      );
      dispatch(setTrainingPrograms(data));
    } catch (error) {
      dispatch(setTrainingPrograms([]));
      console.log(error.response);
    }
  };
}

function searchCalendarByWeek(date, searchText, token) {
  const headers = { Authorization: `Bearer ${token}` };
  const firstDayOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
  const lastDayOfWeek = new Date(date.setDate(firstDayOfWeek.getDate() + 6));
  return async (dispatch) => {
    try {
      const data = await api(
        {
          method: "post",
          url: "search/week",
          data: {
            startDate: firstDayOfWeek.toLocaleDateString("fr-CA"),
            endDate: lastDayOfWeek.toLocaleDateString("fr-CA"),
            searchText,
          },
          headers,
        },
        dispatch
      );
      dispatch(setTrainingPrograms(data));
    } catch (error) {
      dispatch(setTrainingPrograms([]));
      console.log(error.response);
    }
  };
}

export { getCalendarByDay, getCalendarByWeek, searchCalendarByDay, searchCalendarByWeek };
