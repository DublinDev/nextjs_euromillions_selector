// @ts-check
import { test, expect } from '@playwright/test';
import { HomePO } from './pageObjects/homepage';

test.describe('Tests for the number selector', async () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePO(page);
    await homePage.navigate();
    await homePage.gridBtn.click();
  });

  test('Select 5 numbers', async () => {
    await homePage.clickNormalNumber('7');
    await homePage.clickNormalNumber('17');
    await homePage.clickNormalNumber('27');
    await homePage.clickNormalNumber('37');
    await homePage.clickNormalNumber('47');

    const values = await homePage.selectedNumbersNormal;
    await expect(values).toHaveText(['7', '17', '27', '37', '47'].join(''));
  });

  test('Select lucky star', async () => {
    await homePage.clickBonusNumber('5');
    const values = await homePage.selectedNumbersBonus;
    await expect(values).toHaveText(['-', '5'].join(''));
  });

  test('Numbers selected are displayed in order', async () => {
    await homePage.clickNormalNumber('7');
    await homePage.clickNormalNumber('37');
    await homePage.clickNormalNumber('47');

    let values = await homePage.selectedNumbersNormal;
    await expect(values).toHaveText(['-', '-', '7', '37', '47'].join(''));

    //Select more
    await homePage.clickNormalNumber('27');
    await homePage.clickNormalNumber('17');

    values = await homePage.selectedNumbersNormal;
    await expect(values).toHaveText(['7', '17', '27', '37', '47'].join(''));
  });

  test('Selected numbers show with the correct colors', async () => {
    const normalNumberBtn = homePage.getNormalNumber('7');
    await normalNumberBtn.click();

    await expect(normalNumberBtn).toHaveCSS('background-color', 'rgb(255, 165, 0)');

    // Verify 
    const bonusNumberBtn = homePage.getBonusNumber('7');
    await bonusNumberBtn.click();

    await expect(bonusNumberBtn).toHaveCSS('background-color', 'rgb(255, 215, 0)');
  });

  test('Numbers can be deselected by clicking the number is the top row', async () => {
    await homePage.clickNormalNumber('7');

    const normalSlot5 = homePage.getSelectedNumberSlots('5');
    await expect(normalSlot5).toHaveText('7');

    await normalSlot5.click();
    await expect(normalSlot5).toHaveText('-');

    // Same for bonus numbers
    await homePage.clickBonusNumber('7');

    const bonusSlot2 = homePage.getSelectedBonusNumberSlots('2');
    await expect(bonusSlot2).toHaveText('7');

    await bonusSlot2.click();
    await expect(bonusSlot2).toHaveText('-');
  });

  test('Numbers of both types can be deselected by clicking them in the grid', async () => {
    const normalBtn7 = await homePage.getNormalNumber('7');
    await normalBtn7.click();

    const normalSlot5 = homePage.getSelectedNumberSlots('5');
    await expect(normalSlot5).toHaveText('7');

    await normalBtn7.click();
    await expect(normalSlot5).toHaveText('-');

    // Same for bonus numbers
    const bonusBtn7 = await homePage.getBonusNumber('7');
    await bonusBtn7.click();

    const bonusSlot2 = homePage.getSelectedBonusNumberSlots('2');
    await expect(bonusSlot2).toHaveText('7');

    await bonusBtn7.click();
    await expect(bonusSlot2).toHaveText('-');
  });

  test('Selected numbers are in correct order after number deselected', async () => {

    await homePage.clickNormalNumber('5');
    await homePage.clickNormalNumber('15');
    await homePage.clickNormalNumber('25');

    const normalSlot3 = await homePage.getSelectedNumberSlots(3);
    const normalSlot4 = await homePage.getSelectedNumberSlots(4);
    const normalSlot5 = await homePage.getSelectedNumberSlots(5);

    await expect(normalSlot5).toHaveText('25');
    await expect(normalSlot4).toHaveText('15');
    await expect(normalSlot3).toHaveText('5');

    await homePage.clickNormalNumber('25');
    await expect(normalSlot5).toHaveText('15');
    await expect(normalSlot4).toHaveText('5');
    await expect(normalSlot3).toHaveText('-');
  });
  test.skip('Only 5 normal numbers can be selected', async () => { });
  test.skip('Only 2 lucky stars can be selected', async () => { });
  test.skip('Suggested numbers show with a blue outline', async () => { });
  test.skip('Expected numbers are received for the prompt 13 Sep 2023', async () => {
    //const prompt = "What numbers were drawn on the 12th of September 2023";
  });
  test.skip('Text can be entered in the input field', async () => { });
})
