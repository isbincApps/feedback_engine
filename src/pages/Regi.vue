<template>
	<section class="flex flex-center" id="sec-sign">
		<div class="box-frm">
			<m-form/>
		</div>
	</section>
</template>
<script>
import MForm from '../components/landing/Signup'
export default {
	components: {
		MForm
	}
}	
</script>
<style scoped>
	#sec-sign {
		background: #182538;
		width: 100%;
    	min-height: auto;
    	padding: 50px 0px;
	}
	.box-frm {
		position: relative;
	}
</style>