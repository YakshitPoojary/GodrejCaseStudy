import { useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { getDesignTokens } from './Theme';

const useColorTheme = () => {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return {
    mode,
    toggleColorMode,
    theme,
  };
};

export default useColorTheme;
