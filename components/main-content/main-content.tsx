
import React, { useEffect, useCallback, memo } from 'react';
import InputSlider from '../input-slider/input-slider';
import RadioButtons from '../radio-buttons/radio-buttons';
import MonthlyPayment from '../monthly-payment/monthly-payment';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { changePurchasePrice, changeInterestRate, changePeriod, getMonthlyPayment } from '../../redux/calculatorSlice';
import { convertIntWithCommas, isFloatNumber } from '../../util';
import styles from './MainContent.module.scss';

enum CalculationValueType {
  PurchasePrice = 'PurchasePrice',
  InterestRate = 'InterestRate',
  TermPeriod = 'TermPeriod'
}

const MainContent = (): JSX.Element => {
  const calculatorStates = useAppSelector((state) => state.calculator);
  const { purchasePrice, interestRate, period } = calculatorStates;
  const dispatch = useAppDispatch();

  const handleChange = useCallback((
    newValue: number | number[] | string,
    calculationType: CalculationValueType
  ) => {
    switch(calculationType) {
      case (CalculationValueType.PurchasePrice):
        dispatch(changePurchasePrice(newValue));
        break;
      case (CalculationValueType.InterestRate):
        dispatch(changeInterestRate(newValue));
        break;
      case (CalculationValueType.TermPeriod):
        dispatch(changePeriod(newValue));
    }
  }, [dispatch]);

  useEffect(() => {
    // Dispatching the thunk returns a promise
    const promise = dispatch(getMonthlyPayment({
      principal: purchasePrice,
      interest: interestRate,
      term: period
    }));
  
    return () => {
      promise.abort();
    };
  }, [purchasePrice, interestRate, period, dispatch]);

  return (
    <main className={styles.container}>
      <article className={styles.heading}>
        <h1>Get started with Digital Credit Experience</h1>
        <span>Qualify or apply your mortgage in minutes</span>
      </article>
      <article className={styles['main-article']}>
        <section>
          <div className={styles['input-slider-container']}>
            <InputSlider
              value={purchasePrice}
              topLabel="Purchase Price"
              valueLabel={
                <><span className={styles.unit}>$</span>{convertIntWithCommas(purchasePrice)}</>
              }
              min={50000}
              max={2500000}
              step={10000}
              ariaLabel="purchase price"
              onChange={(event, newValue) => handleChange(newValue, CalculationValueType.PurchasePrice)}
              minLabel="$50K"
              maxLabel="$2.5M"
            />
          </div>
          <div className={styles['input-slider-container']}>
            <InputSlider
              value={interestRate}
              topLabel="Interest Rate"
              valueLabel={
                <><span className={styles.unit}>%</span>{isFloatNumber(interestRate) ? interestRate : `${interestRate}.0`}</>
              }
              min={0}
              max={25}
              step={0.5}
              ariaLabel="interest rate"
              onChange={(event, newValue) => handleChange(newValue, CalculationValueType.InterestRate)}
              minLabel="0"
              maxLabel="25%"
            />
          </div>
          <RadioButtons 
            onChange={(newValue) => handleChange(newValue, CalculationValueType.TermPeriod)}
            ariaLabel="mortgage period"
            defaultValue={period}
            radioGroupName="period-radio-buttons"
            topLabel="Period"
            buttons={[
              {
                value: 20,
                label:  '20 Years'
              },
              {
                value: 25,
                label:  '25 Years'
              },
              {
                value: 30,
                label:  '30 Years'
              }
            ]}
          />
        </section>
        <section>
          <MonthlyPayment />
        </section>
      </article>
    </main>
  );
};

export default memo(MainContent);