import { ReactNode } from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import styles from './InputSlider.module.scss';

type SliderProps = {
  value: number;
  topLabel?: string;
  valueLabel?: string | number | ReactNode;
  min: number;
  max: number;
  minLabel?: string | number;
  maxLabel?: string | number;
  step: number;
  onChange: () => void;
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
  onChange
}): JSX.Element => {
  const CustomSlider = withStyles({
    root: {
      padding: '5px 0'
    },
    track: {
      height: 2,
    },
    rail: {
      height: 2,
      opacity: 1,
      backgroundColor: '#d7dce8',
    },
    thumb: {
      width: 14,
      height: 14,
      background: '#ffffff',
      border: 'solid 2px #256ed6'
    }
  })(Slider);

  return (
    <div>
      {topLabel && (<span className={styles["top-label"]}>{topLabel}</span>)}
      {valueLabel && (<div className={styles["value-label"]}>{valueLabel}</div>)}
      <CustomSlider
        value={value}
        onChange={onChange}
        aria-labelledby="input-slider"
        min={min}
        max={max}
        step={step}
      />
      <div className={styles["min-max-labels"]}>
        {(minLabel || maxLabel) && (
          <>
            <span>{minLabel}</span>
            <span>{maxLabel}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default InputSlider;