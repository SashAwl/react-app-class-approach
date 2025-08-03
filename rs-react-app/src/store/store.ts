import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

type SelectedState = number[];
const initialState: SelectedState = [];

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    setValue(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
  },
});

const selectedItemsSlice = createSlice({
  name: 'selectedSlice',
  initialState,
  reducers: {
    toggleSelect(state, action: PayloadAction<number>) {
      return state.includes(action.payload)
        ? state.filter((item) => item !== action.payload)
        : [...state, action.payload];
    },
    clearSelectedList() {
      return [];
    },
  },
});

export const { increment, decrement, setValue } = counterSlice.actions;
export const { toggleSelect, clearSelectedList } = selectedItemsSlice.actions;

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    selectedItems: selectedItemsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
