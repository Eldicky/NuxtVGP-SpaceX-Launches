<template>
	<v-container class="d-flex flex-grow-1 justify-center flex-column">
		<h1>SpaceX Space Ship Launches</h1>
		<p>There are {{ launches?.length || 0 }} launches.</p>

		<div class="mt-5">
			<v-text-field
				v-model="search"
				label="Search"
				prepend-inner-icon="mdi-magnify"
				variant="outlined"
				single-line
			></v-text-field>
		</div>
		<v-data-table 
			:headers="headers" 
			:items="launches" 
			:search="search"
			:header-props="{ style: 'font-weight: bold;' }"
		>
			<template v-slot:item.details="{ item }">
				<div class="text-truncate" style="max-width: 300px">
					{{ item.details }}
				</div>
			</template><v-data-table 
			:headers="headers" 
			:items="launches" 
			:search="search"
			:header-props="{ style: 'font-weight: bold;' }"
		>
			<template v-slot:item.details="{ item }">
				<div class="text-truncate" style="max-width: 300px">
					{{ item.details }}
				</div>
			</template>
			<template v-slot:item.actions="{ item }">
				<v-btn
					icon
					variant="text"
					size="small"
					@click="favorites.toggleFavorite(item.id)"
				>
					<v-icon :color="favorites.isFavorite(item.id) ? 'red' : 'grey'">
						{{ favorites.isFavorite(item.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
					</v-icon>
				</v-btn>
			</template>
		</v-data-table>
			<template v-slot:item.actions="{ item }">
				<v-btn
					icon
					variant="text"
					size="small"
					@click="favorites.toggleFavorite(item.id)"
				>
					<v-icon :color="favorites.isFavorite(item.id) ? 'red' : 'grey'">
						{{ favorites.isFavorite(item.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
					</v-icon>
				</v-btn>
			</template>
		</v-data-table>
	</v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const search = ref('')

const favorites = useFavorites();

const headers = [
	{
		align: 'start',
		key: 'mission_name',
		sortable: true,
		title: 'Mission Name',
	},
	{ key: 'launch_date_local', title: 'Launch Date' },
	{ key: 'launch_site', title: 'Launch Site' },
	{ key: 'rocket.rocket_name', title: 'Rocket Name' },
	{ key: 'details', title: 'Details', sortable: false },
	{ key: 'actions', title: 'Actions', sortable: false },
]

const query = gql`
	query getLaunches {
		launches {
			id
			mission_name
			launch_date_local
			launch_site {
				site_name
			}
			rocket {
				rocket_name
			}
			details
		}
	}
`
const { data } = useAsyncQuery<{
	launches: {
		id: string
		mission_name: string
		launch_date_local: Date
		launch_site: {
			site_name: string
		}
		rocket: {
			rocket_name: string
		}
		details: string | null
	}[]
}>(query)
const launches = computed(
	() =>
		data.value?.launches?.map((launch) => ({
			...launch,
			launch_date_local: new Date(launch.launch_date_local).toLocaleDateString(),
			details: launch.details
				? launch.details.length > 100
					? launch.details.substring(0, 100) + '...'
					: launch.details
				: 'No details available',
		})) ?? [],
)
</script>
