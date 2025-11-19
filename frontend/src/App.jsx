import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
//import ABI from "./abi.json";
import ABI from "./CrowdfundingABI.json";
import "./App.css";

//const CONTRACT_ADDRESS = "0x6a9A28F351D884e57Bc55AdBF947b1a34f15c164"; // Ganache deployment address

const CONTRACT_ADDRESS = "0x1FEe47b7BDE8b7a70c94842511DF1c86eAdF340C"; // Hardhat deployment address
//const GANACHE_CHAIN_ID = "0xaa36a7"; // Ganache chain ID (1337 in decimal)
const SEPOLIA_CHAIN_ID = "0xaa36a7"; // Sepolia chain ID (11155111)

export default function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [network, setNetwork] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [campaigns, setCampaigns] = useState([]);

  // Connect wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setMessage("❌ Please install MetaMask");
        return;
      }

      console.log("🔍 Connecting wallet...");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("✅ Accounts fetched:", accounts);

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      console.log(
        "🔗 Current Chain ID:",
        chainId,
        "Expected Chain ID:",
        GANACHE_CHAIN_ID
      );

      if (chainId !== GANACHE_CHAIN_ID) {
        console.error(
          "❌ Network mismatch! Current:",
          chainId,
          "Expected:",
          GANACHE_CHAIN_ID
        );
        //setMessage("⚠️ Please switch to the Ganache network (Chain ID: 1337)");
        setMessage(
          "⚠️ Please switch to the Sepolia Testnet (Chain ID: 11155111)"
        );

        return;
      }

      const newProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await newProvider.getSigner();
      const network = await newProvider.getNetwork();
      console.log("📡 Network info:", network);

      setAccount(accounts[0]);
      setProvider(newProvider);
      // Show a friendly name for local networks like Ganache
      const networkName =
        network.name === "unknown" ? "Ganache (Local)" : network.name;
      setNetwork(networkName);

      if (CONTRACT_ADDRESS) {
        const newContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        console.log("📝 Contract loaded:", CONTRACT_ADDRESS);
        setContract(newContract);
      }

      console.log("✅ Connected! Account:", accounts[0]);
      setMessage(
        `✅ Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`
      );
    } catch (error) {
      console.error("❌ Connection failed:", error);
      setMessage(`❌ Connection failed: ${error.message}`);
    }
  };

  // Create a crowdfunding campaign
  const createCampaign = async (e) => {
    e.preventDefault();
    if (!contract) {
      setMessage("❌ Please connect your wallet first");
      return;
    }

    try {
      setLoading(true);
      const title = e.target.title.value;
      const description = e.target.description.value;
      const targetAmount = ethers.parseEther(e.target.targetAmount.value);
      const durationDays = parseInt(e.target.durationDays.value);

      const tx = await contract.createCampaign(
        title,
        description,
        targetAmount,
        durationDays
      );

      setMessage("⏳ Transaction pending...");
      const receipt = await tx.wait();
      setMessage(`✅ Campaign created! Tx hash: ${receipt.hash}`);
      e.target.reset();
      loadCampaigns();
    } catch (error) {
      setMessage(`❌ Creation failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Contribute funds
  const contribute = async (campaignId, amount) => {
    if (!contract) {
      setMessage("❌ Please connect your wallet first");
      return;
    }

    try {
      setLoading(true);
      console.log("💰 Contributing...");
      console.log("Campaign ID:", campaignId, "Amount:", amount, "ETH");

      const valueInWei = ethers.parseEther(amount);
      console.log("Value in Wei:", valueInWei.toString());

      const tx = await contract.contribute(campaignId, {
        value: valueInWei,
      });
      console.log("📤 Transaction sent:", tx.hash);

      setMessage("⏳ Transaction pending...");
      const receipt = await tx.wait();
      console.log("✅ Transaction confirmed:", receipt);
      setMessage(`✅ Contribution successful! Tx hash: ${receipt.hash}`);
      loadCampaigns();
    } catch (error) {
      console.error("❌ Contribution failed details:", error);
      setMessage(`❌ Contribution failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Withdraw funds
  const withdrawFunds = async (campaignId) => {
    if (!contract) {
      setMessage("❌ Please connect your wallet first");
      return;
    }

    try {
      setLoading(true);
      const tx = await contract.withdrawFunds(campaignId);

      setMessage("⏳ Transaction pending...");
      const receipt = await tx.wait();
      setMessage(`✅ Withdrawal successful! Tx hash: ${receipt.hash}`);
      loadCampaigns();
    } catch (error) {
      setMessage(`❌ Withdrawal failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Load crowdfunding campaigns
  const loadCampaigns = async () => {
    if (!contract) {
      console.log("⚠️ Contract not loaded");
      return;
    }

    try {
      console.log("📂 Loading campaigns...");
      const count = await contract.campaignCount();
      console.log("📊 Campaign count:", count.toString());
      const campaignList = [];

      for (let i = 0; i < count; i++) {
        console.log(`📋 Loading campaign ${i}...`);
        const details = await contract.getCampaignDetails(i);
        console.log(`✅ Campaign ${i} details:`, details);

        // Build typed object from returned array
        campaignList.push({
          id: i,
          creator: details[0],
          title: details[1],
          description: details[2],
          targetAmount: details[3],
          deadline: details[4],
          amountRaised: details[5],
          withdrawn: details[6],
        });
      }

      console.log("✅ All campaigns loaded:", campaignList);
      setCampaigns(campaignList);
    } catch (error) {
      console.error("❌ Failed to load campaigns:", error);
    }
  };

  useEffect(() => {
    if (contract) {
      loadCampaigns();
    }
  }, [contract]);

  return (
    <div className="container">
      <header className="header">
        <h1>🚀 Crowdfunding dApp</h1>
        <button
          onClick={connectWallet}
          className={`btn-connect ${account ? "connected" : ""}`}
        >
          {account
            ? `${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect MetaMask"}
        </button>
      </header>

      {network && (
        <div className="network-info">
          📡 Network: <strong>{network}</strong>
        </div>
      )}

      {message && <div className="message">{message}</div>}

      {account && (
        <div className="content">
          <section className="create-campaign">
            <h2>Create Campaign</h2>
            <form onSubmit={createCampaign}>
              <input
                type="text"
                name="title"
                placeholder="Campaign title"
                required
              />
              <textarea
                name="description"
                placeholder="Campaign description"
                required
              ></textarea>
              <input
                type="number"
                name="targetAmount"
                placeholder="Target amount (ETH)"
                step="0.01"
                required
              />
              <input
                type="number"
                name="durationDays"
                placeholder="Duration (days)"
                min="1"
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Create campaign"}
              </button>
            </form>
          </section>

          <section className="campaigns">
            <h2>Active Campaigns</h2>
            {campaigns.length === 0 ? (
              <p>No campaigns yet</p>
            ) : (
              <div className="campaign-list">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="campaign-card">
                    <h3>{campaign.title}</h3>
                    <p>{campaign.description}</p>
                    <div className="campaign-details">
                      <p>
                        <strong>Creator:</strong> {campaign.creator.slice(0, 6)}
                        ...
                        {campaign.creator.slice(-4)}
                      </p>
                      <p>
                        <strong>Target:</strong>{" "}
                        {ethers.formatEther(campaign.targetAmount)} ETH
                      </p>
                      <p>
                        <strong>Raised:</strong>{" "}
                        {ethers.formatEther(campaign.amountRaised)} ETH
                      </p>
                      <p>
                        <strong>Progress:</strong>{" "}
                        {(
                          (Number(campaign.amountRaised) /
                            Number(campaign.targetAmount)) *
                          100
                        ).toFixed(1)}
                        %
                      </p>
                      <p>
                        <strong>Deadline:</strong>{" "}
                        {new Date(
                          Number(campaign.deadline) * 1000
                        ).toLocaleString()}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        {campaign.withdrawn ? "✅ Withdrawn" : "⏳ In progress"}
                      </p>
                    </div>
                    <div className="campaign-actions">
                      <input
                        type="number"
                        id={`contribute-${campaign.id}`}
                        placeholder="Contribution amount (ETH)"
                        step="0.01"
                        min="0.01"
                      />
                      <button
                        onClick={() => {
                          const amount = document.getElementById(
                            `contribute-${campaign.id}`
                          ).value;
                          if (amount) contribute(campaign.id, amount);
                        }}
                        disabled={loading || campaign.withdrawn}
                      >
                        Contribute
                      </button>
                      {campaign.creator === account && !campaign.withdrawn && (
                        <button
                          onClick={() => withdrawFunds(campaign.id)}
                          disabled={loading}
                          className="btn-withdraw"
                        >
                          Withdraw
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
