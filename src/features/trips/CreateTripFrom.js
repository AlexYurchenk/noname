import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../users/userSlice';
import {
    createTrip,
    getTrip,
    deleteTrip,
    updateTrip,
    getAllTrip,
    bookTrip,
} from './tripsOperations';
import { selectIsTripCreated, selectTrips } from './tripsSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectError } from './tripsSlice';
import Modal from '@mui/material/Modal';
import TripsForm from './TripsForm';
import TripsList from './TripsList';
export default function CreateTripFrom() {
    const dispatch = useDispatch();
    const isTripCreated = useSelector(selectIsTripCreated);
    const user = useSelector(selectUser);
    const error = useSelector(selectError);
    const trips = useSelector(selectTrips);
    const userRole = user.role;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chosenTrip, setChosenTrip] = useState(null);
    const [bookedPlaces, setBookedPlaces] = useState(0);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        mt: 1,
    };
    useEffect(() => {
        if (userRole === 'passenger') {
            dispatch(getAllTrip());
        }
    }, [dispatch, userRole]);

    const handleModalOpen = (id) => {
        setChosenTrip(trips.find((t) => t.id === id));
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const notificationError = (err) =>
        toast.error(err, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    const notificationSuccess = (notification) =>
        toast.success(notification, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    useEffect(() => {
        if (user.email && userRole !== 'passenger') {
            dispatch(getTrip(user.email));
        }
    }, [dispatch, user.email, userRole]);

    useEffect(() => {
        if (error) {
            notificationError(error);
        }
    }, [error]);
    useEffect(() => {
        if (isTripCreated) {
            notificationSuccess('Trip was created');
        }
    }, [isTripCreated]);
    const handleTripCrete = (trip) => {
        dispatch(
            createTrip({
                ...trip,
                owner: user.email,
            })
        );
    };
    const handleTripUpdated = (trip) => {
        handleModalClose();
        dispatch(
            updateTrip({
                ...trip,
                owner: chosenTrip.owner,
                id: chosenTrip.id,
            })
        );
    };
    const handleBookedTrip = (id) => {
        setChosenTrip(trips.find((t) => t.id === id));
        setIsModalOpen(true);
    };
    const handlePlaceBook = ({ id, placesBooked }) => {
        const trip = trips.find((t) => t.id === id);
        if (Number(placesBooked) > Number(trip.availablePlacesCount)) {
            notificationError('There are not enough available places');

            setIsModalOpen(false);
            setBookedPlaces(0);
            return;
        }

        const availablePlacesCount = {
            availablePlacesCount:
                Number(trip.availablePlacesCount) - Number(placesBooked),
        };
        dispatch(bookTrip({ availablePlacesCount, id }));
        handleModalClose();
    };
    const handleTripDelete = (id) => {
        dispatch(deleteTrip(id));
    };
    return (
        <>
            <Container sx={{ mt: 10 }}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {userRole !== 'passenger' && (
                        <>
                            <Typography component='h1' variant='h5'>
                                Create trip
                            </Typography>
                            <TripsForm handleSubmit={handleTripCrete} />
                        </>
                    )}

                    {trips && (
                        <TripsList
                            trips={trips}
                            userRole={userRole}
                            handleTripDelete={handleTripDelete}
                            handleModalOpen={handleModalOpen}
                            handleBookedTrip={handleBookedTrip}
                        />
                    )}
                </Box>
            </Container>
            <ToastContainer />
            {chosenTrip && userRole !== 'passenger' && (
                <Modal
                    open={isModalOpen}
                    onClose={handleModalClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <TripsForm
                        handleSubmit={handleTripUpdated}
                        chosenTrip={chosenTrip}
                    />
                </Modal>
            )}
            {userRole === 'passenger' && (
                <Container component='main' maxWidth='xs'>
                    <Modal
                        open={isModalOpen}
                        onClose={handleModalClose}
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                    >
                        <Box
                            component='form'
                            onSubmit={(e) =>
                                handlePlaceBook({
                                    id: chosenTrip.id,
                                    placesBooked: bookedPlaces,
                                })
                            }
                            noValidate
                            sx={style}
                        >
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='auto'
                                label='Places count'
                                name='places count'
                                autoFocus
                                type='number'
                                value={bookedPlaces}
                                onChange={(e) =>
                                    setBookedPlaces(e.target.value)
                                }
                                min={0}
                            />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Book places
                            </Button>
                        </Box>
                    </Modal>
                </Container>
            )}
        </>
    );
}
