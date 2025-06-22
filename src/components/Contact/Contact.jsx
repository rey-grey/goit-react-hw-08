import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact'; // Можно заменить, если хочешь переделать кнопку удаления
import { selectFilteredContacts, selectLoading, selectError } from '../../redux/contacts/slice';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Slide from '@mui/material/Slide';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isLoading && !error) setChecked(true);
    else setChecked(false);
  }, [isLoading, error]);

  return (
    <div>
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>Error: {error}</p>}

      {!isLoading && !error && (
        <List sx={{ maxWidth: 400, margin: '0 auto', p: 0 }}>
          {filteredContacts.map(({ id, name, number }) => (
            <Slide
              key={id}
              direction="up"
              in={checked}
              mountOnEnter
              unmountOnExit
              timeout={300}
            >
              <ListItem
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'transparent',
                  borderRadius: '12px',
                  mb: 1,
                  px: 2,
                  py: 1,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#f0f7ff',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {number}
                    </Typography>
                  </Box>
                </Box>

                <IconButton aria-label="delete contact" color="error" size="small">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </Slide>
          ))}
        </List>
      )}
    </div>
  );
};

export default ContactList;
