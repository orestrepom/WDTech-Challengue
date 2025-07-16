import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { RateAndShipPage } from '../../pages/rateAndShipPage';
import { ShipmentData } from '../../models/ShipmentData';
import shipmentData from '../../../test-data/shipment.json';

test.describe('Rate and Ship Tests', () => {
    let homePage: HomePage;
    let rateAndShipPage: RateAndShipPage;
    const testData: ShipmentData = shipmentData;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        rateAndShipPage = new RateAndShipPage(page);
        await homePage.navigateToHome();
        //close the cookies banner 
        await homePage.rejectAllCookies();
    });

    test('TC-003: should verify rate calculation fail with valid address in US', async () => {  
        await homePage.goToRateAndShip();
        await rateAndShipPage.fillShipmentDetails(testData);
        await rateAndShipPage.getShippingRates();
        await rateAndShipPage.validateShipRatesAPI();
        await rateAndShipPage.validateShowratesErrorMessage();
    });
    
});
