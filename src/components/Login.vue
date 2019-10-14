<template>
    <q-dialog
      v-model="mOpen">
      <q-card style="width: 300px; max-width: 80vw;" class="q-pa-lg">
	    <q-form
	      @submit="save"
	      class="q-gutter-sm"
	    >
	     <h5>Login</h5>
	      <q-input
	        filled
	        type="email"
	        v-model="email"
	        label="E-mail"
	        lazy-rules
	        :rules="[
	          val => $v.email.required || 'Please type your E-mail',
	          val => $v.email.email || 'wrong E-mail'
	        ]"
	      />
	      <q-input
		      	filled
		        type="password"
		        v-model="pass"
		        label="Password"
		        lazy-rules
		        :rules="[
		          val => $v.pass.required || 'Please type the password',
		          val => $v.pass.minLength || 'At least 6 characters' 
		    ]"/>


	      <div>
	        <q-btn label="Submit" type="submit" :loading="loading" color="primary"/>
	      </div>
	    </q-form>
	 </q-card>
	</q-dialog>    
</template>
<script>
import { required, email, numeric, minLength } from 'vuelidate/lib/validators'	
export default {
	props: ['open', 'close'],
	data () {
		return {
			mOpen: false,
			email: '',
			pass: '',
			loading: false,
		}
	},
	methods: {
		async save () {
			try {
               this.$v.$touch()	
		       let err = null
		       if (this.$v.$invalid) {
		          err = 'Some fields are not valid'
		       }
		       if (err) {
		            this.$q.notify({message: err,
		             		color: 'warning', icon: 'error'})
		              	return
		        }
		        this.loading = true	
                const user = await this.$store.dispatch('auth/signIn', {email: this.email, password: this.pass})
                console.log('user login cookie', user)
                this.$q.cookies.set('user_auth', user, {expires: 1})
		        return this.$router.replace({path: '/home'})
		        this.loading = false
			} catch (e) {
				console.log('error sign in', e)
				this.loading = false
				this.$q.notify({
					message: 'Error Log in',
					color: 'negative',
					icon: 'error'
				})
			}
		}
	},
	validations: { 
		email: {
		  email,
		  required
		},
		pass: {
		  required,
		  minLength: minLength(6)
		}
	 },
	watch: {
		open (v) {
         this.mOpen = v
		},
		mOpen (v) {
         if (!v) this.close()
		}
	} 
}	
</script>