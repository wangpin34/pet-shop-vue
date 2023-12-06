<script setup lang="ts">
import type { Pet } from 'types/pet';

const { pet } =  defineProps<{
  pet: Pet,
  onAdopt: (pet: Pet) => void
}>()
</script>
<template>
  <div>
    <h1>{{ pet.name }}</h1>
    <div>
      <img :src="pet.picture" alt={{pet.name}} />
      <div>
        <strong>Breed</strong><span>{{pet.breed}}</span>
        <strong>Age</strong><span>{{ pet.age }}</span>
        <strong>Location</strong><span>{{ pet.location }}</span>
      </div>
      <button :disabled="pet.adopted" @click="onAdopt(pet)">Adopt</button>
    </div>
  </div>
</template>