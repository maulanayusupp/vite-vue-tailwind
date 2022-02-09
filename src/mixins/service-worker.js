export default {
	data() {
		return {
			__updateSW: null,
			__offlineReady: false,
			__needRefresh: false  
		};
	},
	async mounted() {
		await this.initSW();
	},
	methods: {
		async __closePromptUpdateSW() {
			this.__offlineReady = false;
			this.__needRefresh = false;
		},
		async initSW() {
			try {
				const { registerSW } = await import("virtual:pwa-register");
				const vm = this;
				this.__updateSW = registerSW({
					immediate: true,
					onOfflineReady() {
						vm.__offlineReady = true;
						vm.__onOfflineReadyFn();
					},
					onNeedRefresh() {
						vm.__needRefresh = true;
						vm.__onNeedRefreshFn();
	
					},
					onRegistered(swRegistration) {
						swRegistration && vm.handleSWManualUpdates(swRegistration);   
					},
					onRegisterError(e) {
						vm.handleSWRegisterError(e);    
					}  
				});
			} catch {
				console.log("PWA disabled.");
			}
		},
		openUrl(url) {
			// console.log(url);
			window.open(url, '_blank');
		},
		__onOfflineReadyFn() {
			console.log("onOfflineReady");
		},
		__onNeedRefreshFn() {
			console.log("onNeedRefresh");
		},
		__updateServiceWorker() {
			this.updateSW && this.updateSW(true);
		},
		handleSWManualUpdates(swRegistration) {}, 
		handleSWRegisterError(error) {} 
	}
};