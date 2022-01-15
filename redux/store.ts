import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import calculatorReducer from './calculatorSlice';

const store = configureStore({
  reducer: {
    calculator: calculatorReducer
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >;

export default store;