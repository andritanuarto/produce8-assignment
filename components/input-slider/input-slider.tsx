import React, { ReactNode, memo, useState } from 'react';
import { Slider } from '@mui/material';
import styles from './InputSlider.module.scss';

type InputValue = number | number[];

type SliderProps = {
  value: number;
  topLabel?: string;
  valueLabel?: string | number | ReactNode;
  min: number;
  max: number;
  minLabel?: string | number;
  maxLabel?: string | number;
  step: number;
  ariaLabel?: string;
  onChange: (event: Event, newValue: InputValue) => void;
  onChangeCommitted: (event: Event | React.SyntheticEvent<Element, Event>, newValue: InputValue) => void;
}

const InputSlider: React.FunctionComponent<SliderProps> = ({
  value,
  topLabel,
  valueLabel,
  min = 0,
  max = 10,
  minLabel,
  maxLabel,
  step = 1,
  ariaLabel,
  onChange,
  onChangeCommitted
}): JSX.Element => {
  return (
    <div>
      {topLabel && (<label className={styles['top-label']}>{topLabel}</label>)}
      {valueLabel && (<div className={styles['value-label']}>{valueLabel}</div>)}
      <Slider
        value={value}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
        min={min}
        max={max}
        step={step}
        aria-label={ariaLabel}
        sx={{
          color: '#3577da',
          '& .MuiSlider-thumb': {
            background: '#fff',
            border: 'solid 2px #3577da'
          }
        }}
      />
      <div className={styles['min-max-labels']}>
        {(minLabel || maxLabel) && (
          <>
            <span>{minLabel}</span>
            <span>{maxLabel}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(InputSlider);