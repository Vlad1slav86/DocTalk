import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import AuthService from '../../utils/auth';
import CheckboxComponent from './CheckBoxComponent';
import AppHeader from './AppHeader';

const pages = ['About Us', 'Contact Us', 'Services'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const isLoggedIn = AuthService.loggedIn();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const handleLogout = () => {
  //   AuthService.logout();
  //   window.location.reload(); 
  // };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo section */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              DocTalk
            </Typography>
          </Box>
          {/* User menu section */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isLoggedIn ? (
                <>
                  <Tooltip title="Open user menu">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="User Avatar" src="/static/images/avatar.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {/* Logout menu item */}
                    {/* <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem> */}
                  </Menu>

                </>
              ) : (
                <Box sx={{ display: 'flex' }}>
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button color="inherit" sx={{ color: 'white', mr: 1 }}>
                      Login
                    </Button>
                  </Link>

                  <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <Button color="inherit" sx={{ color: 'white' }}>
                      Sign Up
                    </Button>
                  </Link>
                </Box>
              )}
            </Box>
            {/* Navigation menu section */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {pages.map((page) => (
                <Link key={page} to={`/${page.replace(/\s/g, '').toLowerCase()}`} style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: 'white', display: 'block' }}>{page}</Button>
                </Link>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;