<template lang="pug">
.start-menu
  .elements
    pfdo-game-logo
    .text-center
      button(@click="$emit('start')") Новая игра
    .text-center
      button Пожертвовать на развитие
</template>

<script>
import PfdoGameLogo from './PfdoGameLogo.vue';


export default {
  name: 'HelloWorld',
  components: {
    PfdoGameLogo,
  }
}
</script>


<style lang="scss" scoped>
.start-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>