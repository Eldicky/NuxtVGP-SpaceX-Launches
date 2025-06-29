import { defineStore } from 'pinia'

export const useFavorites = defineStore('favorites', {
	state: () => ({
		favorites: [] as string[],
	}),
	getters: {
		getFavorites: (state) => state.favorites,
	},
	actions: {
		toggleFavorite(id: string) {
			const index = this.favorites.indexOf(id)
			if (index > -1) {
				this.favorites.splice(index, 1)
			} else {
				this.favorites.push(id)
			}
		},
		isFavorite(id: string): boolean {
			return this.favorites.includes(id)
		},
		clearFavorites() {
			this.favorites = []
		},
	},
})
