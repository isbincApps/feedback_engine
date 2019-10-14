<template>
    <q-form
      @submit="save"
      class="q-gutter-xs"
    >
     <h5>Sign Up for FREE!</h5>
      <q-input
        filled
        v-model="name"
        label="Your name"
        hint="Name"
        lazy-rules
        :rules="[ val => $v.name.required|| 'Please type something']"
      />

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

	   <q-select class="q-mb-lg" filled v-model="industry" :options="industrias" label="Industry" option-value="id" option-label="lbl" />

      <q-select filled v-model="plan" :options="planes" @input="changePrice" label="Plans" option-value="id" option-label="lbl" />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div class="q-mt-md column q-gutter-y-md">
        <q-btn label="Submit" type="submit" color="primary" :loading="loading"/>
        <q-btn flat color="primary" @click="openLogin = true">
          Already have an account? <strong style="color: #5763D8">Sign In</strong> 
     	</q-btn>
      </div>
      <login :open="openLogin" :close="closeM"/>
      <checkout :open="openCheck" :close="closeM" :total="price"/>
    </q-form>
</template>
<script>
import { required, email, numeric, minLength } from 'vuelidate/lib/validators'	
import Firebase from 'firebase'
export default {
	components:{
	    'login': () => import('../Login'),
      'checkout': () => import('../Checkout')
	},
	data () {
		return {
			openLogin: false,
      openCheck: false,
			name: '',
			pass: '',
			email: '',
			accept: false,
			loading: false,
			plan: {id: 'basic', lbl: 'Basic $0', price: 0},
      price: 0,
			planes: [
             {id: 'basic', lbl: 'Basic $0', price: 0},
             {id: 'Pro', lbl: 'Pro $99', price: 99},
             {id: 'premium', lbl: 'Premium $499', price: 499},
			],
			industry: '',
			industrias: [
             {id: 'education', lbl: 'Education'},
             {id: 'eCommerce', lbl: 'eCommerce'},
             {id: 'Finance', lbl: 'Finance'},
             {id: 'Healthcare', lbl: 'Healthcare'},
             {id: 'Transportation', lbl: 'Transportation'},
             {id: 'Marketing', lbl: 'Marketing'},
             {id: 'Entertainment', lbl: 'Entertainment'},
             {id: 'Entertainment', lbl: 'Entertainment'},
             {id: 'Entertainment', lbl: 'Entertainment'},
 			 {id: 'Sports', lbl: 'Sports'},
  			 {id: 'Technology', lbl: 'Technology'},
   			 {id: 'Retail', lbl: 'Retail'},
    		 {id: 'Insurance', lbl: 'Insurance'},
    		 {id: 'Hospitality', lbl: 'Hospitality'},
    		 {id: 'Science', lbl: 'Science'},
    		 {id: 'Agriculture', lbl: 'Agriculture'},
    		 {id: 'Real Estate', lbl: 'Real Estate'},
    		 {id: 'Telecom', lbl: 'Telecom'},
    		 {id: 'Sales', lbl: 'Sales'},
    		 {id: 'Banking', lbl: 'Banking'},
    		 {id: 'Travel', lbl: 'Travel'},
    		  {id: 'Dining', lbl: 'Dining'}
			]
		}
	},
	methods: {
    changePrice (d) {
     console.log('el change price', d)
     this.price = d.price
    },
		async save () {
			try {
			   let err = null
		     if (!this.accept) {
		     	err = 'please accept the terms'
		     }
			   this.$v.$touch()	
         if (this.$v.$invalid) {
             	console.log('form invalid')
             	err = 'Some fields are not valid'
         }	
         if (err) {
            this.$q.notify({message: err,
             		color: 'warning', icon: 'error'})
              	return
          }
          this.loading = true	
          if(this.plan.id	!== 'basic')
            this.openCheck = true
          else this.send(null)	
          // let user = await Firebase.auth().signInWithEmailAndPassword(this.email, this.pass)

			} catch (e) {
				console.log('error sign up')
				this.loading = false
				this.$q.notify({
					message: 'Something is wrong, please try later',
					color: 'negative',
					icon: 'error'
				})
			}
		},
    async send (token) {
      try {
        if (token) {
          console.log('el token', token, token.id)
          const rs = await this.$axios.post('https://us-central1-midterm-d9a0a.cloudfunctions.net/paystripe', {
            plan: `${this.plan.lbl} The Feedback Engine`,
            amount: this.plan.price,
            token: token.id
          })
        }
        const d = {
          name: this.name,
          email: this.email,
          industry: this.industry,
          plan: this.plan
        }
        const user = await this.$store.dispatch('auth/signUp', {email: d.email, password: this.pass})
        console.log('el user auth', user)
        this.$q.cookies.set('user_auth', user, {expires: 1})
        const users = this.$db.collection('users')
        await users.add({id: user.id, ...d})

        return this.$router.replace({path: '/home'})
        console.log('la d send', d)
        this.$q.notify({
          message: 'Sign up complete',
          color: 'positive',
          icon: 'done'
        })
      } catch (e) {
        console.log('bas request sing up', e)
        this.loading = false
        this.$q.notify({
          message: 'Something is wrong, please try later',
          color: 'negative',
          icon: 'error'
        })

      }
    }, 
		closeM (t, d) {
         if (t) {
          this.openCheck = false
          if (d) this.send(d)
          else this.loading = false  
         }
	       else this.openLogin = false
	    } 
	},
	validations: {
		name: {
          required
		}, 
		email: {
		  email,
		  required
		},
		pass: {
		  required,
		  minLength: minLength(6)
		}
	 }
}	
</script>