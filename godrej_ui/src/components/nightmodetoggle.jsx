import React from 'react';
import { Box, Switch, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../theme/ThemeContext';

const NightModeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <IconButton sx={{ color: mode === 'dark' ? '#A9A9A9' : '#ffcf33' }} onClick={toggleColorMode}>
        <Brightness7Icon />
      </IconButton>
      <Switch
        checked={mode === 'dark'}
        onChange={toggleColorMode}
        inputProps={{ 'aria-label': 'night mode toggle' }}
        sx={{bgcolor: '#000000',
        color: '#ffffff',
        borderColor: '#000000',
        border: '1px solid',
        borderRadius: 25,
        }}
      />
      <IconButton sx={{ color: mode === 'dark' ? '#c2eafc' : 'a9a9a9' }} onClick={toggleColorMode}>
        <Brightness4Icon />
      </IconButton>
    </Box>
  );
};

export default NightModeToggle;
