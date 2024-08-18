# E-Voting Blockchain System

A decentralized e-voting system leveraging blockchain technology for transparent and secure voting. This project includes a React-based frontend, a Node.js backend, and smart contracts deployed on an Ethereum-based local blockchain using Ganache. The system ensures that every vote is recorded immutably, and user authentication is centralized with KYC, without storing wallet addresses.

## Features
- **Decentralized Voting**: Secure and transparent voting process using blockchain technology.
- **Centralized Authentication**: User verification via KYC without storing wallet addresses, allowing decentralized voting after KYC is approved.
- **Real-time Voting Results**: Instant and immutable vote counts displayed using smart contracts.
- **Admin Dashboard**: Manage user verifications and oversee the voting process from a centralized admin interface.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/e-voting.git

2. **Navigate to the backend folder and install dependencies**:
   cd e-voting/backend
   npm install

4. **Navigate to the frontend folder and install dependencies**:
   cd ../frontend
   npm install

6. **Start the local blockchain using Ganache**:
   ganache-cli

8. **Deploy the smart contract**:
   cd ../backend
   truffle migrate

9. **Run the backend server**:
    npm start

10. **Run the frontend server**:
    cd ../frontend
    npm start

Technologies Used
Frontend: React, Bootstrap
Backend: Node.js, Express.js
Smart Contracts: Solidity
Blockchain: Ethereum (Ganache for local development)
Database: PostgreSQL
Contribution
Contributions are welcome! Please fork this repository, create a new branch, and submit a pull request with your changes.

License
This project is licensed under the MIT License - see the LICENSE file for details.
