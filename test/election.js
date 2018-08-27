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

    it("throws an exception for invalid candiates", () => {
        return Election.deployed().then((instance) => {
          electionInstance = instance;
          return electionInstance.vote(99, { from: accounts[1] })
        }).then(assert.fail).catch((error) => {
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return electionInstance.candidates(1);
        }).then((candidate1) => {
          var voteCount = candidate1[2];
          assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
          return electionInstance.candidates(2);
        }).then((candidate2) => {
          var voteCount = candidate2[2];
          assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
        });
      });
    
      it("throws an exception for double voting", () => {
        return Election.deployed().then((instance) => {
          electionInstance = instance;
          candidateId = 2;
          electionInstance.vote(candidateId, { from: accounts[1] });
          return electionInstance.candidates(candidateId);
        }).then((candidate) => {
          var voteCount = candidate[2];
          assert.equal(voteCount, 1, "accepts first vote");
          // Try to vote again
          return electionInstance.vote(candidateId, { from: accounts[1] });
        }).then(assert.fail).catch((error) => {
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return electionInstance.candidates(1);
        }).then((candidate1) => {
          var voteCount = candidate1[2];
          assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
          return electionInstance.candidates(2);
        }).then((candidate2) => {
          var voteCount = candidate2[2];
          assert.equal(voteCount, 1, "candidate 2 did not receive any votes");
        });
      });
});