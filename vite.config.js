import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // isCustomElement: tag => tag.startsWith('t-input') || tag.startsWith('Listbox')
        }
      }
    }),

    vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      compositionOnly: false,
      // you need to set i18n resource including paths !
      include: resolve(__dirname, './src/locales/**')
    }),

    VitePWA({
			includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],  
			manifest: {
				name: 'Online Solutions',
				short_name: 'Cooking something yummy for your content',
				description: 'Engage viewers with snappy, accessilbe and easy to remember content, and keep it under 30 seconds',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					}
				]
			}
		}),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
    port: '4444',
  },
})
