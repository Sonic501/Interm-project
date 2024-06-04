import ConceptLecture from "/src/assets/icons/ConceptLecture";
import Grade from "/src/assets/icons/Grade";
import HomeWork from "/src/assets/icons/HomeWork";
import React from "react";
import { useSelector } from "react-redux";

const Note = ({ classItem }) => {
  const chose = useSelector((state) => state.trainingCalendar.chose);
  const className = {
    bgColor: " ",
    title: "font-bold leading-[normal]",
    info: "text-xs flex flex-col items-start self-stretch text-black font-normal w-full mb-[7px]",
    NoteContainer: "text-left  flex flex-col p-2.5 rounded-bl-[10px] rounded-br-[10px] h-[199px] font-['Inter'] ",
  };

  switch (classItem.attendee) {
    case "Fresher":
      className.bgColor = "bg-fresher/50";
      break;
    case "Intern":
      className.bgColor = "bg-intern/50";
      break;
    case "Offline free-fresher":
      className.bgColor = "bg-offline-free-fresher/50";
      break;
    case "Online free-intern":
      className.bgColor = "bg-online-free-intern/50";
      break;
  }

  return (
    <div className={className.NoteContainer + " " + className.bgColor}>
      {/* className */}
      {chose === "week" && (
        <div className={className.info}>
          <p className={className.title}>{classItem.className}</p>
        </div>
      )}
      {/* duration */}
      <div className={className.info}>
        <p className={chose === "day" ? className.title : ""}>
          {`Day ${classItem?.durationDay.split("/")[0]} of ${classItem?.durationDay.split("/")[1]}`}
        </p>
      </div>
      {chose === "week" &&
        classItem.units.map((item, index) => (
          <div key={index} className={className.info}>
            <p>
              <span>Unit {item.unitNumber}</span> <span className={className.title}>{item.unitTitle}</span>
            </p>
          </div>
        ))}
      {/* location */}
      <div className={className.info}>
        <div className={`gap-10 flex w-full`}>
          <div className={`leading flex flex-col items-start mr-4`}>
            <div className={`h-4 gap-2.5 flex items-start w-[75px]`}>
              <HomeWork />
              <p className={`m-0 leading-[normal] h-[15px] w-[49px]`}>Location</p>
            </div>
          </div>
          <p className={`m-0 leading-[normal] flex-1`}>{classItem.locationName}</p>
        </div>
      </div>
      {/* trainer */}
      <div className={className.info}>
        <div className={`gap-10 flex w-full`}>
          <div className={`leading flex flex-col items-start mr-4`}>
            <div className={`h-4 gap-2.5 flex items-start w-[75px]`}>
              <ConceptLecture />
              <p className={`m-0 leading-[normal] h-[15px] w-[49px]`}>Trainer</p>
            </div>
          </div>
          <div className="flex flex-col text-[#285D9A] underline">
            {classItem?.trainerName.map((item, index) => {
              return (
                <p key={index} className={`m-0 leading-[normal] `}>
                  {item}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      {/* admin */}
      <div className={className.info}>
        <div className={`gap-10 flex w-full`}>
          <div className={`leading flex flex-col items-start mr-4`}>
            <div className={`h-4 gap-2.5 flex items-start w-[75px]`}>
              <Grade />
              <p className={`m-0 leading-[normal] h-[15px] w-[49px]`}>Admin</p>
            </div>
          </div>
          <div className="flex flex-col text-[#285D9A] underline">
            {classItem?.adminName.map((item, index) => {
              return (
                <p key={index} className={`m-0 leading-[normal] `}>
                  {item}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
