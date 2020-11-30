import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import MapsView from '../views/MapsView.vue';
import Chatbot from '../components/Chatbot.vue';
import Inform from '../views/Inform.vue';
import ProjectDetail from '../views/ProjectDetail.vue';
import Advice from '../views/Advice.vue';
import Credits from '../views/Credits.vue';
import Login from '../views/Login.vue';
import Oli from '../views/Oli.vue';
import MyProjects from '../views/MyProjects.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/maps', component: MapsView },
  { path: '/inform', component: Inform },
  { path: '/chatbot', component: Chatbot },
  { path: '/advices', component: Advice },
  { path: '/detail/:id', component: ProjectDetail },
  { path: '/credits', component: Credits },
  { path: '/login', component: Login },
  { path: '/oli', component: Oli },
  { path: '/Mis%20proyectos', component: MyProjects },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
