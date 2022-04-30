<script setup lang="ts">
import { css } from '@emotion/css';
import { ClasserProvider } from '@code-hike/classer-vue3';
import Child from './components/Child.vue';

const color = 'white';
const motion = css`
  background-color: hotpink;
  &:hover {
    color: ${color};
  }
`;
</script>

<template>
  <div>
    <ClasserProvider
      :classes="{
        'sp-title': 'title-1 title-2',
        'sp-motion': motion,
      }"
    >
      <Child />
    </ClasserProvider>

    <div>
      <Child :outer="true" />
    </div>
  </div>
</template>
