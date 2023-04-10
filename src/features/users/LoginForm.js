import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectUser } from './userSlice';
import { login, loginWithGoogle, loginWithGithub } from './userOperations';
import GitHubIcon from '@mui/icons-material/GitHub';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const error = useSelector(selectError);
    const user = useSelector(selectUser);
    useEffect(() => {
        const notify = () =>
            toast.error(error, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        if (error) {
            notify();
        }
    }, [error]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login({ email, password }));

        formReset();
    };
    const formReset = () => {
        setEmail('');
        setPassword('');
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
                        Log in
                    </Typography>
                    {user && (
                        <Typography component='h1' variant='h5'>
                            {user.email}
                        </Typography>
                    )}
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
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log in
                        </Button>

                        <Button
                            sx={{ mb: 2 }}
                            fullWidth
                            type='button'
                            variant='contained'
                            endIcon={<GoogleIcon />}
                            onClick={() => dispatch(loginWithGoogle())}
                        >
                            Log in with Google
                        </Button>

                        <Button
                            sx={{ mb: 2 }}
                            fullWidth
                            type='button'
                            variant='contained'
                            endIcon={<GitHubIcon />}
                            onClick={() => dispatch(loginWithGithub())}
                        >
                            Log in with Github
                        </Button>
                        <Grid container>
                            <Grid item>
                                <NavLink to='/'>
                                    <Typography
                                        color={'#1976d2'}
                                        variant='body2'
                                    >
                                        {'Do not have an account? Sign Up'}
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
