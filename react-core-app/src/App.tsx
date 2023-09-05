import * as React from 'react';
import './App.css';

import Loader from './Components/FilesLoader';
import { Button } from '@mui/material';
import { ElectronContext } from './Context';
import CreateClientForm from './Components/ClientManager/CreateClientForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ClientList from './Components/ClientManager/ClientList';

const queryClient = new QueryClient()

function App() {
  const electronAPI = React.useContext(ElectronContext)
  const sendMessage = async () => {
    const response = await electronAPI.invokeBackend('synchronous-message', { action: 'hi', payload: 'dsfdsf' })
    console.log(response)
  }

  return (

    <QueryClientProvider client={queryClient}>
      <Loader />
      <Button onClick={sendMessage}>Send message</Button>
      <ClientList></ClientList>
      <CreateClientForm></CreateClientForm>
    </QueryClientProvider>
  );
}

export default App;
