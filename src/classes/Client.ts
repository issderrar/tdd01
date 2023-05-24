import banqueApiInterface from "./banqueApiInterface";
import BanqueApi from "./banqueApi";

export default class Client {
    private readonly _name: string;
    private readonly _id: number;
    private banqueApi: banqueApiInterface;


    constructor(name, id, banqueApi: banqueApiInterface = new BanqueApi()) {
        this._name = name;
        this._id = id;
        this.banqueApi = banqueApi;
    }

    get name(): string {
        return this._name;
    }

    get id(): number {
        return this._id;
    }

    isBlacklisted(): boolean {
        return this.banqueApi.getClientStatus(this.id)
    }

    addToBlacklist(): void {
        this.banqueApi.addClientToBlacklist(this.id)
    }
}
