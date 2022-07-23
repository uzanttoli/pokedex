<template>
  <v-sheet :color="colors.backgroundTypeColors.get(pokemon.type)" height="100%">
    <v-container>
      <v-row class="justify-end mt-2">
        <v-btn fab large to="/"><v-icon>mdi-keyboard-return</v-icon></v-btn>
      </v-row>
      <v-row>
        <div class="font-weight-black white--black text-h3">
          # {{ pokemon.id }}
          <v-divider></v-divider>
          <div class="text-capitalize">
            {{ pokemon.name }}
          </div>
        </div>
        <v-col>
          <div id="img-pokemon">
            <v-img width="100%" :src="pokemon.pokeImg"></v-img>
          </div>
        </v-col>
        <!-- <v-col>
          <v-list>
            <v-list-item> d </v-list-item>
          </v-list>
        </v-col> -->
      </v-row>
      <!-- Slide group -->
      <v-sheet elevation="8" class="rounded-xl">
        <v-slide-group
          v-model="model"
          class="pa-4"
          active-class="success"
          show-arrows
        >
          <v-slide-item
            v-for="(item, i) in pokemons"
            :key="i"
            v-slot="{ active, toggle }"
          >
            <v-card
              :color="active ? undefined : 'white'"
              elevation="0"
              class="ma-4"
              width="100"
              @click="toggle"
              :to="{ name: 'Pokemon', params: { name: item.name } }"
            >
              <v-skeleton-loader
                class="mx-auto"
                :loading="loading"
                width="100"
                height="150"
                type="card"
              >
                <v-img :src="item.url"></v-img>
                <div class="text-center text-capitalize">
                  {{ item.name }}
                </div>
                <!-- <v-row class="fill-height" align="center" justify="center">
              <v-scale-transition>
                <v-icon
                  v-if="active"
                  color="white"
                  size="48"
                  v-text="'mdi-close-circle-outline'"
                ></v-icon>
              </v-scale-transition>
            </v-row> -->
              </v-skeleton-loader>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-container>
  </v-sheet>
</template>

<script>
import pokemonMixin from "@/views/mixins/pokemon.mixin";
import axios from "axios";
export default {
  mixins: [pokemonMixin],
  data: () => ({
    model: null,
    pokemons: [],
    loading: false,
    pokemonSlide: {
      front: "",
      name: "",
    },
    pokemon: {
      id: "",
      name: "",
      pokeImg: "",
      type: "",
    },
  }),
  computed: {
    pokemonfilter() {
      let filtered = this.pokemons.filter((element) => {
        return element.name != this.$route.params.name;
      });
      return filtered;
    },
  },
  methods: {
    async loadPokemons() {
      this.loading = true;
      var res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
      );
      let result = res.data.results;
      for (let i = 0; i < result.length; i++) {
        let url = result[i].url;
        let resultUrl = await axios.get(url);
        this.pokemons.push({
          url: resultUrl.data.sprites.other["official-artwork"].front_default,
          name: resultUrl.data.name,
        });
      }
      this.loading = false;
    },
    loadPokemonName() {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.name}`)
        .then((res) => {
          this.pokemon.name = res.data.name;
          this.pokemon.id = res.data.id;
          this.pokemon.type = res.data.types[0].type.name;
          this.pokemon.pokeImg =
            res.data.sprites.other["official-artwork"].front_default;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    pokemonfilter() {
      this.loadPokemonName();
    },
  },
  created() {
    this.loadPokemons();
    this.loadPokemonName();
  },
};
</script>

<style scoped>
#img-pokemon {
  margin: 15% 10% 8% -10%;
  width: 350px;
  height: 350px;
  display: block;
}

#sheet-group-sliders {
  background-image: linear-gradient(
    to bottom,
    rgb(48, 160, 204),
    rgb(255, 246, 246)
  );
}
</style>
