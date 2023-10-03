import { useQuery } from "@tanstack/react-query";
import { useGetClient } from "../currentClientStore";
import React from "react";
import { ElectronContext, actions } from "../../Context";

function useGetGastosByDate(from, to: string) { // format
    const electronAPI = React.useContext(ElectronContext)

    const clientId = useGetClient()
    const query = useQuery({
        queryKey: ["records", clientId],
        queryFn: async () => {
            const result = await electronAPI.invokeBackend('synchronous-message', {
                action: actions.LIST_GASTOS_BY_DATES,
                payload: {
                    dateFrom: from,
                    dateTo: to,
                    cuit: clientId
                }
            })
            console.log(result)
            return result
        }
    })

    return query

}

export default useGetGastosByDate