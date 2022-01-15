import styles from './MonthlyPayment.module.scss';

const MonthyPayment = () => {
  return (
    <div className={styles["container"]}>
      <span>Your total monthly payment will be</span>
      <strong>853.50</strong>
      <span>/month</span>
      <button>Apply Today</button>
    </div>
  )
};

export default MonthyPayment;