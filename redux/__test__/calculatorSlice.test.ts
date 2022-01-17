
/**
 * @jest-environment jsdom
 */

import { changePurchasePrice, changeInterestRate, changePeriod, getMonthlyPayment } from '../calculatorSlice';
import store from '../store';

describe('calculatorSlice', () => {
  it('should return the initial state', () => {
    let state = store.getState();
  
    expect(state).toEqual({
      calculator: {
        purchasePrice: 50000,
        interestRate: 2.5,
        period: 20,
        monthlyPayment: '',
        loading: true,
        error: null
      }
    })
  });

  it('should update purchase price state', () => {
    store.dispatch(changePurchasePrice(1000000));
    expect(store.getState().calculator.purchasePrice).toBe(1000000);
  });

  it('should update interest rate state', () => {
    store.dispatch(changeInterestRate(1));
    expect(store.getState().calculator.interestRate).toBe(1);
  });

  it('should update period state', () => {
    store.dispatch(changePeriod(20));
    expect(store.getState().calculator.period).toBe(20);
  });

  // I still can find a good way to test createAsyncThunk
  // it('should update getMonthlyPayment', async () => {
  //   await store.dispatch(getMonthlyPayment({
  //     principal: 200000,
  //     interest: 2,
  //     term: 30
  //   }));
    
  //   expect(store.getState().calculator.monthlyPayment).toBe("739.24");
  // });
})