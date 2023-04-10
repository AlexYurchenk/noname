import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { register } from './userOperations';
import { selectError, selectIsUserCreated } from './userSlice';
const ROLES = ['admin', 'deriver', 'passenger'];
export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(null);
    const error = useSelector(selectError);
    const isUserCreated = useSelector(selectIsUserCreated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        if (error) {
            notificationError(error);
        }
    }, [error]);
    useEffect(() => {
        if (isUserCreated) {
            notificationSuccess(
                'User was successfully created, you will be redirected to login page in 3 seconds'
            );
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    }, [isUserCreated, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(register({ email, password, role }));

        formReset();
    };
    const formReset = () => {
        setEmail('');
        setPassword('');
        setRole(null);
    };
    return (
        <>
            <Container component='main' maxWidth='xs'>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component='h1' variant='h5'>
                        Sign up
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value.trim())}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value.trim())}
                        />
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
                            Sign up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <NavLink to='/login'>
                                    <Typography
                                        color={'#1976d2'}
                                        variant='body2'
                                    >
                                        {'You already has an account? Log in'}
                                    </Typography>
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <ToastContainer />
        </>
    );
}
