
import axiosClient from "./api/axiosClient";
import { SYLLABUS } from "./types";
import Swal from "sweetalert2";





export const addDraft = (params) => {
  console.log(params);
  return (dispatch) => {
    // const token = axiosClient.getToken();
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjc4OTUzNjMyLCJleHAiOjE3NDIwNjc1MzZ9.oNbSE1phniTjfoBldw2ZfMJrjF4GsL1aqZr6HaDF21tD5c3DbQZaTnryLeRaLbu3DZlhRZSBXsZdIzroOWDsXQ'

    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        // .post("/syllabus/draft", params)
        .post("/api/syllabus/create", params)

        .then((response) => {
          if (response) {
            console.log(response);
            Swal.fire(
              "Saved as draft!",
              "Your file has been save as draft.",
              "success"
            ).then(() => {
              window.location.reload();
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Update status training program fail!",
          });
        });
    }
  };
};

export const addSyllabus = (params) => {
  console.log(params);
  return (dispatch) => {
    // const token = axiosClient.getToken();
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjc4OTUzNjMyLCJleHAiOjE3NDIwNjc1MzZ9.oNbSE1phniTjfoBldw2ZfMJrjF4GsL1aqZr6HaDF21tD5c3DbQZaTnryLeRaLbu3DZlhRZSBXsZdIzroOWDsXQ'
      axiosClient.setHeaderAuth(token);
      axiosClient
        .post("/api/syllabus/create", params)
        .then((response) => {
          if (response) {
            console.log(response);
            Swal.fire("Saved!", "Your file has been save.", "success").then(
              () => {
                window.location.reload();
              }
            );
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Update status training program fail!",
          });
        });
    
  };
};



export const setDraft = (payload) => {
  return {
    type: SYLLABUS.SET_DRAFT,
    payload,
  };
};

export const setLevel = (payload) => {
  return {
    type: SYLLABUS.SET_LEVEL,
    payload,
  };
};

export const setDelivery = (payload) => {
  return {
    type: SYLLABUS.SET_DELIVERY,
    payload,
  };
};

export const setOutputStandard = (payload) => {
  return {
    type: SYLLABUS.SET_OUTPUT_STANDARD,
    payload,
  };
};




export const deleteDraft = (id) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .deleteWithId(`/syllabus/${id}`)
        .then((response) => {
          if (response) {
            console.log(response);
            dispatch(getDraft());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
}