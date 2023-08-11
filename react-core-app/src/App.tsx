import React from 'react';
import './App.css';

import Loader from './FilesLoader';
import { Button } from '@mui/material';


function App() {

  const sendMessage = () => {
    //@ts-ignore
    const response = window.api.sendMessage('synchronous-message', {message: 'hi'})
    console.log(response)
  }
  return (
    <React.Fragment>
      <Loader />
      <Button onClick={sendMessage}>Send message</Button>
    </React.Fragment>
  );
}

export default App;
