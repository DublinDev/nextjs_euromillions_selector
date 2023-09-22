// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Select 5 numbers', async ({ page }) => {

  await page.getByTestId('normal-num7').click();
  await page.getByTestId('normal-num17').click();
  await page.getByTestId('normal-num27').click();
  await page.getByTestId('normal-num37').click();
  await page.getByTestId('normal-num47').click();

  const values = await page.getByTestId('normal-numbers-selected');
  await expect(values).toHaveText(['7', '17', '27', '37', '47'].join(''));
});

test('Select lucky star', async ({ page }) => {

  await page.getByTestId('bonus-num5').click();
  const values = await page.getByTestId('bonus-numbers-selected');
  await expect(values).toHaveText(['-', '5'].join(''));
});

test('Numbers selected are displayed in order', async ({ page }) => {

  await page.getByTestId('normal-num7').click();
  await page.getByTestId('normal-num37').click();
  await page.getByTestId('normal-num47').click();

  let values = await page.getByTestId('normal-numbers-selected');
  await expect(values).toHaveText(['-', '-', '7', '37', '47'].join(''));

  //Select more
  await page.getByTestId('normal-num27').click();
  await page.getByTestId('normal-num17').click();

  values = await page.getByTestId('normal-numbers-selected');
  await expect(values).toHaveText(['7', '17', '27', '37', '47'].join(''));
});

test('Selected numbers show with the correct colors', async ({ page }) => {

  const normalNumberBtn = page.getByTestId('normal-num7');
  await normalNumberBtn.click();

  await expect(normalNumberBtn).toHaveCSS('background-color', 'rgb(255, 165, 0)');

  // Verify 
  const bonusNumberBtn = page.getByTestId('bonus-num7');
  await bonusNumberBtn.click();

  await expect(bonusNumberBtn).toHaveCSS('background-color', 'rgb(255, 215, 0)');
});

test('Numbers can be deselected by clicking the number is the top row', async ({ page }) => {

  const normalBtn7 = await page.getByTestId('normal-num7');
  await normalBtn7.click();

  const normalSlot5 = page.getByTestId('normal-slot-5');
  await expect(normalSlot5).toHaveText('7');

  await normalSlot5.click();
  await expect(normalSlot5).toHaveText('-');

  // Same for bonus numbers
  const bonusBtn7 = await page.getByTestId('bonus-num7');
  await bonusBtn7.click();

  const bonusSlot2 = page.getByTestId('bonus-slot-2');
  await expect(bonusSlot2).toHaveText('7');

  await bonusSlot2.click();
  await expect(bonusSlot2).toHaveText('-');
});

test('Numbers of both types can be deselected by clicking them in the grid', async ({ page }) => {

  const normalBtn7 = await page.getByTestId('normal-num7');
  await normalBtn7.click();

  const normalSlot5 = page.getByTestId('normal-slot-5');
  await expect(normalSlot5).toHaveText('7');

  await normalBtn7.click();
  await expect(normalSlot5).toHaveText('-');

  // Same for bonus numbers
  const bonusBtn7 = await page.getByTestId('bonus-num7');
  await bonusBtn7.click();

  const bonusSlot2 = page.getByTestId('bonus-slot-2');
  await expect(bonusSlot2).toHaveText('7');

  await bonusBtn7.click();
  await expect(bonusSlot2).toHaveText('-');
});

test('Selected numbers are in correct order after number deselected', async ({ page }) => {

  await page.getByTestId('normal-num5').click();
  await page.getByTestId('normal-num15').click();
  await page.getByTestId('normal-num25').click();

  const normalSlot3 = page.getByTestId('normal-slot-3');
  const normalSlot4 = page.getByTestId('normal-slot-4');
  const normalSlot5 = page.getByTestId('normal-slot-5');

  await expect(normalSlot5).toHaveText('25');
  await expect(normalSlot4).toHaveText('15');
  await expect(normalSlot3).toHaveText('5');

  await page.getByTestId('normal-num25').click();
  await expect(normalSlot5).toHaveText('15');
  await expect(normalSlot4).toHaveText('5');
  await expect(normalSlot3).toHaveText('-');

});
test.skip('Only 5 normal numbers can be selected', async ({ page }) => { });
test.skip('Only 2 lucky stars can be selected', async ({ page }) => { });
test.skip('Suggested numbers show with a blue outline', async ({ page }) => { });
test.skip('Expected numbers are received for the prompt 13 Sep 2023', async ({ page }) => {
  //const prompt = "What numbers were drawn on the 12th of September 2023";
});

test.skip('Text can be entered in the input field', async ({ page }) => { });
