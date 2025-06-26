export const useFavorites = defineStore('favorites', {
	state: () => ({
		favorites: [] as string[],
	}),
	actions: {
		toggleFavorite(id: string) {
			if (this.favorites.includes(id)) {
        // Remove from favorites
        this.favorites = this.favorites.filter((favorite) =>
          favorite !== id
        )
        console.log(this.favorites)
        } else {
        // Add to favorites
        this.favorites.push(id)
        console.log(this.favorites)
      }

		},
		isFavorite(id: string) {
      return this.favorites.includes(id)
		},
    clearFavorites() {
      this.favorites = []
    },
	},
})
