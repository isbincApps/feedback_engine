import Firebase from 'firebase/app'
import 'firebase/auth'
import { Cookies } from 'quasar'

// import firebase from './firebase'

export default ({ app, router, Vue, store }) => {
  router.beforeEach((to, from, next) => {
    // Check to see if the route has the meta field "authRequired" set to true
    try {
      let authRequired = to.matched.some(route => route.meta.authRequired)
      const user = Firebase.auth().currentUser
      let isAuthenticated = user !== null
      console.log('el current user', Firebase.auth().currentUser)
      if (authRequired) {
        const cache = Cookies.get('user_auth')
        if (isAuthenticated || cache) {
          if (isAuthenticated)
            store.commit('auth/SET_USER', {
                id: user.uid,
                email: user.email,
            })
          else store.commit('auth/SET_USER', cache)
          // User is already signed in. Continue on.
          next()
        } else {
          // Not signed in. Redirect to login page.
          next('/')
        }
      } else {
        // Doesn't require authentication. Just continue on.
        next()
      }    
    } catch (e) {
      console.log('error route', e)
      next()
    }

  })
}