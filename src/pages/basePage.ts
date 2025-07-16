import { Page, expect, Locator } from '@playwright/test';

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async verifyUrlContains (text: string): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(text));
    }

    async verifyTitle (title: string | RegExp): Promise<void> {
        await expect(this.page).toHaveTitle(title);
    }

    async navigate(path: string = '', options: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' } = { waitUntil: 'networkidle' }): Promise<void> {
        await this.page.goto(path, options);
    }
    
    async expectVisibleAndEnabled(locator: Locator, timeout = 12_000): Promise<void> {
        await locator.hover({ timeout });
        await expect(locator).toBeVisible({ timeout });
        await expect(locator).toBeEnabled({ timeout });
        await expect(locator).toHaveCSS('opacity', '1', { timeout });
        await expect(locator).not.toHaveCSS('pointer-events', 'none', { timeout });
        await this.page.waitForTimeout(1000);
    }
    
}
