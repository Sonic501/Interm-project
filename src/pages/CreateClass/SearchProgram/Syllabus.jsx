import { Dialog, Disclosure, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noImage from "../../../assets/images/no-image.png";
import adding from "../resources/icons/adding.png";
import img from "../resources/icons/img.png";
import folder from "../resources/icons/folder.png";

import { useNavigate } from "react-router-dom";
import {
  createClass,
  fetchLocation,
  fetchTrainerData,
  fetfchUnitDaata,
} from "../../../redux/slices/createClass/contentSlice";
import { handleValue } from "../../../redux/slices/createClass/searchProgramSlice";

const Syllabus = () => {
  const draft = useSelector((state) => state.searchProgram.Draft);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.searchProgram.tittle);
  const content = useSelector((state) => state.content.contentData);
  const unitData = useSelector((state) => state.content.unitData);
  const MC = useSelector((state) => state);
  const location = useSelector((state) => state.content.locationData);
  console.log("draft", draft);
  console.log("content", MC);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleMenuButtonClick() {
    setIsMenuOpen(!isMenuOpen);
  }
  //Paging
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  let classCreate = {
    className: "",
    startDate: "",
    startTime: "",
    endTime: "",
    hour: 97,
    day: 31,
    planned: 0,
    accepted: 0,
    actual: 0,
    state: "planned",
    dateCreated: "2023-04-09",
    dateReviewed: "2023-04-09",
    dateApproved: "2023-04-09",
    lastDateModified: "2023-04-09",
    status: true,
    locationId: 0,
    locationName: "",
    attendeeId: 0,
    attendeeName: "",
    trainingProgramId: 0,
    trainingProgramName: "",
    fsuId: 0,
    fsuName: "",
    contactId: 0,
    contactName: "",
    creatorId: 8,
    creatorName: "Đinh Tân Hà",
    lastModifierId: 8,
    lastModifierName: "Đinh Tân Hà",
    reviewerId: 9,
    reviewerName: "Giáp Ngân Hạ",
    approverId: 4,
    approverName: "Nguyễn Thị Thu Hà",
  };

  -useEffect(() => {
    // setTotalPages
    // dispatch(createClass(classCreate));
    dispatch(fetchLocation());
    dispatch(fetchTrainerData());
    dispatch(fetfchUnitDaata(""));
  }, []);
  // useEffect(() => {
  //   // Update the visible items whenever the current page changes
  //   // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  //   // const endIndex = startIndex + ITEMS_PER_PAGE;
  //   // setVisibleItems(items.slice(startIndex, endIndex));
  // }, [currentPage]);
  const [trainer, setTrainer] = useState("");

  const handleTrainerChange = (event) => {
    setTrainer(event.target.value);
    dispatch(handleValue(event.target.value));
  };

  const SearchId = () => {
    for (let i = 0; i < MC.content.locationData.length; i++) {
      if (MC.content.locationData[i].locationName === trainer) {
        classCreate.locationId = MC.content.locationData[i].id;
        return;
      }
    }
  };
  const fsuID = () => {
    for (let i = 0; i < MC.FSU.FSU.length; i++) {
      if (MC.FSU.FSU[i].fsuName === draft.fsuMame) {
        classCreate.fsuId = MC.FSU.FSU[i].id;
        return;
      }
    }
  };
  const attendeeID = () => {
    for (let i = 0; i < MC.attendee.attendee.length; i++) {
      if (MC.attendee.attendee[i].attendeeName === draft.attendee) {
        classCreate.attendeeId = MC.attendee.attendee[i].id;
        return;
      }
    }
  };
  const contactID = () => {
    for (let i = 0; i < MC.contact.contact.length; i++) {
      if (MC.contact.contact[i].contactEmail === draft.contactEmail) {
        classCreate.contactId = MC.contact.contact[i].id;
        return;
      }
    }
  };
  const handleCreate = () => {
    // Navigate("/class/");
    classCreate.accepted = draft.accepted;
    classCreate.actual = draft.actural;
    classCreate.planned = draft.planned;
    classCreate.startTime = draft.startTime + ":00";
    classCreate.endTime = draft.endTime + ":00";
    classCreate.startDate = draft.listOfDate[0];
    classCreate.className = draft.className;
    classCreate.attendeeName = draft.attendee;
    classCreate.fsuName = draft.fsuMame;
    classCreate.contactName = draft.contactEmail;
    classCreate.trainingProgramName = data.name;
    classCreate.locationName = draft.value;
    classCreate.trainingProgramId = data.id;
    SearchId();
    fsuID();
    attendeeID();
    contactID();
    dispatch(createClass(classCreate));

    console.log("class create", classCreate);
  };
  return (
    <>
      <div className="font-medium text-[24px] p-[20px_30px]  border-b-[#203748] border-b-2    text-[#203748]">
        <h1 className="tracking-[0.2em]">
          Training program of{" "}
          <span className="underline font-bold">{draft.className}</span>
        </h1>
        <div className="font-bold text-[36px] tracking-[0.2em]   ">
          <h2 className="flex items-center content-center">
            {data.name}
            <span className="rounded-[50px] text-white bg-gray-500  font-normal text-[16px] tracking-normal p-[5px_15px] ml-[27px] ">
              inactice
            </span>
          </h2>
        </div>
      </div>
      <div className="font-normal text-[14px] p-[20px_30px]  border-b-[#203748] border-b-2    text-[#203748]">
        <h2>
          <span className="font-bold text-[24px]"> {data.day}</span> days (
          {data.hour} hours)
        </h2>
        <h2>
          Modiied on {data.lastDateModified} by{" "}
          <span className="font-bold">{data.lastModifierName}</span>
        </h2>
      </div>
      <div className="p-[20px_30px] ">
        <h2 className="font-bold text-[24px]  text-[#203748]">Content</h2>
        {content === null ? (
          <></>
        ) : (
          <div className="">
            {content.map((item) => (
              <>
                <div key={item.id} className="w-[1137px] h-[96px]  mt-5 flex">
                  <div
                    className={`" w-full  py-4 px-6 shadow-md rounded-[0px_20px_20px_0px]"
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
                                     item.status == false
                                       ? "bg-[#888888] "
                                       : "bg-[#0D3B66]  "
                                   }`}
                      >
                        {item.status === true ? "active" : "inactive"}
                      </span>
                    </div>
                    <div className="block">
                      {item.version} &nbsp;&nbsp;|&nbsp;&nbsp; {item.day} days (
                      <span className="italic"> {item.hour} </span> hours)
                      &nbsp;&nbsp;|&nbsp;&nbsp; on{" "}
                      <span className="italic">{item.lastDateModified} </span>{" "}
                      by
                      {item.lastModifierName}
                    </div>
                  </div>
                </div>
                <div
                  key={item.id}
                  className="w-[1137px] h-[600px] max-h-[600px]  overflow-y-auto  mt-5 "
                >
                  {unitData.map((item, index) => (
                    <div key={-item.id}>
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className="flex rounded-[10px] mt-[5px] text-white font-bold  content-center  
                           items-center justify-between p-[5px_20px_5px_20px]   w-[1137px] h-[40px]   bg-[#2D3748] "
                            >
                              Day {index + 1}
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
                              <Disclosure.Panel className="flex w-full  bg-white  font-bold rounded-xl shadow-md mt-0.5">
                                <div className="flex p-[30px_20px] w-full">
                                  <div className="basis-2/12">
                                    Unit {item.unitNumber}{" "}
                                    <div className="flex justify-center flex-col content-center w-full items-center -">
                                      <img
                                        className="  mt-[53px]"
                                        src={adding}
                                        alt="lab"
                                      />
                                      <select
                                        value={trainer}
                                        onChange={handleTrainerChange}
                                        name=""
                                        className="mt-[24px] block text-[10px] text-[#8B8B8B] p-[5px_10px] border-[0.5px] rounded-[5px] w-[95px] h-[27px] border-[#8B8B8B]"
                                      >
                                        <option value="" className="">
                                          {" "}
                                          select
                                        </option>
                                        {location === null ? (
                                          <></>
                                        ) : (
                                          <>
                                            {location.map((item) => (
                                              <>
                                                <option
                                                  value={item.locationName}
                                                  key={item.id}
                                                  className="text-[14px] h-10"
                                                >
                                                  {item.locationName}
                                                </option>
                                              </>
                                            ))}
                                          </>
                                        )}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="basis-10/12 ">
                                    {item.unitTitle}{" "}
                                    <div className="p-[5px_20px] bg-[#F1F1F1] h-[40px]">
                                      <span>
                                        MVC architectural pattern overview
                                      </span>
                                      <div className="float-right gap-[40px] flex">
                                        <button className="p-[5px_20px] bg-[#203748] text-white  rounded-[7px]">
                                          K6SD
                                        </button>
                                        <button>10mins</button>
                                        <button className="text-[#D45B13] border-[#D45B13] border-[1px] p-[5px_15px] rounded-[50px]">
                                          Online
                                        </button>
                                        <img
                                          className="inline-block w-[22px] h-[19px]"
                                          src={img}
                                          alt="lab"
                                        />
                                        <img
                                          className="inline-block w-[22px] h-[19px]"
                                          src={folder}
                                          alt="lab"
                                        />
                                      </div>
                                    </div>
                                    <div className="mt-[5px] p-[5px_20px] bg-[#F1F1F1] h-[40px]">
                                      <span>ASP.NET MVC Version History</span>
                                      <div className="float-right gap-[40px] flex">
                                        <button className="p-[5px_20px] bg-[#203748] text-white  rounded-[7px]">
                                          K6SD
                                        </button>
                                        <button>10mins</button>
                                        <button className="text-[#D45B13] border-[#D45B13] border-[1px] p-[5px_15px] rounded-[50px]">
                                          Online
                                        </button>
                                        <img
                                          className="inline-block w-[22px] h-[19px]"
                                          src={img}
                                          alt="lab"
                                        />
                                        <img
                                          className="inline-block w-[22px] h-[19px]"
                                          src={folder}
                                          alt="lab"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Disclosure.Panel>
                            </Transition>
                          </>
                        )}
                      </Disclosure>
                    </div>
                  ))}
                </div>
              </>
            ))}
          </div>
        )}
      </div>
      <div className="mt-[87.5px]   w-[1173px]  - ">
        <div className="float-left flex  gap-[20px]">
          <button
            onClick={() => Navigate(-1)}
            className="rounded-[10px] p-[7px_25px] bg-[#2D3748] text-white place-self-start"
          >
            Back
          </button>
          <button
            onClick={() => Navigate(-1)}
            className="rounded-[10px] p-[7px_25px] bg-[#2D3748] text-white place-self-start"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="rounded-[10px] p-[7px_25px] bg-[#2D3748] text-white "
          >
            Create
          </button>
        </div>

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
                  <Dialog.Panel className="w-[381px]  max-w-md transform overflow-hidden rounded-[20px] bg-white p-[10px_20px] text-left align-middle shadow-xl transition-all">
                    {" "}
                    <h2 className="font-bold text-sm text-[#2A4365]">
                      New Syllabus
                    </h2>
                    <input
                      className="mt-[30px] p-[10px] rounded-[10px] border-[1px] border-[#000000] w-full "
                      placeholder="Syllabus name"
                    ></input>
                    <div className="mt-[24px] ">
                      <input
                        type=""
                        className=" p-[10px] rounded-[10px] border-[1px] border-[#000000] w-[100px] "
                        placeholder="Days"
                      ></input>
                      <input
                        className=" p-[10px] ml-[24px] rounded-[10px] border-[1px] border-[#000000] w-[100px] "
                        placeholder="Hours"
                      ></input>
                    </div>
                    <div className="mt-[43.5px] mb-3   float-right">
                      <button
                        className="text-[#E74A3B] underline mr-5"
                        onClick={handleMenuButtonClick}
                      >
                        Cancel
                      </button>
                      <button className="text-white p-[7px_25px] bg-[#203748] rounded-xl  ">
                        Save
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default Syllabus;
