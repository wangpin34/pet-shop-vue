<script setup lang="ts">
import type { Adoptions } from "types/adoption";
import type { Pet } from "types/pet";
import { computed, onMounted, ref } from "vue";
import PetGrid from "./components/Pet.vue";
import { contract, web3 } from "./contract/adoption";
import { accountStore } from "./store/web3";
import useToastStore from "./store/toast";

const menu = ref(false);
const toastStore = useToastStore();

const _pets = ref<Pet[]>([]);
const adoptions = ref<Adoptions>([]);
const pets = computed(() => {
  return _pets.value.map((pet, index) => {
    const adopted =
      adoptions.value[index] !== "0x0000000000000000000000000000000000000000";
    if (adopted) {
      return {
        ...pet,
        adopted: true,
      };
    }
    return pet;
  });
});

const isSigning = ref(false);

const signIn = async () => {
  isSigning.value = true;
  try {
    const providersAccounts = await web3.eth.getAccounts();
    accountStore.value = providersAccounts[0];
    toastStore.add({
      type: "success",
      title: "Signed in",
    });
    return accountStore.value;
  } catch (err) {
    toastStore.add({
      type: "error",
      title: "Failed to sign in",
      description: "Please check your wallet and try again",
    });
  } finally {
    isSigning.value = false;
  }
};

async function loadAdoptions() {
  const resp = await contract.methods.getAdopters().call();
  adoptions.value = resp as string[];
}

async function handleAdopt(pet: Pet) {
  let account = accountStore.value;
  if (!account) {
    account = await signIn();
  }
  const petId = pet.id;
  contract.methods
    //@ts-ignore
    .adopt(petId)
    .send({ from: accountStore.value, gas: "1000000", gasPrice: "10000000000" })
    .then(() => {
      return loadAdoptions()
    })
    .catch(() => {
      
    });
}

const loadPets = async () => {
  try {
    const resp = await fetch("/pets.json");
    const pets = await resp.json();
    _pets.value = pets;
  } catch (err) {
    console.error(`failed to load pets`, err);
  }
};

onMounted(() => {
  signIn();
  loadAdoptions();
  loadPets();
});
</script>

<template>
  <v-layout>
    <v-app-bar color="primary" density="compact">
      <v-app-bar-title>Pet Shop</v-app-bar-title>
      <template v-slot:append>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          location="bottom"
        >
          <template v-slot:activator="{ props }">
            <v-avatar color="info" v-bind="props">
              <v-icon icon="mdi-account"></v-icon>
            </v-avatar>
          </template>

          <v-card max-width="100">
            <v-card-text
              class="text-ellipsis overflow-hidden"
              style="white-space: nowrap"
              >{{ accountStore.value }}</v-card-text
            >
          </v-card>
        </v-menu>
      </template>
    </v-app-bar>

    <div id="pets" class="flex gap-4 flex-wrap justify-start">
      <template v-for="pet in pets">
        <PetGrid :pet="pet" :onAdopt="handleAdopt" />
      </template>
    </div>
  </v-layout>

  <div v-if="isSigning" class="fixed top-0 left-0 w-screen h-screen">
    <div
      id="mask"
      class="absolute bg-slate-50 w-full h-full bg-slate-50/50"
    ></div>
    <div class="w-full h-full flex justify-center items-center">
      <v-progress-circular indeterminate color="green"></v-progress-circular>
    </div>
  </div>

  <div class="fixed top-0 left-0 w-screen h-screen pointer-events-none">
    <div class="w-full h-full flex justify-center items-center">
      <template v-for="toast in toastStore.items">
        <v-alert
          class="max-w-100"
          :type="toast.type"
          :title="toast.title"
          :text="toast.description"
        ></v-alert>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
