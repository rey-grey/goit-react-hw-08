import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/auth/operations';
import { 
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(135deg, rgba(245,247,250,0.9) 0%, rgba(195,207,226,0.9) 100%)',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: isMobile ? 2 : 3,
        animation: 'fadeIn 0.8s ease-out'
      }}
    >
      <Container 
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: isMobile ? 3 : 4,
            width: '100%',
            maxWidth: 500,
            textAlign: 'center',
            background: theme.palette.background.paper,
            transform: 'translateY(0)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: 6
            }
          }}
        >
          <Typography 
            variant={isMobile ? 'h4' : 'h3'}
            component="h1" 
            gutterBottom
            color="primary"
            sx={{ 
              fontWeight: 'bold',
              mb: 3
            }}
          >
            Registration
          </Typography>

          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%'
            }}
          >
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{
                py: 1.5,
                mb: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Register
            </Button>

            <Typography variant="body2">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" color="secondary">
                Sign In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegistrationPage;