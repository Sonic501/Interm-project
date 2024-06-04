import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// axios
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import storage from "redux-persist/lib/storage";
import { toast } from "react-toastify";
// import { persistor } from "../store";
axios.defaults.headers.post["Content-Type"] = "application/json";
const axiosCus = axios.create({
    baseURL: 'https://f-m-c-v3.azurewebsites.net/api/',
});
export const logout = createAsyncThunk(
    "user/logout",
    async (params, thunkAPI) => {
        try {

            storage.removeItem('persist:root');
            localStorage.clear();

            //clear state
            // await persistor.purge();
            toast.success("Logout successfully", {
                position: "top-center",
            });
        } catch (error) {
            // thunkAPI.dispatch(error(error.message));
            console.log(error)
            toast.error(err.response.data, {
                position: "top-center",
            });
        }
    }
);
export const login = createAsyncThunk(
    "user/login",
    async (params, thunkAPI) => {
        try {
            const res = await axiosCus.post(
                "user/login",
                {
                    email: params.email,
                    password: params.password,
                }
            );
            const { userDTO, token } = res.data;
            const roleId = userDTO?.roleId
            toast.success("Login successfully", {
                position: "top-center",
            });
            thunkAPI.dispatch(permissionGetOut({ roleId, token }))
            return { userDTO, token };
        } catch (err) {
            // console.log(err);
            toast.error(err.response.data, {
                position: "top-center",
            });
            return loading = false
        }
    }
);

export const permissionGetOut = createAsyncThunk(
    "user/permission",
    async (params, thunkAPI) => {
        const { roleId, token } = params
        try {
            const res = await axios.get(`https://f-m-c-v3.azurewebsites.net/api/user/getRoleDetailByRoleId?id=${roleId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: '*/*'
                    }
                }
            );
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
        }
    }
)

const initialState = {
    userDTO: {
        id: null,
        email: null,
        fullname: null,
        image: null,
        state: null,
        dob: null,
        phone: null,
        gender: null,
        status: null,
        roleId: null,
        roleName: null,
        levelId: null,
        levelCode: null,
        attendeeId: null,
        attendeeName: null
    },
    msg: "",
    permission: [],
    token: null,
    loading: false,
    error: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.userDTO = action.payload.userDTO;
                state.token = action.payload.token;
            })
            .addCase(permissionGetOut.pending, (state) => {
                state.loading = true;
            })
            .addCase(permissionGetOut.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(permissionGetOut.fulfilled, (state, action) => {
                state.loading = false;
                state.permission = action.payload;
            })

            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.userDTO = null;
                state.token = null;
            })
    },
});

export const { reducer: authReducer } = authSlice;

export default authReducer;
