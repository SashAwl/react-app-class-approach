import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

type SelectedState = number[];
const initialState: SelectedState = [];

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

export const { toggleSelect, clearSelectedList } = selectedItemsSlice.actions;
export const selectedItemsCount = (state: RootState) =>
  state.selectedItems.length;

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
