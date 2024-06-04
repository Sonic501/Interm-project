import React, { useEffect, useState } from 'react'
import styles from "./UserList.module.scss";
import classNames from "classnames/bind";
import UserTable from './UserTable';
import AddNewButton from '../AddNewButton';
import ImportButton from '../ImportButton';
import ModalAddUser from '../UserPermission/ModalAddUser';
import BasicModal from '../UserPermission/ModalAddUser';
import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { searchListStringConvert } from '../../../redux/slices/userSlice';
import FilterModal from './FilterModal';

const cx = classNames.bind(styles);


const UserList = () => {
    const { token } = useSelector(state => state.auth)
    const { users } = useSelector(state => state.user)
    const page = 1
    const rowsPerPage = 10
    const [newItem, setNewItem] = useState('')
    const [searchList, setSearchList] = useState([]);
    const nav = useNavigate()
    const dispatch = useDispatch()
    const handleEnterPress = (event) => {
        if (event.code === 'Enter' && newItem !== '') {
            const newId = searchList.length > 0 ? searchList[searchList.length - 1].id + 1 : 1;
            const newSearchList = [...searchList, { id: newId, name: newItem }];
            setSearchList(newSearchList);
            setNewItem('');
        }
    };

    useEffect(() => {
        dispatch(searchListStringConvert({ list: searchList, page, rowsPerPage, token }))
    }, [searchList]);

    return (

        <div className={cx('wrapper-all')}>
            <div className={cx("title")}>
                User Management
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('left-content')}>
                    <div className={cx('search-input')}>
                        <div><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#285D9A" />
                        </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by..."
                            className={cx('input-search')}
                            value={newItem}
                            onChange={(event) => setNewItem(event.target.value)}
                            onKeyDown={handleEnterPress}
                            maxLength="100"
                        />
                    </div>
                    <div className={cx('filter-button')} >
                        <FilterModal />

                    </div>
                </div>
                <div className={cx('right-content')}>
                    <div className={cx('import-button')}>
                        {/* <ModalAddUser /> */}
                        <BasicModal />

                    </div>
                    <div className={cx('add-new-button')} >

                        <AddNewButton />
                    </div>
                </div>

            </div>
            <div className={cx('title-search-list')}>
                {searchList?.map((title, index) => (
                    <div key={index} className={cx('title-search')}>
                        {title.name} <span style={{ fontStyle: 'normal', paddingLeft: '8px' }} onClick={() => {
                            const newList = [...searchList];
                            newList.splice(index, 1);
                            setSearchList(newList);
                        }}>x</span>
                    </div>

                ))}

            </div>
            <div className={cx("usertable")}>
                <UserTable />
            </div>
        </div>
    )
}

export default UserList