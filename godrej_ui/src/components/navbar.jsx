import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import NightModeToggle from './nightmodetoggle';
import './fileupload.css';
const Navbar = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height: '10%', justifyContent: 'center', gap: '10%',mt:'1%',mb:'1%'}}>
      
      <Button
        variant="contained"
        className='circlebutton'
        sx={{
          color: '#ffffff',
          backgroundColor: '#BFE48E',
          width:'5%',
          boxShadow: 'none',
          borderRadius: '50%',
          '&:hover': {
            backgroundColor: '#9282FC',
            boxShadow: 'none',
          },
          ml:'auto',
        }}
      >
        X
      </Button>
      <Button
        variant="contained"
        className='circlebutton'
        sx={{
          color: '#D9D9D9',
          width:'5%',
          backgroundColor: 'secondary.main',
          borderRadius: '50%',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#9282FC',
            boxShadow: 'none',
          },
          mr:'auto'
        }}
      >
        Y
      </Button>
      <Box sx={{ml:'auto'}}></Box>
      <NightModeToggle />
    </Box>
  );
}

export default Navbar;
