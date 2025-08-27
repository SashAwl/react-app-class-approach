import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type FormValues } from '../types/formValuesType';

const initialState: FormValues = {
  name: '',
  age: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  accept: false,
  country: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormValues>) => {
      return action.payload;
    },
  },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
