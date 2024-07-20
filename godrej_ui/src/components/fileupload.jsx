import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Dropzone from 'react-dropzone';
import DeleteIcon from '@mui/icons-material/Delete';
import './fileupload.css';
import NightModeToggle from './nightmodetoggle';
const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
    acceptedFiles.forEach(file => simulateUpload(file));
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

  const handleDeleteFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
    const newProgress = { ...uploadProgress };
    delete newProgress[fileName];
    setUploadProgress(newProgress);
  };

  const dropzoneStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #ade4ff',
    borderRadius: '5%',
    backgroundColor: '#ffffff',
    height: '60vh',
    cursor: 'pointer',
    width:'45vw',
  };

  const dropzoneActiveStyle = {
    border: '2px dashed #3f51b5',
  };

  return (<>
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', maxWidth:'100vw' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <Typography variant="h4" gutterBottom sx={{mt:'5%',ml:'2%'}}>
          Upload File
        </Typography>
        <Box sx={{ height: '65%', width: '95%', padding: '3%', bgcolor: '#ffffff', borderRadius: '5%', boxShadow: '1', m: '2%', mt:0,display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',}}>
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
                  <Typography variant="h6" color="textSecondary">
                    Drag 'n' drop some files here, or click to select files
                  </Typography>
                </div>
              </section>
            )}
          </Dropzone>
        </Box>
      </Box>
      <Box mt={2} sx={{ flex: '1', mt:'5%'}}>
        {files.map((file) => (
          <Box key={file.name} sx={{ display: 'flex', alignItems: 'center', mb: 1, width: '100%'}}>
            <Typography variant="h6" sx={{ width: '30%', maxWidth: '30%', overflow: 'hidden' }}>
              {file.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '60%', ml: '2%' }}>
              {[...Array(6)].map((_, index) => (
                <Box
                  key={index}
                  className={(uploadProgress[file.name] / 10) > index ? 'circle pop' : 'circle'}
                  sx={{
                    width: '11vh',
                    height: '11vh',
                    borderRadius: '50%',
                    backgroundColor: (uploadProgress[file.name] / 10) > index ? 'primary.main' : 'secondary.main',
                    mx: 0.05,
                  }}
                />
              ))}
            </Box>
            <Button variant="text" onClick={() => handleDeleteFile(file.name)}>
              <DeleteIcon sx={{ color: "red", fontSize: "5vh", m: '2rem' }} />
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
    </>
  );
};

export default FileUpload;
