import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { ElectronContext } from '../../Context'
import { Client, actions } from '@v2/model'


function useListClients() {
    const electronAPI = React.useContext(ElectronContext)
    return useQuery({
        queryKey:['clients'] as const,
        queryFn: async() => {
            return await electronAPI.invokeBackend<Client[]>('synchronous-message', {action: actions.LIST_CLIENTS, payload:{}})
        }
    })
}

export default useListClients