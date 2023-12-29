<script setup lang="ts">
import { ref, computed } from "vue";
import type { Pet } from "types/pet";
import useToastStore from "../store/toast";
const toastStore = useToastStore();

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const props = defineProps<{
  pet: Pet;
  onAdopt: (pet: Pet) => Promise<void>;
}>();
const pet = computed(() => props.pet);
const showDetails = ref(false);
const isAdopting = ref(false);
const handleAdopt = async (onSuccess: () => void) => {
  isAdopting.value = true;
  try {
    await props.onAdopt(props.pet);
    await sleep(1500)
    onSuccess()
    toastStore.add({
      type: "success",
      title: "Adopted",
      description: `You have adopted ${pet.value.name}`,
      delay: 5000
    });
  } catch(err){
    toastStore.add({
      type: "error",
      title: "Failed to adopt",
      description: (err as Error).message ?? 'Please try again later',
      delay: 3000
    });
  } finally {
    isAdopting.value = false;
  }
};


</script>
<template>
  <v-card class="mx-auto" max-width="200" min-height="300">
    <v-img :src="pet.picture" width="200" cover></v-img>
    <v-card-title>
      {{ pet.name }}
    </v-card-title>

    <v-card-subtitle>
      {{ pet.breed }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn
        :icon="showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="showDetails = !showDetails"
      ></v-btn>

      <v-dialog transition="dialog-bottom-transition" width="auto">
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            variant="outlined"
            :disabled="pet.adopted"
            v-bind="props"
            >Adopt</v-btn
          >
        </template>
        <template v-slot:default="{ isActive }">
          <v-card width="300">
            <v-img :src="pet.picture" width="300" cover></v-img>
            <v-card-text class="text-base">
              <div>Are you going to adopt {{ pet.name }}?</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn variant="text" @click="isActive.value = false" :disabled="isAdopting"
                >Close</v-btn
              >
              <v-btn variant="outlined" color="primary" @click="handleAdopt(() => isActive.value = false)" :loading="isAdopting"
                >OK</v-btn
              >
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showDetails">
        <v-divider></v-divider>

        <v-card-text>
          {{ pet.name }} is a {{ pet.age }} year(s) old {{ pet.breed }} from
          {{ pet.location }}.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
