import { create } from 'zustand'

interface Client {
    client: string
}

interface ClientAPI {
    setClient: (clientId: string) => void
    removeClient: () => void
}


const useCurrentClientStore = create<Client & ClientAPI>()((set) => ({
  client: '',
  removeClient: () => set(() => ({ client: ''})),
  setClient: (clientId: string) => set(() => ({client: clientId})),
}))

const useClientIsSelected = (): boolean => {
    const clientStore = useCurrentClientStore()
    return clientStore.client !== ''
}

const useSetClient = () => {
    const clientStore = useCurrentClientStore()
    return clientStore.setClient
}

const useRemoveClient = () => {
    const clientStore = useCurrentClientStore()
    return clientStore.removeClient
}

const useGetClient = (): string => {
    const clientStore = useCurrentClientStore()
    return clientStore.client
}

export {
     useCurrentClientStore,
     useClientIsSelected,
     useSetClient,
     useRemoveClient,
     useGetClient
}