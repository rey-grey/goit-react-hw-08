import React from 'react';
import css from './SearchBox.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectNameFilter } from '../../redux/filters/slice';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  const handleClear = () => {
    dispatch(changeFilter(''));
  };

  return (
    <div className={css.searchBox}
      style={{
        maxWidth: 400,
        margin: '0 auto',
        backgroundColor: 'transparent',
        padding: 0,
        marginBottom: 0,
        boxShadow: 'none',
      }}
    >
      <TextField
        label="Find contact"
        variant="outlined"
        size="small"
        value={filter}
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: filter ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={handleClear}
                edge="end"
                size="small"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'transparent',
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
        }}
      />
    </div>
  );
};

export default SearchBox;
