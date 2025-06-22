import { Outlet } from 'react-router-dom';
import AppBar from './AppBar'; 
import { Suspense } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const LoadingFallback = () => (
  <Box
    sx={{
      height: 'calc(100vh - 64px)', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: '#f0f4f8',
    }}
  >
    <CircularProgress color="primary" />
    <Typography variant="h6" sx={{ mt: 2, color: '#1976d2' }}>
      Loading...
    </Typography>
  </Box>
);

const Layout = () => {
  return (
    <div>
      <AppBar />
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
