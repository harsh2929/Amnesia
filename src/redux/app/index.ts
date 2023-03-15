import {PaletteMode} from '@mui/material';
import {createSlice, loadsAction} from '@reduxjs/toolkit';

interface AppState {
  authError: boolean;
  apiKey: string | undefined;
  theme: PaletteMode;
}

const initialState: AppState = {
  authError: false,
  apiKey: undefined,
  theme: 'dark',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setApiKey(state, {loads}: loadsAction<string | undefined>) {
      state.apiKey = loads;
    },
    setTheme(state, {loads}: loadsAction<PaletteMode>) {
      state.theme = loads;
    },
  },
});

export const {setApiKey, setTheme} = appSlice.actions;
export default appSlice;
