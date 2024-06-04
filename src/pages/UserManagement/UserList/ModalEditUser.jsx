import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Button, Divider, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../redux/slices/userSlice';
import { ModifyIcon } from '../UserPermission/IconSelectDropdown';
const ModalEditUser = ({ user, page, rowsPerPage }) => {
    const { token } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    // console.log(user?.dob)
    const genderUser = user?.gender
    const dobUser = user?.dob
    const newNameUser = user?.fullName
    // console.log(genderUser)

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
    const moment1 = moment(dobUser)

    const [gender, setGender] = React.useState(genderUser);
    const [nameUser, setNameUser] = React.useState(newNameUser)
    const [value, setValue] = React.useState(moment1);



    const handleChange = (event) => {
        setGender(event.target.value);
    };

    const handleNameChange = (event) => {
        setNameUser(event.target.value)
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const handleSubmit = () => {
        let check = true
        if (nameUser === '') {
            check = false
        }
        if (check) {
            const dateOfBirth = value.format('YYYY-MM-DD')
            dispatch(updateUser({ gender, nameUser, dateOfBirth, user, token }))
        }
    }

    return (
        <>
            <li >
                <a onClick={handleOpen}><span><ModifyIcon /></span>Edit user</a>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Box sx={style} component="form">
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ paddingBottom: '20px', textAlign: 'center', textTransform: 'uppercase' }}>
                            {user?.fullName}
                        </Typography>
                        <Divider sx={{ marginBottom: '30px' }} />
                        <TextField
                            label="Full name"
                            fullWidth
                            defaultValue={nameUser}
                            onChange={handleNameChange}
                            required
                            error={nameUser === ""}
                            helperText={nameUser === "" ? "Please enter your full name" : ""}
                        />
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label='Date of Birth'
                                    sx={{ marginTop: '20px', paddingBottom: '30px' }}
                                    value={value} onChange={(newValue) => setValue(newValue)} />
                            </DemoContainer>
                        </LocalizationProvider>


                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={gender}
                                value={gender}
                                label="Gender"
                                onChange={handleChange}
                            >
                                <MenuItem value={'false'}>Female</MenuItem>
                                <MenuItem value={'true'}>Male</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" fullWidth sx={{ backgroundColor: '#2D3748', marginTop: '30px', height: '50px', fontSize: '16px' }} onClick={handleSubmit}>Submit</Button>
                    </Box>
                </Modal>
            </li>
        </>
    )
}

export default ModalEditUser