<template>
	<div class="flow-block-tab">
		<flowy-drag-handle>
			<div class="flex-none mt-2 mr-2">
				<img :src="require('public/demo_assets/grabme.svg')" />
			</div>
		</flowy-drag-handle>

		<div class="text-wrapper" v-html="description"></div>
	</div>
</template>

<style lang="scss">
.user-block {
	width: auto;
}
.bg-white {
	background-color: #ffffff;
}
</style>

<script>
/* eslint-disable no-unused-vars */

export default {
	props: {
		descr: {
			type: String,
			required: true,
		},
	},

	computed: {
		description() {
			if (['http', 'https'].some((d) => this.descr.toLowerCase().includes(d)))
				return `<a href="${this.descr}" target="_blank" class="block-link-label">${
					this.descr.length > 19 ? this.descr.slice(0, 19) + '...' : this.descr
				}</a>`;
			if (['@', 'mailto'].some((d) => this.descr.toLowerCase().includes(d)))
				return `<a href="mailto:"${this.descr}" class="block-link-label">${this.descr}</a>`;
			return `<p>${this.descr}</p>`;
		},
	},
};
</script>

<style lang="scss" scoped>
.flowy-drag-handle {
	position: absolute;
	right: 5px;
	top: 5px;
}

.flowy-drag-handle :hover {
	cursor: grab;
}

.flow-block-tab {
	display: flex;
	padding: 5px 10px;
	min-height: 200px;
	max-height: 100%;
	justify-content: center;
	align-items: center;
	color: #fff;
	background: $clr-emerald;
	margin: 20px 10px;
	border-radius: 30px;
	z-index: 200;
}
</style>
