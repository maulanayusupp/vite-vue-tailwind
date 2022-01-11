<template>
	<div>
		<wedding-form
			:event="event"
		/>
	</div>
</template>
<script>

import { EVENT_DEFAULT } from '@/databags/event';
import WeddingForm from '@/components/events/forms/WeddingForm.vue';

export default {
	components: {
		WeddingForm,
	},
	data() {
		return {
			event: EVENT_DEFAULT,
		}
	},
<<<<<<< HEAD
	setup() {
		const date = ref(new Date());
		return {
			date,
		};
	},
	watch: {
		isShow() {
			if (!this.isShow) {
				this.resetForm();
			}
		},
		item() {
			this.setData();
		},
	},
	computed: {
		isEdit() {
			return this.item && this.item.id;
		},
		params() {
			const params = this.event;
			params.settings = typeof this.event.settings !== 'string' ? JSON.stringify(this.event.settings) : JSON.stringify({});
			params.custom_attendees = typeof this.event.custom_attendees !== 'string' ? JSON.stringify(this.event.custom_attendees) : JSON.stringify([]);
			return params;
		}
	},
	methods: {
		close() {
			this.$emit('onClose');
		},
		setData() {
			if (this.item) {
				this.event = this.__duplicateVar(this.item);
			}
		},
		resetForm() {
			this.event = this.__duplicateVar(EVENT_DEFAULT);
		},
		submit() {
			if (this.isEdit) this.update();
			else this.save();
		},
		update() {
			const params = this.params;
			this.isSaving = true;
			const callback = (response) => {
				const item = response.data;
				this.$emit('onUpdate', item);
				this.isSaving = false;

				const message = response.message;
				this.__showNotif('success', 'Event', message);
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			eventApi.update(this.event.id, params, callback, errorCallback);
		},
		save() {
			const params = this.params;
			this.isSaving = true;
			const callback = (response) => {
				const item = response.data;
				this.$emit('onCreate', item);
				this.isSaving = false;

				const message = response.message;
				this.__showNotif('success', 'Event', message);
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			eventApi.create(this.params, callback, errorCallback);
		},
	},
=======
	created() {},
	mounted() {},
	beforeUnmount() {},
	methods: {},
	computed: {},
	watch: {},
>>>>>>> c673ba5 (Update libraries and other functionalities)
}
</script>