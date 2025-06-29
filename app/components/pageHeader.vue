<template>
	<div class="d-flex justify-space-around align-center pa-3 bg-indigo-darken-4">
		<div class="d-flex align-center">
			<NuxtLink to="/" class="text-red"><v-icon icon="mdi-rocket-launch" class="text-h3"></v-icon></NuxtLink>
			<h1 class="font-weight-bold ml-5">SpaceX Launches</h1>
		</div>
		<v-tooltip text="Favorites">
			<template v-slot:activator="{ props: favBtn }">
				<NuxtLink v-bind="favBtn" to="/Favorites" class="text-h6 text-red"><v-icon icon="mdi-heart"></v-icon></NuxtLink>
			</template>
		</v-tooltip>
	</div>
</template>
