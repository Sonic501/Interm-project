import axios from "axios";

const url = 'https://f-m-c-v3.azurewebsites.net';
const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjc4OTUzNjMyLCJleHAiOjE3NDIwNjc1MzZ9.oNbSE1phniTjfoBldw2ZfMJrjF4GsL1aqZr6HaDF21tD5c3DbQZaTnryLeRaLbu3DZlhRZSBXsZdIzroOWDsXQ";

const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}`, Accept: "*/*" },
});

export const getListSyllabus = async () => {
    try {
        return await (
            await instance.get(url + "/api/syllabus/live-search")
        ).data;
    } catch (error) {
        console.log(error.response);
    }
};