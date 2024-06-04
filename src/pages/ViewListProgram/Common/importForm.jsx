import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PublishIcon from "@mui/icons-material/Publish";
import { Box } from "@mui/system";
import { Alert, Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Form, Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import SelectComponent from "./SelectComponent";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(5),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

const downloadFile = async () => {
  const response = await axios.get('https://f-m-c-v3.azurewebsites.net/api/training-program/downloadFile/csv', {
    headers: {
      'accept': '*/*',
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjc4OTUzNjMyLCJleHAiOjE3NDIwNjc1MzZ9.oNbSE1phniTjfoBldw2ZfMJrjF4GsL1aqZr6HaDF21tD5c3DbQZaTnryLeRaLbu3DZlhRZSBXsZdIzroOWDsXQ'
    },
    responseType: 'blob'
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'TrainingProgram.csv');
  document.body.appendChild(link);
  link.click();
};
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post('https://f-m-c-v3.azurewebsites.net/api/training-program/uploadCsv', formData, {
    headers: {
      'accept': '*/*',
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjc4OTUzNjMyLCJleHAiOjE3NDIwNjc1MzZ9.oNbSE1phniTjfoBldw2ZfMJrjF4GsL1aqZr6HaDF21tD5c3DbQZaTnryLeRaLbu3DZlhRZSBXsZdIzroOWDsXQ',
      'Content-Type': 'application/json'
    }
  });
  console.log(response);
};



const hoverImport = {
  "&:hover": {
    textDecoration: "none",
    backgroundColor: "#FC0553",
    fontWeight: "bold",
  },
  backgroundColor: "#D45B13",
  color: "#FFFFFF",
  borderRadius: "10px",
  marginRight: "10px",
  fontWeight: "bold",
};

const hoverCancel = {
  "&:hover": {
    textDecoration: "none",
    backgroundColor: "#fc053f",
    fontWeight: "bold",
  },
  backgroundColor: "#fc0578",
  color: "#FFFFFF",
  borderRadius: "10px",
  marginRight: "0px",
  fontWeight: "bold",
};

const hoverImportInForm = {
  "&:hover": {
    textDecoration: "none",
    backgroundColor: "#0452d9",
    fontWeight: "bold",
  },
  backgroundColor: "#033e8c",
  color: "#FFFFFF",
  borderRadius: "15px",
  marginRight: "10px",
  padding: "5px 20px 5px 20px",
  fontWeight: "bold",
};

const BootstrapDialogTitle = (props) => {
  const { children } = props;

  return (
    <DialogTitle
      sx={{
        padding: "5px 150px 5px 150px",
        backgroundColor: "#0D3B66",
        color: "#ffffff",
      }}
    >
      {children}
      { (
        <IconButton
          aria-label="close"
          
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        ></IconButton>
      ) }
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,

};

export default function CustomizedDialogs() {
  const [file, setFile] = useState();
  const [errorFileType, setErrorFileType] = useState(false);
  const dispatch = useDispatch();
  function handleUp(event) {
    setFile(event.target.files[0]);
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    const formData = new FormData();
    formData.append("file", file);
    dispatch({ type: "Create_Training_Program_By_File", payload: formData });
    setOpen(false);
  };

  return (
    <Box>
      <Button sx={hoverImport}  onClick={handleClickOpen}>
        <PublishIcon sx={{ mr: "5px" }} />
        Import
      </Button>
      <form>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            <Typography
              component="span"
              align="center"
              sx={{ fontWeight: "bold", fontSize: "18px", marginLeft: "90px"}}
            >
              Import Training Program
            </Typography>
          </BootstrapDialogTitle>

          <DialogContent sx={{ overflow: "hidden" }} dividers>
            <Grid component="span" container spacing={3}>
              <Grid component="span" item xs={5}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Import Setting
                </Typography>
              </Grid>

              <Grid component="span" item xs={7}>
                <Typography component="span">
                  {errorFileType && (
                    <Alert
                      sx={{ transform: "translateY(-18px)" }}
                      severity="error"
                    >
                      File is not type of csv or xlsx
                    </Alert>
                  )}
                  File (.csv)
                  <SelectComponent
                    setError={setErrorFileType}
                    setFileImport={setFile}
                  />
                </Typography>
                <Typography component="span" sx={{ paddingTop: "18px" }}>
                  Encoding Type
                  <FormControl
                    sx={{ ml: 20, mt: -4, minWidth: 130 }}
                    size="small"
                  >
                    <InputLabel id="demo-select-small">Auto defect</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      // value={age}
                      label="Auto defect"
                      // onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
                <Typography component="span">
                  Column Seperator
                  <FormControl
                    sx={{ ml: 20, mt: -4, minWidth: 130 }}
                    size="small"
                  >
                    <InputLabel id="demo-select-small">Comma</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      // value={comma}
                      label="Comma"
                      // onChange={handleChanges}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
                <Typography component="span">
                  Import Template
                  <Box
                    sx={{
                      display: "block",
                      marginTop: "-22px",
                      paddingLeft: "161px",
                    }}
                  >
                    <Link
                      color="#EE964B"
                      underline="none"
                      onClick={downloadFile}
                    >
                      Download
                    </Link>
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogContent sx={{ overflow: "hidden" }} dividers>
            <Grid component="span" container spacing={3}>
              <Grid component="span" item xs={5}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Duplicate Control
                </Typography>
              </Grid>

              <Grid component="span" item xs={7}>
                <Typography component="span">Scanning</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mt: "12px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "-10px",
                    }}
                  >
                    <Checkbox value="code" {...label} />
                    <Typography component="span" sx={{ paddingTop: "10px" }}>
                      Program ID
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "-10px",
                    }}
                  >
                    <Checkbox value="name" {...label} />
                    <Typography component="span" sx={{ paddingTop: "10px" }}>
                      Program Name
                    </Typography>
                  </Box>
                </Box>

                <FormControl>
                  <Typography component="span" sx={{ mt: "12px", mb: "12px" }}>
                    Duplicate Handle
                  </Typography>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="allow"
                      control={<Radio />}
                      label="Allow"
                    />
                    <FormControlLabel
                      value="replace"
                      control={<Radio />}
                      label="Replace"
                    />
                    <FormControlLabel
                      value="skip"
                      control={<Radio />}
                      label="Skip"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button sx={hoverCancel} autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button sx={hoverImportInForm} autoFocus onClick={uploadFile}>
              Import
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </form>
    </Box>
  );
}
