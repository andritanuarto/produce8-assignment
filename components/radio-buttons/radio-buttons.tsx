
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { purple, grey} from '@mui/material/colors';
import styles from './RadioButtons.module.scss';

type RadioButton = {
  value: string | number;
  label: string | number;
}

type RadioButtonsProps = {
  buttons: Array<RadioButton>;
  ariaLabel: string;
  defaultValue?: string | number | boolean;
  radioGroupName: string;
}

const RadioButtons: React.FunctionComponent<RadioButtonsProps> = ({
  buttons,
  ariaLabel,
  defaultValue,
  radioGroupName
}): JSX.Element => {

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Period</FormLabel>
      <RadioGroup
        aria-label={ariaLabel}
        defaultValue={defaultValue}
        name={radioGroupName}
      >
        {
          buttons.map(button => {
            return (
              <FormControlLabel
                key={button.value}
                value={button.value}
                control={
                  <Radio sx={{
                    color: grey[700],
                    '&.Mui-checked': {
                      color: purple[700],
                    },
                  }}/>
                }
                label={<span className={styles["radio-label"]}>{button.label}</span>}
              />
            );
          })
        }
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtons;