import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect } from "react";
import { activeProgram, deActiveProgram, deleteTrainingProgram, duplicateTrainingProgram } from "./ViewListProgramService";
import CustomizedEdits from "./EditForm/EditForm";
import { useSelector } from "react-redux";


export default function PositionedMenu({status, id, fetchDataSearch, name}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const token = useSelector((state) => state.auth.token);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {

  },[id]) 

  console.log(id)
  const changeStatus = async () => {
    status ? await deActiveProgram(id, token) : await activeProgram(id, token);
  }

  const handleChangeStatus = async () => {
    await changeStatus();
    await fetchDataSearch();
    handleClose();
  }
  
  const deleteProgram = async () => {
    await deleteTrainingProgram(id, token);
  }

  const handleDelete = async () => {
    await deleteProgram();
    await fetchDataSearch();
    alert("Program deleted successfully!");
    handleClose();
  }

  const duplicateProgram = async () => {
    await duplicateTrainingProgram(id, token);
  }
  
  const handleDuplicate = async () => {
    await duplicateProgram();
    await fetchDataSearch();
    alert("Item has been successfully copied!");
    handleClose();
  }
  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <CustomizedEdits id={id} open={open} handleClose={handleClose} name={name} fetchDataSearch={fetchDataSearch}/>     
        <MenuItem sx={{ color: "#2C5282" }} onClick={handleDuplicate}>
          <ContentCopyIcon sx={{ mr: "4px" }} />
          Duplicate program
        </MenuItem>
        {status ? (
          <MenuItem sx={{ color: "#2C5282" }} onClick={handleChangeStatus}>
            <VisibilityOffIcon sx={{ mr: "4px" }} />
            De-active program
          </MenuItem>
          
        ) : (
          <MenuItem sx={{ color: "#2C5282" }} onClick={handleChangeStatus}>
            <VisibilityIcon sx={{ mr: "4px" }} />
            Active program
          </MenuItem>
        )}
        <MenuItem sx={{ color: "#2C5282" }} onClick={() => {
          if (window.confirm("Do you want to delete or not?")) {
            handleDelete();
          }
        }}>
          <DeleteForeverIcon sx={{ mr: "4px" }} />
          Delete program
        </MenuItem>
      </Menu>
    </div>
  );
}