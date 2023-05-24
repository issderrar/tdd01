import banqueApiInterface from "./banqueApiInterface";

export default class BanqueApi implements banqueApiInterface {
    blacklist = {
    }

    getClientStatus(id): boolean {
        return id in this.blacklist;
    }

    addClientToBlacklist(id) {
        this.blacklist[id] = true;
    }
}
