<template>
  <v-app>
    <div>
      <v-stepper v-model="e1">
        <template v-slot:default="{ prev, next }">
          <v-stepper-header>
            <v-stepper-item
              :complete="completedSteps >= 1"
              step="Step 1"
              value="1"
            ></v-stepper-item>
            <v-stepper-item
              :complete="completedSteps >= 2"
              step="Step 2"
              value="2"
            ></v-stepper-item>
          </v-stepper-header>

          <v-stepper-window>
            <v-stepper-window-item value="1">
              <v-card color="grey-lighten-1" height="200">1</v-card>
            </v-stepper-window-item>
            <v-stepper-window-item value="2">
              <v-card color="grey-lighten-1" height="200">2</v-card>
            </v-stepper-window-item>
          </v-stepper-window>

          <v-stepper-actions
            :disabled="disabled"
            @click:prev="prev"
            @click:next="next"
          ></v-stepper-actions>
        </template>
      </v-stepper>
    </div>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";

const e1 = ref(1);
const steps = ref(2);
const completedSteps = ref(0);

const disabled = computed(() => {
  return completedSteps === 0 || completedSteps === steps.value
    ? "prev"
    : completedSteps === steps.value
      ? "next"
      : undefined;
});
</script>
