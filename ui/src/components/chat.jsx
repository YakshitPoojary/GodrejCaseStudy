import { Box, Typography } from '@mui/material'
import React from 'react'
import TextField from '@mui/material/TextField';
const Chat = () => {
  return (
    <Box sx={{width: '100%', display:'flex',flexDirection:'column',alignItems:'center',mt:'2',height:'100vh' }}>
      <Typography variant="h4" gutterBottom sx={{mt:'2'}}>
        Ask your file....
    </Typography>
    <Box sx={{ width: "90%", bgcolor: '#ffffff', height: '90%', borderRadius:'1%', padding:'1%',boxShadow:'2', display: 'flex', flexDirection: 'column'}}>
        <Typography variant="body1">Filewiz</Typography>
        
       <TextField fullWidth label="message Filewiz" id="fullWidth"/>
      </Box>
    </Box>
  )
}

export default Chat