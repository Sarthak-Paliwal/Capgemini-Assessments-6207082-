import { test, expect } from '@playwright/test';
import path from "path"
import fs from "fs"
import Upload from "./TaskUpload.page.ts"
const jsonData=fs.readFileSync(path.join(__dirname,"./uploadTask.json"),'utf-8')
const data=JSON.parse(jsonData)
test('Upload Files', async ({ page }) => {
    let UploadPage=new Upload(page,data);
    await page.goto(data.url);
    await UploadPage.handleUpload();
    await UploadPage.checkUpload();
    
});
