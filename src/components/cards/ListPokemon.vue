<template>
  <div>
    <v-card
      :loading="loading"
      class="mx-auto rounded-t-xl rounded-b-xl"
      style="position: relative; margin-top: 10px"
      max-width="300"
      width="210"
    >
      <div id="img-pokemon">
        <v-img class="pa-2" width="100%" :src="pokemon.front"></v-img>
      </div>

      <v-card elevation="0" class="rounded-t-xl mt-n12" height="110">
        <v-card-title class="text-capitalize">{{ name }}</v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-row align="center" class="mx-0 justify-center">
          <v-col class="text-center" v-for="(item, i) in type" :key="i">
            <div class="text-center">
              <v-chip
                class="ma-2"
                small
                label
                text-color="white"
                :color="colors.backgroundTypeColors.get(item.type.name)"
              >
                {{ item.type.name }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import pokemonMixin from "@/views/mixins/pokemon.mixin";
export default {
  mixins: [pokemonMixin],
  props: {
    name: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      require: true,
    },
  },
  data: () => ({
    loading: false,
    selection: 1,
    pokemon: {
      front: "",
    },
    type: [],
  }),
  methods: {
    pokemonId() {
      axios.get(this.url).then((res) => {
        this.type = res.data.types;
        this.pokemon.front =
          res.data.sprites.other["official-artwork"].front_default;
      });
    },
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
  },
  created() {
    this.pokemonId();
  },
};
</script>
<style scoped>
#img-pokemon {
  width: 100px;
  height: 155px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
