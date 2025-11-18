const Crowdfunding = artifacts.require("Crowdfunding");

contract("Crowdfunding", (accounts) => {
  let crowdfunding;
  const creator = accounts[0];
  const contributor1 = accounts[1];
  const contributor2 = accounts[2];

  beforeEach(async () => {
    crowdfunding = await Crowdfunding.new();
  });

  describe("createCampaign", () => {
    it("creates a campaign successfully", async () => {
      const title = "Web3 Learning Fund";
      const description = "Help students learn Web3";
      const targetAmount = web3.utils.toWei("5", "ether");
      const durationDays = 30;

      const tx = await crowdfunding.createCampaign(
        title,
        description,
        targetAmount,
        durationDays,
        { from: creator }
      );

      // Verify event
      const event = tx.logs[0];
      assert.equal(event.event, "CampaignCreated", "Should emit CampaignCreated");
      assert.equal(event.args.campaignId, 0, "Campaign ID should be 0");
      assert.equal(event.args.creator, creator, "Creator should match");
      assert.equal(event.args.title, title, "Title should match");

      // Verify campaign count
      const count = await crowdfunding.campaignCount();
      assert.equal(count, 1, "Campaign count should be 1");
    });

    it("rejects target amount of 0", async () => {
      try {
        await crowdfunding.createCampaign(
          "Test",
          "Test",
          0,
          30,
          { from: creator }
        );
        assert.fail("Should have thrown");
      } catch (error) {
        assert.include(
          error.message,
          "Target amount must be greater than 0",
          "Should show the correct error"
        );
      }
    });

    it("rejects duration of 0", async () => {
      try {
        await crowdfunding.createCampaign(
          "Test",
          "Test",
          web3.utils.toWei("5", "ether"),
          0,
          { from: creator }
        );
        assert.fail("Should have thrown");
      } catch (error) {
        assert.include(
          error.message,
          "Duration must be greater than 0",
          "Should show the correct error"
        );
      }
    });
  });

  describe("contribute", () => {
    beforeEach(async () => {
      await crowdfunding.createCampaign(
        "Web3 Learning Fund",
        "Help students learn Web3",
        web3.utils.toWei("5", "ether"),
        30,
        { from: creator }
      );
    });

    it("contributes successfully", async () => {
      const contributionAmount = web3.utils.toWei("2", "ether");

      const tx = await crowdfunding.contribute(0, {
        from: contributor1,
        value: contributionAmount
      });

      // Verify event
      const event = tx.logs[0];
      assert.equal(event.event, "ContributionMade", "Should emit ContributionMade");
      assert.equal(event.args.campaignId, 0, "Campaign ID should be 0");
      assert.equal(event.args.contributor, contributor1, "Contributor should match");
      assert.equal(
        event.args.amount.toString(),
        contributionAmount,
        "Amount should match"
      );

      // Verify contribution amount
      const amount = await crowdfunding.getContributorAmount(0, contributor1);
      assert.equal(
        amount.toString(),
        contributionAmount,
        "Contribution should be recorded"
      );
    });

    it("rejects contribution of 0", async () => {
      try {
        await crowdfunding.contribute(0, {
          from: contributor1,
          value: 0
        });
        assert.fail("Should have thrown");
      } catch (error) {
        assert.include(
          error.message,
          "Contribution must be greater than 0",
          "Should show the correct error"
        );
      }
    });

    it("rejects contributions to nonexistent campaigns", async () => {
      try {
        await crowdfunding.contribute(999, {
          from: contributor1,
          value: web3.utils.toWei("1", "ether")
        });
        assert.fail("Should have thrown");
      } catch (error) {
        assert.include(
          error.message,
          "Campaign does not exist",
          "Should show the correct error"
        );
      }
    });
  });

  describe("withdrawFunds", () => {
    beforeEach(async () => {
      await crowdfunding.createCampaign(
        "Web3 Learning Fund",
        "Help students learn Web3",
        web3.utils.toWei("5", "ether"),
        30,
        { from: creator }
      );
    });

    it("withdraws after reaching the goal", async () => {
      // Contribute enough funds
      await crowdfunding.contribute(0, {
        from: contributor1,
        value: web3.utils.toWei("3", "ether")
      });

      await crowdfunding.contribute(0, {
        from: contributor2,
        value: web3.utils.toWei("2.5", "ether")
      });

      // Creator withdraws funds
      const tx = await crowdfunding.withdrawFunds(0, { from: creator });

      // Verify event
      const event = tx.logs[0];
      assert.equal(event.event, "FundsWithdrawn", "Should emit FundsWithdrawn");
      assert.equal(event.args.campaignId, 0, "Campaign ID should be 0");
      assert.equal(event.args.creator, creator, "Creator should match");
    });

    it("rejects withdrawals by non-creators", async () => {
      await crowdfunding.contribute(0, {
        from: contributor1,
        value: web3.utils.toWei("5", "ether")
      });

      try {
        await crowdfunding.withdrawFunds(0, { from: contributor1 });
        assert.fail("Should have thrown");
      } catch (error) {
        assert.include(
          error.message,
          "Only campaign creator can withdraw",
          "Should show the correct error"
        );
      }
    });

    it("rejects withdrawal before the goal is reached", async () => {
      await crowdfunding.contribute(0, {
        from: contributor1,
        value: web3.utils.toWei("2", "ether")
      });

      try {
        await crowdfunding.withdrawFunds(0, { from: creator });
        assert.fail("Should have thrown");
      } catch (error) {
        assert.include(
          error.message,
          "Target amount not reached",
          "Should show the correct error"
        );
      }
    });

    it("rejects duplicate withdrawals", async () => {
      await crowdfunding.contribute(0, {
        from: contributor1,
        value: web3.utils.toWei("5", "ether")
      });

      // First withdrawal
      await crowdfunding.withdrawFunds(0, { from: creator });

      // Second withdrawal should fail
      try {
        await crowdfunding.withdrawFunds(0, { from: creator });
        assert.fail("Should have thrown");
      } catch (error) {
        assert.include(
          error.message,
          "Funds already withdrawn",
          "Should show the correct error"
        );
      }
    });
  });

  describe("getCampaignDetails", () => {
    beforeEach(async () => {
      await crowdfunding.createCampaign(
        "Web3 Learning Fund",
        "Help students learn Web3",
        web3.utils.toWei("5", "ether"),
        30,
        { from: creator }
      );
    });

    it("returns correct campaign details", async () => {
      const details = await crowdfunding.getCampaignDetails(0);

      assert.equal(details.creator, creator, "Creator should match");
      assert.equal(details.title, "Web3 Learning Fund", "Title should match");
      assert.equal(details.description, "Help students learn Web3", "Description should match");
      assert.equal(
        details.targetAmount.toString(),
        web3.utils.toWei("5", "ether"),
        "Target should match"
      );
      assert.equal(details.amountRaised.toString(), "0", "Initial raised amount should be 0");
      assert.equal(details.withdrawn, false, "Initial withdrawn flag should be false");
    });

    it("rejects requests for nonexistent campaigns", async () => {
      try {
        await crowdfunding.getCampaignDetails(999);
        assert.fail("Should have thrown");
      } catch (error) {
        assert.include(
          error.message,
          "Campaign does not exist",
          "Should show the correct error"
        );
      }
    });
  });
});
