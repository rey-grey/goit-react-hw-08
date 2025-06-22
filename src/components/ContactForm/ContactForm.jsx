import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const initialValues = { name: '', number: '' };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(3, 'Min 3 symbols')
      .max(50, 'Max 50 symbols')
      .required('The name is required'),
    number: Yup.string()
      .trim()
      .matches(/^\+?[0-9\s-]+$/, 'Only digits, spaces and dashes allowed')
      .required('The number is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const trimmedName = values.name.trim();
    const trimmedNumber = values.number.trim();

    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${trimmedName} is already in contacts!`);
      return;
    }

    if (contacts.some(contact => contact.number === trimmedNumber)) {
      alert(`${trimmedNumber} is already in contacts!`);
      return;
    }

    dispatch(addContact({ name: trimmedName, number: trimmedNumber }));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange
    >
      {({ isValid, dirty, errors, touched, handleChange, values, setFieldValue }) => (
        <Form
          style={{
            maxWidth: 400,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <TextField
            label="Name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="off"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: values.name ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear name"
                    onClick={() => setFieldValue('name', '')}
                    edge="end"
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            sx={{
              backgroundColor: 'transparent',
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                '& fieldset': {
                  borderColor: 'rgba(0,0,0,0.2)',
                  borderWidth: '1px',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                  borderWidth: '1.5px',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                  boxShadow: '0 0 8px #1976d2',
                  borderWidth: '2px',
                },
              },
              '& label.Mui-focused': {
                color: '#1976d2',
              },
              background: 'transparent',
            }}
          />

          <TextField
            label="Number"
            name="number"
            type="tel"
            value={values.number}
            onChange={handleChange}
            error={touched.number && Boolean(errors.number)}
            helperText={touched.number && errors.number}
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="off"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: values.number ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear number"
                    onClick={() => setFieldValue('number', '')}
                    edge="end"
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            sx={{
              backgroundColor: 'transparent',
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                '& fieldset': {
                  borderColor: 'rgba(0,0,0,0.2)',
                  borderWidth: '1px',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                  borderWidth: '1.5px',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                  boxShadow: '0 0 8px #1976d2',
                  borderWidth: '2px',
                },
              },
              '& label.Mui-focused': {
                color: '#1976d2',
              },
              background: 'transparent',
            }}
          />

          <button
            type="submit"
            disabled={!isValid || !dirty}
            style={{
              padding: '8px 16px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: !isValid || !dirty ? '#ccc' : '#1976d2',
              color: !isValid || !dirty ? '#666' : 'white',
              fontWeight: 'bold',
              cursor: !isValid || !dirty ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={e => {
              if (isValid && dirty) e.currentTarget.style.backgroundColor = '#145ea8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = !isValid || !dirty ? '#ccc' : '#1976d2';
            }}
          >
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
