import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField } from '@mui/material';
import { Box } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import { editTrainingProgram } from "../ViewListProgramService";
import { useDispatch, useSelector } from "react-redux";

export default function CustomizedEdits({ id, name, fetchDataSearch }) {

  const token = useSelector((state) => state.auth.token);
  const [open, setOpen] = React.useState(false);
  const [nameUser, setNameUser] = React.useState(name);
  const handleOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const editProgram = async () => {
    await editTrainingProgram(id, nameUser, token);
  }
  const handleSubmit = async () => {
    await editProgram();
    await fetchDataSearch();
    alert("edit successfully!");
    handleClose();
  }

  const handleNameChange = (event) => {
    setNameUser(event.target.value)
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 'fit-content',
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '10px',
    p: 4,
    maxWidth: '100%',
  };


  return (
    <Box  >
      <MenuItem sx={{ color: "#2C5282" }} onClick={() => handleOpen()}>
        <EditIcon sx={{ mr: "4px" }} />
        Edit program
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>

        <DialogContent sx={{ width: 500 }}>
          <TextField
            label="Edit name"
            fullWidth
            defaultValue={nameUser}
            onChange={handleNameChange}
            required
            error={nameUser === ""}
            helperText={nameUser === "" ? "Please enter your full name" : ""}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}