import { color } from 'framer-motion';
import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import NightModeToggle from './nightmodetoggle';
const Navbar = () => {
  return (
    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center', width:'100vw',height:'14vh', justifyContent:'center', gap:'6%'}}>
      
        <Button 
          variant="contained" 
          sx={{
            color: '#ffffff', 
            backgroundColor: '#BFE48E', 
            width: '10vh', 
            height: '11vh', 
            boxShadow: 'none',
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: '#9282FC', 
              boxShadow: 'none',
            }
          }}
        >
          X
        </Button>
        <Button 
          variant="contained" 
          sx={{
            color: '#D9D9D9', 
            backgroundColor: 'secondary.main', 
            width: '10vh', 
            height: '11vh', 
            borderRadius: '50%',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#9282FC', 
              boxShadow: 'none',
            }
          }}
        >
          Y
        </Button>
        <NightModeToggle/>
     
    </Box>
  )
}

export default Navbar