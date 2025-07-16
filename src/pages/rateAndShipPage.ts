import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { ShipmentData } from '../models/ShipmentData';

export class RateAndShipPage extends BasePage {
    private static readonly SOMETHING_WENT_WRONG = 'Something went wrong while retreiving the shipment rates. Our engineers have been notified and will fix this as soon as possible. Please contact customer support to create a shipment or try again later.';
    private readonly fromAddressInput: Locator;
    private readonly toAddressInput: Locator;
    private readonly packageWeightInput: Locator;
    private readonly getRatesButton: Locator;
    private readonly ratesContainer: Locator;
    private readonly rateCalculatorHeading : Locator;
    private readonly suggestionList : Locator;
    private readonly packagingDropdown: Locator;
    private readonly techDifficultiesTxt: Locator;
    private readonly somethingWrongTxt: Locator;
    private readonly supportLink: Locator;

    constructor(page: Page) {
        super(page);
        this.fromAddressInput = page.locator('#fromGoogleAddress');  
        this.toAddressInput = page.locator('#toGoogleAddress');
        this.packageWeightInput = page.getByRole('textbox', { name: 'Package weight' });
        this.getRatesButton = page.locator('#e2ePackageDetailsSubmitButtonRates');
        this.ratesContainer = page.locator('.rates-container');
        this.rateCalculatorHeading = this.page.locator('#magr-heading');
        this.suggestionList = page.locator('#e2eGoogleAddressSuggestionList');
        this.packagingDropdown = page.getByRole('combobox', { name: 'Packaging' });
        this.techDifficultiesTxt = this.page.getByRole('heading', { level: 4, name: 'We are having technical difficulties' });
        this.somethingWrongTxt=this.page.locator('.fdx-u-text--normal');
        this.supportLink = this.page.getByRole('link', { name: 'Contact customer support' });
    }

    //to deal with Autocomplete fields
    async fillAndSelectFirst( input: Locator, value: string): Promise<void> {
        await this.expectVisibleAndEnabled(input);
        await expect(input).toBeEmpty();
        await input.fill(value);
        await input.press('Space'); 
        // wait for the suggestion list and first option
        await expect(this.suggestionList).toBeVisible();
        await this.expectVisibleAndEnabled(this.suggestionList);
        const firstOption = this.suggestionList.locator('li').first();
        await expect(firstOption).toBeVisible();
        await firstOption.click();
        await expect(input).not.toBeEmpty(); 
    }

    async fillShipmentDetails(shipmentData: ShipmentData): Promise<void> {
        //assert page before filling out the form
        await this.assertRateAndShipPage();
        // fill out the form
        await this.fillAndSelectFirst(this.fromAddressInput, shipmentData.fromAddress);
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.fillAndSelectFirst(this.toAddressInput,   shipmentData.toAddress);
        await this.selectPackaging(shipmentData.package);
        await this.expectVisibleAndEnabled(this.packageWeightInput);
        await this.packageWeightInput.fill(shipmentData.weight);
    }

    async selectPackaging(label: string): Promise<void> {
        await this.expectVisibleAndEnabled(this.packagingDropdown);
        await this.packagingDropdown.selectOption({ label });
        // assert option dropdowns
        await expect(this.packagingDropdown.locator('option:checked')).toHaveText(label);
    }

    async getShippingRates(): Promise<void> {
        await this.expectVisibleAndEnabled(this.getRatesButton);
    }

    async validateShipRatesAPI(): Promise<void> {
        await this.expectVisibleAndEnabled(this.getRatesButton);
        const [response] = await Promise.all([
        this.page.waitForResponse(
            resp =>
                resp.url().includes('v2/rates/quotes') && resp.status() === 400
        ),
            this.getRatesButton.click(),
        ]);
        expect(response.status(), 'Rates API should return HTTP 400').toBe(400);
    }

    async validateShowratesErrorMessage(): Promise<void> {
        await expect(this.techDifficultiesTxt).toBeVisible();
        await expect(this.somethingWrongTxt).toHaveText(RateAndShipPage.SOMETHING_WENT_WRONG);
        await expect(this.supportLink).toBeVisible();
        await expect(this.supportLink).toHaveAttribute('href', '/en-us/customer-support.html');
    }

    async verifyRatesDisplayed(): Promise<void> {
        await expect(this.ratesContainer).toBeVisible();
    }

    async assertRateAndShipPage(): Promise<void> {
        // assert Rate and Ship Tab
        await this.expectVisibleAndEnabled(this.rateCalculatorHeading);
        await expect(this.rateCalculatorHeading).toHaveText('Calculate FedEx shipping rates');
    }
}
