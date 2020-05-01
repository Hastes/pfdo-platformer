<template lang="pug">
.start-menu
  .elements
    pfdo-game-logo
    .text-center
      button(@click="$emit('start')") Новая игра
    .text-center
      button Пожертвовать на развитие
    .text-center
      .header-controls Описание
      .description Вы семен и ваша цель удовлетворить как можно больше людей
    .text-center
      .header-controls Управление
    .controls
      .item
        .item-button space
        .item-text Отправить сертификат или деньги
      .item
        .item-button &#8593;
        .item-button &#8595;
        .item-text Перемещение игрока
      .item
        .item-button &#8592;
        .item-text Смена режима
</template>

<script>
import PfdoGameLogo from "./PfdoGameLogo.vue";

export default {
	name: "HelloWorld",
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
  max-width: 320px;
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
	.header-controls {
		margin: 10px 0;
		font-weight: bold;
		font-size: 18px;
	}
}
.controls {
	.item {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		&-button {
			margin-right: 15px;
      min-width: 20px;
			padding: 0.5rem;
			border: 3px solid $primary-color;
			background-color: $light-color;
			border-radius: 5px;
			text-transform: uppercase;
			font-weight: bold;
      text-align: center;
		}
		&-text {
			margin-left: auto;
			justify-self: flex-end;
			font-weight: bold;
			background-color: $secondary-color;
		}
	}
}
</style>
