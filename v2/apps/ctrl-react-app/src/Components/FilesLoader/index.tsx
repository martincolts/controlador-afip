import React, { useState } from "react";
import { Button, Stack, Typography, Chip, Box } from "@mui/material";
import Grid from "@mui/material/Grid";

import Papa, { ParseResult } from "papaparse"
import { useClientIsSelected, useGetClient } from "../../Hooks/currentClientStore";
import ModalLoader from "./ModalLoader";
import { AFIPRecordRow, ParseToData } from "@v2/model";
import { useDeleteRecordsByClient } from "../../Hooks/QueryHooks/useDeleteRecordsByClient";
import { toast } from "react-toastify";

function Loader() {
  const [filesData, setFilesData] = useState<AFIPRecordRow[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const deleteRecords = useDeleteRecordsByClient()
  const isClientSelected = useClientIsSelected()
  const client = useGetClient()

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const show = async (event: any) => {
    const data = await loadingFilesHandler(event);
    setFilesData(data);
    openModal();
  };

  const deleteRecordsForClient = async (event: any) => {
    try {
      await deleteRecords.mutateAsync()
      toast.success("Records eliminados exitosamente")
    } catch(err) {
      toast.error(`Error eliminando records: ${err}`)
    }
  }


  const loadingFilesHandler = (event: any): Promise<AFIPRecordRow[]> => {
    return new Promise(async (resolve, reject) => {
      let valuesArray: AFIPRecordRow[] = [];
      const files = event.target.files
      const results = await Promise.all(Object.values(files).map((f: any): Promise<AFIPRecordRow[]> => {
        return new Promise((resolveFile, rejectFile) => {
          Papa.parse(f, {
            header: true,
            skipEmptyLines: true,
            complete: function (results: ParseResult<AFIPRecordRow>) {
              const dataToResolve = results.data.map((d) => {
                const data = ParseToData(Object.values(d))
                data.fileType = f.name.toLowerCase().includes("emitidos") ? 'Venta' : 'Gasto'
                return data
  
              });
              resolveFile(dataToResolve)
            },
          });
        })
      }))
      for (const result of results) {
        valuesArray = [...valuesArray, ...result]
      }
      
      resolve(valuesArray.map((val: AFIPRecordRow, i: number) => ({index: i, ...val})))
    })
  };

  return (
    <Grid container marginTop={2} width={"100%"}>
      <Grid spacing={2} width={"100%"}>
        <Stack direction={"row"} spacing={2}>
        <Typography variant="h5">Ahora estas operando con el cliente con DNI </Typography>
        <Box padding={1} minWidth={150}>{isClientSelected && <Chip color="info" label={client}></Chip>}</Box>
        
          <label htmlFor="csv-files">
            <input
              id="csv-files"
              type="file"
              name="file"
              onChange={show}
              accept=".csv"
              multiple
              style={{ display: "none", margin: "10px auto" }}
            />
            
            <Button color="primary" variant="contained" component="span" disabled={!isClientSelected}>
              Cargar Archivos CSV
            </Button>

           
          </label>

          <Button color="error" variant="contained" component="span" disabled={!isClientSelected} onClick={deleteRecordsForClient}>
              Borrar registros
            </Button>
        </Stack>
        <ModalLoader afipRecordRows={filesData} closeModal={closeModal} isModalOpen={modalOpen}></ModalLoader>
      </Grid>
    </Grid>
  );
}

export default Loader;
