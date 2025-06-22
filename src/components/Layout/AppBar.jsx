import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useLocation } from 'react-router-dom';

import Navigation from '../Layout/Navigation';
import AuthNav from '../Layout/AuthNav';
import UserMenu from '../Layout/UserMenu';

import AppBarMui from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  const hiddenPaths = ['/'];

  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <AppBarMui
      position="static"
      sx={{
        backgroundColor: '#1976d2',
        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.7)',
        backdropFilter: 'blur(10px)',
        mb: 0,
        minHeight: 40,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </Toolbar>
    </AppBarMui>
  );
};

export default AppBar;
