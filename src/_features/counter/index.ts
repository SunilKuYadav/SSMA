import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Counter {
  value: number;
}

const initialState: Counter = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'Counter',
  initialState,
  reducers: {
    increment: (state: Counter) => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByValue: (state: Counter, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const {increment, decrement, incrementByValue} = counterSlice.actions;

export default counterSlice.reducer;
