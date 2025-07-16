import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';
import { LocationsDetails } from '../models/LocationsDetails';

export class LocationsPage extends BasePage {
    private static readonly LOCATIONS_PATH = '/local.fedex.com/en-us';
    private static readonly LOCATIONS_TITLE = 'FedEx - Shipping and printing locations near you';
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;
    private readonly locationPin: Locator;
    private readonly locationInfo: Locator;
    private readonly locationName: Locator;
    private readonly locationAddress: Locator;
    private readonly locationType: Locator;
    private readonly noResults: Locator;
    private readonly directoryLink: Locator;
    private readonly delectedCard: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput     = page.locator('#DirectorySearchInput');
        this.searchButton    = page.locator('button.search-button.Hero-button');
        this.locationPin     = page.locator('#dir-map button:has(span.sr-only)');
        this.locationInfo    = page.locator('article.Teaser');
        this.locationName    = page.locator('h3.Teaser-title span.Teaser-pagesName');
        this.locationType    = page.locator('h3.Teaser-title span.Teaser-geo');
        this.locationAddress = page.locator('.Teaser-address address.c-address .c-AddressRow span');
        this.noResults       = page.locator('.Locator-noResults');
        this.directoryLink   = this.noResults.locator('a.Locator-toDirectory');
         this.delectedCard = page.locator('article.Teaser.Teaser--dill');
    }

    async searchLocation(location: string): Promise<void> {
        await this.expectVisibleAndEnabled(this.searchInput);
        await this.expectVisibleAndEnabled(this.searchButton);
        await this.searchInput.fill(location);
        await this.searchButton.click();
    }

    async assertLocationsPage(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        await this.verifyUrlContains(LocationsPage.LOCATIONS_PATH);
        await this.verifyTitle(LocationsPage.LOCATIONS_TITLE);
    }

   // click the first pins on the map
    async clickFirstPins(locations_amount: number): Promise<void> {
        await this.locationPin.first().waitFor({ state: 'visible', timeout: 20_000 });
        const count = await this.locationPin.count();
        expect(count).toBeGreaterThanOrEqual(locations_amount);

        for (let i = 0; i < locations_amount; i++) {
            const pin = this.locationPin.nth(i);
            await pin.scrollIntoViewIfNeeded();
            const box = await pin.boundingBox();
            if (!box) throw new Error(`Could not get pin #${i}`);
            await this.page.mouse.click(
                box.x + box.width / 2,
                box.y + box.height / 2
            );

            await expect(this.locationInfo.first()).toBeVisible();
            }
    }

    async getLocationDetails(locations_amount: number): Promise<LocationsDetails[]> {
        // wait until at least one location is visible
        await this.locationInfo.first().waitFor({ state: 'visible' });

        const availableCount = await this.locationInfo.count();
        const count = Math.min(locations_amount, availableCount);

        const locationsDetails: LocationsDetails[] = [];
        for (let i = 0; i < count; ++i) {
            const locationCard = this.locationInfo.nth(i);
            await expect(locationCard).toBeVisible();

            const name = (await locationCard.locator(this.locationName)
                .first()
                .textContent())?.trim() || '';

            const typeLocator = locationCard.locator(this.locationType).first();
            let type = '';
            if (await typeLocator.isVisible().catch(() => false)) {
                type = (await typeLocator.textContent())?.trim() || '';
            }

            const addressRows = await locationCard
                .locator(this.locationAddress)
                .allTextContents();
            const address = addressRows.map(s => s.trim()).join(', ');

            locationsDetails.push({ name, type, address });
        }
        return locationsDetails;
    }

    async displayLocationDetails(locations_amount: number): Promise<void> {
        await this.clickFirstPins(locations_amount);
        const stores = await this.getLocationDetails(locations_amount);
        console.table(stores);
    }

    async validateInvalidZipCode(invalidZipCode: string): Promise<void> {
        const errorMessage =
        `Sorry, there are no locations near "${invalidZipCode}" satisfying the selected filters. ` +
        `Please modify your search and try again or browse our directory.`;

        await this.expectVisibleAndEnabled(this.noResults);
        await expect(this.noResults).toHaveText(errorMessage);

        await this.expectVisibleAndEnabled(this.directoryLink);
        await expect(this.directoryLink).toHaveText('browse our directory.');
        await expect(this.directoryLink).toHaveAttribute('href', '../en');
    }
}
