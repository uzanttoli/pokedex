<template>
  <div id="main">
    <v-row class="mb-2">
      <v-col v-for="(item, i) in pokemons" :key="i">
        <router-link
          :to="{ name: 'Pokemon', params: { name: item.name } }"
          style="text-decoration: none"
        >
          <ListPokemon :name="item.name" :url="item.url" />
        </router-link>
      </v-col>
    </v-row>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import ListPokemon from "../components/cards/ListPokemon.vue";
import axios from "axios";
export default {
  components: {
    ListPokemon,
  },
  data: () => ({
    overlay: false,
    pokemons: [],
  }),
  computed: {},
  methods: {},
  created() {
    this.overlay = true;
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
      .then((res) => {
        this.pokemons = res.data.results;
        this.overlay = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
#main {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    to bottom,
    rgb(48, 160, 204),
    rgb(255, 246, 246)
  );
}
</style>
