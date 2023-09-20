<template>
	<img v-if="!error" :src="src" @error="onImgLoadErr" />
	<img v-else :src="require('public/user-regular.svg')" class="img-err" />
</template>

<script>
export default {
	name: 'Pic',
	data: () => ({ error: false }),

	props: {
		src: {
			type: String,
			required: true,
		},
	},

	methods: {
		onImgLoadErr() {
			this.error = true;
		},
	},
};
</script>

<style lang="scss" scoped>
.img-err {
	width: 80px !important;
	margin: 10px 20px;
}
</style>
