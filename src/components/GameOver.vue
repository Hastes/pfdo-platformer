<template lang="pug">
.start-menu
  .elements
    pfdo-game-logo
    .text-center
      h1 Игра окончена
      template(v-if="score < 10")
        template(v-if="count%2===0")
          img.image(:src="require('../assets/semyon/fail0.png')")
        template(v-else)
          img.image(:src="require('../assets/semyon/fail1.png')")
        p Ваш результат {{score}}. Как-то слабо.
      template(v-else)
        template(v-if="count%2===0")
          img.image(:src="require('../assets/semyon/money0.png')")
        template(v-else)
          img.image(:src="require('../assets/semyon/money1.png')")
        p Ваш результат {{score}}. Молодец. Вы справились.
      .controls
        button(@click="gameStart") Попробовать снова
</template>

<script>
import PfdoGameLogo from "./PfdoGameLogo.vue";

export default {
	props: {
		score: Number,
		gameStart: Function,
	},
	name: "GameOver",
	components: {
		PfdoGameLogo,
	},
	mounted() {
		this.timer = setInterval(() => {
			this.count++;
		}, 300);
	},
	beforeDestroy() {
		clearInterval(this.timer);
	},
	data() {
		return {
			count: 0,
			timer: null,
		};
	},
};
</script>

<style lang="scss" scoped>
.start-menu {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: $primary-color;
	color: $dark-color;
}
.elements {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 2rem;
	background-color: $secondary-color;
}
.text-center {
	margin-bottom: 1rem;
	width: 100%;
	button {
		background-color: $light-color;
		border: 3px solid $dark-color;
		width: 100%;
		padding: 1rem;
		font-size: 14px;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.2s ease-in;
		&:hover {
			background-color: $secondary-color;
			color: $light-color;
			border: 3px solid $light-color;
		}
	}
}
.controls {
	button {
		margin-bottom: 20px;
	}
}
.image {
	width: 100%;
	height: 200px;
	object-fit: contain;
}
</style>
