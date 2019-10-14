<template>
  <section class="column q-px-lg">
	<h3 style="margin: auto; margin-top: 50px; margin-bottom: 50px;font-weight: bold; margin: auto;">What You’ll Learn</h3>
	<div class="row q-gutter-md" style="margin-top: 30px">
	  <div v-for="it, k in items" :key="k" class="col column q-gutter-y-md shadow item q-pa-lg">
	  	<q-btn round :icon="it.icon" class="bt-test" size="lg"/>
	  	<h5>{{ it.title }}</h5>
	  	<p>
	  		{{ it.desc }}
	  	</p>
	  </div>
	</div>
  </section>		
</template>
<script>
export default {
	data () {
		return {
			items: [
              {icon: 'visibility', title: 'What Customers Are Saying', desc: "Categorizing customer feedback helps to identify if your product is truly meeting the customer’s need"},
              {icon: 'turned_in_not', title: "What Customers Don't Like", desc: "Understanding what people are saying about your competitors can give your next product or service a market advantage"},
              {icon: 'timeline', title: 'What Customers Want', desc: 'Summarizing features that customers want from your brand ensures that your next big idea will be a successful'}
			]
		}
	}
}	
</script>
<style scoped>
    .bt-info {
    	color: #fff;
      background-image: linear-gradient(to right top, #5763d8, #706de2, #8877ec, #9d81f5, #b28cff);
    }
	section {
		margin: 30px 0px;
		padding-bottom: 50px;
		min-height: auto
	}
	.item {
		border-radius: 10px;
		padding: 20px 30px
	}
	.item h5 {
		margin-bottom: 5px;
	}
</style>