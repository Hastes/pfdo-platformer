<template lang="pug">
#gameField
</template>


<script>
import * as PIXI from 'pixi.js';
import '@/assets/logo.png';

const DOWN_KEYCODES = [83, 40];
const UP_KEYCODES = [87, 38];
const DROP_CERTIFICATE_KEYCODES = [32];


export default {
  mounted(){
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.initCanvas();
  },
  beforeDestroy(){
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  },
  data() {
    return {
      app: null,
    }
  },
  methods: {
    initCanvas() {
      const app = new PIXI.Application({
        height: window.innerHeight - 10,
        width: window.innerWidth,
        transparent: true,
      });
      document.getElementById('gameField').appendChild(app.view);
      const texture = PIXI.Texture.from(require('@/assets/logo.png'));
      const logo = new PIXI.Sprite(texture);
      logo.anchor.set(0.5);

      logo.x = app.screen.width / 2;
      logo.y = app.screen.height / 2;
    
      app.stage.addChild(logo);

      logo.interactive = true;
      app.ticker.add(() => {
          logo.rotation += 0.1;
      });

      this.app = app;
    },
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
      this.app.start();
    },
    dropCertificate() {
      this.app.stop();
    },
  }
}
</script>
