<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          {{ getTitle }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>The Feedback Engine</q-item-label>
        <q-item v-for="(i, k) in items" :to="i.path" :key="k" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="secondary" text-color="white" :icon="i.icon" />
          </q-item-section>
           <q-item-section>{{i.name}}</q-item-section>
        </q-item>
         <q-item v-ripple clickable @click.native="logOut()">
          <q-item-section avatar>
            <q-avatar color="secondary" text-color="white" icon="exit_to_app" />
          </q-item-section>
           <q-item-section>log Out</q-item-section>
        </q-item>
       </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  //website feedbackengine.surge.sh
import { mapGetters } from 'vuex'   
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false,
      items: [
         {name: 'Dashboard', path: '/home', icon: 'home', color: 'bt-blue'},
          {name: 'Upload', path: '/upload', icon: 'cloud_upload', color: 'bt-blue'}, 
      ]   
    }
  },
  methods: {
    async logOut () {
      try {
       await this.$store.dispatch('auth/signOut')
        this.$q.cookies.remove('user_auth')
        return this.$router.replace({path: '/'})       
      } catch (e) {
        console.log('error sign out', e)
      }

    }
  },
  computed: {
      ...mapGetters({
        getTitle: 'app/getTitle'
      })
  },   
}
</script>
