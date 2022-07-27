import colors from "@/core/color";
import icons from "@/core/icon";

const pokemonMixins = {
  computed: {
    colors() {
      return colors;
    },
    icons() {
      return icons;
    },
  },
};

export default pokemonMixins;
