import { Box, Typography } from '@mui/material'
import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
const Chat = () => {
  return (
    <Box sx={{width: '100%', display:'flex',flexDirection:'column',alignItems:'center',mt:'2',height:'95vh' }}>
      <Typography variant="h4" gutterBottom sx={{mt:'2',paddingTop:'1%'}}>
        Ask your file....
    </Typography>
    <Box sx={{ width: "90%", bgcolor: '#ffffff', height: '90%', borderRadius:'1%', padding:'1%',boxShadow:'2', display: 'flex', flexDirection: 'column'}}>
        <Typography variant="body1">Filewiz</Typography>
        <Box sx={{flex:'1',boxShadow:'2',borderRadius:'2%',margin:'1.5%',overflowY:'scroll'}}></Box>
        <Stack spacing={2} direction="row">
        <TextField fullWidth label="message Filewiz" id="fullWidth" sx={{width:'90%'}}/>
        <Button variant="contained" sx={{bgcolor:'#ade4ff'}}><ArrowCircleRightRoundedIcon fontSize='large' ></ArrowCircleRightRoundedIcon></Button>
    </Stack>
      </Box>
    </Box>
  )
}

export default Chat