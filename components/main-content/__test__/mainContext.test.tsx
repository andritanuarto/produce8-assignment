/**
 * @jest-environment jsdom
 */

import { screen, render, fireEvent, prettyDOM, act } from "@testing-library/react";
import {within} from '@testing-library/dom'
import MainContent from '../main-content';
import { Provider } from 'react-redux';
import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialStateType, CalculationValues } from '../../../redux/calculatorSlice';
import { convertIntWithCommas } from "../../../util";

const initialState: InitialStateType = {
  purchasePrice: 50000,
  interestRate: 2.5,
  period: 20,
  monthlyPayment: '',
  loading: false,
  error: null,
};

/* 
  instead of using the calculation from mortgageCalculation api. 
  I think it's a good way to create a mock api by creating 
  simplified monthly payment function
*/
const calculatePayment = ({ principal, interest, term }:CalculationValues) => {
  const principalValue = parseInt(principal.toString());
  const annualInterestRateValue = parseInt(interest.toString());
  const termOfLoanValue = parseInt(term.toString());

  const percentageRate = annualInterestRateValue / 1200;
  const lengthOfLoan = 12 * termOfLoanValue;
  const monthlyPayment = (principalValue * percentageRate) / (1 - (Math.pow((1 + percentageRate) , lengthOfLoan * -1)));
  const payment = monthlyPayment.toFixed(2);

  return payment;
} 

const getMonthlyPayment = createAsyncThunk(
  'users/getMonthlyPayment',
  async (values:CalculationValues) => {
    return {monthlyPayment: calculatePayment(values)};
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
  extraReducers: (builder) => {
    builder
      .addCase(getMonthlyPayment.fulfilled, (state, action) => {
        state.monthlyPayment = action.payload.monthlyPayment;
        state.loading = false;
      })
      .addCase(getMonthlyPayment.pending, (state) => {
        state.loading = false;
      });
  }
});

const store = configureStore({
  reducer: {
    calculator: calculatorSlice.reducer
  },
});

beforeEach(() => {
  act(() => {
    render(
      <Provider store={store}>
        <MainContent />
      </Provider>
    )
  });
})

describe('Main Content', () => {
  describe('should render without breaking', () => {
    it('have the header being rendered', async () => {
      const pageHeaderTitle = await screen.findByText('Get started with Digital Credit Experience');
      expect(pageHeaderTitle).toBeInTheDocument();
    });

    it('has the subHeader being rendered', async () => {
      const subTitle = await screen.findByText('Qualify or apply your mortgage in minutes');
      expect(subTitle).toBeInTheDocument();
    });

    it('has all the input being rendered', async () => {
      const purchasePrice = await screen.findByText('Purchase Price');
      const interestRate = await screen.findByText('Interest Rate');
      const period = await screen.findByText('Period');
      const monthlyPayment = await screen.findByText('Your total monthly payment will be');

      expect(purchasePrice).toBeInTheDocument();
      expect(interestRate).toBeInTheDocument();
      expect(period).toBeInTheDocument();
      expect(monthlyPayment).toBeInTheDocument();
    });
  });

  describe('sliders should show correct value when they are changed', () => {  
    it('should print the correct purchase price when it\'s changed', async () => {
      const purchasePrice = await screen.findByTestId('purchasePriceInput');
      const purchasePriceInput = purchasePrice.querySelector("input");
  
      fireEvent.change(purchasePriceInput as HTMLInputElement, {target: {value: 100000}});
      expect(purchasePriceInput).toBeInTheDocument();
  
      const printedPurchase = await screen.findByText("100,000");
      expect(printedPurchase).toBeInTheDocument();
    })

    it('should print the interest rate price when it\'s changed', async () => {
      const interestRate = await screen.findByTestId('interestRateInput');
      const interestRateInput = interestRate.querySelector("input");
  
      fireEvent.change(interestRateInput as HTMLInputElement, {target: {value: 2.0}});
      expect(interestRateInput).toBeInTheDocument();
  
      const printedInterestRate = await screen.findByText("2.0");
      expect(printedInterestRate).toBeInTheDocument();
    });

    it('should check the correct period radio button', async () => {
      const period = await screen.findByTestId('mortgagePeriodInput30');
      const periodRadioButton = period.querySelector("input");

      fireEvent.change(periodRadioButton as HTMLInputElement, {target: {checked: true}});

      expect(periodRadioButton).toBeChecked();
    })
    
    it('should show the correct monthly payment', async () => {
      const principal = 250000;
      const interest = 2.5;
      const term = 25;
  
      const expectedMonthlyPayment = calculatePayment({ principal, interest, term });
  
      const purchasePrice = await screen.findByTestId('purchasePriceInput');
      const purchasePriceInput = purchasePrice.querySelector("input");
  
      const interestRate = await screen.findByTestId('interestRateInput');
      const interestRateInput = interestRate.querySelector("input");
  
      const period = await screen.findByTestId(`mortgagePeriodInput25`);
      const periodRadioButton = period.querySelector("input");
  
      await fireEvent.change(purchasePriceInput as HTMLInputElement, {target: {value: principal}});
      await fireEvent.change(interestRateInput as HTMLInputElement, {target: {value: interest}});
      await fireEvent.change(periodRadioButton as HTMLInputElement, {target: {checked: true}});
      
      const printedMonthPayment = await screen.getByTestId('monthlyPaymentNumber');
      const monthlyPayment = await screen.findByText('1,059');

      expect(monthlyPayment).toBeInTheDocument();
  
      // console.log(expectedMonthlyPayment, 'expectedMonthlyPayment')
    });
  });

})