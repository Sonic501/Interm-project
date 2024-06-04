import axios from 'axios'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUserList } from './userSlice'
import { toast } from 'react-toastify'
const initialState = {
    rolePermissions: [],
    error: null,
    loading: null,
    msg: null,
}

const axiosCus = axios.create({
    baseURL: 'https://f-m-c-v3.azurewebsites.net/api/',
});

export const getRoleDetail = createAsyncThunk(
    "user/user_role",
    async (params, thunkAPI) => {

        try {
            const { token } = params
            const res = await axiosCus.get("user/getAllRoleDetail", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: '*/*'
                }
            });
            console.log(res.data)

            return res.data;
        } catch (error) {
            console.log(error.response.data)
        }

    }
)
export const changeRoleName = createAsyncThunk(
    "user/changeRole",
    async (params, thunkAPI) => {
        const { page, rowsPerPage, token, idCurrentChosen, nameRole } = params
        console.log(params)
        try {
            const res = await axiosCus.put(`user/changeRole?id=${idCurrentChosen}&roleName=${nameRole}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: '*/*'
                }
            });
            console.log(res.data)
            toast.success("Change role successfully", {
                position: "top-center",
            });
            thunkAPI.dispatch(getUserList({ page, rowsPerPage, token }))
            return res.data;

        } catch (error) {
            console.log(error)
        }
    }
)
export const changeRolePermission = createAsyncThunk(
    "user/change-role-permission",
    async (params, thunkAPI) => {
        console.log(params)
        const { listUpdate, token } = params
        try {
            const res = await axiosCus.put(`user/updateRole`, listUpdate, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: '*/*'
                }
            });

            console.log(res.data)
            toast.success("Change permission successfully", {
                position: "top-center",
            });
        } catch (error) {
            console.log(error)
        }
    }
)

const roleSlice = createSlice({
    name: "rolePermissions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRoleDetail.pending, (state) => {
                state.loading = true;
            })

            .addCase(getRoleDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            .addCase(getRoleDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false; 
                state.rolePermissions = action.payload;
            })

            .addCase(changeRoleName.pending, (state) => {
                state.loading = true;
            })
            .addCase(changeRoleName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            .addCase(changeRoleName.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                // state.msg = action.payload;
            })

        // .addCase(changeRolePermission.pending, (state) => {
        //     state.loading = true;
        // })
        // .addCase(changeRolePermission.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.error;
        // })

        // .addCase(changeRolePermission.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.error = false;
        //     state.msg = action.payload;
        // })

    }
})
export const { reducer: roleReducer } = roleSlice;
export default roleReducer;