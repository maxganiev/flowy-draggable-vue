<template>
	<div
		class="h-screen w-screen bg-gray-200 flex flex-col flex-no-wrap overflow-none"
		style="height: auto; min-height: 100vh"
	>
		<Spinner :loading="store.loading" />
		<Scaler />
		<div class="panel-bottom">
			<CheckSwitch
				:labelContent="`${!showGrid ? 'Показать сетку' : 'Скрыть сетку'}`"
				:styling="{
					holder: {
						backgroundColor: '#fe6b0c',
						color: '#fff',
						display: 'flex',
						'align-items': 'center',
						'justify-content': 'space-evenly',
					},
					label: { fontSize: '0.8rem' },
				}"
				@onChange="showGrid = !showGrid"
			/>
			<div class="submit-changes" v-if="store.shemaIsUpdated && showSchemaUpdateWarning">
				<BtnSubmit @onSubmit="updateSchema" content="Сохранить изменения" :classList="['subbutton']" />
				<a class="close-submit" href="#" @click.prevent="store.toggleShemaStatus(false)">&#10754;</a>
			</div>
		</div>
		<Alert :alert-type="alert.type" :show="alert.show" :HTMLContent="alert.HTMLContent" />
		<Aside v-if="renderUsersTab" :users="store.users" />
		<div class="flex-grow flex-row flex-no-wrap overflow-hidden" style="z-index: 100">
			<div class="scheme-label"><h3>Название схемы</h3></div>
			<div class="flex-grow overflow-auto scheme-wrapper" id="schemeWrapper" ref="schemeWrapper">
				<flowy
					v-if="store.nodes.length > 0"
					class="h-full w-full p-6"
					:nodes="store.nodes"
					:scale="store.schemaTransVals.scale"
					:showGrid="showGrid"
					@drag-start="onDragStart"
					@add="add"
					@move="move"
					@remove="remove"
					:beforeAdd="beforeAdd"
					:beforeMove="beforeMove"
				></flowy>
			</div>
		</div>

		<UserEditForm v-if="store.showUserEditForm" />
	</div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable no-unused-vars */
import { getCurrentUser } from '../demo_data/getCurrentUser';
import { store } from '@/store';
import { User } from '@/lib/constructors/User';
import { Block } from '@/lib/constructors/Block';
import Spinner from 'elements/Spinner.vue';
import Scaler from 'elements/Scaler.vue';
import BtnClose from 'elements/BtnClose.vue';
import UserEditForm from 'modules/UserEditForm.vue';
import Aside from 'modules/Aside.vue';
import BtnSubmit from 'elements/BtnSubmit.vue';
import Alert from 'modules/Alert.vue';
import CheckSwitch from 'elements/CheckSwitch.vue';

export default {
	name: 'SchemaApp',

	data: () => ({
		store,
		users: [],
		dragging: false,
		renderUsersTab: false,
		schemeWrapper: null,
		alert: {
			type: 'success',
			show: false,
			HTMLContent: '',

			setAlert(type, show, content) {
				this.type = type;
				this.show = show;
				this.HTMLContent = content;

				setTimeout(() => {
					this.show = false;
				}, 3000);
			},
		},
		showGrid: false,
	}),

	components: {
		Spinner,
		Scaler,
		BtnClose,
		UserEditForm,
		Aside,
		BtnSubmit,
		Alert,
		CheckSwitch,
	},

	computed: {
		showSchemaUpdateWarning() {
			return store.shemaIsUpdated;
		},
	},

	async created() {
		store.toggleLoading();
		await getCurrentUser().then(async (res) => {
			store.getUser(res);
			//here we check if current user is allowed to update scheme
			this.renderUsersTab = store.adminsIds.includes(store.user.id);
			store.getNodes();
		});
		store.toggleLoading();

		await fetch(store.apiOrigin + 'api/bring_friend/get_list', {}).then(async (res) =>
			console.log(await res.json())
		);
	},

	methods: {
		beforeAdd(event) {
			console.log('before add', event);
			store.removeAddedUser(event.to.data.id);

			return true;
		},

		onEnterDrop(event) {
			console.log('entered drop');
			return true;
		},

		beforeMove({ to, from }) {
			console.log(to, from);

			if (from) {
				const moveAllowed = this.moveAllowed(from).pushTree(to);
				if (from.id === '1' || !moveAllowed) {
					return false;
				}
			}

			return true;
		},

		moveAllowed(from) {
			const parentTree = [];

			return {
				pushTree(draggedNode) {
					const parentNode = store.nodes.find((node) => node.id === draggedNode.parentId);

					if (!parentNode) return true;
					parentTree.push(parentNode.id);

					this.pushTree(parentNode);
					return parentTree.includes(from.id) ? false : true;
				},
			};
		},

		addNode(_event) {
			//this.nodes.push(_event.node);
			store.addNode(_event.node);
			store.toggleShemaStatus(true);
		},

		remove(event) {
			store.removeNode(event.node.id);
			store.toggleShemaStatus(true);
		},

		move(event) {
			console.log('move', event, store.nodes);
			const { dragged, to } = event;
			dragged.parentId = to.id;
			//dragged.top = to.top;

			store.toggleShemaStatus(true);
		},

		add(event) {
			const { id, top, descr } = event.node.data;
			const { parentId } = event.node;
			console.log(event);

			let newNode = {};

			if (event.node.data.type === 'user') {
				const { dep_id, full_name_short, avatar_thumb, position_name, tags } = event.node.data;
				newNode = new User(
					parentId,
					id,
					dep_id,
					full_name_short,
					avatar_thumb,
					position_name,
					descr,
					top,
					tags
				);
			} else newNode = new Block(parentId, id, descr, top);

			console.log(newNode);

			store.addNode(newNode);
			store.toggleShemaStatus(true);
		},

		onDragStart(event) {
			console.log('onDragStart', event);
			this.dragging = true;
		},

		updateSchema() {
			store.saveNodes();
			this.alert.setAlert('success', true, '<h4> Схема успешно обновлена </h4>');
			store.toggleShemaStatus(false);
		},
	},
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,700;1,300&display=swap');

* {
	-ms-overflow-style: none;
	scrollbar-width: none;
}

*::-webkit-scrollbar {
	display: none;
	background-color: #000;
}

html,
body {
	font-family: 'Montserrat', sans-serif;
	font-size: 15px;
	position: relative;
	margin: 0;
	padding: 0;
	height: 100%;
	color: #333;
	letter-spacing: 1px;
	background: #f5f5f5;
	font-weight: 300;
}

.flowy {
	background-repeat: repeat;
	background-size: 30px 30px;
	background-color: $clr-milk;
	cursor: grab;
	min-height: 100vh;
}

input[type='text'],
textarea {
	border-radius: 10px;
	height: 30px;
	border: $border-main;
	padding: 1.5px 6.6px;

	&:focus {
		outline: none !important;
		box-shadow: 0px 0px 0px 1.5px rgba(0, 144, 237, 0.4);
	}
}

.bg-gray-200 {
	background-color: $clr-milk !important;
}

div {
	position: relative;
	z-index: 0;
}

.no-wrap {
	white-space: nowrap;
}

h1 {
	margin: 0;
}

h4 {
	font-weight: 700;
	font-size: 0.95rem;
	line-height: 1.2rem;
}

.dropzone {
	width: 100px;
	height: 100px;
	border: 1px dotted black;
}

.drag-handle-wrapper {
	position: absolute;
	top: 10px;
	right: 10px;

	.flowy-drag-handle {
		cursor: grab;
	}
}

a {
	text-decoration: none;
}

.scheme-label {
	text-align: center;
	font-weight: 700;
	padding: 10px 0;
	color: $clr-orange;
	font-size: $fs-lg;
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100%;
	height: auto;
	background-color: $clr-milk;
}

.page {
	position: relative;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
}

.page:nth-child(2n) {
	background: #f0f0f0;
}
.page.main {
	z-index: 1;
	min-height: 700px;
}

.panel-bottom {
	position: fixed;
	z-index: 200;
	bottom: 0;
	left: 0;
	min-height: 40px;
	width: 100%;
	display: grid;
	grid-template-columns: 15% 85%;

	&::after {
		content: '';
		background-color: rgba(255, 255, 255, 0.9);
		position: absolute;
		top: 0;
		left: 15%;
		width: 85%;
		height: 100%;
		z-index: -1;
		filter: blur(2px);
	}

	.submit-changes {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		background-color: $clr-orange;

		.subbutton {
			background-color: transparent !important;
			margin: unset !important;
			width: 95%;
			border-radius: unset !important;
		}

		.close-submit {
			width: 5%;
			color: #fff;
			transition: transform 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);

			&:hover {
				transform: scale(1.05);
			}
		}
	}
}

.scheme-wrapper,
.users-tab-wrapper,
.btn-swipe-collapse {
	transition: all 0.3s ease-in-out 0s;
}

.scheme-wrapper {
	flex: 1;
}

button {
	&:focus {
		outline: none !important;
		box-shadow: 0px 0px 0px 3px rgba(0, 144, 237, 0.4);
	}

	&:hover {
		opacity: 0.8;
		transition: all 0.4s ease-out;
	}
}

.container {
	height: 100%;
	position: relative;
	width: auto;
	margin: auto;
}

.description {
	text-align: center;
}

.example-block {
	width: 320px;
}

.user-block.draggable-item.draggable-mirror,
.flowy-block.draggable-mirror,
.flow-block-tab.draggable-mirror {
	//opacity: 1;
	display: none;
}
</style>
