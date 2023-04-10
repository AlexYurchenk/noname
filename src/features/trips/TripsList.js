import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

export default function TripsList({
    trips,
    userRole,
    handleTripDelete,
    handleModalOpen,
    handleBookedTrip,
}) {
    return (
        <ul>
            {trips.map(
                ({
                    id,
                    availablePlacesCount,
                    carInformation,
                    carNumbers,
                    dispatchDate,
                }) => (
                    <Card
                        key={id}
                        sx={{ width: '100%', mb: 1 }}
                        variant='outlined'
                    >
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color='text.secondary'
                                gutterBottom
                            >
                                Date of trip
                                {new Date(dispatchDate).toLocaleDateString()}
                            </Typography>
                            <Typography variant='h5' component='div'>
                                Car information: {carInformation}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                                Car numbers {carNumbers}
                            </Typography>
                            <Typography variant='body2'>
                                Available places :{availablePlacesCount}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {userRole !== 'passenger' ? (
                                <>
                                    <Button
                                        size='small'
                                        onClick={() => handleTripDelete(id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        onClick={() => handleModalOpen(id)}
                                        size='small'
                                        sx={{ mr: 1 }}
                                    >
                                        Update
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    onClick={() => handleBookedTrip(id)}
                                    size='small'
                                    sx={{ mr: 1 }}
                                >
                                    Book trip
                                </Button>
                            )}
                        </CardActions>
                    </Card>
                )
            )}
        </ul>
    );
}
