import { createApp } from 'vue';
import App from './App.vue';

export default (el: Element) => {
  createApp(App).mount(el);
};
