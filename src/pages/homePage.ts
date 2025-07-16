import { Locator, expect, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
    private static readonly HOME_PATH = '/en-us/home.html';
    private static readonly HOME_TITLE = 'Track & Ship Online or Find Nearby Locations | FedEx';
    private readonly loadingIndicator: Locator;
    private readonly rejectCookies: Locator;
    private readonly countryDialog: Locator;
    private readonly countrySelection: Locator;
    private readonly rateAndShipButton: Locator;
    private readonly locationsButton: Locator;

    constructor(page: Page) {
        super(page);
        this.loadingIndicator = page.locator('fdx-loading-indicator-spinner');
        this.rejectCookies = page.getByRole('button', { name: 'REJECT ALL COOKIES' });
        this.countryDialog = page.getByRole('dialog').locator('.fxg-geo-locator'); 
        this.countrySelection =  page.locator('.fxg-geo-locator__country:has-text("United States") a[aria-label="English"]');
        this.rateAndShipButton = page.locator('li[role="tab"]:has-text("Rate & Ship") button');
        this.locationsButton = page.locator('li[role="tab"]:has-text("Locations") button');
    }

    async navigateToHome(): Promise<void> {
        await this.navigate(HomePage.HOME_PATH, { waitUntil: 'load' });
        //to handle country and language dialog
        if (await this.countryDialog.isVisible()) {
            await this.countrySelection.click();
            }
        //assert page
        this.verifyHomePageLoaded();    
        }

    async verifyHomePageLoaded(): Promise<void> {
        await this.verifyUrlContains(HomePage.HOME_PATH);
        await this.verifyTitle(HomePage.HOME_TITLE);
    }

    async waitForLoadingToFinish(): Promise<void> {
        await this.loadingIndicator.waitFor({ state: 'visible'})
            .catch(() => { /* spinner didn’t appear */ });
        await this.loadingIndicator.waitFor({ state: 'hidden'});
        await expect(this.loadingIndicator).toBeHidden();
    }

    async goToRateAndShip(): Promise<void> {
        await this.expectVisibleAndEnabled(this.rateAndShipButton);

        const action = () =>
            Promise.all([
            this.rateAndShipButton.click(),
            this.waitForLoadingToFinish(),
            ]);

        try {
            await action();
        } catch {
            await this.expectVisibleAndEnabled(this.rateAndShipButton);
            await action();
        }
    }

    async goToLocations(): Promise<void> {
        await this.expectVisibleAndEnabled(this.locationsButton);

        try {
            await this.locationsButton.click();
        } catch {
            await this.expectVisibleAndEnabled(this.locationsButton);
            await this.locationsButton.click();
        }
    }

    async rejectAllCookies(): Promise<void>{
        await this.expectVisibleAndEnabled(this.rejectCookies);
        await this.rejectCookies.click();
    }

}
