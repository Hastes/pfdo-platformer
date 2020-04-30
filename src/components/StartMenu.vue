<template lang="pug">
.start-menu
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
