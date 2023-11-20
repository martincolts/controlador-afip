import * as React from 'react'
import { ElectronContext } from '../../Context'
import { AFIPRecordRow, actions } from '@v2/model'
import { useGetClient } from '../currentClientStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function useInsertRecords() {

    const electronAPI = React.useContext(ElectronContext)
    const queryClient = useQueryClient()
    const clientCuit = useGetClient()

    const mutation = useMutation({
        mutationFn: async (afipRecordRows: AFIPRecordRow[]) => {
            const toInsert = afipRecordRows.map((row) => { return { clientCuit: clientCuit, ...row } })
            const result = await electronAPI.invokeBackend<any>('synchronous-message', { action: actions.CREATE_RECORDS, payload: toInsert })
            return toInsert.map(row => {
                if (belongs(row, result)) {
                    return { ...row, correct: false }
                } else {
                    return {
                        ...row, correct: true
                    }
                }
            })
        },
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(['records', clientCuit])
            // @ts-ignore
            queryClient.invalidateQueries(['gastos', clientCuit])
            // @ts-ignore
            queryClient.invalidateQueries(['ventas', clientCuit])
        }
    })

    return mutation

}

function belongs(row: AFIPRecordRow, indexes: number[]): boolean {
    for (const index of indexes) {
        if (row.index === index) {
            return true
        }
    }
    return false
}

export default useInsertRecords