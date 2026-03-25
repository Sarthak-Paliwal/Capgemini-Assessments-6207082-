import { test, expect } from '@playwright/test';
import AddCustomer from "../pom/AddCustomer.page.ts"
import Account from "../pom/handleAccount.page.ts"

import path from "path"
import fs from "fs"
const jsonData=fs.readFileSync(path.join(__dirname,"../utility/WebData.json"),'utf-8')
const webData=JSON.parse(jsonData)

test.use({
    launchOptions:{
        slowMo:500
    }
})

test('Banking Application', async ({ page }) => {
    page.on("dialog",async d=>{
        await d.accept();
    })
    test.slow()
    await page.goto(webData.url);
    const addCustomerPage=new AddCustomer(page);
    const accountPage=new Account(page);
    await addCustomerPage.addNewCustomer();
    await addCustomerPage.createAccount()
    await accountPage.accountLogin();
    await accountPage.depositAmmount()
    await accountPage.withdrawlAmmount()
});
