// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    uint256 public lastTransactionTime; // New state variable for last transaction time

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        lastTransactionTime = block.timestamp; // Initialize with the contract deployment time
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");

        balance += _amount;
        lastTransactionTime = block.timestamp; // Update last transaction time
        emit Deposit(_amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");

        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        balance -= _withdrawAmount;
        lastTransactionTime = block.timestamp; // Update last transaction time
        emit Withdraw(_withdrawAmount);
    }

    function getLastTransactionTime() public view returns (uint256) {
        return lastTransactionTime;
    }
}