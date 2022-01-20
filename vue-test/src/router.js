import { createRouter, createWebHistory } from "vue-router";
import store from "./store";
import Login from "./views/Login.vue";
import Movies from "./views/Movies.vue";
import MoviesDetail from "./views/MovieDetail.vue";
import Profile from "./views/Profile.vue";

const authGuard = (to, from, next) => {
  if (!store.state.user) {
    next("/");
  } else {
    next();
  }
};

const loginGuard = (_to, _from, next) => {
  if (store.state.user) next("/movies");
  else next();
};

const routes = [
  {
    path: "/",
    component: Login,
    beforeEnter: loginGuard,
  },
  {
    path: "/movies",
    component: Movies,
    beforeEnter: authGuard,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/movies/:movieId", // route param
    component: MoviesDetail,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
