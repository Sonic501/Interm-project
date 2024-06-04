import React, { Fragment, useEffect, useState } from "react";
//icons
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
import { setItem } from "../../../redux/slices/createClass/searchProgramSlice";

const SearchProgram = () => {
  const dispatch = useDispatch();
  // State nxt
  const [timeOpen, setTimeOpen] = useState(false);
  const [disAbled, setDisAbled] = useState(true);
  const [disAbledAttend, setDisAbledAttend] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [searchComp, setSearchComp] = useState("");
  const [newTrProgram, setMewTrProgram] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [MC, setMC] = useState([]);
  const [content, setContent] = useState([]);
  const toggleTime = () => setTimeOpen(!timeOpen);
  const Navigate = useNavigate();
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const state = useSelector((state) => state);
  console.log("state", state);
  useEffect(() => {
    dispatch(fetchTrainingProgramData(searchTerm));
  }, [dispatch, searchTerm]);

  const results = useSelector(
    (state) => state.trainingProgram.trainingProgramData
  );

  function handleMenuButtonClick() {
    setIsMenuOpen(!isMenuOpen);
    setDisAbled(false);
    setDisAbledAttend(false);
  }

  function handleSelect(TrProgramID) {
    setIsMenuOpen(!isMenuOpen);
    setMewTrProgram(results[TrProgramID]);
    const stpData = results[TrProgramID];
    dispatch(setItem(stpData));
    nextPage();
  }

  function nextPage() {
    Navigate("/class/create_class/searchPro/formClass");
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
            {state.searchProgram.Draft.className}
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
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    disabled={disAbled}
                    className={`" text-white p-[5px_20px_5px_20px] rounded-[10px] flex content-center  items-center w-[373px] h-[40px] justify-between "
                      ${
                        disAbled == true ? "bg-gray-500  " : " bg-[#2D3748]  "
                      }`}
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
                        <div className="grid grid-cols-3 gap-10 px-6 py-3">
                          <dt className="font-bold">
                            <i className="icon icon-alarm text-2xl text-[#285D9A] mr-1" />
                            Class Time
                          </dt>
                          <dd className="col-span-2">09:00 - 12:00</dd>
                        </div>

                        <div className="grid grid-cols-3 gap-10 px-6 py-3">
                          <dt className="font-bold">
                            <i className="icon icon-domain text-2xl text-[#285D9A] mr-1" />
                            Location
                          </dt>
                          <dd className="col-span-2"></dd>
                        </div>

                        <div className="grid grid-cols-3 gap-10 px-6 py-3">
                          <dt className="font-bold">
                            <i className="icon icon-lecturer text-2xl text-[#285D9A] mr-1" />
                            Trainer
                          </dt>
                          <dd className="col-span-2">
                            <React.Fragment>
                              <div className="tooltip-container inline text-[#285D9A] border-b-2 border-[#285D9A] cursor-pointer">
                                Li Lien Lien Dung
                                <i className="icon icon-info text-xs" />
                                <div className="tooltip-content inline invisible whitespace-nowrap absolute p-3 bg-white text-black z-10 rounded-xl shadow-2xl">
                                  <i className="icon icon-Call text-[#285D9A]" />{" "}
                                  Dung Lien Lien ly <br />
                                  <i className="icon icon-mail text-[#285D9A]" />{" "}
                                  FHH
                                </div>
                              </div>
                              <br />
                            </React.Fragment>
                          </dd>
                        </div>

                        <div className="grid grid-cols-3 gap-10 px-6 py-3">
                          <dt className="font-bold">
                            <i className="icon icon-grade text-2xl text-[#285D9A] mr-1" />
                            Admin
                          </dt>
                          <dd className="col-span-2">
                            <React.Fragment>
                              <div className="tooltip-container inline text-[#285D9A] border-b-2 border-[#285D9A] cursor-pointer">
                                Dung Lien Lien ly
                                <i className="icon icon-info text-xs" />
                                <div className="tooltip-content inline invisible whitespace-nowrap absolute p-3 bg-white text-black z-10 rounded-xl shadow-2xl">
                                  <i className="icon icon-Call text-[#285D9A]" />{" "}
                                  Demo10s <br />
                                  <i className="icon icon-mail text-[#285D9A]" />{" "}
                                  thanzed@
                                </div>
                              </div>
                              <br />
                            </React.Fragment>
                          </dd>
                        </div>

                        <div className="grid grid-cols-3 gap-10 px-6 py-3">
                          <dt className="font-bold">
                            <i className="icon icon-supplier text-2xl text-[#285D9A] mr-1" />
                            FSU
                          </dt>
                          <dd className="col-span-2">
                            FHH
                            <br />
                            BaCH@fsoft.com.vn
                          </dd>
                        </div>

                        <div className="border-b-2 m-1"></div>

                        <div className="grid grid-cols-3 gap-10 px-6 py-1">
                          <dt className="font-bold">Created</dt>
                          <dd className="col-span-2"></dd>
                        </div>
                        <div className="grid grid-cols-3 gap-10 px-6 py-1">
                          <dt className="font-bold">Reviewed</dt>
                          <dd className="col-span-2"> </dd>
                        </div>
                        <div className="grid grid-cols-3 gap-10 px-6 py-1">
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
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    disabled={disAbled}
                    className={`" flex rounded-[10px] bg-[#2D3748] text-white font-bold  content-center  
                        items-center justify-between p-[5px_20px_5px_20px]   w-[373px] h-[40px] "
                         ${
                           disAbled == true ? "bg-gray-500 " : " bg-[#2D3748] "
                         }`}
                    //     className="flex rounded-[10px] bg-[#2D3748] text-white font-bold  content-center
                    // items-center justify-between p-[5px_20px_5px_20px]   w-[373px] h-[40px]"
                  >
                    <img className="inline-block" src={star} alt="lab" />
                    &nbsp;&nbsp; Attendee &nbsp;
                    <span className="font-thin">Demo 0</span>
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
                          <span className="text-2xl"> 10 </span>
                        </div>
                        <div className="bg-[#285D9A] py-3">
                          <span>Accepted</span>
                          <br />
                          <span className="text-2xl"> 9 </span>
                        </div>
                        <div className="bg-[#F1F1F1] rounded-r-xl text-black py-3">
                          <span>Actual</span>
                          <br />
                          <span className="text-2xl"> 9 </span>
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
                  //     className="flex rounded-[10px] bg-[#2D3748] text-white font-bold  content-center
                  // items-center justify-between p-[5px_20px_5px_20px]   w-[373px] h-[40px]"
                >
                  <img className="inline-block" src={general} alt="lab" />
                  &nbsp;&nbsp; Time frame &nbsp;
                  <span className="text-[#F1F1F1]">start date</span> &nbsp;
                  &nbsp;
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
                    <Calendar />
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
                  <div className={searchComp}>
                    <h1 className="text-white font-normal text-[14px]">
                      Training Program name{" "}
                    </h1>
                    <img
                      className="inline-block absolute z-40 mt-3 ml-3"
                      src={lens}
                      alt="lab"
                    />
                    <input
                      value={searchTerm}
                      onChange={handleChange}
                      className="pl-10 rounded-[10px] relative   w-[440px] h-[35pz] p-2 "
                    ></input>

                    <ul className="bg-white rounded-xl max-h-[275px] w-[440px] overflow-auto">
                      {results &&
                        results.map((result, index) => (
                          <li
                            onClick={(e) => {
                              handleSelect(index);
                            }}
                            className="p-[10px_10px_10px_42px] cursor-pointer hover:bg-[#F1F1F1] w-[440px]"
                            key={index}
                          >
                            <div className="" key={index}>
                              <h1 className="text-[16px] font-bold">
                                {result.name}
                              </h1>
                              <h3 className="font-normal text-[14px] text-[#323232]">
                                {result.day} days ({result.hour} hrs) &nbsp;
                                &nbsp; &nbsp;{result.dateCreated} by{" "}
                                <span className="font-bold text-black">
                                  {" "}
                                  {result.creatorName}
                                </span>
                              </h3>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {newTrProgram === null ? (
                    <div></div>
                  ) : (
                    <div>
                      {" "}
                      <h1 className="font-[500px] text-[28px] text-[#FFFFFF] tracking-[0.2em]">
                        {newTrProgram.name}
                      </h1>
                      <div className="flex text-white">
                        {newTrProgram.numOfDays} days ({newTrProgram.numOfHours}{" "}
                        hours) &nbsp;&nbsp;|&nbsp;&nbsp;
                        <p>
                          Modified on &nbsp;
                          <span className="italic"> {newTrProgram.date}</span>
                          &nbsp;by &nbsp;
                          <span className="font-bold">
                            {" "}
                            {newTrProgram.mentor}
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
                            className={`" w-4/5 py-4 px-6 shadow-md rounded-[0px_20px_20px_0px]"
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

export default SearchProgram;
