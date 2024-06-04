import React, { useEffect, useState } from 'react'
import styles from "./UserTable.module.scss";

import { MoreHorizontalIcon, SortIcon } from '../../../components/Icons'
import { GenderIconFemale, GenderIconMale } from '../dataUser'
import classNames from "classnames/bind";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip, Grid, MenuItem, Pagination, Select, TablePagination, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserList, setStatus, sortUserByDate, sortUserByEmail, sortUserById, sortUserByLevel, sortUserByName, sortUserByRoleType } from '../../../redux/slices/userSlice';
// import { changeRoleName } from '../../../redux/slices/authSlice';
import Loading from '../../../components/Loading/Loading';
import Swal from 'sweetalert2';
import { changeRoleName } from '../../../redux/slices/roleSlice';

//modal

import ModalEditUser from './ModalEditUser';
import moment from 'moment';
import RowsPerPage from './RowPerPage';
import { DeleteUser, RevealIcon, Role, UnrevealIcon } from '../UserPermission/IconSelectDropdown';





const cx = classNames.bind(styles);

const UserTable = () => {
    // debugger;
    const { users, loading, error } = useSelector((state) => state.user);
    const { userDTO, token } = useSelector((state) => state.auth);
    const totalPages = users?.totalPages
    // const [data, setData] = useState(user);
    // const iniPage = users?.pageable?.pageNumber + 1

    // const inirowsPerPage = users?.pageable?.pageSize
    const currentRowsPerPage = users?.totalElements

    // console.log(currentRowsPerPage)

    const [page, setPage] = useState(1);

    const [rowsPerPage, setRowsPerPage] = useState(10); // number of items to display per page


    const handlePageChange = (event, value) => {
        setPage(value);
    };



    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        dispatch(getUserList({ page, rowsPerPage, token }));
    }, [dispatch, page, rowsPerPage]);

    const handleReload = () => {
        dispatch(getUserList({ page, rowsPerPage, token }));
    }

    const handleRoleSelect = (e, row) => {
        let check = false;
        check = (userDTO?.id !== row?.id && row?.roleName !== "Super Admin")
        if (check) {
            const nameRole = e.target.textContent
            const idCurrentChosen = row?.id
            // console.log(roleName)
            // console.log(roleId)
            dispatch(changeRoleName({ page, rowsPerPage, token, idCurrentChosen, nameRole }))
        }
        else {
            Swal.fire({
                title: 'Error',
                text: 'You can not change Super Admin role',
                icon: 'error',
                confirmButtonText: 'OK',
            })
        }
    };

    const handleDeleteUser = (row) => {
        let check = false;
        check = (userDTO?.id !== row?.id && row?.roleName !== "Super Admin")
        if (check) {
            const idCurrentChosenToDelete = row?.id
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteUser({ page, rowsPerPage, token, idCurrentChosenToDelete }))
                }
            })
        }
        else {
            Swal.fire({
                title: 'Error',
                text: 'You can not delete Super Admin role',
                icon: 'error',
                confirmButtonText: 'OK',
            })
        }
    }

    const CustomChip = ({ e }) => {
        // console.log(e);
        let label;
        switch (e) {
            case "Super Admin":
                label = <Chip label={'Super Admin'} style={{ color: 'white', backgroundColor: '#4DB848' }}></Chip>;
                break;
            case "Class Admin":
                label = <Chip label={'Class Admin'} style={{ color: 'white', backgroundColor: '#3DDE35' }}></Chip>;
                break;
            case "Student":
                label = <Chip label={'Student'} style={{ color: 'white', backgroundColor: '#2D3748' }}></Chip>;
                break;
            case "Trainer":
                label = <Chip label={'Trainer'} style={{ color: 'white', backgroundColor: '#2D3748' }}></Chip>;
                break;
            case "In class":
                label = <Chip label={'In class'} style={{ color: 'white', backgroundColor: '#2D3748' }}></Chip>;
                break;
            case "On boaring":
                label = <Chip label={'On boaring'} style={{ color: 'white', backgroundColor: '#D45B13' }}></Chip>;
                break;
            case "Off class":
                label = <Chip label={'Off class'} style={{ color: 'white', backgroundColor: '#8B8B8B' }}></Chip>;
                break;
            case "Active":
                label = <Chip label={'Active'} style={{ color: 'white', backgroundColor: '#2D3748' }}></Chip>;
                break;
            case "De-active":
                label = <Chip label={'De-active'} style={{ color: 'white', backgroundColor: '#2D3748', opacity: '0.2' }}></Chip>;
                break;
            default:
                label = "Unknown option";
                break;
        }

        return <div>{label}</div>;

    }

    const handleClickOpenModal = () => {
        // alert('hello')
        setShowModal(!showModal)
        // console.log(row?.id)
    }

    const handleSetStatus = (e, row) => {
        let check = false;
        check = (userDTO?.id !== row?.id && row?.roleName !== "Super Admin")
        if (check) {
            const status = e.target.textContent
            const idCurrentChosen = row?.id
            console.log(status)
            console.log(idCurrentChosen)
            dispatch(setStatus({ page, rowsPerPage, token, idCurrentChosen, status }))
        }
        else {
            Swal.fire({
                title: 'Error',
                text: 'You can not set Super Admin status',
                icon: 'error',
                confirmButtonText: 'OK',
            })
        }
    }




    return (
        <>
            {loading ? (<Loading></Loading>) : error ? (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', }}>
                <button style={{ backgroundColor: '#2D3748', padding: '10px 10px', borderRadius: '10px', color: 'white', fontWeight: 'bold' }} onClick={handleReload}>Click to try again</button>
            </div>) : (
                <>
                    <TableContainer component={Paper} sx={{
                        overflowX: 'scroll',
                        '&::-webkit-scrollbar': {
                            width: 0,
                        }
                    }}>
                        <Table sx={{ minWidth: 650, }} aria-label="simple table" stickyHeader >
                            <TableHead>
                                <TableRow sx={{
                                    "& th": {
                                        fontSize: "14px",
                                        fontWeight: "700",
                                        color: "white",
                                        backgroundColor: "#2D3748",
                                    }
                                }}>


                                    <TableCell align='left' className={cx('header-wrap-icon')}>
                                        ID
                                        <span className={cx('sort-icon')} onClick={() => dispatch(sortUserById({ page, rowsPerPage, token }))}>
                                            <SortIcon ></SortIcon>
                                        </span>

                                    </TableCell>
                                    <TableCell align='left' className={cx('header-wrap-icon')}>
                                        Fullname
                                        <span className={cx('sort-icon')} onClick={() => dispatch(sortUserByName({ page, rowsPerPage, token }))}>
                                            <SortIcon ></SortIcon>
                                        </span>

                                    </TableCell>
                                    <TableCell align='left' className={cx('header-wrap-icon')}>
                                        Email
                                        <span className={cx('sort-icon')} onClick={() => dispatch(sortUserByEmail({ page, rowsPerPage, token }))}>
                                            <SortIcon ></SortIcon>
                                        </span>

                                    </TableCell>
                                    <TableCell align='left' className={cx('header-wrap-icon')}>
                                        Date of birth
                                        <span className={cx('sort-icon')} onClick={() => dispatch(sortUserByDate({ page, rowsPerPage, token }))}>
                                            <SortIcon ></SortIcon>
                                        </span>

                                    </TableCell>
                                    <TableCell align='left' className={cx('header-wrap-icon')}>
                                        Gender
                                        <span className={cx('sort-icon')}>
                                            <SortIcon ></SortIcon>
                                        </span>

                                    </TableCell>
                                    <TableCell align='left' className={cx('header-wrap-icon')}>
                                        Level
                                        <span className={cx('sort-icon')} onClick={() => dispatch(sortUserByLevel({ page, rowsPerPage, token }))}>
                                            <SortIcon ></SortIcon>
                                        </span>

                                    </TableCell>
                                    <TableCell align='left' className={cx('header-wrap-icon')}>
                                        Type
                                        <span className={cx('sort-icon')} onClick={() => dispatch(sortUserByRoleType({ page, rowsPerPage, token }))}>
                                            <SortIcon ></SortIcon>
                                        </span>

                                    </TableCell>
                                    <TableCell align='left' className={cx('header-wrap-icon')}>
                                        Status
                                        <span className={cx('sort-icon')}>
                                            <SortIcon ></SortIcon>
                                        </span>

                                    </TableCell>
                                    <TableCell align='left' className={cx('header-wrap-icon')}>


                                    </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users ? (users?.content?.map((row) => (
                                    <TableRow
                                        key={row?.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row?.id}
                                        </TableCell>
                                        <TableCell align="left" sx={{ fontWeight: 'bold' }}>{row?.fullName} </TableCell>
                                        <TableCell align="left">{row?.email}</TableCell>
                                        <TableCell align="left">{moment(row?.dob).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell align="left">{row?.gender == 1 ? (<GenderIconMale></GenderIconMale>) : (<GenderIconFemale></GenderIconFemale>)}</TableCell>
                                        <TableCell align="left">{row?.levelCode}</TableCell>
                                        {/* <TableCell align="left">{row?.roleId}</TableCell> */}
                                        <TableCell align="left">{<CustomChip e={row?.roleName}></CustomChip>}</TableCell>
                                        {/* <TableCell align="left">{row?.stateName}</TableCell> */}
                                        <TableCell align="left">{<CustomChip e={row?.stateName}></CustomChip>}</TableCell>


                                        <TableCell align="left">
                                            <div tabIndex={0} className='dropdown dropdown-left text-[#285D9A]' onClick={handleClickOpenModal}>
                                                <MoreHorizontalIcon ></MoreHorizontalIcon>
                                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <div className="border-b-2 py-1 px-3  text-[16px] font-bold">Manage</div>

                                                    <ModalEditUser user={row} page={page} rowsPerPage={rowsPerPage} />


                                                    <li><a><span><Role fill={"#285D9A"} /></span>Change role </a>
                                                        <ul className="submenu dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ">
                                                            <li onClick={(e) => handleRoleSelect(e, row)}><a>Class Admin</a></li>
                                                            <li onClick={(e) => handleRoleSelect(e, row)}><a>Trainer</a></li>
                                                            <li onClick={(e) => handleRoleSelect(e, row)}><a>Student</a></li>
                                                        </ul>
                                                    </li>



                                                    {
                                                        row?.stateName === 'Active' || row?.stateName === 'De-active' ? (
                                                            <li onClick={(e) => handleSetStatus(e, row)}>
                                                                {row?.stateName === 'Active' ? (<a><span><UnrevealIcon fill={"#285D9A"} /></span>De-activate user</a>) : (<a><span><RevealIcon fill={"#285D9A"} /></span>Activate user</a>)}
                                                            </li>
                                                        ) : null
                                                    }
                                                    <li onClick={() => handleDeleteUser(row)}><a><span><DeleteUser fill={"#285D9A"} /></span>Delete user</a></li>
                                                </ul>
                                            </div>
                                        </TableCell>

                                    </TableRow>
                                ))) : (<>NOT FOUND</>)}
                            </TableBody>
                        </Table>



                    </TableContainer>

                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={4} sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: 'center',
                        }}>
                            <Pagination
                                showLastButton
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                sx={{
                                    display: 'flex',
                                    alignItems: "center",
                                    justifyContent: 'center',
                                }}
                            />

                        </Grid>
                        <Grid item xs={4} sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: 'end',
                            gap: '10px',
                            paddingRight: '20px',
                        }}>
                            <RowsPerPage rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} currentTotalElements={currentRowsPerPage} />
                        </Grid>
                    </Grid>
                </>

            )}



        </>

    )
}

export default UserTable