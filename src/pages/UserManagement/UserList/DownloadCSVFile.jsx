import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
const DownloadCSVFile = () => {
    const { token } = useSelector(state => state.auth)
    const url = 'https://f-m-c-v3.azurewebsites.net/api/user/downloadCSVUser'

    const [downloadLink] = useState(url)

    const handleDownload = () => {
        axios({
            url: downloadLink,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: '*/*'
            },
            responseType: 'blob'
        })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const a = document.createElement('a');
                a.href = url;
                a.download = 'User_import.csv';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error downloading file:', error);
            });
    };
    return (
        <button onClick={handleDownload} className='underline text-[#1976D2]'>
            Download
        </button>
    );
}

export default DownloadCSVFile