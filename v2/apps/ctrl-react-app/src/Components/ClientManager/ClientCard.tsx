import * as React from 'react'
import { Card, CardContent, Typography } from "@mui/material"

import { useSetClient } from '../../Hooks/currentClientStore'
import { toast } from 'react-toastify'
import { Client } from '@v2/model'

export interface ClientCardProps {
    client: Client
}

const ClientCard:React.FC<ClientCardProps> = ({ client }) => {
    
    const setClient = useSetClient()
    const notify = (clientId: string) => toast.info(`Seleccionado el cliente con DNI ${clientId}`, {theme: "colored"});

    const selectClient = (clientId: string) => {
        setClient(clientId)
        notify(clientId)
    }

    return <Card sx={{ minWidth: 275, minHeight: 125 }} onClick={() => selectClient(client.dni)} variant='outlined'>
        <CardContent>
            <Typography sx={{fontSize: 15}}>{client.firstName} {client.lastName}</Typography>
            <Typography sx={{fontSize: 13}}>{client.cuit}</Typography>
            <Typography sx={{fontSize: 13}}>{client.dni}</Typography>
            <Typography sx={{fontSize: 13}}>{client.phone}</Typography>
            <Typography sx={{fontSize: 13}}>{client.email}</Typography>
        </CardContent>
    </Card>
}

export default ClientCard