import { color } from 'framer-motion';
import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
      <Stack spacing={8} direction="row">
        <Button 
          variant="contained" 
          sx={{
            color: '#ffffff', 
            backgroundColor: '#BFE48E', 
            width: '10vh', 
            height: '10vh', 
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
            backgroundColor: '#A9A9A9', 
            width: '10vh', 
            height: '10vh', 
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
      </Stack>
    </Box>
  )
}

export default Navbar