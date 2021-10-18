import { createI18n } from 'vue-i18n';
/*
 * The i18n resources in the path specified in the plugin `include` option can be read
 * as vue-i18n optimized locale messages using the import syntax
 */
import en from '@/locales/en.json';
import id from '@/locales/id.json';

const i18n = createI18n({
	locale: 'id',
	messages: {
		en,
		id,
	}
})

export default i18n;