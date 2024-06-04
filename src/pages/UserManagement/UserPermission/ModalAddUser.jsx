import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, Typography } from "@mui/material"
import { useState } from "react"
import "./Modal.scss"
import { width } from "@mui/system";
import ImportButton from "../ImportButton";
import DownloadCSVFile from "../UserList/DownloadCSVFile";
import { useDispatch, useSelector } from "react-redux";
import { importUser } from "../../../redux/slices/userSlice";
import Swal from "sweetalert2";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: '10px',
};

export default function BasicModal() {
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isSyllabusCode, setisSyllabusCode] = useState(true);
    const [duplicateValue, setDuplicateValue] = useState('replace');
    const [fileName, setFileName] = useState(null)

    const handleDuplicateChange = (event) => {
        setDuplicateValue(event.target.value);
    };
    const handleChange = (event) => {
        setisSyllabusCode(!isSyllabusCode);
    };

    const handleSubmit = () => {
        console.log(fileName)
        let replace
        let skip
        if (duplicateValue === 'replace') {
            replace = true;
            skip = false;
        } else {
            replace = false;
            skip = true;
        }

        console.log('replace' + replace)
        console.log('skip' + skip)
        setOpen(false)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, import it!'
        }).then((result) => {
            if (result.isConfirmed && fileName) {
                dispatch(importUser({ replace, skip, token, fileName }))
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You are not importing csv file!',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Come back'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setOpen(true)
                    }
                })

            }
        })
    }

    // console.log(duplicateValue)
    // console.log(duplicateValue)


    return (
        <div>
            <div className='viewSyllabus__body__top__right__import' onClick={handleOpen}>
                <ImportButton />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="modal__name__wrapper">
                        <div className="modal__name">Import Users</div>
                    </div>
                    <div className="import__setting">
                        <div className="import__setting__title">Import setting</div>
                        <div className="import__setting__option__wrapper">
                            <div className="import__setting__option">
                                <div className="import__setting__option__title">
                                    File (csv)*
                                </div>
                                <div className="import__setting__option__option">
                                    <div className="import__setting__option__option__button">
                                        <div className="import__setting__option__option__button__text" >
                                            Select
                                        </div>
                                        <input type='file' onChange={(e) => setFileName(e.target.files[0])} />
                                    </div>
                                    {fileName?.name && <div style={{ fontSize: '20px' }}>{fileName?.name}</div>}
                                </div>
                            </div>
                            <div className="import__setting__option">
                                <div className="import__setting__option__title">
                                    Encoding Type
                                </div>
                                <div className="import__setting__option__option">
                                    <div className="import__setting__option__option__dropdown">
                                        <FormControl sx={{ width: "140px", height: "24px" }}>
                                            <Select
                                                sx={{ width: "140px", height: "24px" }}
                                                defaultValue='auto'
                                            >
                                                <MenuItem value="auto" >Auto detect</MenuItem>
                                                <MenuItem value="utf-8">UTF-8</MenuItem>
                                                <MenuItem value="ascii">ASCII</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="import__setting__option">
                                <div className="import__setting__option__title">
                                    Column seperator
                                </div>
                                <div className="import__setting__option__option">
                                    <div className="import__setting__option__option__dropdown">
                                        <FormControl sx={{ width: "140px", height: "24px" }}>
                                            <Select
                                                sx={{ width: "140px", height: "24px" }}
                                                defaultValue=','
                                            >
                                                <MenuItem value="," default>Comma</MenuItem>
                                                <MenuItem value=";">Semicolon</MenuItem>
                                                <MenuItem value="|">Pipe</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="import__setting__option">
                                <div className="import__setting__option__title pt-[4px]">
                                    Import template
                                </div>
                                <div className="import__setting__option__option">
                                    <div className="import__setting__option__option__download">
                                        <DownloadCSVFile />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr style={{ width: "440px", marginLeft: "20px" }} />
                    <div className="import__setting">
                        <div className="import__setting__title">Duplicate control</div>
                        <div className="import__setting__option__wrapper">
                            <div className="duplicate__control__scanning">
                                <div className="duplicate__control__scanning__title">Scanning</div>
                                <div className="duplicate__control__scanning__option">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isSyllabusCode}
                                                onChange={handleChange}
                                                value="fullname"
                                                color="primary"
                                            />
                                        }
                                        label="Fullname"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={!isSyllabusCode}
                                                onChange={handleChange}
                                                value="usermail"
                                                color="primary"
                                            />
                                        }
                                        label="Usermail"
                                    />
                                </div>
                            </div>
                            <div className="duplicate__control__duplicateHanlde">
                                <div className="duplicate__control__duplicateHanlde__title">Duplicate handle</div>
                                <div className="duplicate__control__duplicateHanlde__option">
                                    <FormControl>
                                        <RadioGroup
                                            value={duplicateValue}
                                            onChange={handleDuplicateChange}
                                            row
                                        >
                                            <FormControlLabel value="replace" control={<Radio />} label="Replace" />
                                            <FormControlLabel value="skip" control={<Radio />} label="Skip" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr style={{ width: "440px", marginLeft: "20px" }} />
                    <div className="bottom">
                        <div className="bottom__cancel" onClick={handleClose}>
                            Cancel
                        </div>
                        <div className="bottom__import" onClick={handleSubmit}>
                            <div className="bottom__import__text" >
                                Import
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}