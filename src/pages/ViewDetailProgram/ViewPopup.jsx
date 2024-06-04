import React from 'react';
import { Icon } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import OutlineAPI from './axiosConnection';
import moment from 'moment';
import DeleteFile from './DeleteFile';
export function Popup(props) {

    const [unit, setUnit] = OutlineAPI(
        "https://f-m-c-v3.azurewebsites.net/api/unit/list-by-session/" + props.id
    );
    const [file, setFile] = OutlineAPI(
        "https://f-m-c-v3.azurewebsites.net/api/training-material/get-all/" + props.idMaterial
    );
return (

    props.id ? <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="absolute w-full h-full bg-gray-500 opacity-20" onClick={props.onClose}></div>
        {unit.map((unit, index) =>
            <div key={index}
                className={`pb-5 bg-white inline-flex flex-col items-center text-left drop-shadow-lg gap-[15px] rounded-[20px] font-['Inter']`}
            >
                <div className="py-2.5 pr-5 flex justify-between items-center text-white font-bold rounded-tl-[20px] rounded-tr-[20px] w-[709px] pl-[30px] bg-[rgba(45,55,72,1)]">
                    <div className="gap-10 w-[45px]">
                        <p className="text-base m-0 leading-[normal]">Day {unit.sessionNumber}</p>
                    </div>
                    <Icon onClick={props.onClose} className="w-6 gap-5 flex items-start text-white hover:text-red-500">
                        <HighlightOffIcon className='mb-10' />
                    </Icon>
                </div>
                <div className="w-full gap-5 flex flex-col items-start self-stretch pl-[30px] pr-[30px]">
                    <div className="flex items-center text-black font-bold gap-[50px]">
                        <p className="text-base m-0 leading-[normal]">Unit {unit.unitNumber}</p>
                        <p className="text-base m-0 leading-[normal]">{unit.unitTitle}</p>
                    </div>
                    <div className="w-full">
                        <div className="px-5 py-2.5 w-full gap-2.5 flex flex-col justify-center items-start self-stretch bg-[rgba(241,241,241,1)] rounded-[10px]">
                            <div className='font-bold'>{props.materialName}</div>
                            {file.map((file, index) =>
                                <div key={index} className="text-sm font-bold text-black m-0 leading-[normal]">
                                    <div className="w-full flex justify-between items-center self-stretch font-normal ">
                                        <p className="text-sm m-0 leading-[normal] text-[rgba(12,77,162,1)]">
                                            <a className='hover:text-red-500 underline underline-offset-1' href={file.data}>{file.name}</a>
                                        </p>
                                        <div className="absolute ml-52 flex items-center w-[243px] gap-[19px] text-[rgba(50,50,50,1)]">
                                            <p className=" absolute text-sm w-auto italic leading-[normal]  ">
                                                by {file.userName} on {moment(file.uploadDate).format('DD/MM/YY')}
                                            </p>
                                            <DeleteFile id={file.id}></DeleteFile>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div> : <></>

);
}



