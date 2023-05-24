import {Account, Transaction} from '../src/classes/Account';

describe('Account class', () => {


  it('When initialized, balance should be 0', () => {
    const account = new Account();
    expect(account.getBalance()).toBe(0);
  });

  it('When my balance is 0, and I deposit 100, balance should be 100', () => {
    const account = new Account();
    account.deposit(100);
    expect(account.getBalance()).toBe(100);
  });

  it('When my balance is 0, and I withdraw 50, should throw error', () => {
    const account = new Account();
    expect(() => {
      account.withdraw(50)
    })
      .toThrow('Paiement refusé');
  });

  it('When my balance is 0, and I deposit 50, then deposit 100, then withdraw 20 balance should be 130', () => {
    const account = new Account();
    account.deposit(100);
    account.deposit(50);
    account.withdraw(20);
    expect(account.getBalance()).toBe(130);
  });

  it('When i do a transaction, it is added to the transaction history', () => {
    //GIVEN
    const dateMock = new DateInterfaceMock();
    const account = new Account(dateMock);
    const currentDate = dateMock.getDate();

    const transaction = new Transaction(currentDate, 100, 100);

    //WHEN
    account.deposit(100);

    //THEN
    expect(account.transactionsHistory).toEqual([transaction])
  })

  it('When i do multiples transactions, they are added to the transaction history', () => {
    //GIVEN
    const dateMock = new DateInterfaceMock();
    const currentDate = dateMock.getDate();

    const account = new Account(dateMock);
    const transaction1 = new Transaction(currentDate, 100, 100);
    const transaction2 = new Transaction(currentDate, 50, 150);
    const transaction3 = new Transaction(currentDate, -20, 130);

    //WHEN
    account.deposit(transaction1.transaction);
    account.deposit(transaction2.transaction);
    account.withdraw(-transaction3.transaction);

    console.table([transaction3, transaction2, transaction1])
    //THEN
    expect(account.transactionsHistory).toEqual([transaction3, transaction2, transaction1]);
  })
});

class DateInterfaceMock {
  date: Date

  constructor() {
    this.date = new Date();
  }

  getDate():string {
    return this.date.toISOString();
  }
}
