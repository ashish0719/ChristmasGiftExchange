# Frontend-Integration Project
The ChristmasGiftExchange smart contract is a decentralized application designed to facilitate a fun and interactive gifting experience on the Ethereum blockchain. It allows users to give and receive gifts while tracking the total number of gifts exchanged.

# Key Features:

Gift Management: Users can increase the total number of gifts by giving gifts and decrease it by receiving gifts. This simple mechanism encourages participation in the gifting process.

Event Emissions: The contract emits events whenever a gift is given or received, providing transparency and allowing users to track activities within the exchange.

State Tracking: The contract maintains a record of:

Total gifts available for exchange.
Total gifts given by users.
Total gifts received by users.
### Getting Started
## Installation/Running this project
After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.
6. After this, the project will be running on your localhost. Typically at http://localhost:3000/
## Help
In case the account balance is not updating go to metamask -> settings-> advanced->clear acitivity tab
## Author
1. Name- Ashish Kumar Saurav
2. Gmail-Id- sauravashish.0000@gmail.com
