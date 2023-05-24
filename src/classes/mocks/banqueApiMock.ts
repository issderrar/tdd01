import banqueApiInterface from "../banqueApiInterface";

export default class BanqueApiMock implements banqueApiInterface {
    _status = {
        1: false,
        2: false,
        3: true,
    };

    getClientStatus(id): boolean {
        return this._status[id];
    }

    addClientToBlacklist(id): void {
        this._status[id] = true;
    }


}
