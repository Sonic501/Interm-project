import config from '../../config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { updateProgramName } from './redux/programSlice'
import { useSelector } from 'react-redux';

export default function CreateProgramName() {
    const dispatch = useDispatch();
    const today = new Date();

    const { userDTO } = useSelector((state) => state.auth);
    const [inputValueName, setInputValueName] = useState('');

    const createNewProgram = (programName, dateCreated, creatorName) => {
        dispatch(updateProgramName({
            programName: programName,
            dateCreated: dateCreated,
            creatorName: creatorName,
        }))
    }

    // get input value and disabled at create program name
    const [isDisabled, setIsDisabled] = useState(true);

    const getInputValue = (e) => {
        setInputValueName(e.target.value);
        if (e.target.value != '') {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }
    return (
        <div>
            <div>
                <div>
                    <h1 className='bg-[#2D3748] text-white text-2xl mt-1 p-3 pl-5 tracking-[3px]'>New Training program</h1>
                </div>
                <div className='mt-5 pl-5'>
                    <label className='text-xs text font-medium'>Program name*</label>
                    <br />
                    <input className='border rounded-lg border-black h-7 w-3/12 placeholder: p-4 text-sm italic font-semibold' placeholder='Type program name'
                        onChange={getInputValue}
                    />
                    <Link to={config.routes.createProgram}>
                        <button className='border rounded-lg border-black bg-[#2D3748] text-white font-normal h-8 w-20 ml-3'
                            disabled={isDisabled}
                            onClick={createNewProgram(inputValueName,
                                today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
                                userDTO?.fullName)}
                        >
                            Create
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

