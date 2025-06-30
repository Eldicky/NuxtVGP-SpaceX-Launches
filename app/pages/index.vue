<template>
	<v-container class="d-flex flex-grow-1 justify-center flex-column">
		<h1>SpaceX Space Ship Launches</h1>
		<p>There are {{ launches?.length || 0 }} launches.</p>

		<div class="mt-5">
			<v-row>
				<v-col cols="12" sm="6" md="3">
					<v-select
						:model-value="selectedYear || null"
						@update:model-value="setYearFilter"
						clearable
						label="Filter by Year"
						:items="availableYears"
						variant="outlined"
						single-line
						prepend-inner-icon="mdi-calendar"
					/>
				</v-col>
				<v-col cols="12" sm="6" md="3">
					<v-select
						:model-value="`${sortField}-${sortOrder}`"
						@update:model-value="handleSortChange"
						label="Sort by"
						:items="sortOptions"
						variant="outlined"
						prepend-inner-icon="mdi-sort"
						single-line
					/>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						:model-value="searchQuery"
						@update:model-value="setSearchQuery"
						label="Search launches..."
						prepend-inner-icon="mdi-magnify"
						variant="outlined"
						single-line
						clearable
					/>
				</v-col>
			</v-row>
		</div>
		<v-data-table
			:headers="headers"
			:items="sortedLaunches"
			:header-props="{ style: 'font-weight: bold;' }"
			:items-per-page="10"
			:items-per-page-options="[5, 10, 25, 50]"
			style="max-height: 588px"
		>
			<template v-slot:item.mission_name="{ item }">
				<NuxtLink
					:to="`/Launches/${item.id}`"
					class="text-decoration-none text-blue font-weight-bold"
				>
					{{ item.mission_name }}
				</NuxtLink>
			</template>

			<template v-slot:item.launch_site="{ item }">
				<div class="text-truncate" style="max-width: 200px">
					{{ item.launch_site?.site_name || 'Unknown' }}
				</div>
			</template>

			<template v-slot:item.details="{ item }">
				<div class="text-truncate" style="max-width: 300px">
					{{ item.details }}
				</div>
			</template>

			<template v-slot:item.actions="{ item }">
				<div class="d-flex justify-center">
					<v-btn
						variant="text"
						size="small"
						@click="favorites.toggleFavorite(item.id)"
						class="d-flex align-center"
						style="max-width: 110px"
					>
						<v-icon
							:color="favorites.isFavorite(item.id) ? 'red' : 'grey'"
							:class="{ 'mr-1': $vuetify.display.smAndUp }"
						>
							{{ favorites.isFavorite(item.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
						</v-icon>
						<span class="d-none d-sm-inline">
							{{ favorites.isFavorite(item.id) ? 'Unfavorite' : 'Favorite' }}
						</span>
					</v-btn>
				</div>
			</template>
		</v-data-table>
	</v-container>
</template>

<script lang="ts" setup>
// Set page title
useSeoMeta({
	title: 'SpaceX Launches - All Missions',
})

const favorites = useFavorites()

const headers = [
	{
		align: 'start' as const,
		key: 'mission_name',
		sortable: false,
		title: 'Mission Name',
	},
	{ key: 'launch_year', title: 'Launch Year', sortable: false },
	{ key: 'launch_site', title: 'Launch Site', sortable: false },
	{ key: 'rocket.rocket_name', title: 'Rocket Name', sortable: false },
	{ key: 'details', title: 'Details', sortable: false },
	{ key: 'actions', title: 'Actions', sortable: false, align: 'center' as const },
]

const query = gql`
	query getLaunches {
		launches {
			id
			mission_name
			launch_year
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
		launch_year: string
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
			details: launch.details
				? launch.details.length > 100
					? launch.details.substring(0, 100) + '...'
					: launch.details
				: 'No details available',
		})) ?? [],
)

// filter composable
const {
	selectedYear,
	searchQuery,
	sortField,
	sortOrder,
	availableYears,
	sortedLaunches,
	setYearFilter,
	setSearchQuery,
	setSorting,
} = useLaunchFilters(launches)

// Sort options for the dropdown (year only)
const sortOptions = [
	{ title: 'Year (Newest First)', value: 'launch_year-desc' },
	{ title: 'Year (Oldest First)', value: 'launch_year-asc' },
]

// sort change from dropdown
const handleSortChange = (value: string) => {
	const [field, order] = value.split('-') as [any, 'asc' | 'desc']
	setSorting(field, order)
}
</script>
