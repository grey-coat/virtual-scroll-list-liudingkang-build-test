import { createApp } from 'vue';

import Coms from '../src';

import App from './src/demo1.vue';

const app = createApp(App);
console.log(Coms);
app.use(Coms);
app.mount('#app');
