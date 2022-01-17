/**
 * @jest-environment jsdom
 */

import { screen, render } from "@testing-library/react";
import MainContent from '../main-content';
import { Provider } from 'react-redux';
import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  purchasePrice: 50000,
  interestRate: 2.5,
  period: 20,
  monthlyPayment: '',
  loading: true,
  error: null,
};

export const getMonthlyPayment = createAsyncThunk(
  'users/getMonthlyPayment',
  () => {
    return 1500
  }
);

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    changePurchasePrice: (state, action) => {
      state.purchasePrice = action.payload;
    },
    changeInterestRate: (state, action) => {
      state.interestRate = action.payload;
    },
    changePeriod: (state, action) => {
      state.period = action.payload;
    }
  },
});

const store = configureStore({
  reducer: {
    calculator: calculatorSlice.reducer
  },
});

beforeEach(() => {
  render(
    <Provider store={store}>
      <MainContent />
    </Provider>
  )
})

describe('Main Content', () => {
  describe('should render without breaking', () => {
    it('have the header being rendered', async () => {
      const pageHeaderTitle = await screen.findByText('Get started with Digital Credit Experience');

      expect(pageHeaderTitle).toBeInTheDocument();
      expect(pageHeaderTitle).toBeInTheDocument();
    });

    it('have the header being rendered', async () => {
      const subTitle = await screen.findByText('Qualify or apply your mortgage in minutes');
      expect(subTitle).toBeInTheDocument();
    });
  });
})