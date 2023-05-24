import Account from '../src/classes/Account';
import Client from "../src/classes/Client";
import Transaction from '../src/classes/Transaction';
import DateGeneratorMock from "../src/classes/mocks/DateGeneratorMock";
import BanqueApiMock from "../src/classes/mocks/banqueApiMock";
import {BLACKLIST_ERROR_MESSAGE} from "../src/Constants";

describe('Account class', () => {
  const banqueApiMock = new BanqueApiMock();

  it('When initialized, balance should be 0', () => {

    const client = new Client('Michel',1, banqueApiMock);
    const account = new Account(client);

    expect(account.balance).toBe(0);
  });

  it('When initialized, account should have client', () => {
    const client = new Client('Michel',1, banqueApiMock);
    const account = new Account(client);

    expect(account.getClientName()).toBe('Michel');
  });

  it('If client is blacklisted should refuse withdrawal',  () => {
    const client = new Client('Michel',3, banqueApiMock);
    const account = new Account(client);
    account.deposit(100);
    expect(() => {
      account.withdraw(50)
    })
        .toThrow(BLACKLIST_ERROR_MESSAGE);
  });

  it('If client is not blacklisted should accept withdrawal', function () {
    const client = new Client('Michel',1, banqueApiMock);
    const account = new Account(client);
    account.deposit(100);
    account.withdraw(50);

    expect(account.balance).toBe(50);
  });

  it('When my balance is 0, and I deposit 100, balance should be 100', () => {
    const client = new Client('Michel',1, banqueApiMock);
    const account = new Account(client);
    account.deposit(100);
    expect(account.balance).toBe(100);
  });

  it('When my balance is 0, and I withdraw 50, balance should be -50', () => {
    const client = new Client('Michel',1, banqueApiMock);
    const account = new Account(client);
    account.withdraw(50)

    expect(account.balance).toBe(-50)
  });

  it('When my balance is 0, and I deposit 50, then deposit 100, then withdraw 20 balance should be 130', () => {
    const client = new Client('Michel',1, banqueApiMock);
    const account = new Account(client);
    account.deposit(100);
    account.deposit(50);
    account.withdraw(20);
    expect(account.balance).toBe(130);
  });

  it('When i do a transaction, it is added to the transaction history', () => {
    //GIVEN
    const client = new Client('Michel',1, banqueApiMock);
    const dateMock = new DateGeneratorMock();
    const account = new Account(client,dateMock);
    const currentDate = dateMock.getDate();

    const transaction = new Transaction(currentDate, 100, 100);

    //WHEN
    account.deposit(100);

    //THEN
    expect(account.transactionsHistory).toEqual([transaction]);
  })

  it('When i do multiples transactions, they are added to the transaction history', () => {
    //GIVEN
    const client = new Client('Michel',1, banqueApiMock);
    const dateMock = new DateGeneratorMock();
    const currentDate = dateMock.getDate();

    const account = new Account(client,dateMock);
    const transaction1 = new Transaction(currentDate, 100, 100);
    const transaction2 = new Transaction(currentDate, 50, 150);
    const transaction3 = new Transaction(currentDate, -20, 130);

    //WHEN
    account.deposit(transaction1.transaction);
    account.deposit(transaction2.transaction);
    account.withdraw(-transaction3.transaction);

    //THEN
    expect(account.transactionsHistory).toEqual([transaction3, transaction2, transaction1]);
  })

  it('When my withdrawal gets me below -4000, bank should accept withdrawal and THEN, blacklist me', function () {
    //GIVEN
    const client = new Client('Michel',1, banqueApiMock);
    const account = new Account(client);

    expect(account.client.isBlacklisted()).toBe(false)

    //WHEN
    account.withdraw(5000)

    //THEN
    expect(account.balance).toBe(-5000)
    expect(account.client.isBlacklisted()).toBe(true)
    expect(() => {
      account.withdraw(1)
    }).toThrow(BLACKLIST_ERROR_MESSAGE)
  });
});

