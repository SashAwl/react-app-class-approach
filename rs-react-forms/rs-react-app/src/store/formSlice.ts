import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  accept: boolean;
  country: string;
}

const initialState: FormData = {
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
    setFormData: (state, action: PayloadAction<FormData>) => {
      return action.payload;
    },
  },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
