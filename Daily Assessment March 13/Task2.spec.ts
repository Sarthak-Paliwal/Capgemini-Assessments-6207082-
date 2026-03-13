import { test, expect } from '@playwright/test';

test('Task 2', async ({ page }) => {
    await page.goto("https://demoqa.com/upload-download");
    await page.locator("#downloadButton").click()
    await page.locator("#uploadFile").setInputFiles("C:/Users/paliw/Downloads/sampleFile.jpeg");
});
