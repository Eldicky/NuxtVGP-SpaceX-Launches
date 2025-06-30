import { ref, computed, type Ref } from 'vue'

export interface Launch {
	id: string
	mission_name: string
	launch_year: string
	launch_site?: {
		site_name: string
	}
	rocket?: {
		rocket_name: string
	}
	details?: string | null
}

export type SortOrder = 'asc' | 'desc'
export type SortField = 'launch_year'

export const useLaunchFilters = (launches: Ref<Launch[]>) => {

  const selectedYear = ref<string>('')
	const searchQuery = ref<string>('')

	const sortField = ref<SortField>('launch_year')
	const sortOrder = ref<SortOrder>('desc')

	const availableYears = computed(() => {
		const years = launches.value.map((launch) => launch.launch_year).filter(Boolean)
		return [...new Set(years)].sort()
	})

	const filteredByYear = computed(() => {
		if (!selectedYear.value) return launches.value
		return launches.value.filter((launch) => launch.launch_year === selectedYear.value)
	})

	const filteredBySearch = computed(() => {
		if (!searchQuery.value.trim()) return filteredByYear.value

		const query = searchQuery.value.toLowerCase().trim()
		return filteredByYear.value.filter(
			(launch) =>
				launch.mission_name?.toLowerCase().includes(query) ||
				launch.rocket?.rocket_name?.toLowerCase().includes(query) ||
				launch.launch_site?.site_name?.toLowerCase().includes(query) ||
				launch.details?.toLowerCase().includes(query),
		)
	})

	// Sort launches by year only
	const sortedLaunches = computed(() => {
		const filtered = [...filteredBySearch.value]

		return filtered.sort((a, b) => {
			const aValue = parseInt(a.launch_year) || 0
			const bValue = parseInt(b.launch_year) || 0

			if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1
			if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1
			return 0
		})
	})

	const setYearFilter = (year: string) => {
		selectedYear.value = year
	}

	const setSearchQuery = (query: string) => {
		searchQuery.value = query
	}

	const setSorting = (field: SortField, order?: SortOrder) => {
		if (sortField.value === field && !order) {
			sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
		} else {
			sortField.value = field
			sortOrder.value = order || 'desc'
		}
	}

	const clearFilters = () => {
		selectedYear.value = ''
		searchQuery.value = ''
		sortField.value = 'launch_year'
		sortOrder.value = 'desc'
	}

	// Statistics
	const filterStats = computed(() => ({
		total: launches.value.length,
		filtered: sortedLaunches.value.length,
		isFiltered: selectedYear.value !== '' || searchQuery.value.trim() !== '',
	}))

	return {
		// State
		selectedYear: readonly(selectedYear),
		searchQuery: readonly(searchQuery),
		sortField: readonly(sortField),
		sortOrder: readonly(sortOrder),

		// Computed
		availableYears,
		sortedLaunches,
		filterStats,

		// Actions
		setYearFilter,
		setSearchQuery,
		setSorting,
		clearFilters,
	}
}
