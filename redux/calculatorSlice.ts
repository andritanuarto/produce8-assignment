import { createSlice } from '@reduxjs/toolkit';

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: {
    purchasePrice: 50000,
    interestRate: 2.5,
    period: 20
  },
  reducers: {
    changePurchasePrice: (state, action) => {
      state.purchasePrice = action.payload;
    },
    changeInterestRate: (state, action) => {
      state.interestRate = action.payload;
    }
  },
});

export const { changePurchasePrice, changeInterestRate } = calculatorSlice.actions
export default calculatorSlice.reducer