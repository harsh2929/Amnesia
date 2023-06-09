import {config as settingfinal} from '@/configstart';
import {config as googleConfig} from '@/config/google';
import {setPlayers} from '@/reduxstart';
import {useAppDispatch, useAppSelector} from '@/redux/hkc';
import {min} from '@/utils/misc';
import RoomIcon from '@mui/icons-material/Room';
import {Box, Fade, InputAdornment, TextField} from '@mui/material';
import {ChangeEvent} from 'react';

const MAX_PLAYERS = settingfinal.maxPlayers;

export const FormPlayers = () => {
  const players = useAppSelector(({game}) => game.players);
  const dispatch = useAppDispatch();

  const handlePlayerChange =
    (inputId: number) => (e: ChangeEvent<HTMLTextAreaElement>) => {
      const existing = [...players];
      existing[inputId] = e.target.value;
      dispatch(setPlayers(existing));
    };

  return (
    <Box display="flex" flexDirection="column" id="form-players">
      {/* Always have an additional input field to write to */}
      {Array(min(players.length + 1, MAX_PLAYERS))
        .fill(0)
        .map((_, idx) => {
          const id = `player-name-${idx + 1}`;
          return (
            <Fade in timeout={500} key={idx}>
              <TextField
                sx={{
                  mb: 3,
                  '&:last-child': {
                    mb: 0,
                  },
                }}
                inputProps={{
                  'data-testid': id,
                }}
                // This is required for the tests
                id={id}
                key={id}
                label={`Player ${idx + 1}`}
                type="text"
                placeholder="Player name"
                value={players[idx] || ''}
                onChange={handlePlayerChange(idx)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <RoomIcon
                        style={{color: googleConfig.marker.colors[idx]}}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Fade>
          );
        })}
    </Box>
  );
};
