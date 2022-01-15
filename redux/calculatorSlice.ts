import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type CalculationValues = {
  principal: number,
  interest: number,
  term: number
}

type InitialState = {
  purchasePrice: number,
  interestRate: number,
  period: number,
  monthlyPayment: string,
  loading: boolean,
  error: any,
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
)

const initialState: InitialState = {
  purchasePrice: 50000,
  interestRate: 2.5,
  period: 20,
  monthlyPayment: "",
  loading: false,
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
          state.error = action.payload.error;
          return;
        }
        if (
          state.loading === true && action.payload.monthlyPayment
        ) {
          if (state.error) {
            state.error = null;
          }
          state.loading = false
          state.monthlyPayment = action.payload.monthlyPayment
        }
      })
      .addCase(getMonthlyPayment.pending, (state) => {
        if (state.error) {
          state.error = null;
        }

        if (state.loading === false) {
          state.loading = true
        }
      })
  }
});

export const { changePurchasePrice, changeInterestRate, changePeriod } = calculatorSlice.actions
export default calculatorSlice.reducer