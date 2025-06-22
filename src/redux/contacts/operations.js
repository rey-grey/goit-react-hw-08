import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://connections-api.goit.global';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

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
      toast.error(`Failed to fetch contacts: ${error.message}`);
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
      toast.success(`Contact "${contactData.name}" added successfully! 🎉`);
      return data;
    } catch (error) {
      toast.error(`Failed to add contact: ${error.message}`);
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
      toast.success('Contact deleted successfully! 👌');
      return contactId;
    } catch (error) {
      toast.error(`Failed to delete contact: ${error.message}`);
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
      toast.success('Contact updated successfully!');
      return data;
    } catch (error) {
      toast.error(`Failed to update contact: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
