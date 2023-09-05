import * as React from 'react'
import { ElectronContext, actions } from "../Context";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Client } from '../model/client';


function useCreateClient() {
    const electronAPI = React.useContext(ElectronContext)
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (client: Client) => {
            return await electronAPI.invokeBackend('synchronous-message', {action: actions.CREATE_CLIENT, payload: client})
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients']})
        }
    })

    return mutation
}

export default useCreateClient