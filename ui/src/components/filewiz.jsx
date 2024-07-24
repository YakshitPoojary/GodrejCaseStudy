import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button } from "@nextui-org/react";
import axios from 'axios';
import { SendHorizonal, ChevronDown } from 'lucide-react';
import Dropzone from 'react-dropzone';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import './chatbubble.css';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';

function Predict() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [formData, setFormData] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [isListening, setIsListening] = useState(false); // State for speech recognition

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('files')) || [];
    setFiles(storedFiles);
  }, []);

  const handleDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({ file, summary: '' }));
    setLoading(true);

    newFiles.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file.file);

      axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/uploadFile`, formData, {
        timeout: 3600000
      })
      .then(response => {
        const fileSummary = response.data.summary;
        const updatedFiles = [...files, { file: file.file, summary: fileSummary }];
        localStorage.setItem('files', JSON.stringify(updatedFiles));
        setFiles(updatedFiles);
        setSummary(fileSummary);
      })
      .catch(error => {
        console.error('Error:', error);
        setSummary('Error uploading file');
      })
      .finally(() => {
        setLoading(false);
      });
    });
  };

  const handleFileSelection = (file) => {
    setSelectedFile(file);
    setSummary(file.summary || 'No summary available');
  };

  const handleDelete = (fileToDelete) => {
    const newFiles = files.filter(file => file.file.path !== fileToDelete.file.path);
    localStorage.setItem('files', JSON.stringify(newFiles));
    setFiles(newFiles); 

    if (selectedFile && selectedFile.file.path === fileToDelete.file.path) {
      setSelectedFile(null);
      setSummary('');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = formData.Prompt;
    const timestamp = new Date().toLocaleTimeString();
    setMessages([...messages, { sender: 'user', text: userMessage, timestamp }]);

    axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/answerQuery`, { query: userMessage }, {
      timeout: 3600000
    })
      .then(response => {
        const botResponse = response.data.answer;
        setMessages([...messages, { sender: 'user', text: userMessage, timestamp }, { sender: 'bot', text: botResponse, timestamp }]);
      })
      .catch(error => {
        console.error('Error:', error);
        setMessages([...messages, { sender: 'user', text: userMessage, timestamp }, { sender: 'bot', text: 'Error fetching response', timestamp }]);
      });

    setFormData({ Prompt: '' });
  };

 const startListening = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  let finalTranscript = ''; // Variable to hold the final transcript

  recognition.onstart = () => {
    setIsListening(true);
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' '; // Append final transcript
      } else {
        interimTranscript += transcript; // Append interim transcript
      }
    }

    // Update formData with the concatenated final transcript
    setFormData(prevFormData => ({
      ...prevFormData,
      Prompt: finalTranscript + interimTranscript
    }));
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error', event.error);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  recognition.start();
};


  const MessageRight = ({ message, timestamp }) => (
    <div className="user-message">
      <p>{message}</p>
      <small>{timestamp}</small>
    </div>
  );

  const MessageLeft = ({ message, timestamp, photoURL, displayName, avatarDisp }) => (
    <div className="bot-message">
      {avatarDisp && <img src={photoURL} alt={displayName} />}
      <p>{message}</p>
      <small>{timestamp}</small>
    </div>
  );

  const formattedSummary = () => {
    return summary.split('###').map((section, index) => {
      const lines = section.split('\n').filter(line => line.trim() !== '');
      const title = lines[0];
      const content = lines.slice(1).map((line, idx) => {
        const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return <p key={idx} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
      });

      return (
        <div key={index} className="mb-4">
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <ul className="list-disc list-inside">{content}</ul>
        </div>
      );
    });
  };

  return (
    <>
      <Modal
        open={loading}
        aria-labelledby="loading-modal"
        aria-describedby="loading-summary"
        closeAfterTransition
      >
        <div className='w-full h-full flex justify-center items-center backdrop-blur'>
          <Box className="modal-box w-1/3 h-1/2 bg-[#141414] rounded-2xl flex-col justify-center items-center" sx={{ boxShadow: 2 }}>
            <div className='w-full h-1/3 flex justify-center items-center mt-5'>
              <CircularProgress />
              <p className='text-white'>Please Wait . . . Generating Your Summary</p>
            </div>
            <div className='w-full flex justify-center items-center'>
              <p className='text-tiny text-white'>It takes roughly 2 seconds per page</p>
            </div>
          </Box>
        </div>
      </Modal>
      <div className='w-full h-[100%] flex flex-col items-center bg-gradient-to-t from-sky-700 to-blue-500'>
        <div className='w-full h-[10vh]'>
          <div className=' w-[30%] h-[90%]'>
            <img src="/assets/sparku.png" alt="Logo" className ='max-w-[100%] max-h-[100%] object-contain'  />
          </div>
        </div>
      <div className='w-full h-[100vh] flex flex-row flex-wrap justify-center mt-[-4%]'>
        <div className='w-4/5 h-[100vh] flex justify-center items-center  gap-5'>
          <Card isFooterBlurred className="w-[90%] ml-[-1%] h-4/5 flex flex-col">
            <CardHeader className='items-center justify-center flex flex-col '>
              <div className='w-full flex justify-between items-center px-10'>
                <p>Summary</p>
                <Card className='w-[20%] h-[8vh] flex justify-center items-center pointer ml-[25%] '>
                  <Dropzone onDrop={handleDrop} className='cursor-pointer'>
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <div
                        {...getRootProps()}
                        className={`dropzone ${isDragActive ? 'active' : ''} cursor-pointer`}
                      >
                        <input {...getInputProps()} />
                        <p>Add Files</p>
                      </div>
                    )}
                  </Dropzone>
                </Card>
                <Dropdown>
                  <DropdownTrigger>
                    <Button className='bg-gradient-to-tr from-pink-500 to-yellow-500' variant="bordered" endContent={<ChevronDown />}>
                      Select A File
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="File Actions">
                    {files.map((file, index) => (
                      <DropdownItem
                        key={`${file.file.path}-${index}`}
                        textValue={file.file.path}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span onClick={() => handleFileSelection(file)}>{file.file.path}</span>
                          <CloseIcon onClick={() => handleDelete(file)} className="cursor-pointer" />
                        </div>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className='h-[48vh] overflow-y-scroll'>
              <div className="flex flex-col gap-4">
                <div className="">
                  {formattedSummary()}
                </div>
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
            </CardFooter>
          </Card>
          <Card isFooterBlurred className="w-[60%] h-4/5 flex flex-col ">
            <form onSubmit={handleSubmit}>
              <CardHeader className='items-center justify-center flex flex-col'>
                <p>Let the magic begin!</p>
              </CardHeader>
              <Divider />
              <CardBody className='h-[60vh] overflow-y-scroll '>
                <div className="message-container">
                  {messages.map((msg, index) => (
                    msg.sender === 'user' ? (
                      <MessageRight key={index} message={msg.text} timestamp={msg.timestamp} />
                    ) : (
                      <MessageLeft
                        key={index}
                        message={msg.text}
                        timestamp={msg.timestamp}
                        photoURL={msg.photoURL}
                        displayName={msg.displayName}
                        avatarDisp={msg.avatarDisp}
                      />
                    )
                  ))}
                </div>
              </CardBody>
              <Divider />
              <CardFooter>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Button
                    className={` text-white text-xl hover:scale-110 ${isListening ? 'bg-red-500' : ' '}`}
                    onClick={startListening}
                    startContent={<MicIcon color="#ffffff" />}
                    variant="solid"
                    radius="lg"
                    aria-label="Start Speech Recognition"
                  />
                  <Input
                    type="text"
                    name="Prompt"
                    placeholder="Enter Prompt"
                    labelPlacement="outside"
                    value={formData.Prompt || ''}
                    onChange={handleChange}
                  />
                  <Button
                    className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white text-xl hover:scale-110s"
                    startContent={<SendHorizonal color="#ffffff" strokeWidth={3} />}
                    variant="solid"
                    radius="lg"
                    size="md"
                    type='submit'
                  />
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
      </div>
    </>
  );
}

export default Predict;
