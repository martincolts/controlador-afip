import { useQuery } from "@tanstack/react-query";
import { useGetClient } from "../currentClientStore";
import React from "react";
import { ElectronContext, actions } from "../../Context";
import { MapFromService } from "../../model/record";

function useGetGastosByDate(from: string, to: string) { // format
    const electronAPI = React.useContext(ElectronContext)
    
    const clientId = useGetClient()
    const query = useQuery({
        queryKey: ["gastos", clientId, from, to],
        queryFn: async () => {
            const result = await electronAPI.invokeBackend('synchronous-message', {
                action: actions.LIST_GASTOS_BY_DATES,
                payload: {
                    dateFrom: from,
                    dateTo: to,
                    cuit: clientId
                }
            })
            const data = result.map((r: any) => MapFromService(r))
            return data
        }
    })

    return query

}

export default useGetGastosByDate