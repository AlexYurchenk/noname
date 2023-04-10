import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from './userOperations';
import { selectAllUsers } from './userSlice';
import { useEffect, useState } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { updateUser } from './userOperations';
const ROLES = ['admin', 'deriver', 'passenger'];
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
export default function UsersRoute() {
    const [role, setRole] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const users = useSelector(selectAllUsers);
    const dispatch = useDispatch();
    const handleModalOpen = (id) => {
        setCurrentUser(users.find((u) => u.id === id));
        setRole(users.find((u) => u.id === id).role);
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const handleRoleChange = (event) => {
        event.preventDefault();
        dispatch(updateUser({ role, id: currentUser.id }));
        setIsModalOpen(false);
    };
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <>
            <Container sx={{ mt: 10 }}>
                <ul>
                    {users.map(({ id, email, role }) => (
                        <Card
                            id={id}
                            key={id}
                            sx={{ width: '100%', mb: 1 }}
                            variant='outlined'
                        >
                            <CardContent>
                                <Typography
                                    sx={{ mb: 2 }}
                                    variant='h5'
                                    component='div'
                                >
                                    Role:{role}
                                </Typography>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    color='text.secondary'
                                    gutterBottom
                                >
                                    Email: {email}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size='small'
                                    onClick={() => handleModalOpen(id)}
                                >
                                    Change role
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </ul>
            </Container>
            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Container sx={style} component='main' maxWidth='xs'>
                    <Box
                        component='form'
                        onSubmit={handleRoleChange}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <FormControl>
                            <FormLabel id='role'>Role</FormLabel>
                            <RadioGroup aria-labelledby='role' name='roles'>
                                {ROLES.map((r) => (
                                    <FormControlLabel
                                        key={r}
                                        value={r}
                                        control={<Radio />}
                                        label={r}
                                        checked={role === r}
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Change role
                        </Button>
                    </Box>
                </Container>
            </Modal>
        </>
    );
}
