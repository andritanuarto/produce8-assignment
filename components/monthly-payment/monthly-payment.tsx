import { useAppSelector } from '../../redux/hooks';
import styles from './MonthlyPayment.module.scss';

const MonthyPayment = () => {
  const monthlyPayment = useAppSelector((state) => state.calculator.monthlyPayment);

  return (
    <div className={styles["container"]}>
      <span>Your total monthly payment will be</span>
      <strong><span>$</span>{monthlyPayment}</strong>
      <span>/month</span>
      <button>Apply Today</button>
    </div>
  )
};

export default MonthyPayment;