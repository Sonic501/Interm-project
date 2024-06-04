import React from 'react'
import { useSelector } from 'react-redux';
import HeaderProgram from './HeaderProgram';
import BodyProgram from './BodyProgram';
import { useDispatch } from 'react-redux';

export default function CreateProgram() {

    // return 1 object that gets the program's information
    const program = useSelector((state) => state.program.value);
    return (
        <div>
            <HeaderProgram
                program={program}
            />
            <hr className='border-black' />
            <BodyProgram
                program={program}
            />
        </div>
    )
}
