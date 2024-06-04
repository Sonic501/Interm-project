import React, { useEffect, useState } from "react";
import General from "./General";
import Others from "./Others";
import Outline from "./Outline";
import Image from '../../components/Image';
import images from "../../assets/images";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";

import { changeStatus } from "../../redux/slices/viewSyllabus/syllabusSlice";
import { useNavigate, useParams } from "react-router-dom";
import { viewDetailSyllabus, outputStandardSyllabus, duplicateSyllabus, deleteSyllabus } from '../../redux/slices/viewSyllabus/syllabusSlice';
import Loading from "../../../src/components/Loading/Loading";
import Swal from "sweetalert2";




const viewSyllabusDetail = () => {
  const dispatch = useDispatch();
  const [isAct, setIsAct] = useState(true);
  const status = useSelector(state => state.syllabusList.syllabusDetailData.status);
  const message = status ? "Syllabus is active" : "Syllabus is not active";
  const handleAct = () => {
    setIsAct(!isAct);
    dispatch(changeStatus(!isAct));
  };
  const queryParams = useSelector((state) => state.initialSyllabusParams);
  const { syllabusDetailData, loading } = useSelector((state) => state.syllabusList);
  const { syllabusList, error } = useSelector((state) => state);

  const {token, permission} = useSelector((state) => state.auth);

  const [show, setShow] = useState("general");
  const [isActive, setIsActive] = useState("general");

  const dataString = syllabusDetailData?.lastDateModified;
  const nav = useNavigate();

  const formattedDate = moment(dataString).format('L');


  const { id } = useParams();

  // useEffect(() => {
  //   dispatch(getStatus({ id, token }));
  // }, [])

  useEffect(() => {

    dispatch(viewDetailSyllabus({id, token}));
    dispatch(outputStandardSyllabus({id, token}));
  }, [id, token])

  const handleClick = (e) => {
    const page = e.target.value;
    setShow(page);
    setIsActive(page);
  };

  const handleDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-2',
        cancelButton: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mx-2',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to delete?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
            dispatch(deleteSyllabus({id, token}));
            swalWithBootstrapButtons.fire('Deleted', `Syllabus has been Deleted.`, 'success');
            nav("/syllabus/view_syllabus");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Cancelled', `Syllabus has not been deleted.`, 'error');
        }
      });
  }

  const handleDuplicate = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-2',
        cancelButton: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mx-2',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to dupplicate?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, dupplicate it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
            dispatch(duplicateSyllabus({id, token}));
            swalWithBootstrapButtons.fire('Dupplicated', `Syllabus has been dupplicated.`, 'success');
            nav("/syllabus/view_syllabus");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Cancelled', `Syllabus has not been dupplicated.`, 'error');
        }
      });
  }



  return (
    <>
      {loading ? (<Loading />) :
        (<div key={id}>
          <div className="ml-[20px] mr-[20px]">
        <div className="mt-3 font-medium -tracking-tighter">{message}</div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="font-[inter] tracking-[5px] font-bold text-[40px] w-fit">
              {syllabusDetailData?.name}
            </div>
            <div
              className={`flex ml-5 ${isAct ? "bg-black text-white" : "bg-white text-black"
                } w-[72px] h-[27px] justify-center items-center rounded-full`}
            >
              {isAct ? "Active" : "De-active"}
            </div>
              </div>

              <div className="dropdown dropdown-bottom dropdown-end">
                {permission.syllabusPermission !== "View" && (
                <label tabIndex={0} className="btn m-1 bg-white border-none  hover:bg-white text-black text-5xl">...</label>)}
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56 text-[#395D8A]">
                  <div className="border-b-2 py-1 px-3 text-[#2A303C] text-lg font-bold">Manage</div>
  

                    <li className="flex" onClick={() => handleDuplicate()}>
                      <a >
                        <Image src={images?.duplicate} />
                        <span>Duplicate syllabus</span>
                      </a>
                    </li>


                    <li className="flex">
                <a onClick={handleAct}>
                  <Image src={isAct ? images.deActive : images.deActive} />
                  <span>{isAct ? "deActive" : "Active"} syllabus</span>
                </a>
              </li>

                    <li className="flex" onClick={() => handleDelete()}>
                      <a >
                        <Image src={images?.deleteSyllabus} />
                        <span>Delete syllabus</span>
                      </a>
                    </li>

                </ul>
              </div>
            </div>
            <div className="font-bold">
              {syllabusDetailData?.code} {syllabusDetailData?.version}
            </div>
          </div>
          <div className="border-b border-black mt-[15px] mb-[20px]"></div>
          <div className="ml-[20px] mr-[20px] relative">
            <div>
              <span className="font-bold text-2xl">{syllabusDetailData?.day}</span> days ({syllabusDetailData?.hour} hours)
            </div>
            <div className="mb-3">Modified on {formattedDate} by <span className="font-bold ">{syllabusDetailData?.lastModifierName}</span></div>


            <div className="ml-[-20px]">
              <button
                className={
                  (isActive === "general" ? "bg-[#2D3748] " : "bg-[#6D7684] ") +
                  " border-white border-2 text-[#ffffff] w-[200px] rounded-t-full absolute z-20 "
                }
                value="general"
                onClick={handleClick}
              >
                General
              </button>
              <button
                className={
                  (isActive === "outline" ? "bg-[#2D3748] z-30 " : "bg-[#6D7684] ") +
                  " border-white border-2 text-[#ffffff] w-[200px] rounded-t-full absolute ml-[180px] z-10 "
                }
                onClick={handleClick}
                value="outline"
              >
                Outline
              </button>
              <button
                className={
                  (isActive === "others"
                    ? "bg-[#2D3748] z-1 ml-[360px] z-20 "
                    : "bg-[#6D7684] ")
                  + (' border-white border-2 text-[#ffffff] w-[200px] rounded-t-full absolute ml-[360px] z-0')
                }
                onClick={handleClick}
                value="others"
              >
                Others
              </button>
            </div>
            {show === "general" ? (
              <General />
            ) : show === "outline" ? (
              <Outline />
            ) : (
              <Others />
            )}
          </div>
        </div>)
      }

    </>
  );
};

export default viewSyllabusDetail;