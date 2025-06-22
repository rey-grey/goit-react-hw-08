import React from 'react';
import { 
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Person,
  Phone,
  Security,
  Edit,
  Search
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(135deg, rgba(245,247,250,0.9) 0%, rgba(195,207,226,0.9) 100%), url(/src/assets/pattern.png)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: isMobile ? 2 : 3,
        animation: 'fadeIn 0.8s ease-out'
      }}
    >
      <Container 
        maxWidth="md"
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
            maxWidth: 800,
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
              mb: 2
            }}
          >
            Welcome to PhoneBook Pro
          </Typography>
          
          <Typography 
            variant={isMobile ? 'body1' : 'h6'} 
            paragraph
            sx={{ mb: 4 }}
          >
            Your ultimate contact management solution
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2,
            my: 4
          }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              component={Link}
              to="/register"
              fullWidth={isMobile}
              sx={{
                px: 4,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Get Started
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              size="large"
              component={Link}
              to="/login"
              fullWidth={isMobile}
              sx={{
                px: 4,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Sign In
            </Button>
          </Box>

          <Typography 
            variant="h5" 
            sx={{ 
              mt: 4, 
              mb: 2,
              fontSize: isMobile ? '1.3rem' : '1.5rem'
            }}
          >
            Key Features:
          </Typography>

          <List sx={{ textAlign: 'left' }}>
            <ListItem sx={{ px: isMobile ? 0 : 2 }}>
              <ListItemIcon>
                <Person color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Contact Management" 
                secondary="Store and organize all your contacts in one place" 
              />
            </ListItem>
            <ListItem sx={{ px: isMobile ? 0 : 2 }}>
              <ListItemIcon>
                <Search color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Advanced Search" 
                secondary="Find contacts by name or phone number instantly" 
              />
            </ListItem>
            <ListItem sx={{ px: isMobile ? 0 : 2 }}>
              <ListItemIcon>
                <Edit color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Easy Editing" 
                secondary="Update contact details with just a few clicks" 
              />
            </ListItem>
            <ListItem sx={{ px: isMobile ? 0 : 2 }}>
              <ListItemIcon>
                <Security color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Secure Access" 
                secondary="Your data is protected with modern security" 
              />
            </ListItem>
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;