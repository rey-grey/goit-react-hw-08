import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';

const AuthNav = () => {
  return (
    <Box component="nav" sx={{ display: 'flex', gap: 3 }}>
      <NavLink
        to="/register"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: 'inherit',
          fontWeight: isActive ? '700' : '400',
          fontSize: '1rem',
        })}
      >
        Register
      </NavLink>

      <NavLink
        to="/login"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: 'inherit',
          fontWeight: isActive ? '700' : '400',
          fontSize: '1rem',
        })}
      >
        Log In
      </NavLink>
    </Box>
  );
};

export default AuthNav;
