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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';

import styles from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [checked, setChecked] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isLoading && !error) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [isLoading, error]);

  const handleDeleteClick = (id) => {
    setContactToDelete(id);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    if (isDeleting) return; 
    setConfirmOpen(false);
    setContactToDelete(null);
  };
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteContact(contactToDelete)).unwrap();
    } catch (error) {
      console.error('Delete failed silently:', error);
    } finally {
      setIsDeleting(false);
      setConfirmOpen(false);
      setContactToDelete(null);
    }
  };
  

  return (
    <>
      {!isLoading && !error && (
        <List
          className={styles['contact-list']}
          sx={{
            maxWidth: 400,
            margin: '0 auto',
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
        >
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
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.05)',
                  },
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
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
                  onClick={() => handleDeleteClick(id)}
                  size="small"
                  disabled={isDeleting}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </Slide>
          ))}
        </List>
      )}

      {/* Модалка підтвердження видалення */}
      <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            boxShadow: 'none',
            backdropFilter: 'blur(8px)',
            color: '#fff',
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        }}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button
            variant="outlined"
            onClick={handleConfirmClose}
            sx={{ color: '#fff', borderColor: '#fff' }}
            disabled={isDeleting}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress color="inherit" size={20} /> : null}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContactList;
