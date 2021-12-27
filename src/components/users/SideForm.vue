<template>
<slide-over :is-show="isShow" :width-class="`max-w-lg`">
	<div class="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
		<div class="flex-1">
			<!-- Header -->
			<div class="px-4 py-6 bg-gray-50 sm:px-6">
				<div class="flex items-start justify-between space-x-3">
					<div class="space-y-1">
						<div class="text-lg font-medium text-gray-900">
							{{ isEdit ? 'Update User' : 'Create User' }}
						</div>
					</div>
					<div class="h-7 flex items-center">
						<button type="button" class="text-gray-400 hover:text-gray-500" @click="close()">
							<span class="sr-only">Close panel</span>
							<XIcon class="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>

			<!-- Body -->
			<div class="px-4 py-6">
				<form @submit.prevent="submit" class="space-y-3">
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
						<div class="mt-1">
							<t-input :type="`text`" :value="user.name" v-model="user.name" class="w-full" />
						</div>
					</div>

					<div>
						<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
						<div class="mt-1">
							<t-input :type="`text`" :value="user.username" v-model="user.username" class="w-full" />
						</div>
					</div>

					<div>
						<label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
						<div class="mt-1">
							<t-input :type="`email`" :value="user.email" v-model="user.email" class="w-full" />
						</div>
					</div>

					<div>
						<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
						<div class="mt-1">
							<t-input :type="`password`" :value="user.password" v-model="user.password" class="w-full" />
						</div>
					</div>

					<div class="space-x-3 grid grid-cols-2">
						<div>
							<label for="mobile_phone" class="block text-sm font-medium text-gray-700">Mobile Phone</label>
							<div class="mt-1">
								<t-input :type="`number`" :value="user.mobile_phone" v-model="user.mobile_phone" class="w-full" />
							</div>
						</div>

						<div>
							<label for="roles" class="block text-sm font-medium text-gray-700">Language</label>
							<div class="mt-1">
								<VueMultiselect
									v-model="user.language"
									:options="userLanguages"
									:multiple="false"
									:close-on-select="true"
									placeholder="Select an option"
									label="name"
									track-by="id">
								</VueMultiselect>
							</div>
						</div>
					</div>

					<div>
						<label for="roles" class="block text-sm font-medium text-gray-700">Roles</label>
						<div class="mt-1">
							<VueMultiselect
								v-model="user.roles"
								:options="userRoles"
								:multiple="true"
								:close-on-select="false"
								placeholder="Select an option"
								label="name"
								track-by="id">
							</VueMultiselect>
						</div>
					</div>

					<div>
						<t-checkbox
							:label="`Verified`"
							:sub-label="``"
							:value="user.is_verified"
							v-model="user.is_verified"
						/>
					</div>

					<div>
						<t-checkbox
							:label="`Activated`"
							:sub-label="``"
							:value="user.is_active"
							v-model="user.is_active"
						/>
					</div>

					<div>
						<t-checkbox
							:label="`Banned`"
							:sub-label="``"
							:value="user.is_banned"
							v-model="user.is_banned"
						/>
					</div>

					<div>
						<t-checkbox
							:label="`Spectator`"
							:sub-label="`Simultaneous Login`"
							:value="user.is_spectator"
							v-model="user.is_spectator"
						/>
					</div>

					<div>
						<t-checkbox
							:label="`Notification Allowed`"
							:sub-label="``"
							:value="user.is_allow_notify"
							v-model="user.is_allow_notify"
						/>
					</div>

				</form>
			</div>
		</div>

		<!-- Action buttons -->
		<div class="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
			<div class="space-x-3 flex justify-end">
				<t-button :color="`purple-solid`" :is-loading="isSaving" :is-disabled="isSaving" @click="submit">
					{{ isEdit ? 'Update User' : 'Create User' }}
				</t-button>
				<t-button :color="`default`" :is-disabled="isSaving" @click="close">
					Cancel
				</t-button>
			</div>
		</div>
	</div>
</slide-over>
</template>

<script>
import { USER_DEFAULT, USER_ROLES, USER_LANGUAGES } from '@/databags/user';
import userApi from '@/api/user';
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css';

import { XIcon } from '@heroicons/vue/outline';
import { DotsVerticalIcon } from '@heroicons/vue/solid';
import SlideOver from '@/components/global/SlideOver.vue';
import TButton from '@/components/global/Button.vue';
import TInput from '@/components/form/Input.vue';
import TCheckbox from '@/components/form/Checkbox.vue';
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/vue';

export default {
	components: {
		DotsVerticalIcon,
		XIcon,
		SlideOver,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		TButton,
		TInput,
		VueMultiselect,
		TCheckbox,
	},
	props: {
		isShow: {
			type: Boolean,
			default: () => false,
		},
		item: {
			type: Object,
			default: () => null,
		},
	},
	data() {
		return {
			isSaving: false,
			user: this.__duplicateVar(USER_DEFAULT),
			userRoles: this.__duplicateVar(USER_ROLES),
			userLanguages: this.__duplicateVar(USER_LANGUAGES),
		}
	},
	mounted() {
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
		userRoleValues() {
			const roles = this.user.roles.map(curr => curr.id) || [];
			return roles;
		},
		userLanguage() {
			return this.user.language ? this.user.language.id : 'en';
		},
		params() {
			const params = {
				email: this.user.email,
				username: this.user.username,
				name: this.user.name,
				mobile_phone: this.user.mobile_phone,
				roles: JSON.stringify(this.userRoleValues),
				language: this.userLanguage,
				is_verified: this.user.is_verified,
				is_active: this.user.is_active,
				is_banned: this.user.is_banned,
				is_spectator: this.user.is_spectator,
				is_allow_notify: this.user.is_allow_notify,
			};
			return params;
		}
	},
	methods: {
		close() {
			this.$emit('close');
		},
		setData() {
			if (this.item) {
				this.user = this.item;

				// Roles
				let roles = this.__duplicateVar(this.user.roles);
				if (roles && typeof roles === 'string') roles = JSON.parse(roles);
				const selectedRoles = [];
				for (let index = 0; index < roles.length; index++) {
					const role = roles[index];
					const roleObj = this.userRoles.find(curr => curr.id === role);
					if (roleObj) selectedRoles.push(roleObj)
				}
				this.user.roles = selectedRoles;

				// Language
				const language = this.userLanguages.find(curr => curr.id === this.user.language);
				this.user.language = language;
			}
		},
		resetForm() {
			this.user = this.__duplicateVar(USER_DEFAULT);
		},
		submit() {
			if (this.isEdit) this.update();
			else this.save();
		},
		update() {
			const params = this.params;
			if (this.user.password) params.password = this.user.password;

			this.isSaving = true;
			const callback = (response) => {
				const item = response.data;
				this.$emit('onUpdate', item);
				this.isSaving = false;
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			userApi.update(this.user.id, params, callback, errorCallback);
		},
		save() {
			const params = this.params;
			if (this.user.password) params.password = this.user.password;

			this.isSaving = true;
			const callback = (response) => {
				const item = response.data;
				this.$emit('onCreate', item)
				this.isSaving = false;
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			userApi.create(this.params, callback, errorCallback);
		},
	},
}
</script>