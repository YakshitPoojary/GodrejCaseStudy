import React from 'react';
import { Box, Typography } from '@mui/material';
import Dropzone from 'react-dropzone';

const Fileupload = () => {
  const dropzoneStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #ade4ff',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    height: '30vh',
    cursor: 'pointer'
  };

  const dropzoneActiveStyle = {
    border: '2px dashed #3f51b5',
  };

  return (<Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%', height:'45%'}}>
  <Typography variant="body1" gutterBottom>
    Upload File
  </Typography>
    <Box sx={{ height: '65%',width:'90%', padding: '3%', bgcolor:'#ffffff',borderRadius:'1.5%',boxShadow:'1', m:'2%'}}>
      <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <section>
            <div
              {...getRootProps()}
              style={{
                ...dropzoneStyle,
                ...(isDragActive ? dropzoneActiveStyle : {})
              }}
            >
              <input {...getInputProps()} />
              <Typography variant="body2" color="textSecondary">
                Drag 'n' drop some files here, or click to select files
              </Typography>
            </div>
          </section>
        )}
      </Dropzone>
    </Box>
    </Box>
  );
};


export default Fileupload;
