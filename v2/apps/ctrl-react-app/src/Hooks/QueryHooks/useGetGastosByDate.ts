import { useQuery } from "@tanstack/react-query";
import { useGetClient } from "../currentClientStore";
import React from "react";
import { ElectronContext } from "../../Context";
import { AFIPRecordRow , actions } from '@v2/model'


function useGetGastosByDate(from: string, to: string) { // format
    const electronAPI = React.useContext(ElectronContext)
    
    const clientId = useGetClient()
    const query = useQuery({
        queryKey: ["gastos", clientId, from, to],
        queryFn: async () => {
            const result = await electronAPI.invokeBackend<AFIPRecordRow[]>('synchronous-message', {
                action: actions.LIST_GASTOS_BY_DATES,
                payload: {
                    dateFrom: from,
                    dateTo: to,
                    cuit: clientId
                }
            })
            return result
        }
    })

    return query

}

export default useGetGastosByDate