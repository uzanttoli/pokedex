<template>
  <v-sheet :color="colors.backgroundTypeColors.get(pokemon.type)" height="100%">
    <v-container>
      <v-row class="justify-end mt-2">
        <v-tooltip bottom>
          <template v-slot:activator="{ attrs, on }">
            <v-btn v-bind="attrs" v-on="on" large to="/pokemon" icon
              ><v-icon>mdi-keyboard-return</v-icon></v-btn
            >
          </template>
          <span>Voltar</span>
        </v-tooltip>
      </v-row>
      <v-row>
        <div
          class="font-weight-black white--black text-h3"
          style="position: fixed"
        >
          # {{ pokemon.id }}
          <v-divider></v-divider>
          <div class="text-capitalize">
            {{ pokemon.name }}
          </div>
        </div>
        <v-col>
          <div id="img-pokeball">
            <v-img width="100%" src="@/assets/pokeball.svg"></v-img>
          </div>
          <div id="img-pokemon" v-if="!isRotate">
            <v-img width="100%" :src="pokemon.pokeImg"></v-img>
          </div>
          <div id="img-pokemon-back" v-else>
            <v-img width="100%" :src="pokemon.pokeImgBack"></v-img>
          </div>

          <div
            style="position: fixed; top: 70%; right: 52%"
            v-if="pokemon.pokeImgBack != null"
          >
            <v-row class="justify-end mt-n16 mb-7">
              <v-tooltip bottom>
                <template v-slot:activator="{ attrs, on }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    fab
                    @click="isRotate = !isRotate"
                  >
                    <v-icon>fa-solid fa-arrows-rotate</v-icon>
                  </v-btn>
                </template>
                <span>Mudar sprite</span>
              </v-tooltip>
            </v-row>
          </div>
        </v-col>
        <div style="height: 65vh">
          <v-divider vertical> </v-divider>
        </div>
        <v-col class="">
          <div
            id="base-status"
            class="pa-2 ma-2 text-start"
            style="position: absolute; width: 45%; height: 60vh"
          >
            <v-row align="center" justify="center">
              <v-col v-for="(item, i) in pokemonAbility" :key="i">
                <v-card>
                  <v-card-title
                    >Habilidade: {{ item.ability | capitalize }}</v-card-title
                  >
                  <v-card class="overflow-auto" height="300">
                    <v-divider></v-divider>
                    <div class="pa-2">Effect: {{ item.effect }}</div>
                    <div class="pa-2">
                      Short Effect: {{ item.short_effect }}
                    </div>
                  </v-card>
                </v-card>
              </v-col>
            </v-row>
            <div style="margin-top: 10px">
              <v-row v-for="(item, i) in baseStatus" :key="i">
                <v-col cols="3" class="font-weight-bold text-capitalize pa-0">
                  {{ item.stat.name }}:
                </v-col>
                <v-col cols="9" class="pa-0">
                  <v-progress-linear
                    :color="colors.statTypeColors.get(item.stat.name)"
                    height="15"
                    :value="item.base_stat"
                    class="rounded-xl mt-1 text-caption white--text"
                  >
                    <strong
                      >{{ item.base_stat }}/{{
                        item.base_stat > 100 ? item.base_stat : "100"
                      }}</strong
                    >
                  </v-progress-linear>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div style="position: fixed; width: 100%; bottom: 2px">
      <v-card class="pa-1 rounded-t-xl mt-3">
        <v-sheet
          elevation="5"
          class="rounded-xl ma-4"
          id="sheet-load-pokemon"
          :color="colors.backgroundTypeColors.get(pokemon.type)"
        >
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
                :color="
                  active
                    ? undefined
                    : colors.backgroundTypeColors.get(pokemon.type)
                "
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
                  <v-img :src="item.url" v-if="item.url != null"></v-img>
                  <v-img :src="item.url" v-else></v-img>
                  <div
                    class="text-center text-capitalize"
                    :class="active ? 'white--text' : 'black--text'"
                  >
                    {{ item.name }}
                  </div>
                </v-skeleton-loader>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-card>
    </div>
  </v-sheet>
</template>

<script>
import pokemonMixin from "@/views/mixins/pokemon.mixin";
import axios from "axios";
export default {
  mixins: [pokemonMixin],
  data: () => ({
    model: null,
    isRotate: false,
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
      pokeImgBack: "",
      type: "",
    },
    pokemonAbility: [],
    baseStatus: [],
  }),
  computed: {
    routerPage() {
      return this.$route.params.name;
    },
    limited() {
      let limit = Math.random() * 1154;
      return limit;
    },
  },
  filters: {
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  methods: {
    async loadPokemons() {
      this.loading = true;
      let limited = parseInt(this.limited);
      var res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=15&offset=${limited}`
      );
      let result = res.data.results;
      for (let i = 0; i < result.length; i++) {
        let url = result[i].url;
        let resultUrl = await axios.get(url);
        this.pokemons.push({
          url: resultUrl.data.sprites.other["official-artwork"].front_default,
          url_isurl: resultUrl.data.sprites.other["dream_world"].front_default,
          name: resultUrl.data.name,
        });
      }
      this.loading = false;
    },
    loadPokemonName() {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${this.routerPage}`)
        .then((res) => {
          this.baseStatus = res.data.stats;
          let abilities = res.data.abilities;
          this.pokemonAbility = [];
          for (let i = 0; i < abilities.length; i++) {
            this.pokemonAbility.push({
              ability: abilities[i].ability.name,
              is_hidden: abilities[i].is_hidden,
            });
            axios.get(abilities[i].ability.url).then((res) => {
              let efeito = res.data.effect_entries;
              for (let i = 0; i < efeito.length; i++) {
                if (efeito[i].language.name == "en") {
                  this.pokemonAbility[i].effect = efeito[i].effect;
                  this.pokemonAbility[i].short_effect = efeito[i].short_effect;
                }
              }
            });
          }
          this.pokemon.name = res.data.name;
          this.pokemon.id = res.data.id;
          this.pokemon.type = res.data.types[0].type.name;
          this.pokemon.pokeImg =
            res.data.sprites.other["official-artwork"].front_default;
          this.pokemon.pokeImgBack =
            res.data.sprites.other["dream_world"].front_default;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    routerPage() {
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
  margin: 30% 10% 10% 15%;
  width: 350px;
  height: 350px;
  display: block;
}
#img-pokemon-back {
  margin: 30% 10% 10% 15%;
  width: 300px;
  height: 300px;
  display: block;
}
#img-pokeball {
  margin-top: 4%;
  margin-left: 15%;
  position: absolute;
  width: 350px;
  height: 350px;
  opacity: 0.4;
}
#sheet-group-sliders {
  background-image: linear-gradient(
    to bottom,
    rgb(48, 160, 204),
    rgb(255, 246, 246)
  );
}
</style>
