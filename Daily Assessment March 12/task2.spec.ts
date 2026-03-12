import { test, expect } from '@playwright/test';

test('Task 2', async ({ browser }) => {
    const context = await browser.newContext({permissions: ["notifications"]});
    const page = await context.newPage();
    await page.goto("https://www.justdial.com/");
    const result = await page.evaluate(() => {
        return Notification.requestPermission();
    });
    console.log(result);
    const input = page.locator("input#main-auto");
    await input.fill("Restaurants");
    await input.press("Enter");
    await page.screenshot({ path: "screenshot/task2.png" });
});
