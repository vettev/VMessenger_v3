import Home from '../components/home/Home.vue';
import Register from './../components/auth/Register.vue';
import forNotLogged from './forNotLogged';
import forLogged from './forLogged';


const routes = [
    { path: '/',
        component: Home,
    },
    {
        path: '/register',
        component: Register,
        beforeEnter: forNotLogged
    }
];

export default routes;