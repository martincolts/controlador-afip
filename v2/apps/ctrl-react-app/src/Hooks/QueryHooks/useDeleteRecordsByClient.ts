import * as React from 'react'
import { ElectronContext } from '../../Context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { actions } from '@v2/model'
import { useGetClient } from '../currentClientStore'

export function useDeleteRecordsByClient() {
    const electronAPI = React.useContext(ElectronContext)
    const queryClient = useQueryClient()
    const clientCuit = useGetClient()
    const mutation = useMutation({
        mutationFn: async () => {
            return await electronAPI.invokeBackend<any>('synchronous-message', { action: actions.DELETE_RECORDS_BY_CLIENT, payload: {clientCuit} })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['records', clientCuit] as const})
            queryClient.invalidateQueries({queryKey: ['gastos', clientCuit] as const})
            queryClient.invalidateQueries({queryKey: ['ventas', clientCuit] as const})
        }
    })

    return mutation
}