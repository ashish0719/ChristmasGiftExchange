// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract ChristmasGiftExchange {
    uint public totalGifts;
    uint public totalGiftsGiven;
    uint public totalGiftsReceived;

    event GiftGiven(address indexed giver);
    event GiftReceived(address indexed receiver);

    constructor(uint initialGifts) {
        totalGifts = initialGifts;
        totalGiftsGiven = 0; // Initialize total gifts given
        totalGiftsReceived = 0; // Initialize total gifts received
        console.log("Welcome to the Christmas Gift Exchange!");
    }

    // Function to give a gift, increasing the total count
    function giveGift() public {
        totalGifts += 1;
        totalGiftsGiven += 1; // Increment total gifts given
        emit GiftGiven(msg.sender);
        console.log("%s has given a gift!", msg.sender);
    }

    // Function to receive a gift, decreasing the total count
    function receiveGift() public {
        require(totalGifts > 0, "No gifts available to receive.");
        totalGifts -= 1;
        totalGiftsReceived += 1; // Increment total gifts received
        emit GiftReceived(msg.sender);
        console.log("%s has received a gift!", msg.sender);
    }

    // Function to get the total number of gifts
    function getTotalGifts() public view returns (uint256) {
        console.log("We have %d total gifts in the exchange!", totalGifts);
        return totalGifts;
    }

    // Function to get the total gifts given
    function getTotalGiftsGiven() public view returns (uint256) {
        return totalGiftsGiven;
    }

    // Function to get the total gifts received
    function getTotalGiftsReceived() public view returns (uint256) {
        return totalGiftsReceived;
    }
}