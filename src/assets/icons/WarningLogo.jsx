import React from "react";

const WarningLogo = () => {
  return (
    <div className={`w-4 h-4`}>
      <svg
        width={"100%"}
        height={"100%"}
        preserveAspectRatio={"none"}
        viewBox={"0 0 16 16"}
        fill={"none"}
        xmlns={"http://www.w3.org/2000/svg"}
      >
        <path
          d={
            "M 8 16 C 12.419 16 16 12.419 16 8 C 16 3.581 12.419 0 8 0 C 3.581 0 0 3.581 0 8 C 0 12.419 3.581 16 8 16 Z M 8.75 11.25 C 8.75 11.663 8.413 12 8 12 C 7.588 12 7.25 11.664 7.25 11.25 L 7.25 7.25 C 7.25 6.836 7.586 6.5 8 6.5 C 8.414 6.5 8.75 6.834 8.75 7.25 V 11.25 Z M 8 3.5 C 8.543 3.5 8.983 3.94 8.983 4.483 C 8.983 5.025 8.543 5.465 8 5.465 C 7.457 5.465 7.018 5.025 7.018 4.483 C 7.019 3.941 7.456 3.5 8 3.5 Z"
          }
          fill={"#F1F1F1"}
        ></path>
      </svg>
    </div>
  );
};

export default WarningLogo;
