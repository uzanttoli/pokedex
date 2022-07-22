<template>
  <div id="main">
    <v-row>
      <v-col v-for="(item, i) in pokemons" :key="i">
        <router-link to="/" style="text-decoration: none">
          <ListPokemon :name="item.name" :url="item.url" />
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ListPokemon from "./cards/ListPokemon.vue";
import axios from "axios";
export default {
  components: {
    ListPokemon,
  },
  data: () => ({
    pokemons: [],
  }),
  created() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
      .then((res) => {
        this.pokemons = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
#main {
  height: 100vh;
  background-image: linear-gradient(
    to bottom,
    rgb(48, 160, 204),
    rgb(255, 255, 255)
  );
  position: absolute;
  width: 100%;
}
</style>
