import React, { createContext, useState, useEffect } from 'react';

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('files')) || [];
    setFiles(savedFiles);
    console.log('Loaded files from localStorage:', savedFiles); // Debugging log
  }, []);

  const setFilesContext = (newFiles) => {
    setFiles(newFiles);
    localStorage.setItem('files', JSON.stringify(newFiles));
    console.log('Updated files in context and localStorage:', newFiles); // Debugging log
  };

  return (
    <FileContext.Provider value={{ files, setFilesContext, selectedFile, setSelectedFile }}>
      {children}
    </FileContext.Provider>
  );
};
