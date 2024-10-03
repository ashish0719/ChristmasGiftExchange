import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractAbi from "../artifacts/contracts/ChristmasGiftExchange.sol/ChristmasGiftExchange.json";
import styles from "./App.module.css"; // Import the CSS module

export default function App() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [giftCount, setGiftCount] = useState(0); // Initialize to 0
  const [giftsGiven, setGiftsGiven] = useState(0); // Initialize to 0
  const [giftsReceived, setGiftsReceived] = useState(0); // Initialize to 0
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);
    getContractInstance();
  };

  const getContractInstance = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi.abi,
      signer
    );
    setContract(contractInstance);

    // Listen for the GiftGiven event
    contractInstance.on("GiftGiven", (giver) => {
      console.log(`${giver} has given a gift!`);
      setGiftsGiven((prev) => prev + 1); // Update gifts given
    });

    // Listen for the GiftReceived event (if you implement this)
    contractInstance.on("GiftReceived", (receiver) => {
      console.log(`${receiver} has received a gift!`);
      setGiftsReceived((prev) => prev + 1); // Update gifts received
    });
  };

  const getTotalGifts = async () => {
    if (contract) {
      const totalGifts = await contract.getTotalGifts();
      setGiftCount(parseInt(totalGifts._hex));
    }
  };

  const giveGift = async () => {
    if (contract) {
      const tx = await contract.giveGift();
      await tx.wait();
      getTotalGifts(); // Fetch total gifts after giving a gift
      setGiftsGiven((prev) => prev + 1); // Increment locally as well
    }
  };

  const receiveGift = async () => {
    if (contract) {
      const tx = await contract.receiveGift();
      await tx.wait();
      getTotalGifts(); // Fetch total gifts after receiving a gift
      setGiftsReceived((prev) => prev + 1); // Increment locally as well
    }
  };

  // Move the initUser function definition here
  const initUser = () => {
    if (!ethWallet) {
      return (
        <p className={styles.text}>
          Please install MetaMask to interact with this contract.
        </p>
      );
    }

    if (!account) {
      return (
        <button className={styles.button} onClick={connectAccount}>
          Connect MetaMask
        </button>
      );
    }

    return (
      <div>
        <p className={styles.text}>Your Account: {account}</p>
        <p className={styles.text}>Total Gifts: {giftCount}</p>
        <p className={styles.text}>Total Gifts Given: {giftsGiven}</p>
        <p className={styles.text}>Total Gifts Received: {giftsReceived}</p>
        <button className={styles.button} onClick={giveGift}>
          Give Gift
        </button>
        <button className={styles.button} onClick={receiveGift}>
          Receive Gift
        </button>
      </div>
    );
  };

  // Effect to get total gifts when account changes
  useEffect(() => {
    if (account) {
      getTotalGifts();
    }
  }, [account]); // Dependency array: runs when 'account' changes

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className={styles.container}>
      <header>
        <h1 className={styles.header}>
          Welcome to the Christmas Gift Exchange!
        </h1>
      </header>
      {initUser()}
    </main>
  );
}
