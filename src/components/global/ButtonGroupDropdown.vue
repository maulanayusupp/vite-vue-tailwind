<template>
	<span class="sm:ml-3 relative z-0">
		<Listbox as="div" v-model="selected">
			<ListboxLabel class="sr-only">
				Change published status
			</ListboxLabel>
			<div class="relative">
				<div class="inline-flex shadow-sm rounded-md divide-x divide-purple-600">
				<div class="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-purple-600">
					<div class="relative inline-flex items-center bg-purple-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
					<CheckIcon class="h-5 w-5" aria-hidden="true" />
					<p class="ml-2.5 text-sm font-medium">{{ selected.name }}</p>
					</div>
					<ListboxButton class="relative inline-flex items-center bg-purple-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
					<span class="sr-only">Change published status</span>
					<ChevronDownIcon class="h-5 w-5 text-white" aria-hidden="true" />
					</ListboxButton>
				</div>
				</div>

				<transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
				<ListboxOptions class="origin-top-right absolute left-0 mt-2 -mr-1 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0">
					<ListboxOption as="template" v-for="option in publishingOptions" :key="option.name" :value="option" v-slot="{ active, selected }">
					<li :class="[active ? 'text-white bg-purple-500' : 'text-gray-900', 'cursor-default select-none relative p-4 text-sm']">
						<div class="flex flex-col">
						<div class="flex justify-between">
							<p :class="selected ? 'font-semibold' : 'font-normal'">
							{{ option.name }}
							</p>
							<span v-if="selected" :class="active ? 'text-white' : 'text-purple-500'">
							<CheckIcon class="h-5 w-5" aria-hidden="true" />
							</span>
						</div>
						<p :class="[active ? 'text-purple-200' : 'text-gray-500', 'mt-2']">
							{{ option.description }}
						</p>
						</div>
					</li>
					</ListboxOption>
				</ListboxOptions>
				</transition>
			</div>
		</Listbox>
	</span>
</template>