import { MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import './Table.scss'



const DropDown = ({ setUpdate, update, type, menuitem, role, icon }) => {

    const [ini, setIni] = React.useState({
        'roleId': role?.id,
        'permission_role': role[type],
        [type]: role[type],
    });

    const updateInit = (value) => {
        setIni({ ...ini, permission_role: value, [type]: value })
    }

    const handleChange = async (event) => {
        // debugger;
        updateInit(event.target.value);
        // handleUpdate();
        console.log(event.target.value)
        const newArr = update.map(item => {
            if (item.id === role?.id) {

                return { ...item, [type]: event.target.value }
            }
            else return item
        })
        // console.log(newArr)
        setUpdate(newArr);
    };






    const MenuItemCustom = (menuitem) => {

        return menuitem.map((i, index) => (
            <MenuItem key={index} value={i.permissionName} sx={{ gap: '10px' }}>
                {/* {console.log(i.id)} */}
                {icon[index]}
                {i.permissionName}</MenuItem>
        )
        )
    }


    return (
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{ borderRadius: '20px', height: '45px', boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.16)", border: 'none', }}
            value={ini?.permission_role}
            onChange={handleChange}
        // defaultValue={5}
        >
            {/* {console.log(ini?.contentId)} */}
            {MenuItemCustom(menuitem)}
            {/* <MenuItemCustom ></MenuItemCustom> */}
        </Select>
    )
}

export default DropDown