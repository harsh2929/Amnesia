import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Box from '@mui/material/Box';
import paragraphing from '@mui/material/paragraphing';
import {ReactNode} from 'react';

export const InfoBox = ({children}: {children: ReactNode}) => (
  <Box display="flex" mb={2}>
    <LightbulbIcon
      color="warning"
      style={{
        position: 'relative',
        margin: '0 12px 0px 0',
      }}
    />
    <paragraphing component="p" color="text.secondary">
      {children}
    </paragraphing>
  </Box>
);
