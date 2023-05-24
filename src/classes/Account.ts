import {DateGeneratorInterface} from './DateGeneratorInterface';
import {DateGenerator} from "./DateGenerator";
import Transaction from "./Transaction";
import Client from "./Client";
import {BLACKLIST_ERROR_MESSAGE} from "../Constants";


export default class Account {
    BLACKLIST_LIMIT = -4000;
    private _balance = 0;
    private _transactionsHistory = [];
    private _client: Client;
    dateInterface: DateGenerator;

    constructor(client, currentDate: DateGeneratorInterface = new DateGenerator()) {
        this._client = client;
        this.dateInterface = currentDate;
    }

    deposit(amount: number): void {
        this._balance += amount;
        this.addTransactionToHistory(new Transaction(this.dateInterface.getDate(), amount, this._balance))
    }

    withdraw(amount: number): void {
        if (this.client.isBlacklisted()) {
            throw new Error(BLACKLIST_ERROR_MESSAGE);
        }

        this._balance -= amount;

        if (this._balance <= this.BLACKLIST_LIMIT) {
            this.blackListClient();
        }

        this.addTransactionToHistory(new Transaction(this.dateInterface.getDate(), -amount, this._balance))
    }

    getClientName() {
        return this.client.name;
    }

    get client(): Client {
        return this._client;
    }

    get balance(): number {
        return this._balance;
    }

    get transactionsHistory(): Transaction[] {
        return this._transactionsHistory;
    }

    private addTransactionToHistory(transaction: Transaction): void {
        this._transactionsHistory.unshift(transaction)
    }

    private blackListClient() {
        this.client.addToBlacklist();
    }
}
