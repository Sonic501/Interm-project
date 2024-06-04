import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PositionedMenu from './PositionedMenu';
import OutlineAPI from './axiosConnection';
import moment from 'moment';

export default function ViewProgram() {
  const id = useParams()
  const [program, setProgram] = OutlineAPI(
    "https://f-m-c-v3.azurewebsites.net/api/training-program/" + id.programID
  );
  const [syllabus, setSyllabus] = OutlineAPI(
    "https://f-m-c-v3.azurewebsites.net/api/syllabus/list-by-training-program/" + id.programID
  );

  return (
    <div>
      <div
        className=" mt-1 py-5 pr-0 gap-2.5 flex flex-col justify-center items-start text-white w-[100%] pl-[30px] bg-[rgba(45,55,72,1)]">
        <p
          className="text-2xl font-medium m-0 tracking-[3.2px] leading-[normal]"
        >
          Training program
        </p>
        <div className="gap-5 flex items-center w-[1200px]">
          <p
            className="text-4xl tracking-[3.2px] leading-[normal] font-bold"
          >
            {program.name}
          </p>
          {/* <button className="border-2 rounded-2xl w-20">{program.state}</button> */}
          <button className="border-2 rounded-2xl w-20">{program.state ? "Active" : "Deactive"}</button>
          <div className="absolute right-8 text-6xl mb-5 w-12 h-12"><PositionedMenu nameProgram={program.name} state={program.state} idChange={program.id}/></div>
        </div>
      </div>
      <div
        className="py-5 flex flex-col justify-center items-start text-black w-[1172px] pl-[30px] gap-[5px]"
      >
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center w-[69px]">
            <p className="text-2xl font-bold m-0 leading-[normal] mb-3">
              {program.day}
            </p>
            <p
              className="h-6 text-sm font-normal m-0 w-[41px] leading-[normal]"
            >
              {" days"}
            </p>
          </div>
          <div className="w-[70px]">
            <p
              className="h-6 text-sm italic m-0 w-[70px] leading-[normal]"
            >
              ({program.hour} hours)
            </p>
          </div>
        </div>
        <div className="leading-none relative">
          <p
            className="text-sm font-normal inline m-0 leading-[normal]"
          >
            {"Modified on "}
          </p>
          <p className="text-sm italic inline m-0 leading-[normal]">
            {moment(program.lastDateModified).format('DD/MM/YYYY')}
          </p>
          <p
            className="text-sm font-normal inline m-0 leading-[normal]"
          >
            {" by "}
          </p>
          <p
            className="text-sm font-bold inline m-0 leading-[normal]"
          >
            {program.lastModifierName}
          </p>
        </div>
      </div>
      <hr className='border-zinc-800'></hr>
      <div className="w-full gap-0.5 text-black font-bold">
        <div
          className="w-full pt-2.5 pr-2.5 gap-2.5 flex items-start self-stretch"
        >
          <p className="pl-[30px] text-2xl m-0 leading-[normal] ">
            Content
          </p>
        </div>
      </div>
      {syllabus.map((syllabus, index) =>
        <div key={index}
          className={(syllabus.status || "opacity-[0.5]") + " py-5 h-24 bg-white gap-2.5 flex flex-col justify-center items-start pl-[30px] ml-8 mt-5 pr-[30px] w-[960px] drop-shadow-lg rounded-[20px]"}
        >
          <div
            className="gap-2.5 flex items-start font-bold w-[700px] pr-[30px] text-[rgba(45,55,72,1)]"
          >
            <div className="gap-5 flex items-center w-[900px]">
              <p key={syllabus.id}
                className="text-2xl m-0 tracking-[3.2px] leading-[normal]"
              >
                <Link className='text-[rgba(45,55,72,1)] hover:text-red-300 ' to={`/program/view_program_detail/${program.id}/${syllabus.id}`}>{syllabus.name}</Link>
              </p>
              <button className='border-2 rounded-2xl w-20 bg-[rgba(45,55,72,1)]  text-white'>{syllabus.status ? "Active" : "Inactive"}</button>
            </div>
          </div>
          <div
            className="gap-2.5 flex items-start font-normal text-[rgba(71,71,71,1)]"
          >
            <p className="text-sm m-0 leading-[normal]">
              {syllabus.code}  v{syllabus.version}
            </p>
            <p className="ml-3">|</p>
            <p className="text-sm m-0 leading-[normal]">
              <br />
            </p>
            <div className="leading-none relative">
              <p className="text-sm inline m-0 leading-[normal]">
                {syllabus.day} days
                <span className='italic'>    ({syllabus.hour} hours)</span>
              </p>
            </div>
            <p className="ml-3 text-justify">|</p>
            <p className="text-sm m-0 leading-[normal]">
              <br />
            </p>
            <div className="leading-none relative">
              <p className="text-sm inline m-0 leading-[normal]">
                {"Modified on "}
              </p>
              <p
                className="text-sm italic inline m-0 leading-[normal]"
              >
                {moment(syllabus.lastDateModified).format('DD/MM/YYYY')}
              </p>
              <p className="text-sm inline m-0 leading-[normal]">
                {" by "} {syllabus.lastModifierName}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

