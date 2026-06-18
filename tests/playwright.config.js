import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './specs',
    timeout: 30000,
    retries: 0,
    use: {
        baseURL: 'http://localhost:5173',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'off',
    },
    reporter: [['list'], ['html', { open: 'never' }]],
});