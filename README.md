[![PRs Welcome](https://img.shields.io/badge/PRs%20-welcome-brightgreen.svg)](https://github.com/jamesgeorge007/Election-DApp/pulls)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badges/)

<h1 align="center">Vote-App</h1>

This is a D-App (De-centralised application) on top of Ethereum Blockchain(EVM - Ethereum Virtual Machine) which eases the task of conducting elections :smile:

## What is a D-APP?

A dapp is a service that enables direct interaction between end users and providers (e.g. connecting buyers and sellers in some marketplace, owners and storers in file storage). Ethereum dapps typically interface users via an HTML/Javascript web application using a Javascript API to communicate with the blockchain.

## What is a smart contract?

A smart contract is a computer protocol intended to digitally facilitate, verify, or enforce the negotiation or performance of a contract. Smart contracts allow the performance of credible transactions without third parties. These transactions are trackable and irreversible.

## Solidity

Solidity is a contract-oriented programming language for writing smart contracts. It is used for implementing smart contracts on various blockchain platforms.


## Instructions

* Clone the repository.
* Navigate to the project directory, install the dependencies.
* Install Ganache (which acts as the local blockchain) and truffle framework.
* You can find migrations file within the migrations directory where smart contracts are written.
* Run ```truffle migrate reset``` each time you have made change.
* Remember reads from the blockchain are free while writes cost gas.
* Run ```npm run dev``` to launch the app.
> Make sure Ganache is running.

## License

> GNU General Public License v3.0

## Installation Guide

### Step 1. Dependencies

Install these prerequisites to follow along with the tutorial. See free video tutorial or a full explanation of each prerequisite.
- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle
- Ganache: http://truffleframework.com/ganache/
- Metamask: https://metamask.io/

### Step 2. Install dependencies

`$ cd election`
`$ npm install`

### Step 3. Start Ganache

Open the Ganache GUI client that you downloaded and installed. This will start your local blockchain instance.

### Step 4. Compile & Deploy Election Smart Contract

`$ truffle migrate --reset`
You must migrate the election smart contract each time your restart ganache.

### Step 5. Configure Metamask
- Unlock Metamask
- Connect metamask to your local Etherum blockchain provided by Ganache.
- Import an account provided by ganache.

### Step 6. Run the Front End Application
`$ npm run dev`
