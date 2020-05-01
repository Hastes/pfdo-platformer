<template lang="pug">
div
  template(v-if="isGameOver")
    game-over(:score='score' :gameStart="gameStart")
  #gameField
</template>

<script>
import * as PIXI from "pixi.js";
import GameOver from "./GameOver.vue";

const DOWN_KEYCODES = [83, 40];
const UP_KEYCODES = [87, 38];
const DROP_CERTIFICATE_KEYCODES = [32];
const RIGHT_ARROW_KEYCODES = [37];

const playerFrames = [];
const playerFramesDropped = [];
const clientFrames = [];
const programmers = [];
let mode = 0;

for (let i = 0; i < 4; i++) {
	playerFrames.push(
		PIXI.Texture.from(require(`@/assets/semyon/running${i}.png`)),
	);
}

for (let i = 0; i < 1; i++) {
	playerFramesDropped.push(
		PIXI.Texture.from(require(`@/assets/semyon/certificate${i}.png`)),
	);
}

for (let i = 1; i < 6; i++) {
	clientFrames.push(
		PIXI.Texture.from(require(`@/assets/client/client${i}.png`)),
	);
}
for (let k = 0; k < 4; k++) {
  const programmerFrames = [];
  for (let i = 0; i < 4; i++) {
    programmerFrames.push(
      PIXI.Texture.from(require(`@/assets/programmer/programmer${k}${i}.png`)),
    );
  }
  programmers[k] = programmerFrames
}

const TEXTURES = {
	certificate: PIXI.Texture.from(require("@/assets/certificate.png")),
	money: PIXI.Texture.from(require("@/assets/money.png")),
	player: playerFrames,
	playerDropped: playerFramesDropped,
	clientFrames,
  programmers,
};

const ENEMY_TYPES = {
	developer: 0,
	client: 1,
};

export default {
	components: {
		GameOver,
	},
	mounted() {
		window.addEventListener("keydown", this.handleKeyDown.bind(this));
		this.initCanvas();
		let counter = 1000;
		const instance = this;
		const scalingIntervalF = function () {
			counter = 1000 - instance.score * 5;
			instance.generateEnemy();
			setTimeout(scalingIntervalF, counter);
		};
		setTimeout(scalingIntervalF, counter);
		this.drawMode();
	},
	beforeDestroy() {
		window.removeEventListener("keydown", this.handleKeyDown.bind(this));
	},
	data() {
		return {
			app: null,
			player: null,
			mode: null,
			scoreText: null,
			isGameOver: false,
			enemiesPoll: [],
			score: 0,
		};
	},
	methods: {
		initCanvas() {
			const app = new PIXI.Application({
				height: window.innerHeight,
				width: window.innerWidth,
				transparent: true,
				antialiasing: true,
			});
			document.getElementById("gameField").appendChild(app.view);

			const player = new PIXI.AnimatedSprite(TEXTURES.player);
			const rowHeight = Math.round(app.screen.height / 4);
			const scoreText = new PIXI.Text(`Выполнено: ${this.score}`, {
				fontSize: 24,
			});
			scoreText.x = 20;
			scoreText.y = 20;
			player.anchor.set(0.5);
			player.scale.set(0.4);
			player.x = app.screen.width - 100;
			player.animationSpeed = 0.15;
			player.play();
			player.y = rowHeight;

			const sky = PIXI.Sprite.from(PIXI.Texture.WHITE);
			sky.width = app.screen.width;
			sky.height = rowHeight;
			sky.tint = 0x80a8e7;
			app.stage.addChild(sky);
			for (let i = 1; i < 4; i++) {
				const rectangle = PIXI.Sprite.from(PIXI.Texture.WHITE);
				rectangle.width = app.screen.width;
				rectangle.y = rowHeight * i;
				rectangle.height = rowHeight;
				app.stage.addChild(rectangle);
				const line = PIXI.Sprite.from(PIXI.Texture.WHITE);
				line.width = app.screen.width;
				line.y = rowHeight * i;
				line.height = 5;
				line.tint = 0x80a8e7;
				app.stage.addChild(line);
			}

			app.stage.addChild(scoreText);
			app.stage.addChild(player);

			player.interactive = true;

			this.app = app;
			this.player = player;
			this.scoreText = scoreText;
			this.rowHeight = rowHeight;
			this.drawMode();
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
			if (RIGHT_ARROW_KEYCODES.includes(event.keyCode)) {
				mode = mode === 0 ? 1 : 0;
				this.drawMode();
			}
		},
		moveDown() {
			if (this.player.y < this.rowHeight * 3) {
				this.player.y += this.rowHeight;
			}
		},
		moveUp() {
			if (this.player.y > this.rowHeight) {
				this.player.y -= this.rowHeight;
			}
		},
		dropCertificate() {
			let certificate = null;
			if (mode === 0) {
				certificate = new PIXI.Sprite(TEXTURES.certificate);
			} else if (mode === 1) {
				certificate = new PIXI.Sprite(TEXTURES.money);
			}
			certificate.scale.set(0.1);
			certificate.anchor.set(0.5);
			certificate.type = this.mode.type;
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
			});
		},
		checkForCollision(certificate) {
			this.enemiesPoll.map((enemy) => {
				if (
					(certificate.x < enemy.x) & (certificate.y === enemy.y) &&
					!certificate.isUsed &&
					!enemy.destroyed &&
					enemy.type === certificate.type
				) {
					enemy.destroyed = true;
					certificate.isUsed = true;
					this.score++;
					this.scoreText.text = `Выполнено: ${this.score}`;
					this.app.stage.removeChild(enemy);
					this.app.stage.removeChild(certificate);
				}
			});
		},
		generateEnemy() {
			const ALLOWED_POSITIONS = [1, 2, 3];
			const randomPosition =
				ALLOWED_POSITIONS[Math.floor(Math.random() * ALLOWED_POSITIONS.length)];
			this.addEnemy(randomPosition);
		},
		addEnemy(randomPosition) {
			const type =
				Math.random() > 0.5 ? ENEMY_TYPES.developer : ENEMY_TYPES.client;

			let enemy = null;
			if (type === ENEMY_TYPES.client) {
        const programmerNumber = Math.floor(Math.random() * Math.floor(4));
				enemy = new PIXI.AnimatedSprite(TEXTURES.programmers[programmerNumber]);
			} else {
				enemy = new PIXI.AnimatedSprite(TEXTURES.clientFrames);
			}
			enemy.type = type;
			enemy.animationSpeed = 0.1;
			enemy.play();
			enemy.anchor.set(0.5);
			enemy.scale.set(0.5);
			enemy.x = 0;
			enemy.y = this.rowHeight * randomPosition;
			enemy.interactive = true;
			enemy.speed = Math.max(1, Math.random() * 1.3) + this.score / 10;
			this.app.stage.addChild(enemy);
			this.app.ticker.add(() => {
				enemy.x += 5 * enemy.speed;
				if (enemy.x > this.player.x && !enemy.destroyed) {
					this.gameOver();
				}
			});
			this.enemiesPoll.push(enemy);
		},
		drawMode() {
			if (this.mode !== null) {
				this.mode.destroy();
			}
			if (mode === 0) {
				this.mode = new PIXI.Sprite(TEXTURES.certificate);
			} else if (mode === 1) {
				this.mode = new PIXI.Sprite(TEXTURES.money);
			}
			this.mode.type = mode;
			this.mode.scale.set(0.1);
			this.mode.anchor.set(0.5);
			this.mode.x = this.player.x;
			this.mode.y = 50;
			this.mode.interactive = false;
			this.app.stage.addChild(this.mode);
		},
		gameOver() {
			this.app.stop();
			this.enemiesPoll = [];
			this.isGameOver = true;
			document.getElementById("gameField").style.display = "none";
		},
		gameStart() {
			document.getElementById("gameField").style.display = "block";
			document.getElementById("gameField").innerHTML = "";
			this.score = 0;
			this.app.destroy();
			this.initCanvas();
			this.isGameOver = false;
		},
	},
};
</script>
