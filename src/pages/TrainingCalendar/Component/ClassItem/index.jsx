import React, { useState } from "react";
import { useSelector } from "react-redux";
import Note from "./Note";

const ClassItem = ({ classItem }) => {
  const chose = useSelector((state) => state.trainingCalendar.chose);
  const [isOpen, setIsOpen] = useState(false);

  const className = {
    container: chose === "week" ? "border-r-[0.5px] border-[#474747] my-[10px]" : "my-[2px]",
    bgColor: "",
    classItem:
      " relative gap-2.5 inline-flex justify-center items-center p-2.5 ml-[14px] h-[35px] text-white text-left font-normal rounded-[5px] font-['Inter']",
    text: "text-xs m-0 leading-[normal]",
    line: "m-0 bg-white w-[1px] text-[10px] leading-[normal]",
    poper: "w-full min-w-[300px] absolute left-0 z-10 bg-white top-full",
  };

  switch (classItem.attendee) {
    case "Fresher":
      className.bgColor = "bg-fresher";
      break;
    case "Intern":
      className.bgColor = "bg-intern";
      break;
    case "Offline free-fresher":
      className.bgColor = "bg-offline-free-fresher";
      break;
    case "Online free-intern":
      className.bgColor = "bg-online-free-intern";
      break;
  }

  return (
    <>
      <div className={className.container}>
        <div
          className={className.classItem + " " + className.bgColor}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {chose === "day" && (
            <>
              <p className={className.text}>{classItem.className}</p>
              <p className={className.line}>
                <br />
              </p>
            </>
          )}
          <p className={className.text}>{classItem.classCode}</p>

          {isOpen && (
            <div className={className.poper}>
              <Note classItem={classItem} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassItem;
