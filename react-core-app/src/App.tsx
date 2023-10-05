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
import useGroupAmountByMonth from './Hooks/ProcessorHooks/useGroupAmountByMonth';
import LinealHorizontal from './Components/Charts/LinealHorizontalChart';


function App() {


  return (


      <Grid container spacing={1}>
        <Grid item xs={2}>
          <ClientManager />
        </Grid>
        <Grid item xs={10}>
          <Loader />
          <LinealHorizontal></LinealHorizontal>
          {/* <Button onClick={sendMessage}>Send message</Button> */}
        </Grid>
       
      </Grid>
  );
}

export default App;
