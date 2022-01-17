import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type CalculationValues = {
  principal: number,
  interest: number,
  term: number
}

export type InitialStateType = {
  purchasePrice: number,
  interestRate: number,
  period: number,
  monthlyPayment: string,
  loading: boolean,
  error: {error?: string} | null,
};

export const getMonthlyPayment = createAsyncThunk(
  'users/getMonthlyPayment',
  async (values:CalculationValues): Promise<{monthlyPayment?: string, error?: string}> => {
    const url = `/api/mortgageCalculation?principal=${values.principal}&annualInterestRate=${values.interest}&termOfLoan=${values.term}`;
    
    const response = await fetch(url, {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
    });

    return response.json();
  }
);

const initialState: InitialStateType = {
  purchasePrice: 50000,
  interestRate: 2.5,
  period: 20,
  monthlyPayment: '',
  loading: true,
  error: null,
};

export const calculatorSlice = createSlice({
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
  extraReducers: (builder) => {
    builder
      .addCase(getMonthlyPayment.fulfilled, (state, action) => {
        if (action.payload.error) {
          // this looks like a direct mutation but it's not in the background
          //  Redux Toolkit detects changes "draft state" and create new
          //  immutable state base on those changes
          state.error = action.payload.error as {error?: string};
          return;
        }
        if (action.payload.monthlyPayment) {
          if (state.error) {
            state.error = null;
          }
          if (state.loading) {
            state.loading = false;
          }
          state.monthlyPayment = action.payload.monthlyPayment;
        }
      })
      .addCase(getMonthlyPayment.pending, (state) => {
        if (state.error) {
          state.error = null;
        }

        if (!state.loading ) {
          state.loading = true;
        }
      });
  }
});

export const { changePurchasePrice, changeInterestRate, changePeriod } = calculatorSlice.actions;
export default calculatorSlice.reducer;