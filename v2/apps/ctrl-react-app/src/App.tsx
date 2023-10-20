import * as React from 'react';
import './App.css';
import Loader from './Components/FilesLoader';
import { Grid } from '@mui/material';
import ClientManager from './Components/ClientManager';
import InfoBox from './Components/InfoBox';


function App() {
  return (
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <ClientManager />
        </Grid>
        <Grid item xs={10}>
          <Loader />
          <InfoBox></InfoBox>
          {/* <Button onClick={sendMessage}>Send message</Button> */}
        </Grid>
      </Grid>
  );
}

export default App;
