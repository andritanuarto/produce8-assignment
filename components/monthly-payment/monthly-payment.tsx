import React from 'react';
import MonthyPaymentLabel from './month-payment-label';
import { useAppSelector } from '../../redux/hooks';
import styles from './MonthlyPayment.module.scss';

const MonthyPayment = () => {
  const calculatorStates = useAppSelector((state) => state.calculator);
  const { error } = calculatorStates;

  return (
    <div className={styles['container']}>
      {!error && <span>Your total monthly payment will be</span>}
      <MonthyPaymentLabel />
      {!error && <span>/month</span>}
      <button>Apply Today</button>
    </div>
  );
};

export default MonthyPayment;