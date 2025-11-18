# Truffle Development Guide

**Project**: Crowdfunding dApp  
**Test Network**: Ganache (127.0.0.1:7545)  
**Compiler**: Solidity 0.8.0

---

## 📋 Project Structure

```
blocktest1115/
├── contracts/
│   └── Crowdfunding.sol           # Smart contract source
├── migrations/
│   └── 1_deploy_contracts.js      # Deployment script
├── test/
│   └── crowdfunding.test.js       # Tests
├── build/
│   └── contracts/                 # Build output
├── truffle-config.js              # Truffle config
├── package.json                   # Dependencies
└── GANACHE_TEST_REPORT.md         # Test report
```

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Start Ganache

```bash
# If already running, skip
ganache-cli -p 7545
# Or use Ganache GUI listening on 127.0.0.1:7545
```

### 3. Compile contracts

```bash
npm run compile
```

### 4. Deploy to Ganache

```bash
npm run migrate
```

### 5. Run tests

```bash
npm test
```

---

## 📝 Common Commands

### Compile

```bash
# Compile all contracts
npm run compile

# Or with truffle
npx truffle compile
```

### Deploy

```bash
# Deploy to Ganache
npm run migrate

# Reset deployment
npm run migrate:reset

# Deploy to a network
npx truffle migrate --network ganache
```

### Test

```bash
# Run all tests
npm test

# Run a specific file
npx truffle test test/crowdfunding.test.js

# Verbose output
npx truffle test --verbose
```

### Console

```bash
# Open Truffle console
npm run console

# Or
npx truffle console --network ganache
```

---

## 🧪 Interact in Truffle Console

### 1. Get contract instance

```javascript
// Deployed contract
const crowdfunding = await Crowdfunding.deployed();

// Or by address
const crowdfunding = await Crowdfunding.at('0x...');
```

### 2. Get accounts

```javascript
// All accounts
const accounts = await web3.eth.getAccounts();

// Use first as creator
const creator = accounts[0];
const contributor = accounts[1];
```

### 3. Create a campaign

```javascript
// Create a campaign
const tx = await crowdfunding.createCampaign(
  "Web3 Learning Fund",
  "Help students learn Web3",
  web3.utils.toWei("5", "ether"),
  30,
  { from: creator }
);

console.log("Tx hash:", tx.tx);
```

### 4. Contribute

```javascript
// Contribute 2 ETH
const tx = await crowdfunding.contribute(0, {
  from: contributor,
  value: web3.utils.toWei("2", "ether")
});

console.log("Contribution successful!");
```

### 5. View campaign details

```javascript
// Campaign details
const details = await crowdfunding.getCampaignDetails(0);

console.log("Creator:", details.creator);
console.log("Title:", details.title);
console.log("Target:", web3.utils.fromWei(details.targetAmount, "ether"), "ETH");
console.log("Raised:", web3.utils.fromWei(details.amountRaised, "ether"), "ETH");
```

### 6. Withdraw funds

```javascript
// Creator withdraws
const tx = await crowdfunding.withdrawFunds(0, { from: creator });

console.log("Withdrawn!");
```

### 7. View contribution amount

```javascript
// Contribution amount
const amount = await crowdfunding.getContributorAmount(0, contributor);

console.log("Contribution:", web3.utils.fromWei(amount, "ether"), "ETH");
```

---

## 🔍 Debugging Tips

### 1. Inspect transactions

```javascript
// Transaction receipt
const receipt = await web3.eth.getTransactionReceipt('0x...');
console.log("Gas used:", receipt.gasUsed);
console.log("Status:", receipt.status);
```

### 2. Inspect events

```javascript
// Contract events
const events = await crowdfunding.getPastEvents('CampaignCreated', {
  fromBlock: 0,
  toBlock: 'latest'
});

console.log("Events:", events);
```

### 3. Check balances

```javascript
// Account balance
const balance = await web3.eth.getBalance(creator);
console.log("Balance:", web3.utils.fromWei(balance, "ether"), "ETH");
```

### 4. Contract address

```javascript
// Contract address
const address = crowdfunding.address;
console.log("Contract address:", address);
```

---

## 📊 Test File Patterns

### Test harness

```javascript
contract("Crowdfunding", (accounts) => {
  // tests
});
```

### Assertions

```javascript
// Using assert
assert.equal(actual, expected, "message");
assert.include(error.message, "substring", "message");
```

### Common patterns

```javascript
// beforeEach - runs before every test
beforeEach(async () => {
  crowdfunding = await Crowdfunding.new();
});

// Happy path
it("creates a campaign", async () => {
  // test code
});

// Failure path
it("rejects invalid input", async () => {
  try {
    await crowdfunding.createCampaign(...);
    assert.fail("should throw");
  } catch (error) {
    assert.include(error.message, "expected error");
  }
});
```

---

## 🔧 Config File Notes

### truffle-config.js

```javascript
module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",      // Ganache host
      port: 7545,             // Ganache port
      network_id: "*"         // Any network id
    }
  },
  
  compilers: {
    solc: {
      version: "0.8.0",       // Solidity version
      settings: {
        optimizer: {
          enabled: true,      // Enable optimizer
          runs: 200           // Optimizer runs
        }
      }
    }
  }
};
```

---

## 📦 Deployment Script

### migrations/1_deploy_contracts.js

```javascript
const Crowdfunding = artifacts.require("Crowdfunding");

module.exports = function(deployer) {
  // Deploy the contract
  deployer.deploy(Crowdfunding);
};
```

### Deployment order

- Truffle runs migration files in numeric order
- `1_deploy_contracts.js` runs first
- Add `2_deploy_xxx.js`, etc., for more scripts

---

## 🐛 FAQ

### Q: Failed to connect to Ganache?
A: Ensure Ganache is running on 127.0.0.1:7545

### Q: Contract failed to compile?
A: Check the Solidity version (0.8.0)

### Q: Tests failing?
A: Run `npm run migrate:reset` to reset deployments

### Q: How to view gas usage?
A: Check `receipt.gasUsed` in tests

### Q: How to debug transactions?
A: Step through in the Truffle console

---

## 📚 Resources

- [Truffle docs](https://trufflesuite.com/docs/)
- [Ganache docs](https://www.trufflesuite.com/ganache)
- [Solidity docs](https://docs.soliditylang.org/)
- [Web3.js docs](https://web3js.readthedocs.io/)

---

## ✅ Checklist

Before deployment:
- [ ] Ganache running (127.0.0.1:7545)
- [ ] Dependencies installed (`npm install`)
- [ ] Contracts compiled (`npm run compile`)
- [ ] Tests passing (`npm test`)
- [ ] Deployment succeeds (`npm run migrate`)

---

## 🎯 Next Steps

1. ✅ Ganache testing complete
2. ⏳ Deploy to Sepolia testnet
3. ⏳ Verify on Etherscan
4. ⏳ Integrate the frontend
5. ⏳ Deploy to Vercel

---

**Last Updated**: Nov 15, 2025  
**Project Status**: ✅ Ganache tests passing
