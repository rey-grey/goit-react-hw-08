import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredContacts, selectLoading, selectError } from '../../redux/contacts/slice';
import { deleteContact } from '../../redux/contacts/operations';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Slide from '@mui/material/Slide';
import { useState, useEffect } from 'react';

import styles from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isLoading && !error) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [isLoading, error]);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>Error: {error}</p>}

      {!isLoading && !error && (
        <List className={styles['contact-list']} sx={{ maxWidth: 400, margin: '0 auto' }}>
          {filteredContacts.map(({ id, name, number }, index) => (
            <Slide
              key={id}
              direction="up"
              in={checked}
              style={{ transitionDelay: `${index * 100}ms` }}
              mountOnEnter
              unmountOnExit
            >
              <ListItem
                divider
                sx={{
                  backgroundColor: 'transparent',
                  borderRadius: '12px',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  boxShadow: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',  // легкий синий фон при ховере
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)', // тень
                    transform: 'translateY(-2px)', // чуть поднять карточку
                  },
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <ListItemIcon
                    sx={{
                      minWidth: '40px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.2)', // увеличиваем иконку при наведении на карточку
                      },
                    }}
                  >
                    <PersonIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={name}
                    secondary={number}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    secondaryTypographyProps={{ color: 'text.secondary' }}
                  />
                </div>

                <IconButton
                  edge="end"
                  aria-label="delete"
                  color="error"
                  onClick={() => handleDelete(id)}
                  size="small"
                  sx={{
                    transition: 'transform 0.2s ease, color 0.2s ease',
                    '&:hover': {
                      color: '#d32f2f', // чуть ярче красный при ховере
                      transform: 'scale(1.2)', // увеличиваем кнопку
                    },
                  }}
                >
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
