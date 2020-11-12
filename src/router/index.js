import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersShow from "../views/UsersShow.vue";
import UsersEdit from "../views/UsersEdit.vue";
import GoalsIndex from "../views/GoalsIndex.vue";
import GoalsNew from "../views/GoalsNew.vue";
import GoalsShow from "../views/GoalsShow.vue";
import GoalsEdit from "../views/GoalsEdit.vue";
import StepsEdit from "../views/StepsEdit.vue";

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
    name: 'signup',
    component: Signup
  },
  { 
    path: "/login", 
    name: "login", 
    component: Login 
  },
  { 
    path: "/users/:id", 
    name: "users-show", 
    component: UsersShow 
  },
  { 
    path: "/users/:id/edit", 
    name: "users-edit", 
    component: UsersEdit
  },
  { 
    path: "/goals", 
    name: "goals-index", 
    component: GoalsIndex
  },
  { 
    path: "/goals/new", 
    name: "goals-new", 
    component: GoalsNew
  },
  { 
    path: "/goals/:id", 
    name: "goals-show", 
    component: GoalsShow
  },
  { 
    path: "/goals/:id/edit", 
    name: "goals-edit", 
    component: GoalsEdit
  },
  { 
    path: "/steps/id:/edit", 
    name: "steps-edit", 
    component: StepsEdit
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
