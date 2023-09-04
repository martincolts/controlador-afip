import { Card, CardContent, Typography } from "@mui/material"
import { Client } from "../../model/client"

export interface ClientSelectorProps {
    client: Client
}

const ClientSelector:React.FC<ClientSelectorProps> = ({ client }) => {
    return <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography sx={{fontSize: 15}}>{client.firstName} {client.lastName}</Typography>
            <Typography sx={{fontSize: 13}}>{client.cuit}</Typography>
            <Typography sx={{fontSize: 13}}>{client.dni}</Typography>
            <Typography sx={{fontSize: 13}}>{client.phone}</Typography>
            <Typography sx={{fontSize: 13}}>{client.email}</Typography>
        </CardContent>
    </Card>
}

export default ClientSelector