import React from "react";

const Filter = () => {
  return (
    <div className={`w-6 h-6`}>
      <svg
        width={"100%"}
        height={"100%"}
        preserveAspectRatio={"none"}
        viewBox={"0 0 24 24"}
        fill={"none"}
        xmlns={"http://www.w3.org/2000/svg"}
      >
        <g clipPath={"url(#clip0_765_10993)"}>
          <path d={"M 10 18 H 14 V 16 H 10 V 18 Z M 3 6 V 8 H 21 V 6 H 3 Z M 6 13 H 18 V 11 H 6 V 13 Z"} fill={"#F1F1F1"}></path>
        </g>
        <defs>
          <clipPath id={"clip0_765_10993"}>
            <rect width={"24"} height={"24"} fill={"white"}></rect>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Filter;
