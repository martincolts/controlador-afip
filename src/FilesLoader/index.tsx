import React, { useState } from "react";
import Papa, { ParseResult } from "papaparse"
import { Button, Container, Input, Stack, Box } from '@mui/material';
import DataTable from "../Table";
import { table } from "console";
import Grid from '@mui/material/Grid';
import Info from "../Info";

export type Row = {
  date: string
  type: string
  sellPoint: string
  numberFrom: string
  numberTo: string
  authCod: string
  typeReceptorCode: string
  docReceptor: string
  receptorDenomination: string
  changeType: string
  currency: string
  taxNet: string
  noTaxNet: string
  impNoExenras: string
  iva: number
  total: number
  fileType: string
}

const  ParseToData = (data: any[]) => {
  return {
    date: data[0],
    type: data[1],
    sellPoint: data[2],
    numberFrom: data[3],
    numberTo: data[4],
    authCod: data[5],
    typeReceptorCode: data[6],
    docReceptor: data[7],
  receptorDenomination: data[8],
  changeType: data[9],
  currency: data[10],
  taxNet: data[11],
  noTaxNet: data[12],
  impNoExenras: data[13],
  iva: data[14],
  total: parseFloat(data[15]),
  } as Row;
}

function Loader() {


  //State to store the values
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {

    const files = event.target.files

    const valuesArray: Row[] = [];
    for (const f of files) {
      console.log(f)
      Papa.parse(f, {
        header: true,
        skipEmptyLines: true,
        complete: function (results: ParseResult<Row>) {
          results.data.forEach((d) => {
            const data = ParseToData(Object.values(d))
            data.fileType = f.name.toLowerCase().includes("emitidos") ? 'Venta' : 'Gasto'
            valuesArray.push(data);
          });
          setValues(valuesArray);
        },
      });
    }

  };

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
        onChange={changeHandler}
        accept=".csv"
        multiple
        style={{ display: "none", margin: "10px auto" }}
      />

  <Button color="primary" variant="contained" component="span">
    Cargar Archivos CSV
  </Button>
  </label>
  <Button color="primary" variant="contained" onClick={clear}>Borrar Todo</Button>
  </Stack>
  <Grid container width={'100%'}>
  <Grid item xs={6}>
    {values && values.length > 0 &&
        <DataTable values={values}/>
      }

</Grid>
<Grid item xs={6}>
{values && values.length > 0 && <Info values={values} />}
</Grid>
</Grid>

     </Grid>
    </Grid>
  );
}

export default Loader