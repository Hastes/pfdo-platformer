<template lang="pug">
#app
  template(v-if="!isGameStarted")
    start-menu(@start="isGameStarted = true")
  template(v-else)
    game-field

</template>

<script>
import StartMenu from './components/StartMenu.vue';
import GameField from './components/GameField.vue';


export default {
  name: 'App',
  components: {
    StartMenu,
    GameField,
  },
  data() {
    return {
      isGameStarted: false,
    };
  },
};
</script>
