export default class Transaction {
    date: string;
    transaction: number;
    newBalance: number;

    constructor(currentDate, transaction, newBalance) {
        this.date = currentDate;
        this.transaction = transaction;
        this.newBalance = newBalance;
    }
}
