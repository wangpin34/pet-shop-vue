<script setup lang="ts">
import type { Adoptions } from 'types/adoption';
import type { Pet } from 'types/pet';
import { computed, onMounted, ref } from 'vue';
import PetGrid from './components/Pet.vue';
import { contract, web3 } from './contract/adoption';
import { accountStore } from './store/web3';

const _pets = ref<Pet[]>([])
const adoptions = ref<Adoptions>([])
const pets = computed(() => {
  return _pets.value.map((pet, index) => {
    const adopted = adoptions.value[index] !== '0x0000000000000000000000000000000000000000'
    if (adopted) {
      return {
        ...pet,
        adopted: true
      }
    }
    return pet
  })
})

let account: string

const signIn = async () => {
  const providersAccounts = await web3.eth.getAccounts()
  accountStore.value = providersAccounts[0]
}

async function loadAdoptions() {
  const resp = await contract.methods.getAdopters().call()
  adoptions.value = resp as string[]
}

async function handleAdopt(pet: Pet) {
  console.log(`try to adopt`, pet)
  const petId = pet.id
  contract.methods
  .adopt(petId)
  .send({ from: account, gas: '1000000', gasPrice: '10000000000' })
  .then(loadAdoptions)
  .catch(err => {
    console.error(err)
  })
}

const loadPets = async () => {
  try {
    const resp = await fetch('/pets.json')
    const pets = await resp.json()
    _pets.value = pets
  } catch(err) {
    console.error(err)
  }
}  

onMounted(() => {
  signIn()
  loadAdoptions()
  loadPets()
})

</script>

<template>
  <div>
    <div id="pets">
      <template v-for="pet in pets">
        <PetGrid :pet="pet" :onAdopt="handleAdopt" />
      </template>
    </div>
  </div>
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
