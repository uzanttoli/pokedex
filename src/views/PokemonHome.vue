<template>
  <div id="main">
    <div class="pa-4">
      <v-row>
        <v-col>
          <v-img width="500" src="@/assets/pokemon.png"></v-img>
        </v-col>
        <v-col>
          <v-text-field
            class="mt-15"
            prepend-inner-icon="mdi-magnify"
            solo
            label="Pesquisar"
            placeholder="Pesquise seu pokemon favorito!"
            v-model="search"
            @keyup.enter="loadSearchPokemons"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <!-- <v-row class="pa-2 ma-2 justify-center">
      <v-btn>Carregar todos</v-btn>
    </v-row> -->
    <v-card class="mx-auto rounded-t-xl" id="card" elevation="0">
      <v-row class="mb-2 mt-3">
        <v-col v-for="(item, i) in filteredItems" :key="i">
          <router-link
            :to="{ name: 'Pokemon', params: { name: item.name } }"
            style="text-decoration: none"
          >
            <ListPokemon :name="item.name" :url="item.url" />
          </router-link>
        </v-col>
      </v-row>
      <v-row class="justify-center pa-3" v-if="filteredItems.length > 0">
        <v-tooltip right color="#30a0cc">
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              dark
              color="#30a0cc"
              @click="pagination += 10"
            >
              <v-icon>fa-solid fa-plus</v-icon>
            </v-btn>
          </template>
          <span>Carregar mais</span>
        </v-tooltip>
      </v-row>
    </v-card>
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
    pokemonsSearch: [],
    pagination: 20,
    search: "",
  }),
  computed: {
    filteredItems() {
      let items = [];
      items = this.pokemons.filter((item) => {
        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
      return items;
    },
  },
  methods: {
    loadPokemons() {
      this.overlay = true;
      axios
        .get(
          `https://pokeapi.co/api/v2/pokemon?limit=${this.pagination}&offset=0`
        )
        .then((res) => {
          this.pokemons = res.data.results;
          this.overlay = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.loadPokemons();
  },
  watch: {
    pagination() {
      this.loadPokemons();
    },
  },
};
</script>

<style scoped>
#main {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, #30a0cc, #30a0cc);
}
#card {
  background-image: linear-gradient(to bottom, #72c3e4, rgb(255, 246, 246));
}
</style>
