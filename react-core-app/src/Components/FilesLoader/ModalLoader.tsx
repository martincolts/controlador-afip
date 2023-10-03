import * as React from "react";
import { Modal, Box, Stack, Button } from "@mui/material";
import { AFIPRecordRow } from "../../model/record";
import DataTable from "./Table";
import useInsertRecords from "../../Hooks/QueryHooks/useInsertRecords";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px",
  boxShadow: 24,
  maxHeight: 800,
  p: 4,
};

interface ModalLoaderProps {
  afipRecordRows: AFIPRecordRow[];
  isModalOpen: boolean;
  closeModal: () => void;
}

const ModalLoader: React.FC<ModalLoaderProps> = ({
  afipRecordRows,
  isModalOpen,
  closeModal,
}) => {

  const insertRecords = useInsertRecords() 
  const onSave = async () => {
    insertRecords.mutateAsync(afipRecordRows).then(data => {
      toast.success("Data insertada correctamente")
      closeModal()
    }).catch(err => {
      toast.error(`Also salio mal ${err}`)
      console.log(err)
    })
    
  }


  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <Box sx={style}>
        <Box sx={{ overflow: "auto", maxHeight: 500 }}>
          <DataTable values={afipRecordRows} />
        </Box>
        <Stack direction={"row"} spacing={2} padding={2} justifyContent={"space-around"}>
          <Button onClick={onSave} variant="contained" color="success">
            Agregar datos a la base
          </Button>
          <Button onClick={closeModal} variant="contained" color="error">
            Cancelar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalLoader;
