import { devices, PlaywrightTestConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

//  Load .env.<ENV> depending on TEST_ENV, defaulting to “qa”
const env = process.env.TEST_ENV || 'qa';
dotenv.config({ path: `.env.${env}` });

const baseURLs: Record<string,string> = {
    qa:       process.env.QA_BASE_URL     || 'https://qa.fedex-us.com',
    staging:  process.env.STAGING_BASE_URL || 'https://staging.fedex-us.com',
};

const config: PlaywrightTestConfig = {
    testDir: './src/tests',
    timeout: 60 * 1000,
    expect: {
        timeout: 10000
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['list'],
        ['html', { outputFolder: 'reports/html' }],
    ],
    use: {
        actionTimeout: 0,
        trace: 'on-first-retry',
        baseURL: 'https://www.fedex.com',
        headless: false,
        viewport: null,
        launchOptions: {
            args: ['--start-maximized'], 
        },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium' 
            },
        },
        {
            name: 'webkit-1600x900',
            use: {
                browserName: 'webkit',
                viewport: { width: 1600, height: 900 },
            },
        },

        // Mobile emulation using built-in device descriptors

        {
            name: 'iPhone-15',
            use: { ...devices['iPhone-15'] },
        },
    ],
};

export default config;
