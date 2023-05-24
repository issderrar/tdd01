export class Account {
  balance = 0;
  private _transactionsHistory = [];
  dateInterface: CurrentDate;

  constructor(currentDate = new CurrentDate()) {
    this.dateInterface = currentDate;
  }

  deposit(amount: number): void {
    this.balance += amount;
    this.addTransactionToHistory(new Transaction(this.dateInterface.getDate(), amount, this.balance))
  }

  withdraw(amount: number): void {
    if (amount > this.balance) {
      throw new Error('Paiement refusé');
    }
    this.balance -= amount;
    this.addTransactionToHistory(new Transaction(this.dateInterface.getDate(), -amount, this.balance))
  }

  getBalance(): number {
    return this.balance;
  }

  get transactionsHistory(): Transaction[] {
    return this._transactionsHistory;
  }

  private addTransactionToHistory(transaction: Transaction): void {
    this._transactionsHistory.unshift(transaction)
  }
}

export class Transaction {
  date: string;
  transaction: number;
  newBalance: number;

  constructor(currentDate, transaction, newBalance) {
    this.date = currentDate;
    this.transaction = transaction;
    this.newBalance = newBalance;
  }
}

class CurrentDate {
  getDate(): string {
    return new Date().toISOString()
  }
}
