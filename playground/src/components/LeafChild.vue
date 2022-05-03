<template>
  <div :style="{ margin: '12px 0', border: '1px #ddd dashed', padding: '22px' }">
    <p>Leaf Component in [Child Component]</p>
    <button :class="['btn leaf-btn', c('title', 'motion')]">
      Button in leaf child component
    </button>

    <p>change title property in child</p>
  </div>
</template>

<script setup lang="ts">
import { useClasser, getClasserContext } from 'code-hike-classer-vue3';
import { watch } from 'vue';

// inject() can only be used inside setup().
// so you can only use getClasserContext() inside setup().
const context = getClasserContext();

const c = useClasser('sp');

watch(() => context.classes, () => {
  console.log('Leaf child: ctx change', context.classes);
});
</script>

<style scoped>
.leaf-btn {}
</style>
