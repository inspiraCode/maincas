import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Skeleton } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoginModal from '../Login';
import { useAuth0 } from '@auth0/auth0-react';
import useAuth from '@/core/useAuth';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = [
  'Profile',
  'Account',
  'Dashboard',
  'About',
  'Login',
  'Logout'
];

function ResponsiveAppBar() {
    const { isLoading, logout, error } = useAuth0();
    const { userMetadata} =useAuth()
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: string) => {
    if (setting === 'About') router.push('/about');
    if (setting === 'Profile') router.push('/profile');
    if (setting === 'Logout') logout();
    // if (setting === 'Logout') router.push('/api/auth/logout');
    // if (setting === 'Login') router.push('/api/auth/login');

    // console.log(setting);
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <Menu
          id='menu-appbar'
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' }
          }}
        >
          {pages.map(page => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Typography textAlign='center'>{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map(page => (
          <Button
            key={page}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            {page}
          </Button>
        ))}
      </Box>

      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title='Open settings'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar>
              {isLoading ? (
                <Skeleton variant='circular' width={40} height={40} />
              ) : error ? (
                error?.message
              ) : userMetadata ? (
                <Image
                  alt='User'
                  src={`${userMetadata?.picture || ''}`}
                  width={50}
                  height={50}
                />
              ) : (
                <LoginModal />
              )}
            </Avatar>
            <Typography fontWeight={600} ml={1} color={'white'}>
              {userMetadata?.nickname}
            </Typography>
          </IconButton>
        </Tooltip>
        <LoginModal />
        <Menu
          sx={{ mt: '45px' }}
          id='menu-appbar'
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map(setting => (
            <MenuItem
              key={setting}
              onClick={() => handleCloseUserMenu(setting)}
            >
              <Typography textAlign='center'>{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
}
export default ResponsiveAppBar;
