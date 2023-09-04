import * as React from 'react';
import './App.css';

import Loader from './Components/FilesLoader';
import { Button } from '@mui/material';
import { ElectronContext } from './Context';
import CreateClientForm from './Components/ClientManager/CreateClientForm';

function App() {
  const electronAPI = React.useContext(ElectronContext)
  const sendMessage = async () => {
    const response = await electronAPI.invokeBackend('synchronous-message', { action: 'hi', payload: 'dsfdsf' })
    console.log(response)
  }

  return (
    <React.Fragment>
      <Loader />
      <Button onClick={sendMessage}>Send message</Button>
      <CreateClientForm></CreateClientForm>
    </React.Fragment>
  );
}

export default App;
