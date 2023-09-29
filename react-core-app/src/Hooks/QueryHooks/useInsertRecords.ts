import * as React from 'react'
import { ElectronContext } from '../../Context'
import { useGetClient } from '../currentClientStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AFIPRecordRow } from '../../model/record';
import Actions from '../../Actions';

function useInsertRecords() {

    const electronAPI = React.useContext(ElectronContext)
    const queryClient = useQueryClient()
    const clientCuit = useGetClient()

    const mutation = useMutation({
        mutationFn: async (afipRecordRows: AFIPRecordRow[]) => {
            const toInsert = afipRecordRows.map((row) => { return { clientCuit: clientCuit, ...row } })
            return await electronAPI.invokeBackend('synchronous-message', { action: Actions.CREATE_RECORDS, payload: toInsert })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['records', clientCuit])
        }
    })

    return mutation

}

export default useInsertRecords