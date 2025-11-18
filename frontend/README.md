# Crowdfunding dApp Frontend

This is a React + ethers.js frontend for the Web3 crowdfunding app.

## Features

- 🔗 MetaMask wallet connection
- 📝 Create crowdfunding campaigns
- 💰 Contribute funds
- 📊 View campaign progress
- 🎯 Creator withdrawals

## Install and Run

### Prerequisites

- Node.js 16+
- MetaMask browser extension
- Sepolia testnet ETH

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
```

## Configuration

Update the contract address in `src/App.jsx`:

```javascript
const CONTRACT_ADDRESS = '0x...'; // Replace with your deployed address
```

## Deploy to Vercel

1. Push code to GitHub
2. Import the project in Vercel
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

## Usage

1. Click “Connect MetaMask”
2. Switch to the Sepolia testnet
3. Create a campaign or contribute to an existing one
4. Track transaction status and event logs
