import { useState } from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
export default function TripsForm({ handleSubmit, chosenTrip }) {
    const [dispatchDate, setDispatchDate] = useState(() =>
        chosenTrip
            ? dayjs(new Date(chosenTrip.dispatchDate))
            : dayjs(Date.now())
    );
    const [carNumbers, setCarNumbers] = useState(() =>
        chosenTrip ? chosenTrip.carNumbers : ''
    );
    const [availablePlacesCount, setAvailablePlacesCount] = useState(() =>
        chosenTrip ? chosenTrip.availablePlacesCount : 0
    );
    const [carInformation, setCarInformation] = useState(() =>
        chosenTrip ? chosenTrip.carInformation : ''
    );
    const onFromSubmit = (event) => {
        event.preventDefault();
        handleSubmit({
            dispatchDate: new Date(dispatchDate.$d).getTime(),
            availablePlacesCount,
            carInformation,
            carNumbers,
        });
        formReset();
    };
    const formReset = () => {
        setDispatchDate(dayjs(Date.now()));
        setCarNumbers('');
        setAvailablePlacesCount(0);
        setCarInformation('');
    };
    return (
        <Container style={{ backgroundColor: '#fff' }} maxWidth='xs'>
            <Box
                component='form'
                onSubmit={onFromSubmit}
                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='auto'
                    label='Cat info'
                    name='Cat info'
                    autoFocus
                    value={carInformation}
                    onChange={(e) => setCarInformation(e.target.value.trim())}
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='auto'
                    label='Places count'
                    name='places count'
                    autoFocus
                    type='number'
                    value={availablePlacesCount}
                    onChange={(e) => setAvailablePlacesCount(e.target.value)}
                    min={0}
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='numbers'
                    label='Car numbers'
                    type='numbers'
                    id='numbers'
                    sx={{ mb: 4 }}
                    value={carNumbers}
                    onChange={(e) => setCarNumbers(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        fullWidth
                        label='Trip start'
                        value={dispatchDate}
                        minDate={dayjs()}
                        onChange={(d) => setDispatchDate(d)}
                    />
                </LocalizationProvider>
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >
                    {chosenTrip ? 'Update trip' : 'Create trip'}
                </Button>
            </Box>
        </Container>
    );
}
