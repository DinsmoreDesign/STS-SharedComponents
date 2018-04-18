<template>

    <div class="loader-overlay">
        <div class="loader"></div>
    </div>

</template>




<script>

    export default {
        
    }

</script>




<style lang="scss" scoped>

    .loader-overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		background: rgba(255,255,255,0.9);

		.loader {
			border-right-color: transparent;
			border-top-color: transparent;
			top: 50%;
			margin: auto;
			width: 50px;
			height: 50px;
		}
	}

</style>