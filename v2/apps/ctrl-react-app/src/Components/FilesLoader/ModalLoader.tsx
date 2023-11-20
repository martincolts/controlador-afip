import * as React from "react";
import { Modal, Box, Stack, Button } from "@mui/material";
import DataTable from "./Table";
import useInsertRecords from "../../Hooks/QueryHooks/useInsertRecords";
import { toast } from "react-toastify";
import { AFIPRecordRow } from "@v2/model";

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
  closeModal
}) => {

  const [rows, setRows] = React.useState<AFIPRecordRow[]>(afipRecordRows)

  React.useEffect(() => {
    setRows(afipRecordRows)
  }, [afipRecordRows, setRows])

  const insertRecords = useInsertRecords() 
  const onSave = async () => {
    insertRecords.mutateAsync(rows).then((data: AFIPRecordRow[]) => {
      if (!hasIncorrectInserts(data)) {
        toast.success("Data insertada correctamente")
        closeModal()
      } else {
        toast.error("Algunos records fueron insertados, otros no porque anteriormente fueron insertados, en rojo se marcan cuales son.")
        setRows(data)
      }
    })
  }


  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <Box sx={style}>
        <Box sx={{ overflow: "auto", maxHeight: 500 }}>
          <DataTable values={rows} />
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

const hasIncorrectInserts = (rows: AFIPRecordRow[]): boolean => {
  for( const row of rows) {
    if (row.correct === false) {
      return true
    }
  }
  return false
}

export default ModalLoader;
