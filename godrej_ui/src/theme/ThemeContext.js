import { createTheme } from '@mui/material/styles';
import { createContext, useContext, useState, useMemo } from 'react';
import { getDesignTokens } from './Theme';

const ThemeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
  theme: createTheme(),
});

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
