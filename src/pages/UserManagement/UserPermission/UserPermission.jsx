import React, { useEffect } from 'react'
import styles from "./UserPermisson.module.scss";
import classNames from "classnames/bind";
import UserPermissionTable from './UserPermissionTable';
import { getRoleDetail } from '../../../redux/slices/roleSlice';
import { useDispatch } from 'react-redux';


const cx = classNames.bind(styles);
const UserPermission = () => {


    return (
        <div className={cx('wrapper-all')}>
            <div className={cx("title")}>
                User Permission
            </div>
            <UserPermissionTable />

        </div>
    )
}

export default UserPermission