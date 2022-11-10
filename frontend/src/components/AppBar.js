import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/authState';

export default function AppBarNav() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
            <Link to={'/'}>
              Home page
            </Link>
          </Typography>

          {auth.user?.role === "admin" && (
            <Link to={'/postApost'}>
              <Button color="inherit">
                Add post
              </Button>
            </Link>
          )}

          {auth.user ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={() => navigate('/')}>Dashboard</MenuItem>
                <MenuItem onClick={() => auth.signout(() => handleClose())}>Disconnect</MenuItem>
              </Menu>
            </>
          ) : (
            <Link to={'/signin'}>
              <Button color="inherit">
                login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}