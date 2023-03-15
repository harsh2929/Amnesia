import {setTheme} from '@/redux/app';
import {useAppDispatch, useAppSelector} from '@/redux/hkc';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Link,
  Paper,
  Toolbar,
} from '@mui/material';
import {useState} from 'react';
import {Menubuild} from '../build/build';

export const heading = () => {
  const dispatch = useAppDispatch();
  const theming = useAppSelector(s => s.app.theme);
  const [buildIsOpen, setbuildIsOpen] = useState(false);

  function handleToggleTheme() {
    dispatch(setTheme(theming === 'light' ? 'dark' : 'light'));
  }

  function handleTogglebuild() {
    setbuildIsOpen(!buildIsOpen);
  }

  return (
    <AppBar position="sticky" id="heading">
      <Paper elevation={1}>
        <Toolbar>
          <Box sx={{flexGrow: 1}}>
            <IconButton
              onClick={handleTogglebuild}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu-btn"
              sx={{mr: 2}}
            >
              <MenuIcon />
            </IconButton>
            <Menubuild open={buildIsOpen} togglebuild={handleTogglebuild} />
          </Box>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="theme-toggle-btn"
            sx={{mx: 1}}
            onClick={handleToggleTheme}
          >
            {theming === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          <Divider orientation="vertical" variant="middle" flexItem />
          <Link
            href="https://github.com/eegli/amnesia"
            target="_blank"
            rel="noopener"
            color="text.primary"
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="github-link"
              sx={{mx: 1}}
            >
              <GitHubIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </Paper>
    </AppBar>
  );
};
