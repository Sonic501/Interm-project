import Loading from '../../../components/Loading/Loading'
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import classNames from "classnames/bind";
import styles from './UserPermissionTable.module.scss'
import { AddIcon, SortIcon } from '../../../components/Icons';
import { changeRolePermission, getRoleDetail } from '../../../redux/slices/roleSlice';
import DropDown from './DropDown';
import { FullAccess, ModifyIcon, RevealIcon, UnrevealIcon } from './IconSelectDropdown';
import axios from 'axios';
import AddNewButton from '../AddNewButton';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles);

const MENUITEM = [
    {
        "id": 1,
        "permissionName": "Access denied",
        "status": true
    },
    {
        "id": 2,
        "permissionName": "View",
        "status": true
    },
    {
        "id": 3,
        "permissionName": "Modify",
        "status": true
    },
    {
        "id": 4,
        "permissionName": "Create",
        "status": true
    },
    {
        "id": 5,
        "permissionName": "Full access",
        "status": true
    }

];

const UserPermissionTable = () => {
    const { rolePermissions, loading, error } = useSelector((state) => state.role);

    // const [MENUITEM2, setMENUITEM] = useState({})

    const [listUpdate, setListUpdate] = useState(rolePermissions)

    const { token } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(getRoleDetail({ token }))
        console.log("first time render")
        // console.log(listUpdate);
    }, [])

    const HEADER_TITLES = ['Role name', 'Syllabus', 'Training program', 'Class', 'Learning material', 'User', ''];
    const ICON = [<UnrevealIcon fill={"#285D9A"} />, <RevealIcon fill={'#285D9A'} />, <ModifyIcon />, <AddIcon />, <FullAccess />]


    // console.log(rolePermissions)
    // console.log(MENUITEM2)

    const handleReload = () => {
        dispatch(getRoleDetail({ token }));
    }

    const checkBeforeSave = (originalArr, updatedArr) => {
        let hasChanged = false;

        for (let i = 0; i < originalArr?.length; i++) {
            const originalObj = originalArr[i];
            const updatedObj = updatedArr?.find(obj => obj?.id === originalObj?.id);
            if (updatedObj) {
                for (const prop in originalObj) {
                    if (originalObj[prop] !== updatedObj[prop]) {
                        hasChanged = true;
                        break;
                    }
                }

            }
        }
        return hasChanged;
    }


    const handleSubmitRole = () => {
        if (checkBeforeSave(rolePermissions, listUpdate)) {

            Swal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, save it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(changeRolePermission({ listUpdate, token }))
                    setTimeout(() => {
                        dispatch(getRoleDetail({ token }))
                    }, 2000)
                }
            })
        }
        else {
            Swal.fire('You are not changed anythings!')
        }
    }

    const renderTable = rolePermissions?.map((role) => {
        return (role?.id == 1 || role?.id == 4 ? <TableRow
            key={role?.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {role?.roleName}
            </TableCell>
            <TableCell align="left">
                {role?.id == 4 ?
                    <FormControl sx={{ width: "200px" }}>

                        <DropDown setUpdate={setListUpdate} update={listUpdate} type={'syllabusPermission'} role={role} menuitem={MENUITEM} icon={ICON} />

                    </FormControl>
                    :
                    <FormControl sx={{ width: "200px" }} disabled>

                        <DropDown setUpdate={setListUpdate} update={listUpdate} type={'syllabusPermission'} role={role} menuitem={MENUITEM} icon={ICON} />

                    </FormControl>
                }



            </TableCell>
            <TableCell align="left">
                <FormControl sx={{ width: "200px" }} disabled>

                    <DropDown setUpdate={setListUpdate} update={listUpdate} type={'traningProgramPermission'} role={role} menuitem={MENUITEM} icon={ICON} />
                </FormControl>
            </TableCell>
            <TableCell align="left">
                <FormControl sx={{ width: "200px" }} disabled>

                    <DropDown setUpdate={setListUpdate} update={listUpdate} type={'classPermission'} role={role} menuitem={MENUITEM} icon={ICON} />
                </FormControl>
            </TableCell>

            <TableCell align="left">
                <FormControl sx={{ width: "200px" }} disabled>

                    <DropDown setUpdate={setListUpdate} update={listUpdate} type={'leaningMaterialPermission'} role={role} menuitem={MENUITEM} icon={ICON} />
                </FormControl>
            </TableCell>
            <TableCell align="left">
                <FormControl sx={{ width: "200px", border: '2px' }} disabled>

                    <DropDown setUpdate={setListUpdate} update={listUpdate} type={'userPermission'} role={role} menuitem={MENUITEM} icon={ICON} />
                </FormControl>
            </TableCell>


        </TableRow> : <TableRow
            key={role?.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {role?.roleName}
            </TableCell>
            <TableCell align="left">

                <FormControl sx={{ width: "200px" }} >

                    <DropDown setUpdate={setListUpdate} update={listUpdate} type={'syllabusPermission'} role={role} menuitem={MENUITEM} icon={ICON} />
                </FormControl>


            </TableCell>
            <TableCell align="left">
                <FormControl sx={{ width: "200px" }} >

                    <DropDown setUpdate={setListUpdate} update={listUpdate} type={'traningProgramPermission'} role={role} menuitem={MENUITEM} icon={ICON} />
                </FormControl>
            </TableCell>
            <TableCell align="left">
                <FormControl sx={{ width: "200px" }} >

                    <DropDown setUpdate={setListUpdate} update={listUpdate} type={'classPermission'} role={role} menuitem={MENUITEM} icon={ICON} />
                </FormControl>
            </TableCell>

            <TableCell align="left">
                <FormControl sx={{ width: "200px" }} >

                    <DropDown setUpdate={setListUpdate} update={listUpdate} type={'leaningMaterialPermission'} role={role} menuitem={MENUITEM} icon={ICON} />
                </FormControl>
            </TableCell>
            <TableCell align="left">
                <FormControl sx={{ width: "200px" }} >

                    <DropDown setUpdate={setListUpdate} update={listUpdate} type={'userPermission'} role={role} menuitem={MENUITEM} icon={ICON} />
                </FormControl>
            </TableCell>


        </TableRow>)
    })

    return (

        <>
            {loading ? (<Loading></Loading>) : error ? (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', }}>
                <button style={{ backgroundColor: '#2D3748', padding: '10px 10px', borderRadius: '10px', color: 'white', fontWeight: 'bold' }} onClick={handleReload}>Click to try again</button>
            </div>) : (
                <>
                    <div className={cx("header")}>
                        <AddNewButton />
                    </div>
                    <TableContainer component={Paper} sx={{
                        overflowX: 'scroll',
                        '&::-webkit-scrollbar': {
                            width: 0,
                        }
                    }}>
                        <Table sx={{
                            minWidth: 650,

                        }} aria-label="simple table">
                            <TableHead sx={{
                                borderRadius: '20px !important',
                            }}>
                                <TableRow sx={{
                                    "& th": {
                                        fontSize: "14px",
                                        fontWeight: "700",
                                        color: "white",
                                        backgroundColor: "#2D3748",
                                    }
                                }}>
                                    {HEADER_TITLES.map(title => (

                                        <TableCell align='left' key={title} className={cx('header-wrap-icon')}>
                                            {title.length > 0 ? (<>{title}
                                                <span className={cx('sort-icon')}><SortIcon ></SortIcon> </span>
                                            </>) : (<>{title}</>)}
                                        </TableCell>
                                    ))}

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {renderTable}

                            </TableBody>
                        </Table>

                        {/* <Pagination
                    count={Math.ceil(users.length / pageSize)}
                    page={page}
                    onChange={handlePageChange}
                    sx={{
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: 'center',
                    }}
                /> */}
                    </TableContainer>
                    <div className={cx("footer")}>
                        <button className={cx("f-cancel")}>Cancel</button>
                        <button className={cx("f-save")} onClick={handleSubmitRole}>Save</button>
                    </div>

                </>


            )}
        </>
    )
}

export default UserPermissionTable