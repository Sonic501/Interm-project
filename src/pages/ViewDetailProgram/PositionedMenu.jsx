import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from 'axios';
export default function PositionedMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Copyed to successfully');
      })
      .catch((error) => {
        alert(`Copy failed: ${error}`);
      });
  }
  const idChange = props.idChange;
  // const deActive = async (idChange) => {
  //   const url = `https://f-m-c-v3.azurewebsites.net/api/training-program/de-active-training-program/${idChange}`;
  //   try {
  //     return await (
  //       await instance
  //     ).data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon className="text-5xl text-white" />
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
        {/* <MenuItem sx={{ color: "#2C5282" }} onClick={handleClose}>
          <span class="material-symbols-outlined mr-4">snippet_folder </span>
          Training Material
        </MenuItem> */}
        <MenuItem sx={{ color: "#2C5282" }} onClick={handleClose}>
          <EditIcon sx={{ mr: "4px" }} />
          Edit program
        </MenuItem>
        <MenuItem sx={{ color: "#2C5282" }} onClick={() => copyTextToClipboard(props.nameProgram)}>
          <ContentCopyIcon sx={{ mr: "4px" }} />
          Duplicate program
        </MenuItem>
        {props.state ? (
          <MenuItem sx={{ color: "#2C5282" }} onClick={handleClose}>
            <VisibilityOffIcon sx={{ mr: "4px" }} />
            De-active program
          </MenuItem>
        ) : (
          <MenuItem sx={{ color: "#2C5282" }} onClick={handleClose}>
            <VisibilityIcon sx={{ mr: "4px" }} />
            Active program
          </MenuItem>
        )}
        <MenuItem sx={{ color: "gray" }} onClick={handleClose}>
          <DeleteForeverIcon sx={{ mr: "4px" }} />
          Delete program
        </MenuItem>
      </Menu>
    </div>
  );
}