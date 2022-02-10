<template>
  <div class="text-left">
    <p v-if="props.label" class="pl-2 pb-1 text-sm text-bluish-200 font-semibold uppercase">
      {{ props.label }}
    </p>
    <div class="flex justify-between items-center bg-bluish-800 rounded-md py-3 text-sm px-4">
      <p>{{ props.min }}</p>

      <input
        class="w-full mx-4"
        :value="props.modelValue"
        :min="props.min"
        :step="1"
        :max="props.max"
        type="range"
        @input="updateValue(($event.target as any).valueAsNumber)"
      >
      <p>{{ props.max }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: number
  min: number
  max: number
  label?: string
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()
const updateValue = (value: number) => emits('update:modelValue', value)
</script>

<style>
input[type="range"] {
    -webkit-appearance: none; /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 1px; /* Specified height */
    outline: none; /* Remove outline */

}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    background: #DEE6FF;
    cursor: pointer;
    border-radius: 9999px;
    border: 0px;
}
input[type="range"]::-moz-range-progress {
  background-color: #157AF5;
   height: 1px
}
input[type="range"]::-moz-range-track {
  background-color: #14244C;
   height: 1px
}
/* IE*/
input[type="range"]::-ms-fill-lower {
  background-color: #157AF5;
   height: 1px
}
input[type="range"]::-ms-fill-upper {
  background-color: #14244C;
   height: 1px
}

input[type="range"]::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background: #DEE6FF;
    cursor: pointer;
    border-radius: 9999px;
    border: 0px;
}
</style>
