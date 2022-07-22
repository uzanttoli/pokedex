import Vue from "vue";
import VueRouter from "vue-router";
import PokemonHome from "../views/PokemonHome.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: PokemonHome,
  },

  {
    path: "/pokemon/v2/:name",
    name: "Pokemon",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PokemonId.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
