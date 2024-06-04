import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const ProgressBar = (props) => {
  const { value, color } = props;
  const CheckMarkSlider = styled(Slider)(({ theme }) => ({
    color: color,
    height: "12px",
    width: "320px",
    padding: "0",
    "& .MuiSlider-thumb": {
      height: "14px",
      width: "14px",
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:hover": {
        boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
      },
    },

    "& .MuiSlider-rail": {
      color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
      opacity: theme.palette.mode === "dark" ? undefined : 1,
      height: "12px",
    },
  }));
  return (
    <div className="content_header">
      <p className="header_text">Syllabus</p>
      <div className="header_progress">
        <Box style={{ height: "12px" }}>
          <CheckMarkSlider value={14 + value} />
        </Box>
        <ul className="header_progress_text">
          <li>General</li>
          <li>Outline</li>
          <li>Others</li>
          <li>Done</li>
        </ul>
      </div>
    </div>
  );
};
export default ProgressBar;
