<template>
</template>

<script>

export default {
	components: {
	},
	data() {
		return {
		}
	},
	setup() {
		return {
		}
	},
	created() {
		this.doLogout();
	},
	methods: {
		doLogout() {
			console.log('DO LOGOUT');
			this.$store.dispatch('auth/clearAuth');
			this.$router.push('/login');
		},
	},
}
</script>