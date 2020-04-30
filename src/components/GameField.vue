<template lang="pug">
  
</template>


<script>

const DOWN_KEYCODES = [83, 40];
const UP_KEYCODES = [87, 38];
const DROP_CERTIFICATE_KEYCODES = [32];


export default {
  mounted(){
      window.addEventListener('keydown', this.handleKeyDown.bind(this));
  },
  beforeDestroy(){
      window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  },
  methods: {
    handleKeyDown(event) {
      if (DOWN_KEYCODES.includes(event.keyCode)) {
        this.moveDown();
      }
      if (UP_KEYCODES.includes(event.keyCode)) {
        this.moveUp();
      }
      if (DROP_CERTIFICATE_KEYCODES.includes(event.keyCode)) {
        this.dropCertificate();
      }
    },
    moveDown() {
    },
    moveUp() {
    },
    dropCertificate() {
    },
  }
}
</script>
