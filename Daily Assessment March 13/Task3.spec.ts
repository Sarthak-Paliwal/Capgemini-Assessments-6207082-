import { test, expect } from '@playwright/test';

test('Task 3', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload");
    await page.locator("#file-upload").setInputFiles("tests/profileImages/Picture1.png")
    await page.locator("#file-submit").click()
    const fileName=await page.locator("#uploaded-files")
    await expect(fileName).toHaveText("Picture1.png");
});
