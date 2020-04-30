<template lang="pug">
div
  template(v-if="isGameOver")
    h1 Игра окончена
  p {{ enemiesPoll }}
  #gameField
</template>


<script>
import * as PIXI from 'pixi.js';
import '@/assets/logo.png';

const DOWN_KEYCODES = [83, 40];
const UP_KEYCODES = [87, 38];
const DROP_CERTIFICATE_KEYCODES = [32];

const TEXTURES = {
  logo: PIXI.Texture.from(require('@/assets/logo.png')),
};


export default {
  mounted(){
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.initCanvas();
    setInterval(
      () => this.generateEnemy(), 1000
    )
  },
  beforeDestroy(){
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  },
  data() {
    return {
      app: null,
      player: null,
      isGameOver: false,
      enemiesPoll: [],
    }
  },
  methods: {
    initCanvas() {
      const app = new PIXI.Application({
        height: window.innerHeight - 100,
        width: window.innerWidth - 100,
        transparent: true,
        antialiasing: true,
      });
      document.getElementById('gameField').appendChild(app.view);
      const player = new PIXI.Sprite(TEXTURES.logo);
      const rowHeight = Math.round(app.screen.height / 4);
      
      player.anchor.set(0.5);
      player.x = app.screen.width - 100;
      player.y = rowHeight;
    
      app.stage.addChild(player);

      player.interactive = true;
      player.rotation += 1.6;

      this.app = app;
      this.player = player;
      this.rowHeight = rowHeight;
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
      this.player.y += this.rowHeight;
    },
    moveUp() {
      this.player.y -= this.rowHeight;
    },
    dropCertificate() {
      const certificate = new PIXI.Sprite(TEXTURES.logo);
      certificate.scale.set(0.3);
      certificate.anchor.set(0.5);
      certificate.x = this.player.x;
      certificate.y = this.player.y;
      certificate.interactive = true;
      this.app.stage.addChild(certificate);
      this.app.ticker.add(() => {
        certificate.x -= ((certificate.x + 1000) / 1000) * 10;
        this.checkForCollision(certificate);
        certificate.rotation += 0.1;
        if (certificate.x < 0) {
          this.app.stage.removeChild(certificate);
          certificate.isUsed = true;
        }
      })
    },
    checkForCollision(certificate) {
      this.enemiesPoll.map((enemy) => {
        if (certificate.x < enemy.x & certificate.y === enemy.y && !certificate.isUsed && !enemy.destroyed) {
          enemy.destroyed = true;
          certificate.isUsed = true;
          this.app.stage.removeChild(enemy);
          this.app.stage.removeChild(certificate);
        }
      })
    },
    generateEnemy() {
      const ALLOWED_POSITIONS = [1,2,3];
      const randomPosition = ALLOWED_POSITIONS[Math.floor(Math.random() * ALLOWED_POSITIONS.length)];
      this.addEnemy(randomPosition);
    },
    addEnemy(randomPosition) {
      const enemy = new PIXI.Sprite(TEXTURES.logo);
      enemy.tint = Math.random() * 0xFFFFFF;
      enemy.anchor.set(0.5);
      enemy.x = 0;
      enemy.y = this.rowHeight * randomPosition;
      enemy.interactive = true;
      this.app.stage.addChild(enemy);
      this.app.ticker.add(() => {
        enemy.x += 10;
        if (enemy.x > this.player.x && !enemy.destroyed) {
          this.gameOver();
        }
      })
      this.enemiesPoll.push(enemy);
    },
    gameOver() {
      this.app.stop();
      this.enemiesPoll = [];
    },
  }
}
</script>
