<template>
	<v-app>
		<pageHeader />
		<v-main>
			<slot />
		</v-main>
		<pageFooter />
	</v-app>
</template>
<script>
export default {
	name: 'DefaultLayout',
}
</script>
