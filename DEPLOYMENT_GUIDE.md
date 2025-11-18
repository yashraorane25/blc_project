# Deployment Guide

## Step One: Deploy the smart contract to Sepolia

### 1.1 Compile and deploy in Remix

1. Open [Remix IDE](https://remix.ethereum.org/)
2. Create a new file `Crowdfunding.sol`
3. Copy the contents of `contract/Crowdfunding.sol`
4. Compile with the Solidity compiler (version 0.8.x)
5. In the Deploy tab:
   - Environment: Injected Provider - MetaMask
   - Ensure the Sepolia testnet is selected
   - Click Deploy

### 1.2 Verify the contract

1. Copy the deployed contract address
2. Open [Sepolia Etherscan](https://sepolia.etherscan.io/)
3. Search for the contract address
4. Click "Verify and Publish"
5. Choose compiler version 0.8.x
6. Paste the contract source code
7. Complete verification

### 1.3 Get the ABI

1. On Etherscan, open the verified contract
2. Copy the Contract ABI
3. Update `frontend/src/abi.json`

## Step Two: Deploy the frontend to Vercel

### 2.1 Prepare the GitHub repository

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit: Crowdfunding dApp"

# Add the remote
git remote add origin https://github.com/YOUR_USERNAME/crowdfunding-dapp.git
git branch -M main
git push -u origin main
```

### 2.2 Deploy with Vercel

1. Visit [Vercel](https://vercel.com/)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click Deploy

### 2.3 Update the contract address

1. After deployment, grab the Vercel URL
2. Update `frontend/src/App.jsx`:
   ```javascript
   const CONTRACT_ADDRESS = "0x..."; // Replace with the actual address
   ```
3. Commit and push the change to GitHub
4. Vercel will redeploy automatically

## Step Three: Test the dApp

### 3.1 Test flow

1. Open the Vercel URL
2. Connect MetaMask (on the Sepolia network)
3. Create a campaign
4. Contribute using another account
5. Confirm events appear on Etherscan

### 3.2 Get test ETH

Use the [Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia) to obtain free test ETH.

## Submission Checklist

- [ ] Contract deployed to Sepolia
- [ ] Contract verified on Etherscan
- [ ] Frontend deployed to Vercel
- [ ] Contract address updated in the frontend code
- [ ] At least one successful transaction recorded
- [ ] At least one failing transaction recorded
- [ ] Project report completed
- [ ] GitHub repository link captured
- [ ] Vercel URL captured
