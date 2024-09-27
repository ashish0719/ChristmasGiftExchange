# Frontend-Integration Project
This Project basically deals with creating a Metamask wallet for minting/deposit and withdrawing a token by using the local account address given by hardhat. In this i am deploying my contract to a local host network and connecting my wallet for dummy transfer and deposit.
# Additional Functionalites
1. Tracking the last transactions date and time.
2. Dynamic transfer means we can transact any number of token by using custom scrool button and input box.
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
