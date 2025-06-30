export default defineNuxtRouteMiddleware((to) => {
  const validRoutes = [
    '/',
    '/Favorites',
    '/Launches'
  ]

  const isValidRoute = validRoutes.some(route => {
    if (to.path === route) return true
    
    if (route === '/Launches' && to.path.startsWith('/Launches/')) {
      const id = to.path.split('/')[2]
      return id && id.length > 0
    }
    
    return false
  })

  if (!isValidRoute) {
    return navigateTo('/')
  }
})
