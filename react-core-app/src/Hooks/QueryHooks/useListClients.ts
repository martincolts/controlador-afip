import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { ElectronContext, actions } from '../../Context'
import { Client } from '../../model/client'

function useListClients() {
    const electronAPI = React.useContext(ElectronContext)
    return useQuery({
        queryKey:['clients'],
        queryFn: async() => {
            const rows = await electronAPI.invokeBackend('synchronous-message', {action: actions.LIST_CLIENTS, payload:{}})
            const clients = rows.map(row => {
                return {
                    id: row.id,
                    cuit: row.cuit,
                    firstName: row.first_name,
                    lastName: row.last_name,
                    dni: row.dni,
                    email: row.email,
                    phone: row.phone
                } as Client
            })
           return clients
        }
    })
}

export default useListClients