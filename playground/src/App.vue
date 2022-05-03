<script setup lang="ts">
import { ref } from 'vue';
import { css } from '@emotion/css';
import { ClasserProvider } from 'code-hike-classer-vue3';
import Child from './components/Child.vue';

const opacity = '.6';

// You can also use reactive api，but only properties are reactive
const classes = ref({
  'sp-title': 'title-1 title-2',
  'sp-motion': css`
    background-color: hotpink;
    &:hover {
      opacity: ${opacity};
    }
  `,
});

const classes2 = {
  'sp-title': 'title-3 title-4',
  'sp-motion': css`
    background-color: darkcyan;
    &:hover {
      opacity: ${opacity};
    }
  `,
};

const changeMotionProperty = () => {
  classes.value['sp-motion'] = css`
    background-color: blue;
    &:hover {
      opacity: ${opacity};
    }
  `;
};

const changeTitleProperty = () => {
  classes.value['sp-title'] = 'title-3 title-4';
};

const changeProvideState = () => {
  classes.value = {
    'sp-title': 'title-5 title-6',
    'sp-motion': css`
      background-color: orange;
      &:hover {
        opacity: ${opacity};
      }
    `,
  };
};

const changeTitleValue = () => {
  classes2['sp-title'] = 'title-3 title-4';
};

</script>

<template>
  <div>
    <div class="provider">
      <h3>provider 1 (reactive):</h3>

      <button @click="changeMotionProperty">change motion property</button>
      <button @click="changeTitleProperty">change title property</button>
      <button @click="changeProvideState">change provide state</button>

      <br>
      <br>

      <classer-provider :classes="classes">
        <child />
      </classer-provider>

      <pre><code>{{ classes }}</code></pre>
    </div>

    <hr>

    <div class="provider">
      <h3>provider 2 (not reactive, context can only use once):</h3>
      <classer-provider
        :classes="classes2"
      >
        <child />
      </classer-provider>

      <button @click="changeTitleValue">change title property</button>
      <span :style="{ color: 'orange', fontSize: '14px' }">(You can see that it doesn't work)</span>

      <pre><code>{{ classes2 }}</code></pre>
    </div>

    <hr>

    <div class="provider">
      <h3>Component outside provider (can not use the context):</h3>

      <child :outer="true" />
    </div>
  </div>
</template>

<style>
.provider {
  border: 1px #ddd dashed;
  padding: 2px 20px;
  margin: 8px 0;
}

.provider pre {
  background-color: #f9f9f9;
  padding: 8px;
  color: #666;
  border: 1px #ddd dotted;
  border-radius: 3px;
}

.provider > button {
  margin-right: 6px;
  cursor: pointer;
}

.title-1, .title-2 {
  font-size: 12px;
}
.title-3, .title-4 {
  font-size: 14px;
}
.title-5, .title-6 {
  font-size: 16px;
}

hr {
  margin: 32px 0;
  border-color: #eee;
  border-style: solid;
}
</style>
