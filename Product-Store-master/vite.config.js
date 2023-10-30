import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        fs: {
            allow: [
                'D:/Yogesh/SvelteKit/Product-Store-master/db.json',
                'D:/Yogesh/SvelteKit/Product-Store-master/user.json'
            ]
        },
    },
    plugins: [sveltekit()]
});
