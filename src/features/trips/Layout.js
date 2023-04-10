import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GroupIcon from '@mui/icons-material/Group';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../users/userSlice';
import { Outlet } from 'react-router-dom';
import { logout } from '../users/userOperations';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const drawerWidth = 240;
const ADMIN_FIELDS = ['Trips', 'Users'];
function Layout(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    let { pathname } = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />

            <List>
                {user.role !== 'admin' ? (
                    <ListItem key='trips' disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DirectionsCarIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Trips'} />
                        </ListItemButton>
                    </ListItem>
                ) : (
                    ADMIN_FIELDS.map((f) => (
                        <ListItem key={f} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {f === 'Trips' ? (
                                        <DirectionsCarIcon
                                            sx={{
                                                color:
                                                    pathname.includes(
                                                        f.toLocaleLowerCase()
                                                    ) && '#3498db',
                                            }}
                                        />
                                    ) : (
                                        <GroupIcon
                                            sx={{
                                                color:
                                                    pathname.includes(
                                                        f.toLocaleLowerCase()
                                                    ) && '#3498db',
                                            }}
                                        />
                                    )}
                                </ListItemIcon>
                                <NavLink
                                    style={{ textDecoration: 'none' }}
                                    to={
                                        f === 'Trips'
                                            ? '/auth/trips'
                                            : '/auth/users'
                                    }
                                >
                                    <ListItemText
                                        sx={{
                                            color: pathname.includes(
                                                f.toLocaleLowerCase()
                                            )
                                                ? '#3498db'
                                                : '#000',
                                        }}
                                        primary={f}
                                    />
                                </NavLink>
                            </ListItemButton>
                        </ListItem>
                    ))
                )}
            </List>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position='fixed'
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        noWrap
                        sx={{ flexGrow: 1 }}
                        component='div'
                    >
                        {`Hallo, ${user.email}`}
                    </Typography>
                    <Button onClick={() => dispatch(logout())} color='inherit'>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
                component='nav'
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label='mailbox folders'
            >
                <Drawer
                    container={container}
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant='permanent'
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Toolbar />

            <Outlet />
        </Box>
    );
}

export default Layout;
