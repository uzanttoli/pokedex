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
    <v-row class="ma-2 justify-space-around">
      <v-btn-toggle v-model="toggle_exclusive">
        <v-btn
          v-for="(item, i) in buttonsGeneration"
          :key="i"
          :value="item.value"
          >{{ item.name }}</v-btn
        >
      </v-btn-toggle>
    </v-row>
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
    buttonsGeneration: [
      {
        id: 1,
        name: "Geração 1",
        value: 0,
      },
      {
        id: 2,
        name: "Geração 2",
        value: 151,
      },
      {
        id: 3,
        name: "Geração 3",
        value: 302,
      },
      {
        id: 4,
        name: "Geração 4",
        value: 453,
      },
      {
        id: 5,
        name: "Geração 5",
        value: 604,
      },
      {
        id: 6,
        name: "Geração 6",
        value: 755,
      },
      {
        id: 7,
        name: "Geração 7",
        value: 906,
      },
      {
        id: 8,
        name: "Geração 8",
        value: 1057,
      },
    ],
    toggle_exclusive: 0,
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
    clickE(value) {
      console.log(value);
    },
    loadPokemons() {
      this.overlay = true;
      this.pokemons = [];
      axios
        .get(
          `https://pokeapi.co/api/v2/pokemon?offset=${this.toggle_exclusive}&limit=151`
        )
        // .get(
        //   `https://pokeapi.co/api/v2/pokemon?limit=${this.pagination}&offset=0`
        // )
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
    toggle_exclusive() {
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
