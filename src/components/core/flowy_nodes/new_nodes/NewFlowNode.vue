<template>
	<div class="user-block p-2 mb-4 rounded border border-gray-300">
		<div class="flex flex-row flex-no-wrap ml-2">
			<div class="flex flex-row flex-no-wrap justify-start items-center main-info-wrapper">
				<div class="thumb-wrapper">
					<Pic :src="'https://portal.elcomspb.ru/' + currentNode.data.avatar_thumb" />
				</div>

				<div class="text-wrapper">
					<p>
						{{ currentNode.data.position_name }}
					</p>
					<a :href="`${currentNode.data.profileUrl}`"> {{ currentNode.data.full_name_short }} </a>
				</div>

				<BtnCreateSeparateNode
					:node="currentNode"
					@createSeparateNode="store.removeAddedUser(node.id)"
				/>

				<flowy-drag-handle>
					<div class="flex-none mt-2 mr-2">
						<img :src="require('public/demo_assets/grabme.svg')" />
					</div>
				</flowy-drag-handle>
			</div>
		</div>
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
import BtnCreateSeparateNode from 'elements/BtnCreateSeparateNode.vue';
import { store } from '@/store';
import Pic from 'elements/Pic.vue';

export default {
	data: () => ({
		store,
		avaTemplate: null,
	}),

	props: {
		node: {
			type: Object,
			required: true,
		},
	},

	computed: {
		currentNode() {
			return this.$props.node;
		},
	},

	components: { BtnCreateSeparateNode, Pic },
};
</script>

<style lang="scss" scoped>
.user-block {
	background-color: $clr-emerald;
	width: $block_width;
	height: $block_height;
	border-radius: 20px;
	font-size: $fs-mid-reg;

	.flex.flex-row.flex-no-wrap.ml-2 {
		width: 100%;
		margin: 0;
		padding: 5px;

		.main-info-wrapper {
			width: 100%;
			justify-content: space-between;
			column-gap: 15px;

			.flowy-drag-handle {
				align-self: flex-start;
				min-height: 20px;
				min-width: 20px;
			}

			.flowy-drag-handle :hover {
				cursor: grab;
			}

			.thumb-wrapper {
				width: $thumb-width;
				height: $thumb-height;
				border-radius: $thumb_border_radius;
				// max-width: 120px;
				// max-height: 120px;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
					max-height: 100px;
					object-fit: contain;
				}
			}

			.text-wrapper {
				max-width: 150px;
				font-size: $fs-mid-reg;
				color: #fff;
				height: 80%;
				color: #fff;
				text-align: center;

				a {
					font-weight: 700;
					margin-top: 10px;
					display: block;
				}
			}

			button {
				position: absolute;
				bottom: 15px;
				right: 1px;
				font-size: $fs-mid-reg !important;
			}
		}
	}
}
</style>
