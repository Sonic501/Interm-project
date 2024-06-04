import React from "react";

const Search = () => {
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
        <g clipPath={"url(#clip0_765_10990)"}>
          <path
            d={
              "M 15.5 14 H 14.71 L 14.43 13.73 C 15.41 12.59 16 11.11 16 9.5 C 16 5.91 13.09 3 9.5 3 C 5.91 3 3 5.91 3 9.5 C 3 13.09 5.91 16 9.5 16 C 11.11 16 12.59 15.41 13.73 14.43 L 14 14.71 V 15.5 L 19 20.49 L 20.49 19 L 15.5 14 V 14 Z M 9.5 14 C 7.01 14 5 11.99 5 9.5 C 5 7.01 7.01 5 9.5 5 C 11.99 5 14 7.01 14 9.5 C 14 11.99 11.99 14 9.5 14 Z"
            }
            fill={"#285D9A"}
          ></path>
        </g>
        <defs>
          <clipPath id={"clip0_765_10990"}>
            <rect width={"24"} height={"24"} fill={"white"}></rect>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Search;
