let Election = artifacts.require('./Election.sol');

contract("Election", (accounts) => {
    
    let electionInstance;

    it("initializes with two candidates", () => {
        return Election.deployed()
        .then((instance) => {
            return instance.candidatesCount()
        })
        .then((count) => {
            assert.equal(count, 2);
        });
    });

    it("initializes candidates with correct values", () => {
        return Election.deployed().then((instance) => {
            electionInstance = instance;
            return electionInstance.candidates(1);
        })
        .then((candidate) => {
            assert.equal(candidate[0], 1, "contains correct ID");
            assert.equal(candidate[1], "Candidate-1", "contains name");
            assert.equal(candidate[2], 0, "contains correct vote count");
            return electionInstance.candidates(2);
        })
        .then((candidate) => {
            assert.equal(candidate[0], 2, "contains correct ID");
            assert.equal(candidate[1], "Candidate-2", "contains name");
            assert.equal(candidate[2], 0, "contains correct vote count");
        });
    });

    it("Allows a user to cast a vote", () => {
        return Election.deployed().then(instance => {
            electionInstance = instance;
            candidateId = 1;
            return electionInstance.vote(candidateId, { from: accounts[0] });
        })
        .then((receipt) =>{
            return electionInstance.voters(accounts[0]);
        })
        .then((voted) => {
            assert("The candidate was marked as voted.");
            return electionInstance.candidates(candidateId)
        })
        .then((candidate) => {
            let voteCount = candidate[2];
            assert.equal(voteCount, 1, "Incremented the vote count by one as intended.");
        });
    });
});