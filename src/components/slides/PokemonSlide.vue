<template>
  <v-sheet elevation="8">
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
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    pokemons: [],
  }),
  methods: {
    loadPokemons() {
      this.loading = true;
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
        .then((res) => {
          let result = res.data.results;
          for (let i = 0; i < result.length; i++) {
            let url = result[i].url;
            axios
              .get(url)
              .then((res) => {
                this.pokemons.push({
                  url: res.data.sprites.other["official-artwork"].front_default,
                  name: res.data.name,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.loadPokemons();
  },
};
</script>

<style></style>
