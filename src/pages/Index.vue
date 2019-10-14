<template>
	<section>
	  <m-header />
	  <cover/>
	  <info />
	  <utils/>
	  <prices />
	  <m-footer/>
	</section>
</template>
<script>
import MHeader from '../components/landing/Header'
import Cover from '../components/landing/Cover'
import Info from '../components/landing/Info'
import Utils from '../components/landing/Utils'
import Prices from '../components/landing/Prices'
import MFooter from '../components/landing/Mfooter'
export default {
	components: {
		MHeader,
		Cover,
		Info,
		Utils,
		Prices,
		MFooter
	},
	data () {
		return {
         openLogin: false
		}
	},
	created () {
	    if (process.browser) {
	        const AOS = require('aos')
	        require('aos/dist/aos.css')
	        AOS.init()
	     }
    },
    closeM () {
    	this.openLogin = false
    }
}	
/*
numero de folio 
# radico
demandante
demandado varios 
folios importantes clasificarlos
*/
</script>
<style>
	body {
		
	}
	h2 {
		font-weight: bold;
	}
	section {
	    min-height: 100vh;
	    position: relative;
	    overflow: hidden;
	    z-index: 1;
  	}
  	section > h3 {
  		margin: 0px;
  		font-weight: bold;
  	}
	  @-webkit-keyframes spin-right {
	  100% {
	    -webkit-transform: rotate(360deg);
	    -moz-transform: rotate(360deg);
	    -ms-transform: rotate(360deg);
	    -o-transform: rotate(360deg);
	    transform: rotate(360deg);
	  }
	}  
	  @media only screen and (max-width: 48em) {
	    .main h2 {
	      font-size: 2.5rem
	    }
	}    
</style>
