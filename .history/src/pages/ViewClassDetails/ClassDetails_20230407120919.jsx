import React, { Fragment, useEffect, useState } from "react";
//icons
import lab from "../../assets/icons/lab.png";
import exam from "../../assets/icons/exam.png";
import guide from "../../assets/icons/guide.png";
import seminar from "../../assets/icons/seminar.png";
import concept from "../../assets/icons/concept.png";
import general from "../../assets/icons/general.png";
import star from "../../assets/icons/star.png";
import admin from "../../assets/icons/admin.png";
import vector from "../../assets/icons/vector.png";
import alarm from "../../assets/icons/alarm.png";
import home_work from "../../assets/icons/home_work.png";
import fsu from "../../assets/icons/fsu.png";
import openTab from "../../assets/icons/openTab.png";
import closeTab from "../../assets/icons/closeTab.png";
import noImage from "../../assets/images/no-image.png";

import { Disclosure } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminTraining,
  fetchTrainerTrainingClass,
  fetchTrainingClassDataDetail,
  fetchTrainingListProgram,
  fetchTrainingProgram,
} from "../../redux/slices/viewClassDetails/classDetailSlice";
import { useParams } from "react-router-dom";

const ViewClassDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [attendOpen, setAttendOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const item = useSelector(
    (state) => state.trainingClassDetail.trainingClassDataDetail
  );

  const user = useSelector(
    (state) => state.trainingClassTrainer.trainerTrainerClassdata
  );

  const program = useSelector(
    (state) => state.trainingClassTrainer.trainingProgram
  );

  const listProgram = useSelector(
    (state) => state.trainingClassTrainer.listTrainingProgram.content
  );

  const adminTraining = useSelector(
    (state) => state.trainingClassTrainer.adminTraining
  );


  const dispatch = useDispatch();
  const toggleButton = () => setIsOpen(!isOpen);
  const toggleTime = () => setTimeOpen(!timeOpen);
  const toggleAttend = () => setAttendOpen(!attendOpen);

  let { id } = useParams();
  // const dataDetail = content.find(prod => prod.id == id)
  const [activeTab, setActiveTab] = useState("tab1");
  //  Functions to handle Tab Switching
  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };
  const handleTab3 = () => {
    setActiveTab("tab3");
  };
  const handleTab4 = () => {
    setActiveTab("tab4");
  };
  // loading truoc
  useEffect(() => {
    dispatch(fetchTrainingClassDataDetail({ id }));
    dispatch(fetchTrainerTrainingClass({ id }));
    dispatch(fetchTrainingProgram({ id }));
    dispatch(fetchAdminTraining({ id })); dispatch(fetchTrainingListProgram())
  }, []);

  return (
    <>
      <div className="tittle h-[201px] text-white mt-[2px] bg-[#2D3748] ">
        <div className="tittle p-[20px_0px_30px_20px] ">
          <h2 className="text-[24px] font-medium tracking-[0.2em]">Class</h2>
          <h1 className="text-[36px] tracking-[0.2em] font-bold flex content-center items-center">
            {item.className}{" "}
            <span className="font-normal text-[16px] tracking-normal bg-[#B9B9B9] p-[5px_15px_5px_15px] rounded-[50px] border-[1.5px] border-[white] ml-[20px]">
              {item.state}
            </span>
          </h1>
          <h3 className="font-bold text-[16px] ">{item.classCode}</h3>
          <div className="border-[0.5px] border-[#FFFFFF] mt-[10px] w-[645px]"></div>
          <h2 className="font-bold text-[24px] mt-[10px]">
            {item.day}
            <span className="text-[14px] font-normal ml-[5px]">
              days &nbsp; ({item.hour} hours)
            </span>
            &nbsp; &nbsp; |
            <div className="inline-flex gap-[20px] pl-[14px] ">
              <img className="inline-block" src={lab} alt="lab" />
              <img className="inline-block" src={concept} alt="lab" />
              <img className="inline-block" src={exam} alt="lab" />
              <img className="inline-block" src={seminar} alt="lab" />
              <img className="inline-block" src={guide} alt="lab" />
            </div>
          </h2>
        </div>
      </div>

      <div className="  first-container flex ">
        <div className="basis-1/5">
          <div className=" general  mt-[30px] ml-[20px] ">
            <div
              onClick={toggleButton}
              className="toggleButton flex content-center  items-center justify-between p-[5px_20px_5px_20px] rounded-[10px] w-[373px] h-[40px] bg-[#2D3748] "
            >
              <div className="left-content">
                <img className="inline-block" src={general} alt="lab" />
                &nbsp; &nbsp;
                <span className="text-[#FFFFFF]">General</span>
              </div>
              {isOpen ? (
                <img className="inline-block " src={openTab} alt="lab" />
              ) : (
                <img className="inline-block " src={closeTab} alt="lab" />
              )}
            </div>

            <div className="flex w-full bg-white rounded-xl pl shadow-md ">
              <ul
                className={
                  isOpen
                    ? "overflow-y-auto max-h-100"
                    : " overflow-y-auto max-h-0 "
                }
              >
                <div className="grid grid-cols-3 px-6 py-3">
                  <dt className="font-bold">
                    <img className="inline-block " src={alarm} alt="lab" />{" "}
                    Class Time
                  </dt>
                  <dd className="col-span-2 px-2">
                    {item.startTime} - {item.endTime}
                  </dd>
                </div>

                <div className="grid grid-cols-3 px-6 py-3">
                  <dt className="font-bold">
                    <img className="inline-block " src={home_work} alt="lab" />{" "}
                    Location
                  </dt>
                  <dd className="col-span-2 px-2 ">{item.locationName}</dd>
                </div>

                <div className="grid grid-cols-3 px-6 py-3">
                  <dt className="font-bold">
                    <img className="inline-block " src={vector} alt="lab" />{" "}
                    Trainer
                  </dt>
                  <dd className="col-span-2 px-2 "> {user?.map((userName) => (
                    <div>{userName.fullName}</div>
                  ))}</dd>
                </div>

                <div className="grid grid-cols-3 px-6 py-3">
                  <dt className="font-bold">
                    <img className="inline-block " src={admin} alt="lab" />{" "}
                    Admin
                  </dt>
                  <dd className="col-span-2 px-2 ">{adminTraining.map((admin) => (
                    <div>{admin.fullName}</div>
                  ))}</dd>
                </div>

                <div className="grid grid-cols-3 px-6 py-1">
                  <dt className="font-bold">
                    <img className="inline-block " src={fsu} alt="lab" />
                    <i className="text-2xl text-[#285D9A] mr-1 px-1" />
                    FSU
                  </dt>
                  <dd className="col-span-2 px-2 py-2">
                    {item.fsuName}
                    <br />
                    {item.contactName}
                  </dd>
                </div>
                <div className="border-b-2 m-1"></div>
                <div className="grid grid-cols-3 px-6 py-1">
                  <dt className="font-bold">Created </dt>
                  <dd className="col-span-2 px-2 ">
                    {item.dateCreated} by {item.creatorName}
                  </dd>
                </div>
                <div className="grid grid-cols-3 px-6 py-1">
                  <dt className="font-bold">Reviewed</dt>
                  <dd className="col-span-2 px-2">
                    {item.dataReviewed} by {item.reviewerName}
                  </dd>
                </div>
                <div className="grid grid-cols-3 px-6 py-1">
                  <dt className="font-bold">Approved </dt>
                  <dd className="col-span-2 px-2">
                    {item.dateApproved} by {item.approverName}
                  </dd>
                </div>
              </ul>
            </div>
          </div>
          <div className="Attendee inline-block mt-[30px] ml-[20px] ">
            <div
              onClick={toggleAttend}
              className="toggleAttend flex content-center  items-center justify-between p-[5px_20px_5px_20px] rounded-[10px] w-[373px] h-[40px] bg-[#2D3748] "
            >
              <div className="left-content">
                <img className="inline-block " src={star} alt="lab" />
                <span className="text-[#FFFFFF] general  mt-[30px] ml-[10px]">
                  Attendee {item.attendeeName}
                </span>
              </div>

              {attendOpen ? (
                <img className="inline-block " src={openTab} alt="lab" />
              ) : (
                <img className="inline-block " src={closeTab} alt="lab" />
              )}
            </div>

            <div className="flex w-full bg-white rounded-xl pl shadow-md ">
              <ul
                className={
                  attendOpen
                    ? "overflow-y-auto max-h-60 w-full"
                    : " overflow-y-auto max-h-0 w-full"
                }
              >
                <div className="flex w-full bg-white text-white font-bold rounded-xl shadow-md mt-0.5  ">
                  <div className="flex flex-row w-full  text-center ">
                    <div className="bg-[#2D3748] basis-1/3 rounded-l-xl py-3">
                      <span>Planned</span>
                      <br />
                      <span className="text-2xl">{item.planned}</span>
                    </div>
                    <div className="bg-[#285D9A] basis-1/3 py-3">
                      <span>Accepted</span>
                      <br />
                      <span className="text-2xl">{item.accepted} </span>
                    </div>
                    <div className="bg-[#F1F1F1] basis-1/3 rounded-r-xl text-black py-3">
                      <span>Actual</span>
                      <br />
                      <span className="text-2xl">{item.actual} </span>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className=" basis-8/12 Time-frame inline-block mt-[30px] ml-[20px] ">
          <div
            onClick={toggleTime}
            className="toggleTime flex content-center  items-center justify-between p-[5px_20px_5px_20px] rounded-[10px] w-[746px] h-[40px] bg-[#2D3748] "
          >
            <div className="left-content">
              <img className="inline-block" src={general} alt="lab" />
              &nbsp; &nbsp;
              <span className="text-[#FFFFFF] ">Time Frame</span>
            </div>
            {timeOpen ? (
              <img className="inline-block " src={openTab} alt="lab" />
            ) : (
              <img className="inline-block " src={closeTab} alt="lab" />
            )}
          </div>

          <div className="flex gap-2">
            <ul
              className={
                timeOpen
                  ? "overflow-y-auto max-h-60"
                  : " overflow-y-auto max-h-0 "
              }
            >
              <div class="flex justify-between mb-2">
                <button class="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M9.707 3.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L14.586 11H2a1 1 0 0 1 0-2h12.586l-3.293-3.293a1 1 0 0 1 0-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <h2 class="text-gray-900 font-medium">April 2023</h2>
                <button class="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M10.293 16.707a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 1.414L5.414 9H18a1 1 0 0 1 0 2H5.414l3.293 3.293a1 1 0 0 1 0 1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex flex-wrap -mx-2">
                <div class="w-1/7 px-2">
                  <div class="text-sm font-medium text-gray-500 tracking-wider uppercase mb-2">
                    Sun
                  </div>
                </div>
                <div class="w-1/7 px-2">
                  <div class="text-sm font-medium text-gray-500 tracking-wider uppercase mb-2">
                    Mon
                  </div>
                </div>
                <div class="w-1/7 px-2">
                  <div class="text-sm font-medium text-gray-500 tracking-wider uppercase mb-2">
                    Tue
                  </div>
                </div>
                <div class="w-1/7 px-2">
                  <div class="text-sm font-medium text-gray-500 tracking-wider uppercase mb-2">
                    Wed
                  </div>
                </div>
                <div class="w-1/7 px-2">
                  <div class="text-sm font-medium text-gray-500 tracking-wider uppercase mb-2">
                    Thu
                  </div>
                </div>
                <div class="w-1/7 px-2">
                  <div class="text-sm font-medium text-gray-500 tracking-wider uppercase mb-2">
                    Fri
                  </div>
                </div>
                <div class="w-1/7 px-2">
                  <div class="text-sm font-medium text-gray-500 tracking-wider uppercase mb-2">
                    Sat
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-[30px] ml-[20px] ">
        <div className="Tabs flex flex-col">
          <ul className="nav flex w-[700px]">
            <li
              className={
                activeTab == "tab1"
                  ? "cursor-pointer z-10 text-center   w-[200px]  h-[30px] text-white rounded-[20px_20px_0px_0px]  bg-[#2D3748] "
                  : "cursor-pointer z-10 text-center   w-[200px]  h-[30px] text-white rounded-[20px_20px_0px_0px]  bg-[#6D7684] "
              }
              onClick={handleTab1}
            >
              Training Program
            </li>
          </ul>

          <div className="outlet">
            {(() => {
              switch (activeTab) {
                case "tab1":
                  return (
                    <div className="flex flex-col gap-[20px] mt-[2px] ">
                      <div className="w-[1137px] h-[86px] p-[10px_30px_20px_30px] bg-[#2D3748] rounded-[0px_20px_0px_0px]">
                        <h1 className="font-[500px] text-[28px] text-[#FFFFFF] tracking-[0.2em]">
                          {program.name}
                        </h1>
                        <div className="flex text-white">
                          {program.day} days &nbsp;&nbsp;|&nbsp;&nbsp;
                          <p>
                            Modified on &nbsp;
                            <span className="italic">
                              {program.lastDateModified}
                            </span>
                            &nbsp;by &nbsp;
                            <span className="font-bold">
                              {program.lastModifierName}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex my-3 w-full">
                     
                        
                        <div className="w-1/5 flex bg-[#2D3748] h-[96px] py-4 px-6 space-x-3 rounded-l-3xl items-center ">
                          <img
                            className="rounded-full w-14 h-14 "
                            src={noImage}
                            alt="lab"
                          />
                          <img
                            className="rounded-full w-14 h-14"
                            src={noImage}
                            alt="lab2"
                          />
                          <img
                            className="rounded-full w-14 h-14"
                            src={noImage}
                            alt="lab"
                          />
                        </div>
                       
                        <div className="bg-white rounded-r-3xl py-4 px-6 w-4/5 shadow-md">
                          {listProgram?.map((program) => (
                            <div className="bg-white rounded-r-3xl py-4 px-6 w-4/5 shadow-md">
                            <div>
                              <div className="flex items-center space-x-4">
                                <h1 className="font-bold text-2xl text-[#0D3B66]">
                                  {program.name}
                                </h1>
                                <span className="bg-[#2D3748] px-4 rounded-full text-white">
                                  {program.status ? "Active" : "InActive"}{" "}
                                </span>
                              </div>
                              <div className="block">
                                {program.day} days (
                                <span className="italic">{program.hour} </span>{" "}
                                hours) &nbsp;&nbsp;|&nbsp;&nbsp; on{" "}
                                <span className="italic">
                                  {program.dateCreated}{" "}
                                </span>{" "}
                                by
                                {program.creatorName}
                              </div>
                            </div>
                            </div>
                          ))}
                        </div>
                      </div>


                      {/* {listProgram?.map((program) =>  (
                                            <div className="flex my-3 w-full" key={syllabus.id}>
                                                <div className="flex w-1/5 bg-[#0D3B66] items-center py-4 px-6 space-x-3 rounded-l-3xl">
                                                    {/* TOOLTIP */}
                                                    {/* {classItem.listTrainer.slice(0,3).map(trainer => (
                                                        <div className="tooltip-container inline cursor-pointer" key={trainer.id}>
                                                            <img className="rounded-full w-14 h-14" src={trainer.avatar} alt="trainer avatar" />
                                                            <div className="tooltip-content inline invisible absolute p-3 bg-white text-black z-10 rounded-xl shadow-2xl">
                                                                <div className="inline-flex items-center">
                                                                    <img className="border-2 border-[#0D3B66] rounded-full w-14 h-14" src={trainer.avatar} alt="trainer avatar" />
                                                                    <div className="p-3 text-[#0D3B66]">
                                                                        <span className="font-bold">{trainer.fullname}</span><br />
                                                                        <span>{trainer.email}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                </div> */}
                                                {/* <div className="bg-white rounded-r-3xl py-4 px-6 w-4/5 shadow-md">
                                                    <div className="flex items-center space-x-4">
                                                        <h1 className="font-bold text-2xl text-[#0D3B66]">{syllabus.name}</h1>
                                                        <span className="bg-[#2D3748] px-4 rounded-full text-white">{syllabus.status}</span>
                                                    </div>
                                                    <div className="block">
                                                        {syllabus.code} {syllabus.version} &nbsp;&nbsp;|&nbsp;&nbsp;
                                                        {syllabus.days} days (<span className="italic">{syllabus.hours}</span> hours) &nbsp;&nbsp;|&nbsp;&nbsp;
                                                        on <span className="italic">{format(parseISO(syllabus.updatedDate), "dd/MM/yyyy")}</span> by SomeoneImportant
                                                    </div>
                                                </div>
                                            </div>
                                        ))} */} 
                                       

                      {/* <div className="w-[1137px] h-[96px]  flex">
                        <div className="w-1/5 flex bg-[#2D3748] h-[96px] items-center content-center ">
                          <img
                            className="rounded-full w-14 h-14 "
                            src={noImage}
                            alt="lab"
                          />
                          <img
                            className="rounded-full w-14 h-14"
                            src={noImage}
                            alt="lab2"
                          />
                          <img
                            className="rounded-full w-14 h-14"
                            src={noImage}
                            alt="lab"
                          />
                        </div>
                        <div className="w-4/5 py-4 px-6 shadow-md">
                          {listProgram?.map((program) => (
                            <div>
                              <div className="flex items-center space-x-4">
                                <h1 className="font-bold text-2xl text-[#0D3B66]">
                                  {program.name}
                                </h1>
                                <span className="bg-[#2D3748] px-4 rounded-full text-white">
                                  {program.status ? "Active" : "InActive"}{" "}
                                </span>
                              </div>
                              <div className="block">
                                {program.day} days (
                                <span className="italic">{program.hour} </span>{" "}
                                hours) &nbsp;&nbsp;|&nbsp;&nbsp; on{" "}
                                <span className="italic">
                                  {program.dateCreated}{" "}
                                </span>{" "}
                                by
                                {program.creatorName}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div> */}


                    </div>
                  );
              }
            })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewClassDetails;
