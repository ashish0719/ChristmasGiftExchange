import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";
import styles from "./styles.module.css"; // Import CSS module

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [depositAmount, setDepositAmount] = useState("1"); // Use string for input value
  const [withdrawAmount, setWithdrawAmount] = useState("1"); // Use string for input value
  const [transactions, setTransactions] = useState([]);
  const [lastTransactionTime, setLastTransactionTime] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  // Get the MetaMask wallet
  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }
  };

  // Handle account connection
  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  // Connect to MetaMask and get the contract instance
  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    try {
      const accounts = await ethWallet.request({
        method: "eth_requestAccounts",
      });
      handleAccount(accounts);
      getATMContract();
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  // Get the contract instance
  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
    setATM(atmContract);
  };

  // Get the balance from the contract
  const getBalance = async () => {
    if (atm) {
      try {
        const balanceBigNumber = await atm.getBalance();
        setBalance(ethers.utils.formatEther(balanceBigNumber)); // Convert from wei to ether
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };

  // Deposit amount to the contract
  const deposit = async () => {
    if (atm) {
      try {
        const amountInEther = ethers.utils.parseEther(depositAmount);
        const tx = await atm.deposit(amountInEther);
        await tx.wait();
        setTransactions([
          ...transactions,
          { type: "Deposit", amount: depositAmount, txHash: tx.hash },
        ]);
        getBalance();
      } catch (error) {
        console.error("Error depositing:", error);
      }
    }
  };

  // Withdraw amount from the contract
  const withdraw = async () => {
    if (atm) {
      try {
        const amountInEther = ethers.utils.parseEther(withdrawAmount);
        const tx = await atm.withdraw(amountInEther);
        await tx.wait();
        setTransactions([
          ...transactions,
          { type: "Withdraw", amount: withdrawAmount, txHash: tx.hash },
        ]);
        getBalance();
      } catch (error) {
        console.error("Error withdrawing:", error);
      }
    }
  };

  // Get the last transaction time
  const getLastTransactionTime = async () => {
    if (atm) {
      try {
        const txTimestamp = await atm.getLastTransactionTime();
        const time = new Date(txTimestamp.toNumber() * 1000);
        setLastTransactionTime(time.toLocaleString());
      } catch (error) {
        console.error("Error fetching last transaction time:", error);
      }
    }
  };

  // Initialize user interface
  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this ATM.</p>;
    }

    if (!account) {
      return (
        <button className={styles.connectButton} onClick={connectAccount}>
          Please connect your MetaMask wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p className={styles.balance}>Your Balance: {balance} ETH</p>
        <div className={styles.buttonContainer}>
          <div>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className={styles.amountInput}
              placeholder="Deposit Amount"
            />
            <button className={styles.actionButton} onClick={deposit}>
              Deposit {depositAmount} ETH
            </button>
          </div>
          <div>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className={styles.amountInput}
              placeholder="Withdraw Amount"
            />
            <button className={styles.actionButton} onClick={withdraw}>
              Withdraw {withdrawAmount} ETH
            </button>
          </div>
        </div>
        {renderTransactionHistory()}
      </div>
    );
  };

  // Render transaction history and last transaction time
  const renderTransactionHistory = () => {
    return (
      <div className={styles.transactionHistory}>
        <h2>Transaction History</h2>
        <ul>
          {transactions.map((tx, index) => (
            <li key={index}>
              {tx.type} {tx.amount} ETH - Tx Hash: {tx.txHash}
            </li>
          ))}
        </ul>
        <h2>Last Transaction Time</h2>
        <button
          className={styles.actionButton}
          onClick={getLastTransactionTime}
        >
          Show Last Transaction Time
        </button>
        <p>Last Transaction Time: {lastTransactionTime}</p>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className={styles.container}>
      <header>
        <h1>Welcome to the Metacrafters ATM!</h1>
      </header>
      {initUser()}
    </main>
  );
}
