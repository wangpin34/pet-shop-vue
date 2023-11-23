<script setup lang="ts">
import { onMounted } from 'vue';
import { Web3 } from "web3";
import HelloWorld from './components/HelloWorld.vue';


// async function withTruffle() {
//   const provider = new Web3.providers.HttpProvider("http://localhost:7545");
//   // set a provider in the sepolia testnet using node rpc url
//   const adoptionArtifact = await fetch('/Adoption.json').then(resp => resp.json())
//   console.log(adoptionArtifact)
//   const contract = Contract(adoptionArtifact)
//   contract.setProvider(provider)
//   const instance = await contract.deployed()
//   const adopters = await instance.getAdopters()
//   console.log(adopters)
// }

async function withWeb3() {
  // set a provider in the sepolia testnet using node rpc url
  const adoptionArtifact = await fetch('/Adoption.json').then(resp => resp.json())
  console.log(adoptionArtifact)
  const web3 = new Web3("http://localhost:7545")
  const abi = adoptionArtifact.abi
  const addressOfContract = ""
  const contract = new web3.eth.Contract(abi, addressOfContract)
  // using contract.methods to get value
  contract.methods
    .getAdopters()
    .call()
    .then(console.log);

  const providersAccounts = await web3.eth.getAccounts()
  const defaultAccount = providersAccounts[0]
  console.log(`defaultAccount: ${defaultAccount}`)
  // contract.methods
  //   .adopt(0)
  //   .send({ from: defaultAccount, gas: 1000000,
  //     gasPrice: 10000000000, })
  //   .then(console.log)
}

onMounted(() => {
  // withTruffle()
  withWeb3()
  console.log(`the component is now mounted.`)
})

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
