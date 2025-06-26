<template>
  <v-container>
    <h1>SpaceX Space Ship Launches</h1>
    <v-table>
      
    </v-table>
  </v-container>
</template>

<script lang="ts" setup>
const query = gql`
	query getShips {
		ships {
			id
			name
			active
		}
	}
`
const { data } = useAsyncQuery<{
	ships: {
		id: string
		name: string
		active: boolean
	}[]
}>(query)
const ships = computed(() => data.value?.ships ?? [])
</script>