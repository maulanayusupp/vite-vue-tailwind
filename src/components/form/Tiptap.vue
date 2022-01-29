<template>
	<div
		class="editor p-2 border border-gray-300 rounded-md space-y-2"
		v-if="editor">
		<div
			class="editor-bar flex space-x-1">
			<button
				class="p-1 h-8 w-8 rounded-md hover:text-white hover:bg-indigo-600"
				@click.prevent="editor.chain().focus().toggleHeading({ level: 1 }).run()"
				:class="{ 'font-bold': editor.isActive('heading', { level: 1 }) }">
				H1
			</button>
			<button
				class="p-1 h-8 w-8 rounded-md hover:text-white hover:bg-indigo-600"
				@click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()"
				:class="{ 'font-bold': editor.isActive('heading', { level: 2 }) }">
				H2
			</button>
			<button
				class="p-1 h-8 w-8 rounded-md hover:text-white hover:bg-indigo-600"
				@click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()"
				:class="{ 'font-bold': editor.isActive('heading', { level: 3 }) }">
				H3
			</button>
			<!-- <button
				class="p-1 h-8 w-8 rounded-md hover:text-white hover:bg-indigo-600"
				@click.prevent="editor.chain().focus().setParagraph().run()"
				:class="{ 'font-bold': editor.isActive('paragraph') }">
				paragraph
			</button> -->
			<button
				class="p-1 h-8 w-8 rounded-md hover:text-white hover:bg-indigo-600"
				@click.prevent="editor.chain().focus().toggleBold().run()"
				:class="{ 'font-bold': editor.isActive('bold') }">
				<font-awesome-icon icon="bold" />
			</button>
			<button
				class="p-1 h-8 w-8 rounded-md hover:text-white hover:bg-indigo-600"
				@click.prevent="editor.chain().focus().toggleItalic().run()"
				:class="{ 'font-bold': editor.isActive('italic') }">
				<font-awesome-icon icon="italic" />
			</button>
			<button
				class="p-1 h-8 w-8 rounded-md hover:text-white hover:bg-indigo-600"
				@click.prevent="editor.chain().focus().toggleStrike().run()"
				:class="{ 'font-bold': editor.isActive('strike') }">
				<font-awesome-icon icon="strikethrough" />
			</button>
			<button
				class="p-1 h-8 w-8 rounded-md hover:text-white hover:bg-indigo-600"
				@click.prevent="editor.chain().focus().toggleHighlight().run()"
				:class="{ 'font-bold': editor.isActive('highlight') }">
				<font-awesome-icon icon="highlighter" />
			</button>
			<button
				class="p-1 h-8 w-8 rounded-md hover:text-white hover:bg-indigo-600"
				@click.prevent="editor.chain().focus().setTextAlign('left').run()"
				:class="{ 'font-bold': editor.isActive({ textAlign: 'left' }) }">
				<font-awesome-icon icon="align-left" />
			</button>
			<button
				class="p-1 h-8 w-8 rounded-md hover:text-white hover:bg-indigo-600"
				@click.prevent="editor.chain().focus().setTextAlign('center').run()"
				:class="{ 'font-bold': editor.isActive({ textAlign: 'center' }) }">
				<font-awesome-icon icon="align-center" />
			</button>
			<button
				class="p-1 h-8 w-8 rounded-md hover:text-white hover:bg-indigo-600"
				@click.prevent="editor.chain().focus().setTextAlign('right').run()"
				:class="{ 'font-bold': editor.isActive({ textAlign: 'right' }) }">
				<font-awesome-icon icon="align-right" />
			</button>
			<button
				class="p-1 h-8 w-8 rounded-md hover:text-white hover:bg-indigo-600"
				@click.prevent="editor.chain().focus().setTextAlign('justify').run()"
				:class="{ 'font-bold': editor.isActive({ textAlign: 'justify' }) }">
				<font-awesome-icon icon="align-justify" />
			</button>
			<button
				class="p-1 h-8 w-8 rounded-md hover:text-white hover:bg-indigo-600"
				@click.prevent="addImage">
				<font-awesome-icon icon="image" />
			</button>
		</div>
		<!-- Editor -->
		<editor-content
			:editor="editor"
			class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
		/>
	</div>
</template>

<script>
import {  } from '@heroicons/vue/outline';

import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'

export default {
	components: {
		EditorContent,
	},

	props: {
		modelValue: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			editor: null,
		}
	},

	watch: {
		modelValue(value) {
			// HTML
			const isSame = this.editor.getHTML() === value;
			if (isSame) return;

			// JSON
			// const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

			this.editor.commands.setContent(value, false)
		},
	},
	methods: {
		addImage() {
			const url = window.prompt('URL')

			if (url) {
				this.editor.chain().focus().setImage({ src: url }).run()
			}
		},
	},
	mounted() {
		this.editor = new Editor({
			extensions: [
				StarterKit,
				TextAlign.configure({
					types: ['heading', 'paragraph'],
				}),
				Highlight,
				Document,
				Paragraph,
				Text,
				Image,
				Dropcursor,
			],
			content: this.modelValue,
			onUpdate: () => {
				// HTML
				this.$emit('update:modelValue', this.editor.getHTML())

				// JSON
				// this.$emit('update:modelValue', this.editor.getJSON())
			},
		})
	},

	beforeUnmount() {
		this.editor.destroy()
	},
}
</script>