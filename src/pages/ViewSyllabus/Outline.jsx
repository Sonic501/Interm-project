import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { contents, icons, StatusChip } from "./OutlineDetails/OutlineDetails";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import folder from "./assetsSyllabus/Folder.png";
import "./OutlineDetails/styleOutline.css";
import UploadFile from "./OutlineDetails/UploadFile";
import PieChart from "./TabOther/PieChart";
import Table from "./TabOther/Table";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { viewDetailSyllabus } from "../../redux/slices/viewSyllabus/syllabusSlice";
import axios from "axios";

const Outline = () => {
  const permission = useSelector((state) => state.auth);

  const typeDurations = useSelector((state) => {
    const { syllabusDetailData } = state.syllabusList;
    const sessionDTOList = syllabusDetailData.sessionDTOList || [];

    const typeDurations = sessionDTOList.flatMap((session) => {
      const unitDTOList = session.unitDTOList || [];
      return unitDTOList.flatMap((unit) => {
        const unitDetailDTOList = unit.unitDetailDTOList || [];
        return unitDetailDTOList.map((detail) => ({
          type: detail.deliveryTypeName,
          duration: detail.duration,
        }));
      });
    });

    const typeDurationMap = typeDurations.reduce((acc, { type, duration }) => {
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type] += duration;
      return acc;
    }, {});

    const totalDuration = typeDurations.reduce(
      (acc, { duration }) => acc + duration,
      0
    );

    const result = Object.entries(typeDurationMap).map(([type, duration]) => ({
      type,
      percentage: (duration / totalDuration) * 100,
    }));

    return result;
  });

  const { syllabusDetailData } = useSelector((state) => state.syllabusList);

  const [isLoading, setisloading] = useState(false);

  const dispatch = useDispatch();

  const { id } = useParams();

  

  const [expanded, setExpanded] = useState(2);
  const [showPopup, setShowPopup] = useState(false);
  const [currentUnitDetail, setCurrentUnitDetail] = useState(null);

  const [expandedDetails, setExpandedDetails] = useState({});

  const handleExpanded = (id) => {
    setExpanded(id);
    setExpandedDetails({ ...expandedDetails, [id]: true });
  };

  return (
    <>
      (
        <div className="flex justify-between outline-wrapper">
          <div className="mt-[25px] border-[2px] border-white w-[860px] h-[540px] overflow-y-auto">
            {syllabusDetailData?.sessionDTOList?.map((session) => (
              <Accordion expanded={session.id === expanded} key={session.id}>
                <AccordionSummary
                  sx={{
                    background: "#2D3748",
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                  className="accordion_summary"
                  onClick={() => {
                    handleExpanded(session.id);
                    
                  }}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography component={"span"}>
                    Day {session.sessionNumber}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="">
                  {session?.unitDTOList?.map((unit) => (
                    <div key={unit.id}>
                      {unit.sessionId === session.id && (
                        <Accordion>
                          <AccordionSummary
                            className="expandne"
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            expandIcon={<ArrowDropDownCircleOutlinedIcon />}
                          >
                            <Typography
                              component={"span"}
                              className="flex w-[700px] justify-between"
                            >
                              <strong className="">
                                Unit {unit.unitNumber}{" "}
                                <span className="ml-[30px]">
                                  {unit.unitTitle}
                                </span>
                              </strong>
                            </Typography>
                          </AccordionSummary>

                          <AccordionDetails
                            sx={{ padding: "0" }}
                            className="ml-[50px]"
                          >
                            <Typography component={"span"} className="">
                              <div className="pb-[30px]">
                                {unit?.unitDetailDTOList?.map((unitDetail) => (
                                  <div key={unitDetail.id} className="">
                                    {unit.id === unitDetail.unitId &&
                                    session.id === unit.sessionId ? (
                                      <div className="flex items-center pl-[20px] w-[700px] h-[34px] bg-[#F1F1F1] mb-[5px] rounded-lg">
                                        <div className="w-[300px] truncate">
                                          {unitDetail.title}
                                        </div>
                                        <div className="w-[400px] ml-[20px] flex justify-between items-center">
                                          <div className="bg-[#2D3748] w-[60px] flex items-center justify-center text-[#ffffff] rounded-md font-normal">
                                            {unitDetail.outputStandardCode}
                                          </div>
                                          <div>{unitDetail?.duration}mins</div>
                                          <div>
                                            <StatusChip
                                              e={
                                                unitDetail.type
                                                  ? "Online"
                                                  : "Offline"
                                              }
                                            />
                                          </div>
                                          <div
                                            className="tooltip custom-tooltip"
                                            data-tip={
                                              icons[unitDetail.deliveryTypeId]
                                                ?.iconName
                                            }
                                          >
                                            <img
                                              src={
                                                icons[unitDetail.deliveryTypeId]
                                                  ?.path
                                              }
                                            />
                                          </div>
                                          <div className="dropdown dropdown-left">
                                            <button
                                              onClick={() => {
                                                setShowPopup(true);
                                                setCurrentUnitDetail(
                                                  unitDetail.id
                                                );
                                              }}
                                              className="btn btn-ghost btn-xs border-none m-1"
                                            >
                                              <img src={folder} />
                                            </button>
                                            {currentUnitDetail ===
                                              unitDetail.id &&
                                              showPopup && (
                                                <UploadFile
                                                  unitDetail={unitDetail}
                                                  day={session}
                                                  unit={unit}
                                                  setShowPopup={setShowPopup}
                                                  showPopup={showPopup}
                                                />
                                              )}
                                          </div>
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                ))}
                              </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
          <div className="border w-[350px] mr-[100px]">
            <h2 className="text-2xl text-center font-bold text-[#FFFFFF] bg-[#2D3748] w-full rounded-t-full p-2 pl-10">
              Time allocation
            </h2>
            <div className="flex flex-col">
              <div className="flex justify-center items-center w-[100%] h-[300px] bg-white mt-[10px]">
                <PieChart data={typeDurations} />
              </div>
              <div className="sub-box m-auto">
                <Table data={typeDurations} />
              </div>
            </div>
          </div>
        </div>
      )
    </>
  );
};

export default Outline;
