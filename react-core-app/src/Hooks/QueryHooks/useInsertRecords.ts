import * as React from 'react'
import { ElectronContext, actions } from '../../Context'
import { useGetClient } from '../currentClientStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AFIPRecordRow } from '../../model/record';

function useInsertRecords() {

    const electronAPI = React.useContext(ElectronContext)
    const queryClient = useQueryClient()
    const clientCuit = useGetClient()

    const mutation = useMutation({
        mutationFn: async (afipRecordRows: AFIPRecordRow[]) => {
            const toInsert = afipRecordRows.map((row) => { return { clientCuit: clientCuit, ...row } })
            return await electronAPI.invokeBackend('synchronous-message', { action: actions.CREATE_RECORDS, payload: toInsert })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['records', clientCuit])
            queryClient.invalidateQueries(['gastos', clientCuit])
            queryClient.invalidateQueries(['ventas', clientCuit])
        }
    })

    return mutation

}

export default useInsertRecords