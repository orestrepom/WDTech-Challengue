import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import locationsData from '../../../test-data/locations.json';
import { LocationsPage } from '../../pages/locationsPage';
import { LocationsData } from '../../models/locationsData';

test.describe('Locations Tests', () => {
    let homePage: HomePage;
    let locationsPage: LocationsPage;
    const testData: LocationsData = locationsData;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        locationsPage= new LocationsPage(page);
        await homePage.navigateToHome();
    });

    test('TC-001: should get locations details', async () => {
        //locations to be evaluated
        const locations_amount = 3;
        await homePage.goToLocations();
        await locationsPage.assertLocationsPage();
        await locationsPage.searchLocation(testData.location);
        await locationsPage.displayLocationDetails(locations_amount);
    });

    test('TC-008: should validate Invalid ZIP Code Handling on locations search', async () => {
        await homePage.goToLocations();
        await locationsPage.assertLocationsPage();
        await locationsPage.searchLocation(testData.invalidZipCode ?? '');
        await locationsPage.validateInvalidZipCode(testData.invalidZipCode ?? '');
    });

});
