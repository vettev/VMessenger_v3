import Home from '../components/home/Home.vue';
import Register from './../components/auth/Register.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register }
];

export default routes;