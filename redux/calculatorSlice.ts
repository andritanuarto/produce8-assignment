import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type CalculationValues = {
  principal: number,
  interest: number,
  term: number
}

export const getMonthlyPayment = createAsyncThunk(
  'users/getMonthlyPayment',
  async (values:CalculationValues): Promise<{monthlyPayment: string}> => {
    const response = await fetch(`/api/mortgageCalculation?principal=${values.principal}&annualInterestRate=${values.interest}&termOfLoan=${values.term}`, {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    return response.json();
  }
)

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: {
    loading: true,
    purchasePrice: 50000,
    interestRate: 2.5,
    period: 20,
    monthlyPayment: ""
  },
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
        console.log(action.payload.monthlyPayment, 'action.payload')
        state.monthlyPayment = action.payload.monthlyPayment
      })
        
  }
});

export const { changePurchasePrice, changeInterestRate, changePeriod } = calculatorSlice.actions
export default calculatorSlice.reducer