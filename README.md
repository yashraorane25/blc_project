# Crowdfunding dApp - Full-Stack Web3 Application

> A complete decentralized crowdfunding platform demonstrating how a Solidity smart contract integrates with a React front end

![Status](https://img.shields.io/badge/status-ready-brightgreen)
![Solidity](https://img.shields.io/badge/solidity-^0.8.0-blue)
![React](https://img.shields.io/badge/react-18-blue)
![Network](https://img.shields.io/badge/network-sepolia-orange)

## 📋 Project Overview

This is the team project for the ECE/CPSC 8830 blockchain course, delivering a full Web3 dApp:

- **Smart Contract**: Solidity crowdfunding contract deployed on the Sepolia testnet
- **Front End**: React + ethers.js user interface
- **Wallet Integration**: MetaMask support
- **Deployment**: Vercel (frontend) + Etherscan (contract verification)

## 🎯 Core Features

### Create crowdfunding campaigns
Users can start new campaigns with target amounts and deadlines.

### Contribute funds
Other users can contribute ETH and see progress update in real time.

### Withdraw funds
Campaign creators can withdraw funds after goals are reached.

### View details
Campaign info, contributor data, and transaction status display in real time.

## 🏗️ Project Structure

```
blocktest1115/
├── contract/
│   └── Crowdfunding.sol              # Smart contract source
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                   # Main React component
│   │   ├── App.css                   # Styles
│   │   ├── main.jsx                  # App entrypoint
│   │   └── abi.json                  # Contract ABI
│   │
│   ├── index.html                    # HTML template
│   ├── package.json                  # Dependencies
│   ├── vite.config.js                # Vite build config
│   └── README.md                     # Frontend guide
│
├── DEPLOYMENT_GUIDE.md               # 📖 Detailed deployment guide
├── QUICK_START.md                    # 🚀 Quick start guide
├── PROJECT_SUMMARY.md                # 📊 Project design summary
├── REPORT_TEMPLATE.md                # 📝 Project report template
├── COMPLETION_SUMMARY.md             # ✅ Completion summary
├── .gitignore                        # Git ignore config
├── read                              # Project requirements
└── README.md                         # This file
```

## 🔧 Tech Stack

### Backend (smart contract)
- **Language**: Solidity ^0.8.0
- **Network**: Sepolia Testnet
- **Verification**: Etherscan

### Frontend
- **Framework**: React 18
- **Build tool**: Vite
- **Web3 library**: ethers.js v6
- **Styles**: CSS3 + responsive design
- **Deployment**: Vercel

### Developer tools
- **IDE**: Remix IDE (contract development)
- **Version control**: Git + GitHub
- **Wallet**: MetaMask

## 📦 Smart Contract

### Core functions

| Function | Type | Description |
|------|------|------|
| `createCampaign()` | State changing | Create a new campaign |
| `contribute()` | State changing (payable) | Contribute funds |
| `withdrawFunds()` | State changing | Withdraw funds (creator only) |
| `getCampaignDetails()` | View | Get campaign details |
| `getContributorAmount()` | View | Get contributor amount |

### Events

```solidity
event CampaignCreated(uint256 indexed campaignId, address indexed creator, ...);
event ContributionMade(uint256 indexed campaignId, address indexed contributor, uint256 amount);
event FundsWithdrawn(uint256 indexed campaignId, address indexed creator, uint256 amount);
```

### Security features

- ✅ Access control (`onlyCreator` modifier)
- ✅ Input validation (`require` statements)
- ✅ State checks (deadline, target amount)
- ✅ Safe fund transfer (`call` pattern)

## 🎨 Frontend Features

- 🔗 MetaMask wallet connection
- 📝 Campaign creation form
- 💰 Contribution interface
- 📊 Campaign progress display
- 🎯 Creator withdrawal
- ⚡ Real-time transaction status feedback
- 📱 Responsive design
- 🌙 Modern UI

## 🚀 Quick Start

### Prerequisites

```bash
# System requirements
- Node.js 16+
- npm or yarn
- MetaMask browser extension
- Sepolia testnet ETH
```

### Local development

```bash
# Install dependencies
cd frontend
npm install

# Start the dev server
npm run dev

# Open http://localhost:5173
```

### Production build

```bash
# Build the project
npm run build

# Preview the build output
npm run preview
```

## 📖 Deployment Guide

### 1. Deploy the smart contract

See `DEPLOYMENT_GUIDE.md` - Step One

```
1. Compile the contract in Remix IDE
2. Connect MetaMask to Sepolia
3. Deploy the contract
4. Record the contract address
5. Verify on Etherscan
```

### 2. Deploy the frontend

See `DEPLOYMENT_GUIDE.md` - Step Two

```
1. Initialize a Git repository
2. Push to GitHub
3. Import the project in Vercel
4. Configure build settings
5. Deploy automatically
```

### 3. Integration and testing

See `DEPLOYMENT_GUIDE.md` - Step Three

```
1. Update the contract address in the frontend
2. Test the wallet connection
3. Create a test campaign
4. Test contribution and withdrawal
5. Verify event logs
```

## 📝 Project Report

### Report contents

1. Team members and roles
2. System design overview
3. Deployment evidence
4. Frontend demo
5. Test results
6. Gas usage
7. Lessons learned

### Report template

Use `REPORT_TEMPLATE.md` to write a 2–3 page project report.

## 🧪 Testing

### Successful transaction test

```
1. Create a campaign
2. Contribute funds
3. Confirm the transaction succeeds
4. Check the event log
```

### Failing transaction test

```
1. Try to withdraw before the goal is met
2. Confirm the `require` failure
3. Inspect the failed transaction
```

## 📊 Project Stats

- **Lines of code**: ~890
- **Documentation lines**: ~700
- **Smart contract functions**: 5
- **Frontend components**: 1 main component
- **Event types**: 3
- **User actions**: 6 primary flows

## 🎓 Resources

- [Solidity documentation](https://docs.soliditylang.org/)
- [ethers.js docs](https://docs.ethers.org/)
- [Remix IDE guide](https://remix-ide.readthedocs.io/)
- [Vercel deployment guide](https://vercel.com/docs)
- [MetaMask developer docs](https://docs.metamask.io/)

## 📋 Submission Checklist

Before submission, confirm:

- [ ] Contract deployed to Sepolia
- [ ] Contract verified on Etherscan
- [ ] Frontend deployed to Vercel
- [ ] At least one successful transaction
- [ ] At least one failing transaction
- [ ] Project report completed
- [ ] GitHub repo created
- [ ] All files committed

## 🔗 Important Links

### Update after deployment

- **Contract address**: `0x...` (Sepolia)
- **Etherscan link**: https://sepolia.etherscan.io/address/0x...
- **Vercel URL**: https://crowdfunding-dapp.vercel.app
- **GitHub repo**: https://github.com/USERNAME/crowdfunding-dapp

## 📞 FAQ

**Q: How do I get test ETH?**  
A: Visit the [Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)

**Q: Where do I find the contract address?**  
A: Remix shows it after deployment, or search your wallet on Etherscan

**Q: How do I update the contract address?**  
A: Edit line 7 in `frontend/src/App.jsx`

**Q: Vercel deployment failed?**  
A: Confirm the root directory is `frontend` and the build command is correct

## 📚 Documentation Map

| Document | Contents |
|------|------|
| `QUICK_START.md` | 5-minute quick start |
| `DEPLOYMENT_GUIDE.md` | Detailed deployment steps |
| `PROJECT_SUMMARY.md` | Project design deep-dive |
| `REPORT_TEMPLATE.md` | Project report template |
| `COMPLETION_SUMMARY.md` | Completion summary |

## ✨ Highlights

- ✅ Full Web3 stack implementation
- ✅ Secure smart contract design
- ✅ Modern user interface
- ✅ Detailed docs and guides
- ✅ Production-ready code
- ✅ Best practices applied

## 🎉 Next Steps

1. Follow `QUICK_START.md` to get running fast
2. Use `DEPLOYMENT_GUIDE.md` to deploy
3. Write the report with `REPORT_TEMPLATE.md`
4. Submit all files before the deadline

## 📄 License

This project is a course assignment and for learning use only.

## 👥 Team

- Student 1: Smart contract development
- Student 2: Frontend development
- Student 3: Testing and documentation

---

**Project Status**: ✅ Ready  
**Last Updated**: Nov 15, 2025  
**Deadline**: Nov 21, 2025

🚀 **Time to deploy!**
