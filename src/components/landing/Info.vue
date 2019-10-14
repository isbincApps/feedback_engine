<template>
<section class="column q-px-lg items-center">
    <h3 style="margin: 0px; font-weight: bold;">How It Works!</h3>
    <!--
    <h5 style="font-size: 1.3rem">The Feedback Engine is a powerful natural language processor that sifts through customer feedback to highlight the best ideas for new products or services.</h5> 
-->
	<div class="row q-gutter-x-lg items-center justify-between" style="width: 100%; margin-top: 50px">
	   <q-card v-for="it, k in items" :key="k" class="item shadow">
	      <img :src="'statics/' + it.img">
	      <q-card-section>
	        {{ it.txt }}
	      </q-card-section>
	    </q-card>
	</div>
</section>	
</template>
<script>
export default {
	data () {
		return {
			items: [
              {img: 'img2.png', txt: 'Upload your customer service responses, product reviews, and social media comments in any format'},
              {img: 'img1.png', txt: 'The Feedback Engine maps your data to key indicators highlighting problems and features that customer are constantly talking about'},
              {img: 'img3.png', txt: 'Producing an easy-to-understand dashboard that your team can use to improve an existing product or launch a new one'},
			]
		}
	}
}	
</script>
<style scoped>
    section {
    	margin-top: 50px;
    	padding: 50px 30px
    }
	.item {
		width: 100%;
  		max-width: 300px;
		border: 1px solid #eee;
		text-align: center;
		font-size: 1rem
	}
	.item img {
		height: 230px
	}
	.item:after {
		content: '\0000BB';
		position: absolute;
		width: 50px;
		height: 50px;
		line-height: 45px;
		border-radius: 50%;
		top: 40%;
		color: #fff;
		font-size: 1.8rem;
        right: -35%;
        /*
		background-image: linear-gradient(to right, #fece7e, #fdbe66, #fdad4f, #fd9b39, #fe8725);
		*/
		background: rgba(254,206,126, .6);
		color: #fe8725	

	}
	.item:last-child:after {
		display: none;
	}
</style>
</style>