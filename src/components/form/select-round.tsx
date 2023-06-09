import {config} from '@/configstart';
import {setRounds} from '@/reduxstart';
import {useAppDispatch, useAppSelector} from '@/redux/hkc';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import {ChangeEvent} from 'react';

export const FormRoundSelect = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(({game}) => game.rounds.total);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const val = parseInt(e.target.value);
    dispatch(setRounds(val));
  }
  return (
    <FormControl component="fieldset" sx={{mb: 3}} id="form-rounds">
      <FormLabel component="legend">Rounds</FormLabel>
      <RadioGroup row onChange={handleChange} name="form-round-select">
        {config.rounds.map(val => {
          const label = val === 1 ? `1 Round` : `${val} Rounds`;
          return (
            <FormControlLabel
              checked={val === selected}
              key={val}
              value={val}
              control={<Radio checked={val === selected} />}
              label={label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
