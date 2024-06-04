import axios from "axios";
const url = "https://f-m-c-v3.azurewebsites.net";
//  "https://616b96d516c3fa0017171731.mockapi.io/syllabus"
const instance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
