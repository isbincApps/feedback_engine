<template>
 <section class="flex row items-start">
 	<div class="col col-5 q-ma-lg" id="box-intro">
 		<!--h2>Sentiment analysis</h2-->
	 	<h3>Taking The Guesswork Out Of Finding Your Next Big Product Idea!!</h3>
	 	<!--
	 	<q-btn label="Login" class="bt-main" @click="openLogin = true" />
	 -->
 	</div>
 	<div class="col box-img">
 	  <div class="box-frm shadow absolute-center">
 	  	<sign-up/>
 	  </div>
 	  <!--	
      <img
        src="~assets/header-illustration-light.svg">
       <img
        src="~assets/hero-media-illustration-light.svg"> 
    -->
 	</div>
 </section>	
</template>
<script>
import SignUp from './Signup'
export default {
	components:{
		SignUp,
	    // 'login': () => import('../Login')
	},
	data () {
		return {
		}
	},
	methods: {
 
	}
}
</script>
<style scoped>
	section {
		height: 110vh
	}
    .box-img  {
    	position: relative;
    }
    .box-img:before {
    	content: '';
    	position: absolute;
    	right: 25px;
    	width: 600px;
    	height: 600px;
    	border-radius: 50%;
        background-image: linear-gradient(to right, #fece7e, #fdbe66, #fdad4f, #fd9b39, #fe8725);


    }
	.box-img > img {
      position: absolute;
      right: 0;
	}
	#box-intro {
		margin-top: 150px;
		margin-left: 50px;
	}
	#box-intro h1 {
       font-weight: bold;
       font-size: 2.8rem
	}
	#box-intro h3 {
		font-weight: bold;
	}
	
	.box-frm {
		margin-top: 52%;
	}
	
</style>