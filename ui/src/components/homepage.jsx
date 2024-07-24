import React from 'react'
import Box from '@mui/material/Box';
import Chat from './chat';
const Homepage = () => {
    
  
  return (<>
    <Box sx={{display: 'flex', flexDirection:'row',height:'100vh'}}>
        <Box sx={{ bgcolor: '#ade4fc', height: '100vh',flex:'1'}} />
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh',flex:'1'}} >
            <Chat/>
        </Box>
    </Box>
      </>
  )
}

export default Homepage
