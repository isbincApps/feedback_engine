import Firebase from 'firebase'

export default {
  namespaced: true,

  state: {
    user: {}
  },

  getters: {
    user (state) {
      return state.user
    },

    isAuthenticated (state) {
      return !!state.user
    }
  },

  mutations: {
    SET_USER (state, payload) {
      let user = payload
      state.user = user
    },

    RESET_USER (state) {
      state.user = null
    }
  },

  actions: {
    async signUp ({commit}, payload) {
      try {
        const u = await Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        console.log('el user firebase', u.user)
        const newUser = {
              id: u.user.uid,
              email: u.user.email,
        }
        commit('SET_USER', newUser)
        return newUser
      } catch (e) {
        console.log('error signup', e)
        throw(e)
      }
    },
    async signIn ({ commit }, payload) {
      try {
       let email = payload.email
       let password = payload.password

       const user = await Firebase.auth().signInWithEmailAndPassword(email, password)
        commit('SET_USER', user)
        return user
      } catch (e) {
        console.log('error login', e)
        throw (e)
      }
    },

    async signOut ({ commit }) {
      await Firebase.auth().signOut()
        .then(() => {
          commit('SET_USER', {})
        })
    }
  }
}