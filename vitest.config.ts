import { defineConfig } from 'vitest/config';

import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: [
            'test/**/*.test.ts'
        ],
        browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            // https://vitest.dev/config/browser/playwright
            instances: [
                { browser: 'chromium' },
            ],
        },
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov'],
        },
    },
})
