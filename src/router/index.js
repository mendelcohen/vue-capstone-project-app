import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UserShow from "../views/UserShow.vue";
import UserUpdate from "../views/UserUpdate.vue";
import GoalsIndex from "../views/GoalsIndex.vue";
import GoalsNew from "../views/GoalsNew.vue";
import GoalsShow from "../views/GoalsShow.vue";
import GoalsUpdate from "../views/GoalsUpdate.vue";
import StepsUpdate from "../views/StepsUpdate.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  { 
    path: "/login", 
    name: "login", 
    component: Login 
  },
  { 
    path: "/user-show", 
    name: "user-show", 
    component: UserShow 
  },
  { 
    path: "/user-update", 
    name: "user-update", 
    component: UserUpdate
  },
  { 
    path: "/goals-index", 
    name: "goals-index", 
    component: GoalsIndex
  },
  { 
    path: "/goals-new", 
    name: "goals-new", 
    component: GoalsNew
  },
  { 
    path: "/goals-show", 
    name: "goals-show", 
    component: GoalsShow
  },
  { 
    path: "/goals-update", 
    name: "goals-update", 
    component: GoalsUpdate
  },
  { 
    path: "/steps-update", 
    name: "steps-update", 
    component: StepsUpdate
  },
  { 
    path: "/logout", 
    name: "logout", 
    component: Logout 
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
