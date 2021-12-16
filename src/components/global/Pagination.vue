<template>
	<nav class="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mt-4 mb-15">
		<div class="-mt-px w-0 flex-1 flex">
			<div
        :class="[isPageOnStart ? 'text-gray-300 hover:text-gray-300 hover:border-gray-200 border-gray-200 cursor-not-allowed hidden' : 'cursor-pointer', 'border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300']"
        @click="previous">
				<svg :class="['mr-3 h-5 w-5 text-gray-400', isPageOnStart ? 'text-gray-300' : '']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
				</svg>
				Previous
			</div>
		</div>
		<div class="hidden md:-mt-px md:flex" v-if="isNumberPagesEnabled">
			<span v-for="n in pagelist" :key="n">
				<span
					v-if="isNaN(n)"
					class="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
					...
				</span>
				<a
					v-else
					@click.stop="moveToPage(n)"
					:class="[isCurrentPage(n) ? 'border-purple-600 text-purple-600 font-bold' : 'hover:border-gray-300 text-gray-500', 'cursor-pointer border-transparent border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium']">
					{{n}}
				</a>
			</span>
		</div>
		<div class="-mt-px w-0 flex-1 flex justify-end">
			<div
				:class="[isPageOnEnd ? 'text-gray-100 hover:text-gray-300 hover:border-gray-200 border-gray-200 cursor-not-allowed hidden' : 'cursor-pointer', 'border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300']"
				@click="next">
				Next
				<!-- Heroicon name: solid/arrow-narrow-right -->
				<svg :class="['ml-3 h-5 w-5 text-gray-400', isPageOnEnd ? 'text-gray-300' : '']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
				</svg>
			</div>
		</div>
	</nav>
</template>

<script>

export default {
	components: {
	},
	props: {
		isNumberPagesEnabled: {
			type: Boolean,
			default: () => true,
		},
		maxNumberPages: {
			type: Number,
			default: () => 6,
		},
		currentPage: {
			type: Number,
			default:  () => 1,
		},
		totalPage: {
			type: Number,
			default:  () => 1,
		},
	},
	data() {
		return {
		};
	},
	sockets: {},
	mounted() {
	},
	created() {
	},
	unmounted() {},
	beforeUnmount() {},
	computed: {
		isPageOnStart() {
			return this.currentPage === 1;
		},
		isPageOnEnd() {
			return this.currentPage >= (this.totalPage);
		},
		pagelist() {
			let list = [];
			if (!this.isNumberPagesEnabled) {
				return list;
			}

			var totalPages = this.totalPage;
			var maxPages   = this.maxNumberPages;

			if (totalPages <= maxPages) {
				for (var i = 0; i < totalPages; i++) { list.push(i + 1); }
				return list;
			}

			// Start from N plus the end .
			let halfCount   = Math.floor(maxPages / 2);
			let upperLimit  = totalPages - halfCount;
			let lowerLimit  = maxPages - 1;
			let middleCount = maxPages - 2;

			if (this.currentPage < lowerLimit) {
				for (var u = 1; u <= lowerLimit; u++) {
					list.push(u);
				}
				list.push("...");
				list.push(this.totalPage);
			} else if (this.currentPage >= upperLimit) {
				list.push(1);
				list.push("...");

				// let start = this.currentPage - 1;
				for (var u = upperLimit; u < totalPages; u++) {
					list.push(u);
				}

				list.push(this.totalPage);
			} else {
				list.push(1);
				list.push("...");
				let start = this.currentPage - 1;
				for (var u = start; u <= (start + middleCount); u++) {
					list.push(u);
				}
				list.push("...");
				list.push(this.totalPage);
			}

			return list;
		}
	},
	methods: {
		previous() {
			if (!this.isPageOnStart) {
				this.$emit('previous');
			}
		},
		next() {
			if (!this.isPageOnEnd) {
				this.$emit('next');
			}
		},
		isCurrentPage(n) {
			return this.currentPage === (n);
		},
		moveToPage(n) {
			if (!this.isCurrentPage(n)) {
				this.$emit("setPage", n);
			}
		}
	},
}
</script>
