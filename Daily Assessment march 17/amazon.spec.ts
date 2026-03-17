import { test, expect } from '@playwright/test';
import Amazon from "../pom/career.page.ts"
import path from "path"
import fs from "fs"
const jsonData=fs.readFileSync(path.join(__dirname,"../tests/testdata/amazon.json"),'utf-8')
const data=JSON.parse(jsonData)
test('Amazon Test', async ({ page }) => {
    const amazonPage=new Amazon(page,data);
    await page.goto(data.url)
    await amazonPage.getCareers();
    await amazonPage.filterJobs()
    await amazonPage.getJob()
    
});
