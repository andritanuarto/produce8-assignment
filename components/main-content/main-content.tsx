
import { useEffect, useCallback } from 'react';
import InputSlider from '../input-slider/input-slider';
import RadioButtons from '../radio-buttons/radio-buttons';
import MonthlyPayment from '../monthly-payment/monthly-payment';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { changePurchasePrice } from '../../redux/calculatorSlice';
import { numberWithCommas } from '../../util';
import styles from './MainContent.module.scss';

const MainContent = (): JSX.Element => {

  const calculatorStates = useAppSelector((state) => state.calculator);
  const { purchasePrice, interestRate, period} = calculatorStates;
  const dispatch = useAppDispatch();

  console.log(calculatorStates);

  const handleChange = (
    event: Event,
    newValue: number| number[],
  ) => {
    console.log(newValue);
    dispatch(changePurchasePrice(newValue));
  }

  return (
    <main className={styles.container}>
      <article className={styles.heading}>
        <h1>Get started with Digital Credit Experience</h1>
        <span>Qualify or apply your mortgage in minutes</span>
      </article>
      <article className={styles["main-article"]}>
        <section>
          <div className={styles["input-slider-container"]}>
            <InputSlider
              value={purchasePrice}
              topLabel="Purchase Price"
              valueLabel={<><span>$</span>{numberWithCommas(purchasePrice)}</>}
              min={50000}
              max={2500000}
              step={10000}
              onChange={handleChange}
              minLabel="$50K"
              maxLabel="$2.5M"
            />
          </div>
          <div className={styles["input-slider-container"]}>
            <InputSlider
              value={interestRate}
              topLabel="Interest Rate"
              valueLabel={<><span>%</span>{interestRate}</>}
              min={0}
              max={25}
              step={0.5}
              onChange={() => {}}
              minLabel="0"
              maxLabel="25%"
            />
          </div>
          <RadioButtons 
            ariaLabel="period"
            defaultValue={period}
            radioGroupName="period-radio-buttons"
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

export default MainContent;