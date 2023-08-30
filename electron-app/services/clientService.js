class ClientService {
    constructor(dbRepository) {
        this.dbRepository = dbRepository
    }

    async insertClient(client) {
        return await this.dbRepository.insertClient(client)
    }

    async listClients() {
        return await this.dbRepository.listClients() 
    }
}