> A little package to make React component libraries interoperable with most styling solutions.


## install

```bash
npm i

# with usage demo
npm run play
```

## classer + emotion usage

- Provider

```html
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
  <ClasserProvider
    :classes="{
      'sp-title': 'title-1 title-2',
      'sp-motion': motion,
    }"
  >
    <Child />
  </ClasserProvider>
</template>
```

- Child

```html
<template>
  <button :class="[c('title', 'motion', 'other')]">i am child</button>
</template>

<script setup lang="ts">
import { useClasser } from '@code-hike/classer-vue3';

const c = useClasser('sp', { 'sp-other': 'custom-class' });
</script>

```

- result

```html
<div class="sp-title sp-motion sp-other title-1 title-2 css-64o2cv custom-class">i am child</div>
```

```css-64o2cv``` is motion style

## sipport browsers

npx browserslist
