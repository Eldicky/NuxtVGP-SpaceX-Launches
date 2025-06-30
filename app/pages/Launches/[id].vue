<template>
	<v-container class="py-8">
		<v-row class="mb-6">
			<v-col cols="12">
				<div class="d-flex flex-column flex-sm-row align-center justify-space-between">
					<div class="mb-4 mb-sm-0 text-center text-sm-left">
						<h1 class="text-h4 text-sm-h3 font-weight-bold text-primary mb-2">
							{{ launch?.mission_name }}
						</h1>
						<div class="d-flex align-center justify-center justify-sm-start">
							<v-icon color="grey-darken-1" class="mr-2">mdi-rocket</v-icon>
							<span class="text-h6 text-grey-darken-1">{{ launch?.rocket.rocket_name }}</span>
						</div>
					</div>
					<v-btn
						color="primary"
						variant="outlined"
						prepend-icon="mdi-arrow-left"
						@click="useRouter().back()"
						size="small"
						class="text-none"
					>
						<span class="d-none d-sm-inline">Back to Previous Page</span>
						<span class="d-inline d-sm-none">Back</span>
					</v-btn>
				</div>
			</v-col>
		</v-row>

		<!-- status cards -->
		<v-row class="mb-6">
			<v-col cols="6" sm="6" md="3">
				<v-card elevation="2" class="pa-4 text-center">
					<v-icon size="32" color="indigo" class="mb-2">mdi-calendar</v-icon>
					<div class="text-subtitle-2 text-grey-darken-1">Launch Year</div>
					<div class="text-h6 font-weight-bold">{{ launch?.launch_year }}</div>
				</v-card>
			</v-col>
			<v-col cols="6" sm="6" md="3">
				<v-card elevation="2" class="pa-4 text-center">
					<v-icon size="32" :color="launch?.launch_success ? 'success' : 'error'" class="mb-2">
						{{ launch?.launch_success ? 'mdi-check-circle' : 'mdi-close-circle' }}
					</v-icon>
					<div class="text-subtitle-2 text-grey-darken-1">Status</div>
					<div
						class="text-h6 font-weight-bold"
						:class="launch?.launch_success ? 'text-success' : 'text-error'"
					>
						{{ launch?.launch_success ? 'Success' : 'Failed' }}
					</div>
				</v-card>
			</v-col>
			<v-col cols="6" sm="6" md="3">
				<v-card elevation="2" class="pa-4 text-center">
					<v-icon size="32" color="secondary" class="mb-2">mdi-map-marker</v-icon>
					<div class="text-subtitle-2 text-grey-darken-1">Launch Site</div>
					<div class="text-h6 font-weight-bold">
						{{ launch?.launch_site?.site_name || 'Unknown' }}
					</div>
				</v-card>
			</v-col>
			<v-col cols="6" sm="6" md="3">
				<v-card elevation="2" class="pa-4 text-center">
					<v-icon size="32" color="primary" class="mb-2">mdi-information</v-icon>
					<div class="text-subtitle-2 text-grey-darken-1">Mission</div>
					<div class="text-h6 font-weight-bold">SpaceX</div>
				</v-card>
			</v-col>
		</v-row>

		<!-- carousel section -->
		<v-row class="mb-6">
			<v-col cols="12">
				<v-card elevation="4" class="overflow-hidden">
					<template v-if="launch?.links.flickr_images.length">
						<v-carousel
							show-arrows="hover"
							:hide-delimiters="true"
							:cycle="true"
							:interval="5000"
							:height="$vuetify.display.xs ? 300 : $vuetify.display.sm ? 400 : 550"
						>
							<v-carousel-item
								v-for="(image, index) in launch?.links.flickr_images"
								:key="index"
								:src="image"
								cover
							></v-carousel-item>
						</v-carousel>
					</template>
					<template v-else>
						<div
							class="d-flex align-center justify-center"
							:style="`height: ${$vuetify.display.xs ? '250px' : $vuetify.display.sm ? '350px' : '400px'}; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);`"
						>
							<div class="text-center">
								<v-icon
									:size="$vuetify.display.xs ? 80 : 120"
									color="white"
									class="mb-4 opacity-50"
								>
									mdi-image-off
								</v-icon>
								<h3 class="text-white" :class="$vuetify.display.xs ? 'text-h6' : 'text-h5'">
									No Images Available
								</h3>
								<p class="text-white text-body-2">
									Mission images will appear here when available
								</p>
							</div>
						</div>
					</template>
				</v-card>
			</v-col>
		</v-row>

		<!-- mission details and resources -->
		<v-row class="mb-6">
			<v-col cols="12" lg="8">
				<v-card elevation="2" class="pa-4 pa-sm-6">
					<div class="d-flex align-center mb-4">
						<v-icon color="primary" class="mr-3">mdi-text-box</v-icon>
						<h2 class="text-h6 text-sm-h5 font-weight-bold">Mission Details</h2>
					</div>
					<div v-if="launch?.details" class="text-body-1 line-height-relaxed">
						{{ launch.details }}
					</div>
					<div v-else class="text-center py-8">
						<v-icon size="48" color="grey-lighten-1" class="mb-2">mdi-information-outline</v-icon>
						<p class="text-grey-darken-1">No mission details available for this launch.</p>
					</div>
				</v-card>
			</v-col>
			<v-col cols="12" lg="4">
				<v-card elevation="2" class="pa-4 pa-sm-6">
					<div class="d-flex align-center mb-4">
						<v-icon color="primary" class="mr-3">mdi-link</v-icon>
						<h2 class="text-h6 text-sm-h5 font-weight-bold">Resources</h2>
					</div>
					<div v-if="launch?.links.article_link" class="mb-4">
						<v-btn
							:href="launch.links.article_link"
							target="_blank"
							color="primary"
							size="large"
							block
							variant="elevated"
							prepend-icon="mdi-newspaper"
						>
							<span class="d-none d-sm-inline">Read Full Article</span>
							<span class="d-inline d-sm-none">Read Article</span>
						</v-btn>
					</div>
					<div v-else class="text-center py-4">
						<v-icon size="48" color="grey-lighten-1" class="mb-2">mdi-link-off</v-icon>
						<p class="text-grey-darken-1 text-body-2">No article link available</p>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
const launchId = useRoute().params.id as string

const findQuery = gql`
	query findLaunch($launchId: ID!) {
		launch(id: $launchId) {
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

const { data } = useAsyncQuery<{
	launch: {
		mission_name: string
		launch_year: string
		details: string | null
		is_tentative: boolean
		upcoming: boolean
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
}>(findQuery, { launchId })

const launch = computed(() => data.value?.launch)

// Set dynamic page title based on mission
useSeoMeta({
	title: computed(() => launch.value?.mission_name ? `${launch.value.mission_name} - SpaceX Launch Details` : 'Launch Details - SpaceX')
})
</script>
