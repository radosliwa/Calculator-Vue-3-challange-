import { createApp } from 'vue';
import '@/assets/styles/index.css';
import '@/assets/styles/main.scss';
import App from '@/App.vue';

const app = createApp(App);

app.config.errorHandler = (err, vm, info) => {
    console.error(`errHandler: ${err}`);
    console.error(`errHandler vm: ${vm}`);
    console.error(`errHandler info: ${info}`);
};

app.mount('#app');
