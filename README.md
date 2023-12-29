# Pet Shop

The sample project https://trufflesuite.com/guides/pet-shop/ makes a great job, however, there are still several points could be improved. e.g. small app.js, typescript, etc.

I rewrite the sample for me and others who like to try the development of dapp. This app shows out the following features:

1. connect to blockchain
2. maintain a smart contract
3. interact with smart contract

Note: Please follow the guides of https://trufflesuite.com/guides/pet-shop/ to setup Ganache and MetaMask firstly before you running this project.

Note: It assumes you have the basic knowledge of web app development, and have NodeJS/PNPM/Makefile(optional) installed.

## Getting Started

```bash
pnpm i # install depends packages
pnpm dev # start the dev server
```

Please make sure the `contract address` and the provider are configured property in `.env` file like below:

```ini
VITE_PROVIDER_URL=http://127.0.0.1:7545
VITE_CONTRACT_ADDR=0xaa54911eab841B73c6580631a0bD38FAD79e9b14
```

ps: replace the url and address with yours.

## Commands

`deploy`(`migrate` actually, but for me, a web app developer, `deploy` make more sense to understand) contracts.

```bash
make deploy_contracts
```

After `deploy` contracts, you can get the `contract address` from `src/contract-address.json`.

```
  "networks": {
    "5777": {
      "events": {},
      "links": {},
      "address": "0xaa54911eab841B73c6580631a0bD38FAD79e9b14",
      "transactionHash": "0x665ffe12a03fc8c9318158f25eb81ff7412fec6af8377b5af9c2e14d1aed54a4"
    }
  },
```

And the console output.

```
 Deploying 'Adoption'
   --------------------
   > transaction hash:    0x665ffe12a03fc8c9318158f25eb81ff7412fec6af8377b5af9c2e14d1aed54a4
- Blocks: 0            Seconds: 0
   > Blocks: 0            Seconds: 0
   > contract address:    0xaa54911eab841B73c6580631a0bD38FAD79e9b14
```

Generate `Type`. Read more on [Infer Contract Types from JSON Artifact](https://docs.web3js.org/guides/smart_contracts/infer_contract_types_guide/).

```bash
make gen-contract-types
```

The generated types

## LICENSE

MIT
