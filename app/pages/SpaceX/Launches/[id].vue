<template>
	<v-card class="pa-5 d-flex flex-column align-center">
		<v-card-title class="text-h4 font-weight-bold">{{ launch?.mission_name }}</v-card-title>
		<v-card-subtitle>Rocket Name: {{ launch?.rocket.rocket_name }}</v-card-subtitle>
		<v-container>
			<v-row class="d-flex justify-center">
				<v-chip class="ma-2" color="indigo" text-color="white">
					Launch Year: {{ launch?.launch_year }}
				</v-chip>
				<v-chip class="ma-2" text-color="white" :color="launch?.launch_success ? 'green' : 'red'">
					Launch Status: {{ launch?.launch_success ? 'Success' : 'Failure' }}
				</v-chip>
				<v-chip
					class="ma-2"
					text-color="white"
					:color="launch?.launch_site?.site_name ? 'primary' : 'red'"
				>
					Launch Site: {{ launch?.launch_site?.site_name || 'Unknown' }}
				</v-chip>
			</v-row>
			<v-row>
				<template v-if="launch?.links.flickr_images.length">
					<v-carousel
						show-arrows="hover"
						:hide-delimiters="true"
						:cycle="true"
						:interval="5000"
						:height="500"
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
					<v-carousel :show-arrows="false" :hide-delimiters="true" :height="500">
						<v-carousel-item :src="noImagePng" cover></v-carousel-item>
					</v-carousel>
				</template>
			</v-row>

			<v-card-text class="mt-2">{{ launch?.details }}</v-card-text>

			<v-row class="d-flex flex-column align-center">
				<p>Article Link:</p>
				<a :href="launch?.links.article_link || '#'" target="_blank">
					{{ launch?.links.article_link ? launch.links.article_link : 'No article link available' }}
				</a>
			</v-row>
		</v-container>
	</v-card>
</template>

<script setup lang="ts">
import noImagePng from '~/assets/no-image.png'

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
</script>
