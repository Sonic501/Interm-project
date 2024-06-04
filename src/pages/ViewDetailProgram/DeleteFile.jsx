import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Icon } from '@mui/material';
import axios from 'axios';
function DeleteFile(props) {
    // console.log(props.id)
    const deleteMT = async () => {
        await deleteMaterial(props.id);
    }

    const handleDelete = async () => {
        await deleteMT();
    }


    const url = 'https://f-m-c-v3.azurewebsites.net';
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjc4OTUzNjMyLCJleHAiOjE3NDIwNjc1MzZ9.oNbSE1phniTjfoBldw2ZfMJrjF4GsL1aqZr6HaDF21tD5c3DbQZaTnryLeRaLbu3DZlhRZSBXsZdIzroOWDsXQ';

    const instance = axios.create({
        baseURL: url,
        headers: { Authorization: `Bearer ${token}`, Accept: "/" },
    });

    const deleteMaterial = async (id) => {
        try {
            return await (
                await instance.put(url + "/api/training-material/delete" + '/' + id)
            ).data;
        } catch (error) {
            console.log(error.response);
        }
    };
    return (
        <Icon className="absolute float-right ml-96 gap-2.5 flex items-start w-[58px] text-blue-500 hover:text-red-500">
            <DeleteForeverIcon onClick={() => {
                if (window.confirm("Bạn có muốn delete hay không?")) {
                    handleDelete();
                }
            }}
            />
        </Icon>
    )
}

export default DeleteFile
