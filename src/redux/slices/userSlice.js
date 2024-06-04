import axios from 'axios'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from 'react-toastify';

const initialState = {
    users: [],
    currentUser: [],
    error: null,
    loading: null,
    msg: null
}

const axiosCus = axios.create({
    baseURL: 'https://f-m-c-v3.azurewebsites.net/api/',
});


//https://f-m-c-v3.azurewebsites.net/api/user/deleteUser?id=24'



export const getUserList = createAsyncThunk(
    "user/user_list",
    async (params, thunkAPI) => {
        const { page, rowsPerPage, token } = params;
        // console.log(page + rowsPerPage)
        //user/searchByFilter?Gender=true&Page=1&Size=10
        try {
            const res = await axiosCus.get(`user/searchByFilter?Page=${page}&Size=${rowsPerPage}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "*/*"
                }
            });
            return res.data;
        } catch (error) {
            console.log(error.response.data)
        }

    }
)
export const sortUserById = createAsyncThunk(
    "user/user_list/id",
    async (params, thunkAPI) => {
        // console.log(params)

        try {
            const { page, rowsPerPage, token } = params;

            // console.log(page + rowsPerPage)
            const res = await axiosCus.get(`user/searchByFilter?Page=${page}&Size=${rowsPerPage}&Order=id-asc`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "*/*"
                }
            });
            return res.data;
        } catch (error) {
            console.log(error.response.data)
        }
    }
)
export const sortUserByName = createAsyncThunk(
    "user/user_list/fullname",
    async (params, thunkAPI) => {
        // console.log(params)

        try {
            const { page, rowsPerPage, token } = params;
            // console.log(page + rowsPerPage)
            const res = await axiosCus.get(`user/searchByFilter?Page=${page}&Size=${rowsPerPage}&Order=fullName-asc`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "*/*"
                }
            });
            return res.data;
        } catch (error) {
            console.log(error.response.data)
        }
    }
)
export const sortUserByEmail = createAsyncThunk(
    "user/user_list/email",
    async (params, thunkAPI) => {
        // console.log(params)
        try {
            const { page, rowsPerPage, token } = params;
            // console.log(page + rowsPerPage)
            const res = await axiosCus.get(`user/searchByFilter?Page=${page}&Size=${rowsPerPage}&Order=email-asc`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "*/*"
                }
            });
            return res.data;
        } catch (error) {
            console.log(error.response.data)
        }
    }
)
export const sortUserByDate = createAsyncThunk(
    "user/user_list/dob",
    async (params, thunkAPI) => {
        // console.log(params)
        try {

            const { page, rowsPerPage, token } = params;
            // console.log(page + rowsPerPage)
            const res = await axiosCus.get(`user/searchByFilter?Page=${page}&Size=${rowsPerPage}&Order=dob-asc`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "*/*"
                }
            });
            return res.data;
        } catch (error) {
            console.log(error.response.data)
        }
    }
)
export const sortUserByLevel = createAsyncThunk(
    "user/user_list/level",
    async (params, thunkAPI) => {
        // console.log(params)


        try {
            const { page, rowsPerPage, token } = params;
            // console.log(page + rowsPerPage)
            const res = await axiosCus.get(`user/searchByFilter?Page=${page}&Size=${rowsPerPage}&Order=level-asc`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "*/*"
                }
            });
            return res.data;
        } catch (error) {
            console.log(error.response.data)

        }
    }
)
export const sortUserByRoleType = createAsyncThunk(
    "user/user_list/roleType",
    async (params, thunkAPI) => {
        // console.log(params)
        const { page, rowsPerPage, token } = params;
        // console.log(page + rowsPerPage)


        try {
            const res = await axiosCus.get(`user/searchByFilter?Page=${page}&Size=${rowsPerPage}&Order=role-asc`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "*/*"
                }
            });
            return res.data;
        } catch (error) {
            console.log(error.response.data)

        }
    }
)
export const setStatus = createAsyncThunk(
    "user/setStatus",
    async (params, thunkAPI) => {
        // console.log(params)
        try {
            const { page, rowsPerPage, token, idCurrentChosen, status } = params;

            if (status === 'De-activate user') {
                //https://f-m-c-v3.azurewebsites.net/api/user/de-activateUser?id=11
                const res = await axiosCus.put(`user/de-activateUser?id=${idCurrentChosen}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "*/*"
                    }
                })
                toast.success(`De-activate ID ${idCurrentChosen} successfully`, {
                    position: "top-center",
                });

                thunkAPI.dispatch(getUserList({ page, rowsPerPage, token }))
                return res.data;
            } else {
                const res = await axiosCus.put(`user/activateUser?id=${idCurrentChosen}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "*/*"
                    }
                })
                toast.success(`Activate ID ${idCurrentChosen} successfully`, {
                    position: "top-center",
                });

                thunkAPI.dispatch(getUserList({ page, rowsPerPage, token }))
                return res.data;
            }



        } catch (error) {
            toast.error(error.response.data, {
                position: "top-center",
            });
        }
    }
)
export const searchListStringConvert = createAsyncThunk(
    "user/search",
    async (params, thunkAPI) => {
        const { list, page, rowsPerPage, token } = params
        const values = list.map(obj => obj.name);


        const queryString = values.map(value => `search=${encodeURIComponent(value)}`).join('&');
        const url = `user/searchByFilter?${queryString}&Page=${page}&Size=${rowsPerPage}`;


        try {
            const res = await axiosCus.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "*/*"
                }
            })
            return res.data;

        } catch (error) {
            toast.error(error.response.data, {
                position: "top-center",
            });
        }

    }
)
export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (params, thunkAPI) => {
        // console.log(params)
        try {
            const { page, rowsPerPage, token, idCurrentChosenToDelete } = params;
            const res = await axiosCus.put(`user/deleteUser?id=${idCurrentChosenToDelete}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "*/*"
                }
            })
            toast.success("Delete successfully", {
                position: "top-center",
            });

            thunkAPI.dispatch(getUserList({ page, rowsPerPage, token }))
            return res.data;

        } catch (error) {
            toast.error(error.response.data, {
                position: "top-center",
            });
        }

    }
)
export const updateUser = createAsyncThunk(
    "user/update",
    async (params, thunkAPI) => {

        const { gender, nameUser, dateOfBirth, user, token } = params;
        const page = 1
        const rowsPerPage = 10
        try {
            const res = await axiosCus.put(`user/editUser`, {
                ...user,
                gender,
                fullName: nameUser,
                dob: dateOfBirth
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "*/*"
                }
            })
            thunkAPI.dispatch(getUserList({ page, rowsPerPage, token }))

            return res.data
        } catch (error) {
            toast.error(error.response.data, {
                position: "top-center",
            });
        }
    }
)
export const importUser = createAsyncThunk(
    "user/import",
    async (params, thunkAPI) => {
        const { replace, skip, token, fileName } = params
        const formData = new FormData();
        formData.append('file', fileName)
        try {
            const res = await axiosCus.post(`user/upload?replace=${replace}&skip=${skip}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "*/*",
                    "Content-Type": "multipart/form-data"
                }
            })
            toast.success("Upload file successfully", {
                position: 'top-center'
            })
            return res.data
        } catch (error) {
            toast.error(error.response.data, {
                position: "top-center",
            });
        }
    }
)
export const filterListUser = createAsyncThunk(
    "user/filterList",
    async (params, thunkAPI) => {
        const { gender, attendee, date, token } = params

        try {
            const res = await axiosCus.get(`user/searchByFilter?Dob=${date}&Gender=${gender}&AtendeeId=${attendee}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "*/*",
                        "Content-Type": "multipart/form-data"
                    }
                })
            // if () 
            console.log(res.data)
            return res.data

        } catch (error) {
            toast.error(error.response.data, {
                position: "top-center",
            });
        }
    }
)
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserList.pending, (state) => {
                state.loading = true;
            })

            .addCase(getUserList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            .addCase(getUserList.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.users = action.payload;
            })
            //---------------------------------------------------

            .addCase(sortUserById.pending, (state) => {
                state.loading = true;
            })

            .addCase(sortUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            .addCase(sortUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.users = action.payload;
            })

            //----------------------------------------------------
            .addCase(sortUserByName.pending, (state) => {
                state.loading = true;
            })

            .addCase(sortUserByName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            .addCase(sortUserByName.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.users = action.payload;
            })

            //----------------------------------------------------

            .addCase(sortUserByEmail.pending, (state) => {
                state.loading = true;
            })

            .addCase(sortUserByEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            .addCase(sortUserByEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.users = action.payload;
            })

            //-----------------------------------------------------
            .addCase(sortUserByDate.pending, (state) => {
                state.loading = true;
            })

            .addCase(sortUserByDate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            .addCase(sortUserByDate.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.users = action.payload;
            })

            //-----------------------------------------------------
            .addCase(sortUserByLevel.pending, (state) => {
                state.loading = true;
            })

            .addCase(sortUserByLevel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            .addCase(sortUserByLevel.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.users = action.payload;
            })

            //-----------------------------------------------------
            .addCase(sortUserByRoleType.pending, (state) => {
                state.loading = true;
            })

            .addCase(sortUserByRoleType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            .addCase(sortUserByRoleType.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.users = action.payload;
            })

            //-----------------------------------------------------
            .addCase(setStatus.pending, (state) => {
                state.loading = true;
            })

            .addCase(setStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            .addCase(setStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.users = action.payload;
            })
            //-----------------------------------------------------
            .addCase(searchListStringConvert.pending, (state) => {
                state.loading = true;
            })

            .addCase(searchListStringConvert.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            .addCase(searchListStringConvert.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.users = action.payload;
            })

            //-----------------------------------------------------

            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                // state.msg = action.payload;
            })

            //-----------------------------------------------------

            .addCase(importUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(importUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(importUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                // state.msg = action.payload;
            })
            //-----------------------------------------------------

            .addCase(filterListUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(filterListUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(filterListUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.users = action.payload;
            })
    }
})
export const { reducer: userReducer } = userSlice;
export default userReducer;

