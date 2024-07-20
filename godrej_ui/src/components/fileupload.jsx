import React, { useState } from 'react';
import { Box, Typography, MenuItem, Select, Button } from '@mui/material';
import Dropzone from 'react-dropzone';

const Fileupload = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const simulateUpload = (file) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress((prevProgress) => ({
        ...prevProgress,
        [file.name]: progress,
      }));

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 100); // Adjust the interval time as needed
  };

  const handleSelectFile = (event) => {
    setSelectedFile(event.target.value);
  };

  const dropzoneStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #ade4ff',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    height: '30vh',
    cursor: 'pointer',
  };

  const dropzoneActiveStyle = {
    border: '2px dashed #3f51b5',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '45%' }}>
      <Typography variant="body1" gutterBottom>
        Upload File
      </Typography>
      <Box sx={{ height: '65%', width: '90%', padding: '3%', bgcolor: '#ffffff', borderRadius: '1.5%', boxShadow: '1', m: '2%' }}>
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <section>
              <div
                {...getRootProps()}
                style={{
                  ...dropzoneStyle,
                  ...(isDragActive ? dropzoneActiveStyle : {}),
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
        <Box mt={2} sx={{width:'100%'}}>
          {files.map((file) => (
            <Box key={file.name} sx={{ display: 'flex', alignItems: 'center', mb: 1,width:'100%'}}>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                {file.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center',width:'100%',height:'100%'}}>
                {[...Array(10)].map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width:'10%',
                      height: '7vh',
                      borderRadius: '50%',
                      backgroundColor: (uploadProgress[file.name] / 10) > index ? '#8b7df1' : '#b6d989',
                      mx: 0.05,
                    }}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
        <Box mt={2}>
          <Select value={selectedFile} onChange={handleSelectFile} displayEmpty fullWidth>
            <MenuItem value="" disabled>
              Select a file to upload
            </MenuItem>
            {files.map((file) => (
              <MenuItem key={file.name} value={file.name}>
                {file.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => selectedFile && simulateUpload(files.find((file) => file.name === selectedFile))}
            disabled={!selectedFile}
          >
            Simulate Upload
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Fileupload;
