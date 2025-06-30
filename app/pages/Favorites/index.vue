<template>
	<v-container class="d-flex align-center justify-space-between">
		<h1>Favorites</h1>
		<v-btn @click="favorites.clearFavorites" color="error" variant="outlined">
			<v-icon start>mdi-heart-remove</v-icon>
			<p>Clear Favorites</p>
		</v-btn>
	</v-container>

	<v-container v-if="favorites.getFavorites.length === 0" class="text-center">
		<v-icon size="64" color="grey">mdi-heart-outline</v-icon>
		<p class="text-h6 mt-4">No favorites added yet.</p>
		<p class="text-body-2">Browse launches and add some to your favorites!</p>
	</v-container>

	<v-container v-else>
		<v-row>
			<v-col cols="12" sm="6" lg="4" v-for="launch in launches" :key="launch.id">
				<v-card class="mb-4 pa-4" elevation="5">
					<v-row>
						<v-col class="d-flex flex-column align-center justify-center" cols="10">
							<v-card-title class="text-h5 text-center">{{ launch.mission_name }}</v-card-title>
							<v-card-subtitle class="text-body-1">{{ launch.launch_year }}</v-card-subtitle>
						</v-col>
						<v-col cols="2">
							<v-btn
								icon="mdi-heart-remove"
								@click="favorites.toggleFavorite(launch.id)"
								color="error"
								variant="plain"
							></v-btn>
						</v-col>
					</v-row>

					<v-card-text class="d-flex flex-wrap justify-center">
						<v-chip class="mr-2 mb-2" size="small" color="primary">
							<v-icon start>mdi-rocket</v-icon>
							{{ launch.rocket?.rocket_name }}
						</v-chip>

						<v-chip class="mr-2 mb-2" size="small" color="secondary">
							<v-icon start>mdi-map-marker</v-icon>
							{{ launch.launch_site?.site_name || 'Unknown Site' }}
						</v-chip>

						<v-chip
							class="mr-2 mb-2"
							size="small"
							:color="launch.launch_success ? 'success' : 'error'"
						>
							<v-icon start>{{ launch.launch_success ? 'mdi-check' : 'mdi-close' }}</v-icon>
							{{ launch.launch_success ? 'Success' : 'Failed' }}
						</v-chip>
					</v-card-text>

					<v-card-actions class="d-flex flex-column flex-sm-row justify-space-around">
						<v-btn
							v-if="launch.links?.article_link"
							:href="launch.links.article_link"
							target="_blank"
							color="primary"
							variant="outlined"
							class="mb-2 mb-sm-0"
							size="small"
						>
							<v-icon start>mdi-newspaper</v-icon>
							Read Article
						</v-btn>

						<v-btn :to="`/Launches/${launch.id}`" color="primary" size="small">
							<v-icon start>mdi-information</v-icon>
							View Details
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
const favorites = useFavorites()

const findLaunch = gql`
	query findLaunch($launchId: ID!) {
		launch(id: $launchId) {
			id
			mission_name
			launch_year
			details
			launch_success
			rocket {
				rocket_name
			}
			launch_site {
				site_name
			}
			links {
				article_link
				flickr_images
			}
		}
	}
`

interface Launch {
	id: string
	mission_name: string
	launch_year: string
	details: string | null
	launch_success: boolean
	rocket: {
		rocket_name: string
	}
	launch_site: {
		site_name: string
	}
	links: {
		article_link: string | null
		flickr_images: string[]
	}
}

const launches = computed(() => {
	return favorites.getFavorites
		.map((launchId) => {
			const { data } = useAsyncQuery<{
				launch: Launch
			}>(findLaunch, { launchId })

			return data.value?.launch
		})
		.filter((launch): launch is Launch => launch !== undefined)
})
</script>
