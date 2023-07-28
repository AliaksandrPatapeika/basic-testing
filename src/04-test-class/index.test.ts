import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import { random } from 'lodash';

jest.mock('lodash');

describe('BankAccount', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);

    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const withdrawAmount = 200;
    const account = getBankAccount(initialBalance);

    expect(() => {
      account.withdraw(withdrawAmount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const transferAmount = 200;
    const account1 = getBankAccount(initialBalance);
    const account2 = getBankAccount(0);

    expect(() => {
      account1.transfer(transferAmount, account2);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const transferAmount = 50;
    const account = getBankAccount(initialBalance);

    expect(() => {
      account.transfer(transferAmount, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const depositAmount = 50;
    const account = getBankAccount(initialBalance);

    account.deposit(depositAmount);

    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const withdrawAmount = 50;
    const account = getBankAccount(initialBalance);

    account.withdraw(withdrawAmount);

    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const initialBalance1 = 100;
    const initialBalance2 = 50;
    const transferAmount = 30;
    const account1 = getBankAccount(initialBalance1);
    const account2 = getBankAccount(initialBalance2);

    account1.transfer(transferAmount, account2);

    expect(account1.getBalance()).toBe(initialBalance1 - transferAmount);
    expect(account2.getBalance()).toBe(initialBalance2 + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(0);
    const newBalance = 50;

    (random as jest.Mock).mockReturnValue(newBalance);

    const balance = await account.fetchBalance();

    expect(balance).toBe(newBalance);
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);
    const newBalance = 100;
    (random as jest.Mock).mockReturnValue(newBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(newBalance);
    expect(random).toHaveBeenCalled();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);
    (random as jest.Mock).mockReturnValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );

    expect(account.getBalance()).toBe(0);
    expect(random).toHaveBeenCalled();
  });
});
