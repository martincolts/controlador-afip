import * as React from 'react'
import ClientList from './ClientList'
import { Box, Button, Modal, Typography } from '@mui/material'
import CreateClientForm from './CreateClientForm'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export interface ClientManagerProps {

}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ClientManager: React.FC<ClientManagerProps> = () => {

    const [isOpen, setIsOpen] = React.useState(false)
    const handleClose = () => {
        setIsOpen(false)
    }

    const handleOpen = () => {
        setIsOpen(true)
    }
    return <React.Fragment>
        <Box marginTop={2} display={'flex'} alignContent={'center'} justifyContent={'center'}>
        <Button startIcon={<PersonAddAltIcon/>} onClick={handleOpen} variant='contained'>Agregar Cliente</Button>
        </Box>
        <ClientList />

        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Agregar nuevo cliente
                </Typography>
                <CreateClientForm handleClose={handleClose}/>
            </Box>
        </Modal>
    </React.Fragment>
}

export default ClientManager