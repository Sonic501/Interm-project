import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noImage from "../../../assets/images/no-image.png";
import del from "../resources/icons/delete.png";
import { useNavigate } from "react-router-dom";
import { deleteSyllabus } from "../../../redux/slices/createClass/contentSlice";

const Content = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.searchProgram.tittle);
  const content = useSelector((state) => state.content.contentData);
  console.log("content", content);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleMenuButtonClick() {
    setIsMenuOpen(!isMenuOpen);
  }
  const handleDelete = (contentId) => {
    dispatch(deleteSyllabus(contentId));
    console.log("contentId", contentId);
  };
  const handleSave = () => {
    Navigate("/class/create_class/searchPro/syllabus");
  };

  // const header = document.querySelector("header");
  // header.style.display = "none";
  return (
    <>
      <div className="font-medium text-[24px] p-[20px_30px]  border-b-[#203748] border-b-2    text-[#203748]">
        <h1 className="tracking-[0.2em]">
          Training program of{" "}
          <span className="underline font-bold">Fresher Develop Operation</span>
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
              <div key={item.id} className="w-[1137px] h-[96px]  mt-5 flex">
                <div className="w-1/5 flex bg-[#2D3748] rounded-[20px_0px_0px_20px] h-[96px] items-center content-center ">
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
                    <span className="italic">{item.lastDateModified} </span> by
                    {item.lastModifierName}
                  </div>
                </div>
                <div
                  onClick={() => handleDelete(item.id)}
                  className="ml-[20px] bg-red-500 p-[15px_5px]   flex flex-col justify-center
                   rounded-[10px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
                >
                  <img
                    className="cursor-pointer items-center  "
                    src={del}
                    alt="lab"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
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
            onClick={handleMenuButtonClick}
            className="rounded-[10px] p-[7px_25px] bg-[#2D3748] text-white "
          >
            Next
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
                      <button
                        onClick={handleSave}
                        className="text-white p-[7px_25px] bg-[#203748] rounded-xl  "
                      >
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

export default Content;
