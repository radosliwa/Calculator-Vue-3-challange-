import { createApp } from 'vue';
import '@/index.css';
import '@/assets/styles/main.scss';
import App from '@/App.vue';

const app = createApp(App);
app.config.errorHandler = (err, vm, info) => {
    console.log(`errHandler: ${err}`);
    console.log(`errHandler vm: ${vm}`);
    console.log(`errHandler info: ${info}`);
};
app.mount('#app');
