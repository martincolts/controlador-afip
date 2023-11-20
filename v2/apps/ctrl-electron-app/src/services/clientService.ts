import { DBRepository } from "../db"

class ClientService {
    constructor(private dbRepository: DBRepository) {
        this.dbRepository = dbRepository
    }

    async insertClient(client) {
        return await this.dbRepository.insertClient(client)
    }

    async listClients() {
        return await this.dbRepository.listClients() 
    }
}

export { ClientService }