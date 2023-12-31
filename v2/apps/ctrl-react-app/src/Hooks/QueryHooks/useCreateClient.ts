import * as React from 'react'
import { ElectronContext } from "../../Context";
import { Client, actions } from '@v2/model'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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