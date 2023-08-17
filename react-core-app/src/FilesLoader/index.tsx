import React, { useState } from "react";
import { Button, Stack } from '@mui/material';
import DataTable from "../Table";
import Grid from '@mui/material/Grid';
import Info from "../Info";
import { Row } from "../model/row";
import { changeHandler } from "../Utils";

function Loader() {

  const [values, setValues] = useState<Row[]>([]);

  const show = async (event: any) => {
    const r = await changeHandler(event)    
    setValues(r)
  }

  const clear = () => {
    setValues([])
  }



  return (
    <Grid container marginTop={2} width={'100%'}>
      <Grid spacing={2} width={'100%'}>
        <Stack direction={"row"} spacing={2}>
          <label htmlFor="csv-files">
            {/* File Uploader */}
            <input
              id="csv-files"
              type="file"
              name="file"
              onChange={show}
              accept=".csv"
              multiple
              style={{ display: "none", margin: "10px auto" }}
            />

            <Button color="primary" variant="contained" component="span">
              Cargar Archivos CSV
            </Button>
          </label>
          <Button color="primary" variant="contained" onClick={clear}>Borrar Todo</Button>
          {/* <Button color="primary" variant="contained" onClick={show}>Mostrar</Button> */}
        </Stack>
        <Grid container width={'100%'}>
          <Grid item xs={6}>

            <DataTable values={values} />


          </Grid>
          <Grid item xs={6}>
            <Info values={values} />
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  );
}

export default Loader