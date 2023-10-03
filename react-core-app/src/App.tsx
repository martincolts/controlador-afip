import * as React from 'react';
import './App.css';

import Loader from './Components/FilesLoader';
import { Button, Container, Grid } from '@mui/material';
import { ElectronContext } from './Context';
import CreateClientForm from './Components/ClientManager/CreateClientForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ClientList from './Components/ClientManager/ClientList';
import ClientManager from './Components/ClientManager';
import useGetGastosByDate from './Hooks/QueryHooks/useGetGastosByDate';


function App() {
  //const electronAPI = React.useContext(ElectronContext)
  // const sendMessage = async () => {
  //   const response = await electronAPI.invokeBackend('synchronous-message', { action: 'hi', payload: 'dsfdsf' })
  //   console.log(response)
  // }

  
  const gastos = useGetGastosByDate("2021-10-10", "2023-10-10") 
  console.log("gastos.data", gastos.data)
  return (


      <Grid container spacing={1}>
        <Grid item xs={2}>
          <ClientManager />
        </Grid>
        <Grid item xs={10}>
          <Loader />
          {/* <Button onClick={sendMessage}>Send message</Button> */}
        </Grid>
       
      </Grid>
  );
}

export default App;
