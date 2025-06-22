import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';

const Navigation = () => {
  return (
    <Box component="nav" sx={{ display: 'flex', gap: 3 }}>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          color: isActive ? '#1976d2' : 'inherit',
          textDecoration: 'none',
          fontWeight: isActive ? '700' : '400',
        })}
      >
        Home
      </NavLink>
      <NavLink
        to="/contacts"
        style={({ isActive }) => ({
          color: isActive ? '#1976d2' : 'inherit',
          textDecoration: 'none',
          fontWeight: isActive ? '700' : '400',
        })}
      >
        Contacts
      </NavLink>
    </Box>
  );
};

export default Navigation;
