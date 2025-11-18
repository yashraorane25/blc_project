// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    struct Campaign {
        address creator;
        string title;
        string description;
        uint256 targetAmount;
        uint256 deadline;
        uint256 amountRaised;
        bool withdrawn;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public contributions;
    uint256 public campaignCount;

    event CampaignCreated(
        uint256 indexed campaignId,
        address indexed creator,
        string title,
        uint256 targetAmount,
        uint256 deadline
    );

    event ContributionMade(
        uint256 indexed campaignId,
        address indexed contributor,
        uint256 amount
    );

    event FundsWithdrawn(
        uint256 indexed campaignId,
        address indexed creator,
        uint256 amount
    );

    modifier onlyCreator(uint256 _campaignId) {
        require(
            msg.sender == campaigns[_campaignId].creator,
            "Only campaign creator can withdraw"
        );
        _;
    }

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _targetAmount,
        uint256 _durationDays
    ) public {
        require(_targetAmount > 0, "Target amount must be greater than 0");
        require(_durationDays > 0, "Duration must be greater than 0");

        uint256 campaignId = campaignCount;
        campaigns[campaignId] = Campaign({
            creator: msg.sender,
            title: _title,
            description: _description,
            targetAmount: _targetAmount,
            deadline: block.timestamp + (_durationDays * 1 days),
            amountRaised: 0,
            withdrawn: false
        });

        emit CampaignCreated(
            campaignId,
            msg.sender,
            _title,
            _targetAmount,
            campaigns[campaignId].deadline
        );

        campaignCount++;
    }

    function contribute(uint256 _campaignId) public payable {
        require(_campaignId < campaignCount, "Campaign does not exist");
        require(msg.value > 0, "Contribution must be greater than 0");
        require(
            block.timestamp < campaigns[_campaignId].deadline,
            "Campaign has ended"
        );

        campaigns[_campaignId].amountRaised += msg.value;
        contributions[_campaignId][msg.sender] += msg.value;

        emit ContributionMade(_campaignId, msg.sender, msg.value);
    }

    function withdrawFunds(uint256 _campaignId) public onlyCreator(_campaignId) {
        Campaign storage campaign = campaigns[_campaignId];
        require(!campaign.withdrawn, "Funds already withdrawn");
        require(
            campaign.amountRaised >= campaign.targetAmount,
            "Target amount not reached"
        );

        campaign.withdrawn = true;
        uint256 amount = campaign.amountRaised;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdrawal failed");

        emit FundsWithdrawn(_campaignId, msg.sender, amount);
    }

    function getCampaignDetails(uint256 _campaignId)
        public
        view
        returns (
            address creator,
            string memory title,
            string memory description,
            uint256 targetAmount,
            uint256 deadline,
            uint256 amountRaised,
            bool withdrawn
        )
    {
        require(_campaignId < campaignCount, "Campaign does not exist");
        Campaign storage campaign = campaigns[_campaignId];
        return (
            campaign.creator,
            campaign.title,
            campaign.description,
            campaign.targetAmount,
            campaign.deadline,
            campaign.amountRaised,
            campaign.withdrawn
        );
    }

    function getContributorAmount(uint256 _campaignId, address _contributor)
        public
        view
        returns (uint256)
    {
        require(_campaignId < campaignCount, "Campaign does not exist");
        return contributions[_campaignId][_contributor];
    }
}
