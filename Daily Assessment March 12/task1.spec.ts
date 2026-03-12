import { test, expect } from '@playwright/test';

test('Task 1', async ({ page }) => {
    await page.goto("https://www.flipkart.com");
    const input=await page.getByPlaceholder("Search for Products, Brands and More").first();    
    await input.fill("Samsung Mobiles");
    await input.press("Enter");
    const [page2]=await Promise.all([
         page.waitForEvent("popup"),
         page.locator('//img[@class="UCc1lI"]').first().click()
    ])
    const title=await page2.locator('//div[@class="v1zwn21k v1zwn26 _1psv1zeb9 _1psv1ze0"]').first().textContent();
    console.log(title);
    await page.screenshot({path:"screenshot/task1-page1.png"})

    await page2.screenshot({path:"screenshot/task1-page2.png"})
    
    
});
