<template>
  <div :style="{ marginBottom: '12px', border: '1px #ddd dashed', padding: '12px' }">
    <p>Component in [ClasserProvider]</p>
    <button :class="['btn', c('title', 'motion', 'other')]">
      {{ outer ? 'Component outside provider' : 'Child in provider' }}
    </button>

    <leaf-child />
  </div>
</template>

<script setup lang="ts">
import LeafChild from './LeafChild.vue';
import { getClasserContext, useClasser } from 'code-hike-classer-vue3';
import { watch } from 'vue';

defineProps({
  outer: Boolean,
});

// inject() can only be used inside setup().
// so you can only use getClasserContext() inside setup().
// you can use eventbus, and change context in App.vue
const context = getClasserContext();

const c = useClasser('sp', { 'sp-other': 'custom-class' });

watch(() => context.classes, () => {
  console.log('Child: ctx change', context.classes);
});
</script>

<style>
p {
  font-size: 12px;
  color: #999;
}

.sp-title {
  word-spacing: 3px;
}

.sp-motion {
  color: #fff;
}

.btn {
  background-color: #a5a1a1;
  border: none;
  padding: 3px 10px;
}

.custom-class {
  font-style: italic;
  text-transform: capitalize;
}
</style>
