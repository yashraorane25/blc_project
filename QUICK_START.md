# Quick Start Guide

## 📋 Prerequisites

- MetaMask browser extension
- Node.js 16+ and npm
- GitHub account
- Vercel account (optional, for deployment)

## 🚀 5-Minute Quick Start

### 1️⃣ Deploy the smart contract

```bash
# 1. Open Remix IDE
https://remix.ethereum.org/

# 2. Create a new file Crowdfunding.sol
# 3. Copy the contents of contract/Crowdfunding.sol
# 4. Compile (Solidity 0.8.x)
# 5. Connect MetaMask to the Sepolia testnet
# 6. Deploy the contract
# 7. Record the contract address
```

### 2️⃣ Verify the contract

```bash
# 1. Open Etherscan Sepolia
https://sepolia.etherscan.io/

# 2. Search for the contract address
# 3. Click "Verify and Publish"
# 4. Choose compiler version 0.8.x
# 5. Paste the source code and verify
```

### 3️⃣ Update the frontend

```bash
# Edit frontend/src/App.jsx
# Line 7: update the contract address
const CONTRACT_ADDRESS = '0x...'; // Replace with your contract address
```

### 4️⃣ Local testing

```bash
cd frontend
npm install
npm run dev

# Open http://localhost:5173
```

### 5️⃣ Deploy to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy Crowdfunding dApp"
git push

# 2. Open Vercel
https://vercel.com/

# 3. Import the GitHub repo
# 4. Set the root directory to frontend
# 5. Click Deploy
```

## 🔑 Key Files

| File | Description |
|------|------|
| `contract/Crowdfunding.sol` | Smart contract source |
| `frontend/src/App.jsx` | Main React app |
| `frontend/src/abi.json` | Contract ABI |
| `DEPLOYMENT_GUIDE.md` | Detailed deployment guide |
| `REPORT_TEMPLATE.md` | Project report template |

## 📝 Environment Variables

No environment variables needed; all configuration lives in code.

## 🧪 Test Commands

```bash
# Dev mode
cd frontend && npm run dev

# Production build
cd frontend && npm run build

# Preview build
cd frontend && npm run preview
```

## 🐛 FAQ

### Q: Where do I find the contract address?
A: Remix shows it after deployment. You can also search your wallet on Etherscan to see the transaction.

### Q: How do I get test ETH?
A: Visit the [Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)

### Q: The frontend cannot talk to the contract?
A: Check:
1. Is the contract address correct?
2. Are you on the Sepolia network?
3. Does the ABI match?

### Q: Vercel deployment failed?
A: Confirm:
1. The root directory is `frontend`
2. The build command is `npm run build`
3. The output directory is `dist`

## 📚 Learning Resources

- [Solidity docs](https://docs.soliditylang.org/)
- [ethers.js docs](https://docs.ethers.org/)
- [Remix IDE tutorial](https://remix-ide.readthedocs.io/)
- [Vercel docs](https://vercel.com/docs)

## ✅ Completion Checklist

- [ ] Contract deployed to Sepolia
- [ ] Contract verified on Etherscan
- [ ] Frontend updated with contract address
- [ ] Local testing passes
- [ ] Frontend deployed to Vercel
- [ ] At least one successful transaction
- [ ] At least one failing transaction
- [ ] Project report finished
- [ ] All files pushed to GitHub

## 🎉 Next Steps

1. Create at least one campaign
2. Test contribute and withdraw
3. Record transaction hashes and event logs
4. Finish the project report
5. Submit the GitHub link, Vercel URL, and PDF report

---

**Need help?** See `DEPLOYMENT_GUIDE.md` for detailed steps.
