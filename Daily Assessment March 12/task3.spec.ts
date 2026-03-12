import { test, expect } from '@playwright/test';

test('Task 3', async ({ page }) => {
    page.on("dialog",async d=>{
        if(d.type()=="alert"){
            await d.accept();
        }
        else if(d.type()=="confirm"){
            await d.dismiss();
        }
        else{
            await d.accept("Playwright Testing");
        }
    })
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    await page.getByRole("button",{name:"Click for JS Alert"}).click()
    await page.getByRole("button",{name:"Click for JS Confirm"}).click()
    await page.getByRole("button",{name:"Click for JS Prompt"}).click()
    const p= await page.locator("p#result");
    await expect(p).toHaveText("You entered: Playwright Testing")
        await page.screenshot({ path: "screenshot/task3.png" });

});
