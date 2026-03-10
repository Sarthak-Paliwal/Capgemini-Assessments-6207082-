import {test} from '@playwright/test'
test("Task 1", async({page})=>{
    await page.goto("https://www.lenskart.com/");
    await page.locator('//div[@class="sc-3b185ffd-2 bGQhWP"]').nth(4).hover();
    await page.locator('//a[@class="sc-2ea48804-9 byBHlR getGaData"]').nth(1).click();
    await page.screenshot({path:"Daily Assessment March 10/screenshot/task1.png"});
})