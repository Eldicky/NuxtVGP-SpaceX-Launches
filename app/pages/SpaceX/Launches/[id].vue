<template>
	<h1>hi</h1>
</template>

<script setup lang="ts">
const launchId = useRoute().params.id as string

const findQuery = gql`
	query findLaunch($launchId: ID!) {
		launch(id: $launchId) {
			mission_name
			launch_year
			details
			is_tentative
			upcoming
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
console.log(launch)
</script>
