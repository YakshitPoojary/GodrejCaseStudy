import React from 'react'
import { Box, Typography } from '@mui/material';
import Chat from './chat';
import Fileupload from './fileupload';
import Summary from './summary';
const Homepage = () => {
    
  
  return (<>
    <Box sx={{display: 'flex', flexDirection:'row',height:'100vh'}}>
        <Box sx={{ bgcolor: '#ade4fc', height: '100vh',flex:'1', display: 'flex', flexDirection:'column', alignItems:'center'}} >
      <Fileupload/>
      <Typography>
            Summary !
        </Typography>
      <Summary/>
        </Box>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh',flex:'1'}} >
            <Chat/>
        </Box>
    </Box>
      </>
  )
}

export default Homepage
