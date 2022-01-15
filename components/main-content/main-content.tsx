
import InputSlider from '../input-slider/input-slider';
import RadioButtons from '../radio-buttons/radio-buttons';
import MonthlyPayment from '../monthly-payment/monthly-payment';
import styles from './MainContent.module.scss';

const MainContent = (): JSX.Element => {
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
              value={250000}
              topLabel="Purchase Price"
              valueLabel="$50.000"
              min={50000}
              max={2500000}
              step={10000}
              onChange={() => {}}
              minLabel="$50K"
              maxLabel="$2.5M"
            />
          </div>
          <div className={styles["input-slider-container"]}>
            <InputSlider
              value={1.5}
              topLabel="Interest Rate"
              valueLabel="2.5%"
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
            defaultValue={20}
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