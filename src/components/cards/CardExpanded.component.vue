<template>
  <v-row justify="center">
    <v-expansion-panels popout class="rounded-xl-0">
      <v-expansion-panel :style="color">
        <v-expansion-panel-header>
          <p class="white--text">{{ habilidade }}</p>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
         <p class="white--text">{{ descricao }}</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
export default {
  props: {
    habilidade: { type: String },
    color: { type: String },
    descricao: { type: String },
  },
};
</script>

<style></style>
