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
	created() {},
	mounted() {},
	beforeUnmount() {},
	methods: {},
	computed: {},
	watch: {},
}
</script>