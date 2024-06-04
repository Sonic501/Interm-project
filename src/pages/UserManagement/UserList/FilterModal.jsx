import { FilterIcon } from '../../../components/Icons'
import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from '@mui/material/Select';

import { FormControl, InputLabel, MenuItem } from '@mui/material';
import moment from 'moment';
import { filterListUser } from '../../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
const FilterModal = () => {
    const { token } = useSelector(state => state.auth)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState(null);
    const [attendee, setAttendee] = React.useState('');
    const [gender, setGender] = React.useState('');
    const dispatch = useDispatch()
    const handleChange = (event) => {
        setGender(event.target.value)
    };

    const handleChangeAttendee = (event) => {
        setAttendee(event.target.value);
    }

    const handleClear = () => {
        setGender('')
        setAttendee('')
        setValue(null)
    }

    const converseDate = (day, month, year) => {
        if (day !== undefined && month !== undefined && year !== undefined) {
            return `${day}%2F${month}%2F${year}`
        } else {
            return ''
        }
    }

    const handleSubmit = () => {

        const day = value?.format('DD')
        const month = value?.format('MM')
        const year = value?.format('YYYY')
        const date = converseDate(day, month, year)
        console.log(date)
        dispatch(filterListUser({ gender, attendee, date, token }))
        setOpen(false)
    }



    return (
        <>
            <Button sx={{
                backgroundColor: '#2D3748', borderRadius: '10px', color: 'white',
                "&:hover": {
                    color: 'white',
                    backgroundColor: '#43526B'
                },
            }} onClick={handleOpen}><FilterIcon />Filter</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '20px'
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '10px' }}>
                        Date of birth
                    </Typography>

                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker

                                label='Date of Birth'
                                value={value}
                                onChange={(newValue) => setValue(newValue)} />
                        </DemoContainer>
                    </LocalizationProvider>

                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '10px', marginTop: '10px' }}>
                        Gender
                    </Typography>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="Gender"
                            onChange={handleChange}
                        >
                            <MenuItem value={'true'}>Male</MenuItem>
                            <MenuItem value={'false'}>Female</MenuItem>

                        </Select>
                    </FormControl>


                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '10px', marginTop: '10px' }}>
                        Attendee
                    </Typography>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Attendee</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={attendee}
                            label="Attendee"
                            onChange={handleChangeAttendee}
                        >
                            <MenuItem value={1}>Fresher</MenuItem>
                            <MenuItem value={2}>Online free-fresher</MenuItem>
                            <MenuItem value={3}>Offline free-fresher</MenuItem>
                            <MenuItem value={4}>Intern</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <Button sx={{
                            backgroundColor: '#474747',
                            color: 'white',
                            borderRadius: '10px',
                            width: '',
                            "&:hover": {
                                color: 'white',
                                backgroundColor: '#595959'
                            },
                        }} onClick={handleClear}>Clear</Button>
                        <Button sx={{
                            backgroundColor: '#2D3748',
                            color: 'white',
                            borderRadius: '10px',

                            "&:hover": {
                                color: 'white',
                                backgroundColor: '#43526B'
                            },

                        }} onClick={handleSubmit}>Search</Button>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default FilterModal
