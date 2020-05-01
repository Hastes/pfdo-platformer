<template lang="pug">
h1.pfdo-game-logo Сертификатмэн
</template>

<style scoped lang="scss">
.pfdo-game-logo {
	display: block;
	text-align: center;
	color: $primary-color;
	transition: all 0.5s ease;
	animation: 0.4s linear 0s infinite alternate anim;
	transform: rotate(0);

	&:hover {
		display: block;
		color: $dark-color;
		transform: rotate(45deg);
		animation: 0.4s linear 0s infinite rotation;
	}
}

@keyframes anim {
	from {
		transform: scale(1.2);
	}
	to {
		transform: scale(0.9);
	}
}
@keyframes rotation {
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
