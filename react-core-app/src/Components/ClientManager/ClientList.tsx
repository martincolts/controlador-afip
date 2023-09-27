import { Stack } from "@mui/material";
import * as React from "react";
import useListClients from "../../Hooks/QueryHooks/useListClients";
import { Client } from "../../model/client";
import ClientCard from "./ClientCard";

interface ClientListProps {}

const ClientList: React.FC<ClientListProps> = () => {
  const { data } = useListClients();
 

  if (data) {
    return (
      <Stack direction={"column"} style={{maxHeight: 800, overflow: 'hidden', overflowY: 'auto'}} spacing={2} padding={2}>
        {data.map((client: Client) => {
          return <ClientCard key={client.id} client={client}></ClientCard>
        })}
      </Stack>
    );
  } else {
    return null;
  }
};

export default ClientList;
