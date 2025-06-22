import { Box, Container, Typography } from '@mui/material';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import SearchBox from '../components/SearchBox/SearchBox';
import { useTheme, useMediaQuery } from '@mui/material';

const ContactsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(135deg, rgba(245,247,250,0.9) 0%, rgba(195,207,226,0.9) 100%)',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: isMobile ? 2 : 4,
        animation: 'fadeIn 0.8s ease-out'
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: '100%'
        }}
      >
        <Typography
          variant={isMobile ? 'h3' : 'h2'}
          component="h1"
          color="primary"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 2
          }}
        >
          Phonebook
        </Typography>

        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            p: isMobile ? 2 : 3,
            mb: 3
          }}
        >
          <ContactForm />
        </Box>

        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            p: isMobile ? 2 : 3,
            mb: 3
          }}
        >
          <SearchBox />
        </Box>

        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            p: isMobile ? 2 : 3
          }}
        >
          <ContactList />
        </Box>
      </Container>
    </Box>
  );
};

export default ContactsPage;