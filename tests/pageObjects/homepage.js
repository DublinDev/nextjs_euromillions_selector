const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test');

export class HomePO {
    constructor(page) {
        this.page = page;
        this.someElementSelector = '#someElement';
        this.someButtonSelector = '#someButton';

        this.normalNumbersSelection = page.getByTestId('normal-numbers');
        this.bonusNumbersSelection = page.getByTestId('bonus-numbers');

        this.selectedNumbersNormal = page.getByTestId('normal-numbers-selected');
        this.selectedNumbersBonus = page.getByTestId('bonus-numbers-selected');

        // this.searchField  = page.get

    }

    // Navigate to the homepage
    async navigate() {
        await this.page.goto('/');
    }

    getNormalNumber(number) {
        return this.page.locator(`[data-testid="normal-numbers"] >> text="${number}"`);
    }

    // Interact with an element, e.g., click a button
    async clickNormalNumber(number) {
        const numberEle = await this.getNormalNumber(number);
        await numberEle.click();
    }

    getBonusNumber(number) {
        return this.page.locator(`[data-testid="bonus-numbers"] >> text="${number}"`);
    }

    // Interact with an element, e.g., click a button
    async clickBonusNumber(number) {
        const numberEle = await this.getBonusNumber(number);
        await numberEle.click();
    }

    getSelectedNumberSlots(slotIndex) {
        return this.page.locator(`[data-testid="normal-numbers-selected"] .slot:nth-child(${slotIndex})`);
    }

    getSelectedBonusNumberSlots(slotIndex) {
        return this.page.locator(`[data-testid="bonus-numbers-selected"] .slot:nth-child(${slotIndex})`);
    }
    // ... add more methods for other interactions
}

// module.exports = HomePage;
