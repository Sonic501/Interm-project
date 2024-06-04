import React, { Fragment, useEffect, useState } from "react";
//icons
import Time from "../resources/icons/Time.png";
import trainer from "../resources/icons/trainer.png";
import Location from "../resources/icons/Location.png";
import FSU from "../resources/icons/FSU.png";
import admin from "../resources/icons/admin.png";

import exam from "../resources/icons/exam.png";
import guide from "../resources/icons/guide.png";
import seminar from "../resources/icons/seminar.png";
import concept from "../resources/icons/concept.png";
import general from "../resources/icons/general.png";
import openTab from "../resources/icons/openTab.png";
import star from "../resources/icons/star.png";
import lens from "../resources/icons/lens.png";
import warming from "../resources/icons/Warning-logo.png";
import closeW from "../resources/icons/close.png";
import lab from "../resources/icons/lab.png";
//images

import noImage from "../../../assets/images/no-image.png";
//libary
import { Dialog, Disclosure, Tab, Transition } from "@headlessui/react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Calendar from "./Calendar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTrainingClassData } from "../../../redux/slices/viewClass/classSlice";
import Content from "./Content";
import { fetchTrainingProgramData } from "../../../redux/slices/createClass/programSlice";
import { fetchAdmin } from "../../../redux/slices/createClass/adminSlice";
import Calendar2 from "./Calendat2";

const FormSave = () => {
  const dispatch = useDispatch();
  // State nxt
  const [timeOpen, setTimeOpen] = useState(false);
  const [disAbled, setDisAbled] = useState(false);
  const [disAbledAttend, setDisAbledAttend] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [searchComp, setSearchComp] = useState("");
  const newTrProgram = useSelector((state) => state.searchProgram.tittle);

  const [searchTerm, setSearchTerm] = useState("");
  const [MC, setMC] = useState([]);
  const content = useSelector((state) => state.content.contentData);
  -console.log("search Term", searchTerm);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const state = useSelector((state) => state);
  console.log("state", state);
  useEffect(() => {
    dispatch(fetchAdmin());
  }, [dispatch, searchTerm]);

  const results = useSelector(
    (state) => state.trainingProgram.trainingProgramData
  );
  const draft = useSelector((state) => state.searchProgram.Draft);
  console.log("draft", draft);
  function handleMenuButtonClick() {
    setIsMenuOpen(!isMenuOpen);
    setDisAbled(false);
    setDisAbledAttend(false);
  }
  function handleMenuButtonClick2() {
    setIsMenuOpen(!isMenuOpen);
  }
  function handleSelect(TrProgramID) {
    setIsMenuOpen(!isMenuOpen);
    setMewTrProgram(results[TrProgramID]);
    const stpData = results[TrProgramID];
    dispatch({
      type: "SET_DATA",
      payload: stpData,
    });
    console.log("stpData", stpData);
    fetchContent();
  }
  console.log("testing.....", draft.listOfDate[draft.listOfDate.length - 1]);
  const toggleTime = () => setTimeOpen(!timeOpen);
  const Navigate = useNavigate();
  function nextPage() {
    Navigate("/class/create_class/searchPro/content");
  }
  let tabs = [
    { name: "training program", id: "z-[4]" },
    { name: "attendence list", id: " left-[190px] z-[3]" },
    { name: "Budget", id: " left-[380px] z-[2]" },
    { name: "Others", id: " left-[569px] z-[1]" },
  ];
  return (
    <>
      <div className="tittle h-[201px] text-white mt-[2px] bg-[#2D3748] ">
        <div className="tittle p-[20px_0px_30px_20px] ">
          <h2 className="text-[24px] font-medium tracking-[0.2em]">Class</h2>
          <h1 className="text-[36px] tracking-[0.2em] font-bold flex content-center items-center">
            Fresher Develop Operation{" "}
            <span className="font-normal text-[16px] tracking-normal bg-[#B9B9B9] p-[5px_15px_5px_15px] rounded-[50px] border-[1.5px] border-[white] ml-[20px]">
              Planning
            </span>
          </h1>
          <h3 className="font-bold text-[16px] ">HCM22_FR_DevOps_01</h3>
          <div className="border-[0.5px] border-[#FFFFFF] mt-[10px] w-[645px]"></div>
          <h2 className="font-bold text-[24px] mt-[10px]">
            31
            <span className="text-[14px] font-normal ml-[5px]">
              days &nbsp; (97 hours)
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

      <div className="  first-contaniedr flex ">
        <div className="basis-4/12">
          {/* GENERAL */}
          <div className="general  mt-[30px] ml-[20px]  w-[373px]">
            {" "}
            <Disclosure defaultOpen>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    disabled={disAbled}
                    className={`" text-white p-[5px_20px_5px_20px] rounded-[10px] flex content-center  items-center w-[373px] h-[40px] justify-between "
                     ${disAbled == true ? "bg-gray-500  " : " bg-[#2D3748]  "}`}
                    // className="bg-gray-500 flex content-center  items-center justify-between  text-white  p-[5px_20px_5px_20px] rounded-[10px] w-[373px] h-[40px]"
                  >
                    <img className="inline-block" src={general} alt="lab" />
                    &nbsp;&nbsp; General
                    <img
                      className={` " inline-block rotate-90 text-2xl ml-auto "
                      ${open ? "transform-none " : ""}`}
                      src={openTab}
                      alt="lab"
                    />
                  </Disclosure.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-150"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Disclosure.Panel className="flex w-full bg-white rounded-xl p-3 shadow-md">
                      <dl>
                        <div className="grid grid-cols-3  content-center px-3 py-3">
                          <dt className="font-bold ">
                            <img src={Time} className="inline " />
                            &nbsp; Time
                          </dt>
                          <dd className="col-span-2">
                            {" "}
                            {draft.startTime} - {draft.endTime}{" "}
                          </dd>
                        </div>

                        <div className="grid grid-cols-3 gap-10 px-3 py-3">
                          <dt className="font-bold col-span-2 content-center">
                            <img src={Location} className="inline " />
                            &nbsp; Location
                          </dt>
                        </div>

                        <div className="grid grid-cols-3 gap-10 px-2 py-3">
                          <dt className="font-bold ">
                            <img src={trainer} className="inline " />
                            &nbsp; Trainer
                          </dt>
                          <dd className="col-span-2"></dd>
                        </div>

                        <div className="grid grid-cols-3 gap-10 px-3 py-3">
                          <dt className="font-bold">
                            <img src={admin} className="inline " />
                            &nbsp; Admin
                          </dt>
                          <dd className="col-span-2 underline text-[#285D9A]">
                            {draft.admin}
                          </dd>
                        </div>

                        <div className="grid grid-cols-3 gap-10 px-3 py-3">
                          <dt className="font-bold">
                            <img src={FSU} className="inline " />
                            &nbsp; FSU
                          </dt>
                          <dd className="col-span-2">
                            {draft.fsuMame}
                            <br />
                            {draft.contactEmail}
                          </dd>
                        </div>

                        <div className="border-b-2 m-1 "></div>

                        <div className="grid grid-cols-3 text-[#8B8B8B] gap-10 px-3 py-1">
                          <dt className="font-bold">Created</dt>
                          <dd className="col-span-2"></dd>
                        </div>
                        <div className="grid grid-cols-3 text-[#8B8B8B] gap-10 px-3 py-1">
                          <dt className="font-bold">Reviewed</dt>
                          <dd className="col-span-2"> </dd>
                        </div>
                        <div className="grid grid-cols-3 text-[#8B8B8B] gap-10 px-3 py-1">
                          <dt className="font-bold">Approved</dt>
                          <dd className="col-span-2"></dd>
                        </div>
                      </dl>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>

          {/* ATTENDENCE */}
          <div className="Attendence  w-[373px]  mt-[30px] ml-[20px] ">
            <Disclosure defaultOpen>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    disabled={disAbled}
                    className={`" flex rounded-[10px] bg-[#2D3748] text-white font-bold  content-center  
                        items-center justify-between p-[5px_20px_5px_20px]   w-[373px] h-[40px] "
                         ${
                           disAbled == true ? "bg-gray-500 " : " bg-[#2D3748] "
                         }`}
                  >
                    <img className="inline-block" src={star} alt="lab" />
                    &nbsp;&nbsp; Attendee &nbsp;
                    <img
                      className={`${
                        open ? "transform-none ml-auto" : "ml-auto"
                      } "inline-block rotate-90 text-2xl m-2 ml-auto"`}
                      src={openTab}
                      alt="lab"
                    />
                  </Disclosure.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-150"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Disclosure.Panel className="flex w-full bg-white text-white font-bold rounded-xl shadow-md mt-0.5">
                      <div className="grid grid-cols-3 w-full text-center">
                        <div className="bg-[#2D3748] rounded-l-xl py-3">
                          <span>Planned</span>
                          <br />
                          <span className="text-2xl"> {draft.planned}</span>
                        </div>
                        <div className="bg-[#285D9A] py-3">
                          <span>Accepted</span>
                          <br />
                          <span className="text-2xl">{draft.accepted}</span>
                        </div>
                        <div className="bg-[#F1F1F1] rounded-r-xl text-black py-3">
                          <span>Actual</span>
                          <br />
                          <span className="text-2xl">{draft.actural}</span>
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        </div>
        {/* TIME FRAME */}
        <div className=" basis-8/12 Time-frame inline-block mt-[30px] ml-[20px] ">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  disabled={disAbled}
                  className={`" flex content-center  items-center justify-between 
                  p-[5px_20px_5px_20px] rounded-[10px]  text-white
                  w-[746px] h-[40px] bg-[#2D3748]"
                         ${
                           disAbled == true ? "bg-gray-500 " : " bg-[#2D3748] "
                         }`}
                >
                  <img className="inline-block" src={general} alt="lab" />
                  &nbsp;&nbsp; Time frame &nbsp;
                  <span className="text-[#F1F1F1]">
                    {draft.listOfDate[0]}-
                    {draft.listOfDate[draft.listOfDate.length - 1]}
                  </span>{" "}
                  &nbsp; &nbsp;
                  <img
                    className={`${
                      open ? "transform-none ml-auto" : "ml-auto"
                    } "inline-block rotate-90 text-2xl m-2 ml-auto"`}
                    src={openTab}
                    alt="lab"
                  />
                </Disclosure.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-150"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Disclosure.Panel className="flex w-full bg-white text-white font-bold rounded-xl shadow-md mt-0.5">
                    <Calendar2 />
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>
      </div>
      <div className="mt-[30px] ml-[20px] ">
        {/* Tab */}
        <Tab.Group vertical>
          <Tab.List className="relative  ">
            {tabs.map(({ name, id }) => (
              <Tab
                key={id}
                className={({ selected }) =>
                  [
                    "  absolute w-[200px]  h-[30px] text-white px-4 rounded-[20px_20px_0px_0px] !border-solid border-2 border-white shadow-top " +
                      id,
                    selected
                      ? "z !bg-[#2D3748] z-10"
                      : " !bg-[#6D7684] hover:!bg-[#5a5f68] z-0",
                  ]
                    .filter(Boolean)
                    .join("")
                }
              >
                {name}
              </Tab>
            ))}
            <Tab></Tab>
          </Tab.List>
          <Tab.Panels className="">
            <Tab.Panel>
              {" "}
              <div className="flex flex-col gap-[20px] mt-2 ">
                <div className="w-[1137px]  h-[86px] p-[10px_30px_20px_30px] bg-[#2D3748] rounded-[0px_20px_0px_0px]">
                  {newTrProgram === null ? (
                    <div></div>
                  ) : (
                    <div>
                      {" "}
                      <h1 className="font-[500px] text-[28px] text-[#FFFFFF] tracking-[0.2em]">
                        {newTrProgram.name}
                      </h1>
                      <div className="flex text-white">
                        {newTrProgram.day} days ({newTrProgram.hour} hours)
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <p>
                          Modified on &nbsp;
                          <span className="italic">
                            {" "}
                            {newTrProgram.lastDateModified}
                          </span>
                          &nbsp;by &nbsp;
                          <span className="font-bold">
                            {" "}
                            {newTrProgram.creatorName}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {content === null ? (
                  <></>
                ) : (
                  <div>
                    {content.map((item) => (
                      <>
                        <div
                          key={item.id}
                          className="w-[1137px] h-[96px] mt-5 flex"
                        >
                          <div className="w-1/5 flex rounded-[20px_0px_0px_20px] bg-[#2D3748] h-[96px] items-center content-center ">
                            <img
                              className="rounded-full w-14 h-14 ml-5"
                              src={noImage}
                              alt="lab"
                            />
                            <img
                              className="rounded-full w-14 h-14"
                              src={noImage}
                              alt="lab"
                            />
                            <img
                              className="rounded-full w-14 h-14"
                              src={noImage}
                              alt="lab"
                            />
                          </div>
                          <div
                            className={`" w-4/5 py-4 px-3 shadow-md rounded-[0px_20px_20px_0px]"
                         ${
                           item.status == "inActive" ? "text-[#888888] " : "  "
                         }`}
                          >
                            <div className="flex items-center space-x-4">
                              <h1
                                className={`" font-bold text-2xl "
                                   ${
                                     item.status == "inActive"
                                       ? "text-[#888888] "
                                       : "text-[#0D3B66]  "
                                   }`}
                              >
                                {item.name}
                              </h1>
                              <span
                                className={`" px-4 rounded-full text-white "
                                   ${
                                     item.status == "inActive"
                                       ? "bg-[#888888] "
                                       : "bg-[#0D3B66]  "
                                   }`}
                              >
                                {item.status}
                              </span>
                            </div>
                            <div className="block">
                              LIN v2.0 &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
                              {item.numOfDays} days (
                              <span className="italic">
                                {" "}
                                {item.numOfHours}{" "}
                              </span>{" "}
                              hours) &nbsp;&nbsp;|&nbsp;&nbsp; on{" "}
                              <span className="italic">{item.date} </span> by
                              {item.mentor}
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                )}

                {/* Popup-menu */}
                <Transition appear show={isMenuOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={handleMenuButtonClick}
                  >
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-80" />

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as="div"
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-[381px] h-[177px] max-w-md transform overflow-hidden rounded-2xl bg-white p-[10px_20px] text-left align-middle shadow-xl transition-all">
                            {" "}
                            <img
                              onClick={handleMenuButtonClick}
                              className="cursor-pointer float-right inline-block"
                              src={closeW}
                              alt="lab"
                            />
                            <div>&nbsp;</div>
                            <div className="mt-[17px]">
                              <img
                                className="  inline-block"
                                src={warming}
                                alt="lab"
                              />
                              &nbsp; &nbsp;
                              <span className="text-sm font-normal text-[#474747]">
                                Please take short helps for creating a class.
                              </span>
                            </div>
                            <div className="mt-[43.5px] inline-flex items-center  w-full justify-end content-end+">
                              <input type="checkbox" className="bg-[#474747]" />
                              &nbsp; &nbsp;
                              <span
                                type=""
                                className="underline font-bold mr-[30px] text-[#474747]"
                              >
                                Don’t show again
                              </span>
                              <button
                                type=""
                                className="inline-flex justify-center rounded-[10px] border border-transparent bg-[#2D3748] p-[7px_25px]
                              text-sm font-medium text-white "
                                onClick={handleMenuButtonClick}
                              >
                                Go
                              </button>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <div className="bg-[#203748] h-[16px] mt-[20px] rounded-[0px_0px_10px_10px] w-[1173px] mr-[20px]"></div>
        <div className="mt-[87.5px]   w-[1173px]  - ">
          <button
            onClick={() => Navigate(-1)}
            className="rounded-[10px] p-[7px_25px] bg-[#2D3748] text-white place-self-start"
          >
            Back
          </button>
          <div className="float-right flex  gap-[20px]">
            <button className="text-[#E74A3B] underline">Cancel</button>
            <button className="bg-[#474747] rounded-[10px] p-[7px_25px] text-white">
              Save draft
            </button>
            <button
              onClick={nextPage}
              className="rounded-[10px] p-[7px_25px] bg-[#2D3748] text-white "
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSave;
