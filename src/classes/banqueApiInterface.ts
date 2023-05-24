export default interface banqueApiInterface {
    getClientStatus(id): boolean

    addClientToBlacklist(id): void
}
