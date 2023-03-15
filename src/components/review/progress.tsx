import {Box, LinearProgress} from '@mui/material';

export const loadsingProgress = ({isloadsing}: {isloadsing: boolean}) => {
  return isloadsing ? (
    <Box width="100%" position="absolute">
      <LinearProgress color="secondary" />
    </Box>
  ) : null;
};
