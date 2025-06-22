import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global';


const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// const clearAuthHeader = () => {
//   delete axios.defaults.headers.common.Authorization;
// };

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      if (!auth.token) throw new Error('No token');
      
      setAuthHeader(auth.token);
      const { data } = await axios.get('/contacts');
      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        thunkAPI.dispatch({ type: 'auth/logout' });
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      if (!auth.token) throw new Error('No token');
      
      setAuthHeader(auth.token);
      const { data } = await axios.post('/contacts', contactData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      if (!auth.token) throw new Error('No token');
      
      setAuthHeader(auth.token);
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ contactId, updates }, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      if (!auth.token) throw new Error('No token');
      
      setAuthHeader(auth.token);
      const { data } = await axios.patch(`/contacts/${contactId}`, updates);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);