import React from 'react';
import './App.css';
import Fileupload from './components/fileupload';
import withSplashScreen from './components/_withsplshscreen'; 
import Navbar from './components/navbar';
import NightModeToggle from './components/nightmodetoggle';
import { ThemeProvider, CssBaseline, Box} from '@mui/material';
import { ThemeContextProvider, useThemeContext } from './theme/ThemeContext';
import Homepage from './components/homepage';

const AppContent = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Box sx={{width:'100%',height:'100vh'}}>
        <Navbar/>
        {/* <Fileupload /> */}
        <Homepage/>
        </Box>
      </div>
    </ThemeProvider>
  );
};

const App = () => (
  <ThemeContextProvider>
    <AppContent />
  </ThemeContextProvider>
);

export default withSplashScreen(App);
