<template>
    <v-container class="d-flex flex-grow-1 justify-center flex-column">
        <h1>SpaceX Space Ship Launches</h1>
        <p>There are {{ launches?.length || 0 }} launches.</p>

        <div class="mt-5 d-flex ga-10">
            <v-select
                v-model="yearSelected"
                clearable
                label="Select Year"
                :items="listOfYears"
                variant="outlined"
                single-line
            ></v-select>
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
            <template v-slot:item.mission_name="{ item }" >
                <NuxtLink :to="`/Launches/${item.id}`" class="text-decoration-none text-blue font-weight-bold">
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
                <v-btn icon variant="text" size="small" @click="favorites.toggleFavorite(item.id)">
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

const favorites = useFavorites()
const search = ref('')
// need to fix year filtering
const yearSelected = ref('');
let listOfYears: string[] = [];

const headers = [
    {
        align: 'start' as const,
        key: 'mission_name',
        sortable: true,
        title: 'Mission Name',
    },
    { key: 'launch_year', title: 'Launch Year' },
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

launches.value.map((launch) => {
    if (!listOfYears.includes((launch.launch_year))) {
        listOfYears.push((launch.launch_year));
        return launch.launch_year;
    } 
})
</script>
