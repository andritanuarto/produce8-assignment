import { useAppSelector } from '../../redux/hooks';
import styles from './MonthlyPayment.module.scss';

const MonthyPayment = () => {
  const calculatorStates = useAppSelector((state) => state.calculator);
  const { monthlyPayment, loading, error } = calculatorStates;

  

  return (
    <div className={styles["container"]}>
      {
        error ? (<span>Sorry can't calculate the mortgae, please try again</span>) : (
          <>
            {loading === "pending" ? (
              <span>Loading...</span>
            ) : (
              <>
                <span>Your total monthly payment will be</span>
                <strong><span>$</span>{monthlyPayment}</strong>
                <span>/month</span>
                <button>Apply Today</button>
              </>
            )}   
          </>
        )
      }
    </div>
  )
};

export default MonthyPayment;