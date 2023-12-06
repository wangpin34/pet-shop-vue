import { Contract, ContractAbi, Web3 } from 'web3'
import artifact from '../Adoption'
const web3 = new Web3(import.meta.env.VITE_PROVIDER_URL)

const contract = new Contract(
  artifact.abi as ContractAbi,
  import.meta.env.VITE_CONTRACT_ADDR,
  web3
)

export { contract, web3 }
