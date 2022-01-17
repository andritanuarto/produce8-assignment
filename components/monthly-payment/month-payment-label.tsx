import React, { memo } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../redux/hooks';
import { convertIntWithCommas } from '../../util';

const MonthyPaymentLabel = () => {
  const calculatorStates = useAppSelector((state) => state.calculator);
  const { monthlyPayment, error, loading } = calculatorStates;
  const splitNumberForMonthlyPayment = monthlyPayment.toString().split('.');
  return (
    <>
      {
        error ? (<span>{error}</span>) : (
          <>
            {loading ? (
              <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <strong>
                  <span>$</span>
                  <strong data-testid="monthlyPaymentNumber">{convertIntWithCommas(splitNumberForMonthlyPayment[0])}</strong>
                  <span>{splitNumberForMonthlyPayment[1]}</span>
                </strong>
              </>
            )}   
          </>
        )
      }
    </>
  );
};

export default memo(MonthyPaymentLabel);