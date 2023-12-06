# Pet Shop

The sample project https://trufflesuite.com/guides/pet-shop/ makes a great job, however, there are still a couple of points could be improved. e.g. small app.js, typescript, etc.

I rewrite the sample for me and others who like to try the development of dapp. This app shows out the following features:

1. connect to blockchain
2. maintain a smart contract
3. intreacte with smart contract

Note: Please follow the guides of https://trufflesuite.com/guides/pet-shop/ to setup Ganache and MetaMask firstly before you running this project.

Note: It assumes you have the basic knowledge of web app development, and have NodeJS/PNPM/Makefile(optional) installed.

## Getting Started

```bash
pnpm i # install depends packages
pnpm dev # start the dev server
```

## Commands

`deploy`(`migrate` actually, but for me, a web app developer, `deploy` make more sense to understand) contracts.

```bash
make deploy_contracts
```

Generate `Type`. Read more on [Infer Contract Types from JSON Artifact](https://docs.web3js.org/guides/smart_contracts/infer_contract_types_guide/).

```bash
make gen-contract-types
```

The generated types

## LICENSE

MIT
