import React from 'react'
import { Box, Typography } from '@mui/material';
import Chat from './chat';
import Fileupload from './fileupload';
import Summary from './summary';
const Homepage = () => {
    
  
  return (<>
    <Box sx={{display: 'flex', flexDirection:'row',height:'100vh',width:'100%'}}>
        <Box sx={{ height: '100vh', display: 'flex', flexDirection:'column', alignItems:'center', width:'50%'}} >
      <Typography>
            Summary !
        </Typography>
      <Summary/>
        </Box>
        <Box sx={{  height: '100vh',width:'50%'}} >
            <Chat/>
        </Box>
    </Box>
      </>
  )
}

export default Homepage
