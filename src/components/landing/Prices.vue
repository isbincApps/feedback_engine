<template>
<section class="column q-px-lg items-center">
	<h3 style="margin-bottom: 50px">What It Costs!</h3>
	<div class="row q-gutter-x-md items-center">
	  <div v-for="it, k in items" :key="k" class="col column q-gutter-y-md shadow item q-pa-lg">
	  	<span>{{ it.name }}</span>
	  	<h5>{{ it.price }}</h5>
	  	<q-list>
		   <q-item v-for="j, l in it.list" :key="l">
		        <q-item-section avatar>
		          <q-icon v-if="j.active" color="positive" name="done" />
		          <q-icon v-else color="gray-9" name="error" />
		        </q-item-section>

		        <q-item-section style="text-align: left;">{{ j.name}}</q-item-section>
		   </q-item>
        </q-list>
	  	<q-btn label="BUY PLAN"  class="bt-info q-mt-lg" style="margin-top: 30px" size="md" :to="{path: 'signup'}"/>
	  </div>
	</div>
</section>	
</template>
<script>
export default {
	data () {
		return {
			items: [
              {name: 'Basic', price: '$0/month', list: [
                {active: true, name: '1 File upload per month'},
                {active: true, name: 'Dashboard w/ limitd Graph options'}, 
                {active: true, name: 'Single User Access'},   
              ]},
              {name: 'Pro', price: '$99/month', list: [
                {active: true, name: '10 Uploads per month'},
                {active: true, name: 'Full Graphic Dashboard'}, 
                {active: true, name: 'Dashboard-to-Report Downloads'}, 
                {active: true, name: 'Team access (up to 5 members)'} 
              ]},
              {name: 'Premium', price: '$499/month', list: [
                {active: true, name: 'Unlimited uploads'},
                {active: true, name: 'Full Graphic Dashboard'}, 
                {active: true, name: 'Multi Dashboar Capability'}, 
                {active: true, name: 'Dashboard-to-Report Downloads'}, 
                {active: true, name: 'Team access (Unlimited members)'}   
              ]}

			]
		}
	}
}	
</script>
<style scoped>
    section {
    	padding: 50px 30px;
    	margin-bottom: 60px
    }
	.item {
		border: 1px solid #ddd;
		padding-bottom: 50px;
		text-align: center;
	}
</style>