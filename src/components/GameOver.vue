<template lang="pug">
.start-menu
  .elements
    pfdo-game-logo
    .text-center
      h1 Игра окончена
      img.image(:src="require('../assets/semyon/fail0.png')")
      template(v-if="score > 10")
        p Ваш результат {{score}}. Вы справились с этим.
      template(v-else)
        p Ваш результат {{score}}. Как-то слабо.
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
