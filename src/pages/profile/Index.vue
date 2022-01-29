<template>
<div class="h-full">
	<main class="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
		<div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
			<!-- Side Navigations -->
			<aside class="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
				<nav class="space-y-1">
					<a
						v-for="item in subNavigation"
						:key="item.name"
						:href="item.href"
						:class="[item.current ? 'bg-gray-50 text-orange-600 hover:bg-white' : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50', 'group rounded-md px-3 py-2 flex items-center text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">
						<component
							:is="item.icon"
							:class="[item.current ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500', 'flex-shrink-0 -ml-1 mr-3 h-6 w-6']"
							aria-hidden="true"
						/>
						<span class="truncate">{{ item.name }}</span>
					</a>
				</nav>
			</aside>

			<!-- Body -->
			<div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
				<!-- Profile -->
				<section aria-labelledby="payment-details-heading">
					<form action="#" method="POST">
						<div class="shadow sm:rounded-md sm:overflow-hidden">
							<div class="bg-white py-6 px-4 sm:p-6">
								<div>
									<h2 class="text-lg leading-6 font-medium text-gray-900">Profile</h2>
									<p class="mt-1 text-sm text-gray-500">
										This information will be displayed publicly so be careful what you share.
									</p>
								</div>

								<form class="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
									<!-- Profile section -->
									<div class="pb-8">
										<div class="mt-6 flex flex-col lg:flex-row">
										<div class="flex-grow space-y-6">
											<div>
												<label for="username" class="block text-sm font-medium text-gray-700">
													Username
												</label>
												<div class="mt-1 rounded-md shadow-sm flex">
													<span class="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
													next.com/
													</span>
													<input type="text" name="username" id="username" autocomplete="username" class="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300" :value="user.handle" />
												</div>
											</div>

											<div>
												<label for="about" class="block text-sm font-medium text-gray-700">
													About
												</label>
												<div class="mt-1">
													<textarea id="about" name="about" rows="3" class="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />
												</div>
												<p class="mt-2 text-sm text-gray-500">
													Brief description for your profile. URLs are hyperlinked.
												</p>
											</div>
										</div>

										<div class="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
											<p class="text-sm font-medium text-gray-700" aria-hidden="true">
											Photo
											</p>
											<div class="mt-1 lg:hidden">
												<div class="flex items-center">
													<div class="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12" aria-hidden="true">
														<img class="rounded-full h-full w-full" :src="user.imageUrl" alt="" />
													</div>
													<div class="ml-5 rounded-md shadow-sm">
														<div class="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
															<label for="mobile-user-photo" class="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none">
															<span>Change</span>
															<span class="sr-only"> user photo</span>
															</label>
															<input id="mobile-user-photo" name="user-photo" type="file" class="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md" />
														</div>
													</div>
												</div>
											</div>

											<div class="hidden relative rounded-full overflow-hidden lg:block">
											<img class="relative rounded-full w-40 h-40" :src="user.imageUrl" alt="" />
											<label for="desktop-user-photo" class="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100">
												<span>Change</span>
												<span class="sr-only"> user photo</span>
												<input type="file" id="desktop-user-photo" name="user-photo" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md" />
											</label>
											</div>
										</div>
										</div>

										<div class="mt-6 grid grid-cols-12 gap-6">
										<div class="col-span-12 sm:col-span-6">
											<label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
											<input type="text" name="first-name" id="first-name" autocomplete="given-name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
										</div>

										<div class="col-span-12 sm:col-span-6">
											<label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
											<input type="text" name="last-name" id="last-name" autocomplete="family-name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
										</div>

										<div class="col-span-12">
											<label for="url" class="block text-sm font-medium text-gray-700">URL</label>
											<input type="text" name="url" id="url" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
										</div>

										<div class="col-span-12 sm:col-span-6">
											<label for="company" class="block text-sm font-medium text-gray-700">Company</label>
											<input type="text" name="company" id="company" autocomplete="organization" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
										</div>
										</div>
									</div>

									<!-- Privacy section -->
									<div class="pt-6 divide-y divide-gray-200">
										<div class="">
											<div>
												<h2 class="text-lg leading-6 font-medium text-gray-900">Privacy</h2>
												<p class="mt-1 text-sm text-gray-500">
												Ornare eu a volutpat eget vulputate. Fringilla commodo amet.
												</p>
											</div>
											<ul role="list" class="mt-2 divide-y divide-gray-200">
												<SwitchGroup as="li" class="py-4 flex items-center justify-between">
												<div class="flex flex-col">
													<SwitchLabel as="p" class="text-sm font-medium text-gray-900" passive>
													Available to hire
													</SwitchLabel>
													<SwitchDescription class="text-sm text-gray-500">
													Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
													</SwitchDescription>
												</div>
												<Switch v-model="availableToHire" :class="[availableToHire ? 'bg-teal-500' : 'bg-gray-200', 'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500']">
													<span aria-hidden="true" :class="[availableToHire ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
												</Switch>
												</SwitchGroup>
												<SwitchGroup as="li" class="py-4 flex items-center justify-between">
												<div class="flex flex-col">
													<SwitchLabel as="p" class="text-sm font-medium text-gray-900" passive>
													Make account private
													</SwitchLabel>
													<SwitchDescription class="text-sm text-gray-500">
													Pharetra morbi dui mi mattis tellus sollicitudin cursus pharetra.
													</SwitchDescription>
												</div>
												<Switch v-model="privateAccount" :class="[privateAccount ? 'bg-teal-500' : 'bg-gray-200', 'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500']">
													<span aria-hidden="true" :class="[privateAccount ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
												</Switch>
												</SwitchGroup>
												<SwitchGroup as="li" class="py-4 flex items-center justify-between">
												<div class="flex flex-col">
													<SwitchLabel as="p" class="text-sm font-medium text-gray-900" passive>
													Allow commenting
													</SwitchLabel>
													<SwitchDescription class="text-sm text-gray-500">
													Integer amet, nunc hendrerit adipiscing nam. Elementum ame
													</SwitchDescription>
												</div>
												<Switch v-model="allowCommenting" :class="[allowCommenting ? 'bg-teal-500' : 'bg-gray-200', 'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500']">
													<span aria-hidden="true" :class="[allowCommenting ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
												</Switch>
												</SwitchGroup>
												<SwitchGroup as="li" class="py-4 flex items-center justify-between">
												<div class="flex flex-col">
													<SwitchLabel as="p" class="text-sm font-medium text-gray-900" passive>
													Allow mentions
													</SwitchLabel>
													<SwitchDescription class="text-sm text-gray-500">
													Adipiscing est venenatis enim molestie commodo eu gravid
													</SwitchDescription>
												</div>
												<Switch v-model="allowMentions" :class="[allowMentions ? 'bg-teal-500' : 'bg-gray-200', 'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500']">
													<span aria-hidden="true" :class="[allowMentions ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
												</Switch>
												</SwitchGroup>
											</ul>
										</div>
									</div>
									</form>
							</div>
							<div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
								<button type="submit" class="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
									Save
								</button>
							</div>
						</div>
					</form>
				</section>

				<!-- Details -->
				<section aria-labelledby="payment-details-heading">
					<form action="#" method="POST">
						<div class="shadow sm:rounded-md sm:overflow-hidden">
							<div class="bg-white py-6 px-4 sm:p-6">
								<div>
									<h2 id="payment-details-heading" class="text-lg leading-6 font-medium text-gray-900">Payment details</h2>
									<p class="mt-1 text-sm text-gray-500">Update your billing information. Please note that updating your location could affect your tax rates.</p>
								</div>

								<div class="mt-6 grid grid-cols-4 gap-6">
									<div class="col-span-4 sm:col-span-2">
									<label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
									<input type="text" name="first-name" id="first-name" autocomplete="cc-given-name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
									</div>

									<div class="col-span-4 sm:col-span-2">
									<label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
									<input type="text" name="last-name" id="last-name" autocomplete="cc-family-name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
									</div>

									<div class="col-span-4 sm:col-span-2">
									<label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
									<input type="text" name="email-address" id="email-address" autocomplete="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
									</div>

									<div class="col-span-4 sm:col-span-1">
									<label for="expiration-date" class="block text-sm font-medium text-gray-700">Expration date</label>
									<input type="text" name="expiration-date" id="expiration-date" autocomplete="cc-exp" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" placeholder="MM / YY" />
									</div>

									<div class="col-span-4 sm:col-span-1">
									<label for="security-code" class="flex items-center text-sm font-medium text-gray-700">
										<span>Security code</span>
										<QuestionMarkCircleIcon class="ml-1 flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
									</label>
									<input type="text" name="security-code" id="security-code" autocomplete="cc-csc" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
									</div>

									<div class="col-span-4 sm:col-span-2">
									<label for="country" class="block text-sm font-medium text-gray-700">Country</label>
									<select id="country" name="country" autocomplete="country-name" class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm">
										<option>United States</option>
										<option>Canada</option>
										<option>Mexico</option>
									</select>
									</div>

									<div class="col-span-4 sm:col-span-2">
									<label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
									<input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
									</div>
								</div>
							</div>
							<div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
								<button type="submit" class="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
									Save
								</button>
							</div>
						</div>
					</form>
				</section>

				<!-- Plan -->
				<section aria-labelledby="plan-heading">
					<form action="#" method="POST">
						<div class="shadow sm:rounded-md sm:overflow-hidden">
							<div class="bg-white py-6 px-4 space-y-6 sm:p-6">
							<div>
								<h2 id="plan-heading" class="text-lg leading-6 font-medium text-gray-900">Plan</h2>
							</div>

							<RadioGroup v-model="selectedPlan">
								<RadioGroupLabel class="sr-only">
								Pricing plans
								</RadioGroupLabel>
								<div class="relative bg-white rounded-md -space-y-px">
								<RadioGroupOption as="template" v-for="(plan, planIdx) in plans" :key="plan.name" :value="plan" v-slot="{ checked, active }">
									<div :class="[planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '', planIdx === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : '', checked ? 'bg-orange-50 border-orange-200 z-10' : 'border-gray-200', 'relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none']">
									<div class="flex items-center text-sm">
										<span :class="[checked ? 'bg-orange-500 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-gray-900' : '', 'h-4 w-4 rounded-full border flex items-center justify-center']" aria-hidden="true">
										<span class="rounded-full bg-white w-1.5 h-1.5" />
										</span>
										<RadioGroupLabel as="span" class="ml-3 font-medium text-gray-900">{{ plan.name }}</RadioGroupLabel>
									</div>
									<RadioGroupDescription class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
										<span :class="[checked ? 'text-orange-900' : 'text-gray-900', 'font-medium']">${{ plan.priceMonthly }} / mo</span>
										{{ ' ' }}
										<span :class="checked ? 'text-orange-700' : 'text-gray-500'">(${{ plan.priceYearly }} / yr)</span>
									</RadioGroupDescription>
									<RadioGroupDescription :class="[checked ? 'text-orange-700' : 'text-gray-500', 'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right']">{{ plan.limit }}</RadioGroupDescription>
									</div>
								</RadioGroupOption>
								</div>
							</RadioGroup>

							<SwitchGroup as="div" class="flex items-center">
								<Switch v-model="annualBillingEnabled" :class="[annualBillingEnabled ? 'bg-orange-500' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors ease-in-out duration-200']">
								<span aria-hidden="true" :class="[annualBillingEnabled ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
								</Switch>
								<SwitchLabel as="span" class="ml-3">
								<span class="text-sm font-medium text-gray-900">Annual billing </span>
								<span class="text-sm text-gray-500">(Save 10%)</span>
								</SwitchLabel>
							</SwitchGroup>
							</div>
							<div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
							<button type="submit" class="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
								Save
							</button>
							</div>
						</div>
					</form>
				</section>

				<!-- Billing history -->
				<section aria-labelledby="billing-history-heading">
					<div class="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
						<div class="px-4 sm:px-6">
							<h2 id="billing-history-heading" class="text-lg leading-6 font-medium text-gray-900">Billing history</h2>
						</div>
						<div class="mt-6 flex flex-col">
							<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
								<div class="overflow-hidden border-t border-gray-200">
								<table class="min-w-full divide-y divide-gray-200">
									<thead class="bg-gray-50">
									<tr>
										<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Date
										</th>
										<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Description
										</th>
										<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Amount
										</th>
										<!--
										`relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
										-->
										<th scope="col" class="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<span class="sr-only">View receipt</span>
										</th>
									</tr>
									</thead>
									<tbody class="bg-white divide-y divide-gray-200">
									<tr v-for="payment in payments" :key="payment.id">
										<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										<time :datetime="payment.datetime">{{ payment.date }}</time>
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{{ payment.description }}
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{{ payment.amount }}
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<a :href="payment.href" class="text-orange-600 hover:text-orange-900">View receipt</a>
										</td>
									</tr>
									</tbody>
								</table>
								</div>
							</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	</main>
</div>
</template>

<script>
import { ref } from 'vue';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	RadioGroup,
	RadioGroupDescription,
	RadioGroupLabel,
	RadioGroupOption,
	Switch,
	SwitchGroup,
	SwitchLabel,
	SwitchDescription,
} from '@headlessui/vue'
import { QuestionMarkCircleIcon, SearchIcon } from '@heroicons/vue/solid'

import {
	BellIcon,
	CogIcon,
	CreditCardIcon,
	KeyIcon,
	MenuIcon,
	UserCircleIcon,
	ViewGridAddIcon,
	XIcon,
} from '@heroicons/vue/outline'

const user = {
	name: 'Lisa Marie',
	email: 'lisamarie@example.com',
	imageUrl: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80',
}
const navigation = [
	{ name: 'Dashboard', href: '#' },
	{ name: 'Jobs', href: '#' },
	{ name: 'Applicants', href: '#' },
	{ name: 'Company', href: '#' },
];
const userNavigation = [
	{ name: 'Your Profile', href: '#' },
	{ name: 'Settings', href: '#' },
	{ name: 'Sign out', href: '#' },
];
const subNavigation = [
	{ name: 'Profile', href: '#', icon: UserCircleIcon, current: false },
	{ name: 'Account', href: '#', icon: CogIcon, current: false },
	{ name: 'Password', href: '#', icon: KeyIcon, current: false },
	{ name: 'Notifications', href: '#', icon: BellIcon, current: false },
	{ name: 'Plan & Billing', href: '#', icon: CreditCardIcon, current: true },
	{ name: 'Integrations', href: '#', icon: ViewGridAddIcon, current: false },
];
const plans = [
	{ name: 'Startup', priceMonthly: 29, priceYearly: 290, limit: 'Up to 5 active job postings' },
	{ name: 'Business', priceMonthly: 99, priceYearly: 990, limit: 'Up to 25 active job postings' },
	{ name: 'Enterprise', priceMonthly: 249, priceYearly: 2490, limit: 'Unlimited active job postings' },
];
const payments = [
	{
		id: 1,
		date: '1/1/2020',
		datetime: '2020-01-01',
		description: 'Business Plan - Annual Billing',
		amount: 'CA$109.00',
		href: '#',
	},
	{
		id: 1,
		date: '1/1/2020',
		datetime: '2020-01-01',
		description: 'Business Plan - Annual Billing',
		amount: 'CA$109.00',
		href: '#',
	},
	{
		id: 1,
		date: '1/1/2020',
		datetime: '2020-01-01',
		description: 'Business Plan - Annual Billing',
		amount: 'CA$109.00',
		href: '#',
	},
]

export default {
	components: {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		RadioGroup,
		RadioGroupDescription,
		RadioGroupLabel,
		RadioGroupOption,
		Switch,
		SwitchGroup,
		SwitchLabel,
		SwitchDescription,
		BellIcon,
		MenuIcon,
		QuestionMarkCircleIcon,
		SearchIcon,
		XIcon,
	},
	data() {
		return {
			availableToHire: false,
			privateAccount: false,
			allowCommenting: false,
			allowMentions: false,
		}
	},
	setup() {
		const selectedPlan = ref(plans[1])
		const annualBillingEnabled = ref(true)

		return {
			user,
			navigation,
			userNavigation,
			subNavigation,
			plans,
			payments,
			selectedPlan,
			annualBillingEnabled,
		}
	},
}
</script>