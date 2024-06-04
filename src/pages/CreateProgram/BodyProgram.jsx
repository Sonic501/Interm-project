import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box } from '@mui/system';
import { createNewProgramContent, deleteProgramContent, reInitialState } from './redux/programSlice';
import { nanoid } from '@reduxjs/toolkit';
import WarningIcon from '@mui/icons-material/Warning';
import axios from 'axios';
import { getListSyllabus } from './CreateProgramService';
import { useDispatch } from 'react-redux';

const Token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjc4OTUzNjMyLCJleHAiOjE3NDIwNjc1MzZ9.oNbSE1phniTjfoBldw2ZfMJrjF4GsL1aqZr6HaDF21tD5c3DbQZaTnryLeRaLbu3DZlhRZSBXsZdIzroOWDsXQ";

export default function BodyProgram(props) {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const data = await getListSyllabus();
        // console.log(data.map(data => data))
        if (data) {
            setData(data);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    const baseURl = "https://f-m-c-v3.azurewebsites.net/api/training-program/saveTrainingProgram";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const today = new Date();

    const [syllabusSelected, setSyllabusSelected] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [listSyllabusSelected, setListSyllabusSelected] = useState([]);
    const [deleteID, setDeleteID] = useState();
    const [day, setDay] = useState();
    const [hour, setHour] = useState();

    // Open or close suggestion dialog
    const showSuggestion = (event) => {
        const value = event.target.value;
        const listID = [];
        if (value.length > 1) {
            setSyllabusSelected([]);
            data.map(data => {
                if (data.name.toLowerCase().includes(value.toLowerCase())) {
                    listID.push(data.id);
                    console.log(listID);
                    for (let i = 0; i < listID.length; i++) {
                        if (data.id === listID[i]) {
                            syllabusSelected.push({
                                id: data.id,
                                name: data.name,
                                code: data.code,
                                version: data.version,
                                hour: data.hour,
                                day: data.day,
                                dateCreated: data.dateCreated,
                                lastDateModified: data.lastDateModified,
                                status: data.status,
                                creatorName: data.creator.fullName,
                            })
                            setListSyllabusSelected(syllabusSelected);
                        }
                    }
                    setShowOptions(true);
                }
            })
        }
        if (value === '') {
            setShowOptions(false);
        }

    }

    // create new program content
    const createProgramContent = ((id, name, code, version, hour, day, dateCreated, lastDateModified, status, creatorName) => {
        dispatch(createNewProgramContent({
            id: id,
            name: name,
            code: code,
            version: version,
            hour: hour,
            day: day,
            dateCreated: dateCreated,
            lastDateModified: lastDateModified,
            status: status,
            creatorName: creatorName,
        }))

    })

    // click to get back page CreateProgramName
    const backToCreateProgramName = () => {
        dispatch(reInitialState());
        navigate(config.routes.createProgramName)
    }

    // push data to API
    const pushDataToAPI = () => {
        const listProgramContentID = props.program.content.map(content => content.id)
        const program = {
            name: props.program.programName,
            syllabusIdList: listProgramContentID,
        }

        const headers = {
            'Authorization': 'Bearer ' + Token,
            'accept': '*/*'
        };

        axios.post(baseURl, program, { headers })
            .catch((error) => console.log(error))

        dispatch(reInitialState());
        setShowSaveModal(false);

        navigate(config.routes.createProgramName)
    }

    return (
        <div>
            <div className='ml-2 p-4'>
                <h1 className='text-3xl font-bold mb-4'>Content</h1>
                {
                    props.program.content?.map(content => {
                        return (
                            <Box className='flex' key={content.id}>
                                <Box className='border rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25),_-4px_-4px_4px_rgba(0,0,0,0.1)] pl-5 pt-3 w-[1000px]'>
                                    <span className='text-3xl font-bold tracking-[6px]'>{content.name}</span>
                                    <label className='border rounded-full bg-[#2D3748] text-white text-center ml-3 pl-3 pr-3'>{content.status ? "Active" : "Inactive"}</label>
                                    <div className='mt-3 mb-5'>
                                        <label className='font-normal text-sm'>{content.code} {content.version}</label>
                                        <span className='ml-2'>|</span>
                                        <span className='ml-2'>{content.day <= 1 ? `${content.day} day` : `${content.day} days`}</span>
                                        <span className='ml-2'>({content.hour.toFixed(2)} hours)</span>
                                        <span className='ml-2'>|</span>
                                        <span className='ml-2'>Modified on
                                            <span className='italic ml-1'>{content.dateCreated}</span> by
                                            <strong className='ml-1'>{content.creatorName}</strong>
                                        </span>
                                    </div>
                                </Box>
                                <Box className='flex items-center justify-center border rounded-lg bg-[#E74A3B] w-8 ml-2'
                                >
                                    <DeleteForeverIcon className='text-white cursor-pointer'
                                        onClick={() => {
                                            setDeleteID(content.id);
                                            setDay(content.day);
                                            setHour(content.hour);
                                            setShowDeleteModal(true)
                                        }}
                                    />
                                </Box>
                                {/* Modal delete a program */}
                                <div className={showDeleteModal ? 'text-center border rounded-[4px] w-[400px] fixed left-[550px] top-[200px] bg-[#EEEEEE]'
                                    : 'hidden'}>
                                    <WarningIcon className='text-red-600' />
                                    <p className='text-3xl font-bold leading-10'>Are you sure you want to delete this item?</p>
                                    <div className='mt-4 mb-4'>
                                        <button className='border rounded-lg border-black bg-[#2D3748] text-white font-normal h-8 w-20 mr-20'
                                            onClick={() => setShowDeleteModal(false)}>
                                            Cancel
                                        </button>
                                        <button className='border rounded-lg border-black bg-[#2D3748] text-white font-normal h-8 w-20'
                                            onClick={() => {
                                                dispatch(deleteProgramContent({
                                                    id: deleteID,
                                                    day: day,
                                                    hour: hour,
                                                }))
                                                setShowDeleteModal(false);
                                            }}>
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </Box>
                        )
                    })
                }
                <div className='flex mt-5'>
                    <label className='font-bold'>Select syllabus</label>
                    <div className='border rounded-lg border-black ml-3 flex w-72'>
                        <img src='/public/vector.png' className='p-1 ml-1' />
                        <input className='italic rounded-lg outline-none w-full ml-1'
                            onChange={showSuggestion}
                        />
                    </div>
                </div>
                {/* Modal show suggestion when enter an input */}
                <div className={showOptions ? 'bg-[#FFFFFF]' : "hidden"}>
                    <div className='w-[290px] ml-[120px]'>
                        <Card className='pl-9 pt-1 pb-1'>
                            {
                                listSyllabusSelected.map(syllabus => {
                                    return (
                                        <div key={syllabus.id}>
                                            <button className='text-left hover:bg-[#F1F1F1]'
                                                onClick={() => createProgramContent(
                                                    syllabus.id,
                                                    syllabus.name,
                                                    syllabus.code,
                                                    syllabus.version,
                                                    syllabus.hour,
                                                    syllabus.day,
                                                    syllabus.dateCreated,
                                                    syllabus.lastDateModified,
                                                    syllabus.status,
                                                    syllabus.creatorName)
                                                }
                                            >
                                                <p className='font-bold'>{syllabus.name}</p>
                                                <span className='italic text-xs'>{syllabus.hour} hrs</span>
                                                <span className='italic text-xs ml-5'>{syllabus.lastDateModified} by</span>
                                                <strong className='italic text-xs ml-1'>{syllabus.creatorName}</strong>
                                            </button>
                                        </div>
                                    )
                                }
                                )
                            }
                        </Card>
                    </div>

                </div>
                <div className='mt-10'>
                    <button className='border rounded-lg border-black bg-[#2D3748] text-white font-normal h-8 w-20'
                        onClick={backToCreateProgramName}
                    >
                        Back
                    </button>
                    <button className='underline text-red-600 ml-[980px]'
                        onClick={backToCreateProgramName}
                    >
                        Cancel
                    </button>
                    <button className='border rounded-lg border-black bg-[#2D3748] text-white font-normal h-8 w-20 ml-3'
                        onClick={() => setShowSaveModal(true)}>
                        Save
                    </button>
                </div>
                {/* Modal save a program */}

                <div className={showSaveModal ? 'text-center border rounded-[4px] w-[400px] fixed left-[550px] top-[200px] bg-[#EEEEEE]'
                    : 'hidden'}>
                    <WarningIcon className='text-red-600' />
                    <p className='text-3xl font-bold leading-10'>Are you sure to want save this item?</p>
                    <div className='mt-4 mb-4'>
                        <button className='border rounded-lg border-black bg-[#2D3748] text-white font-normal h-8 w-20 mr-20'
                            onClick={() => setShowSaveModal(false)}>Cancel</button>
                        <button className='border rounded-lg border-black bg-[#2D3748] text-white font-normal h-8 w-20'
                            onClick={pushDataToAPI}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
