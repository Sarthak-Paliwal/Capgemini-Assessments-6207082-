import {Locator,Page,expect} from "@playwright/test"
import path from "path"
import fs from "fs"

class Upload{
    fileUploadIF:Locator
    page:Page
    submitBtn:Locator
    data:any
    uploadedFileName:Locator
    constructor(page:Page,data:any){
        this.fileUploadIF=page.locator("#file-upload");
        this.page=page;
        this.submitBtn=page.locator("#file-submit");
        this.data=data
        this.uploadedFileName=page.locator('#uploaded-files')
    }
    async handleUpload(){
        await this.fileUploadIF.setInputFiles(`${this.data.filePath}`)
        await this.submitBtn.click();
        await this.page.screenshot({path:"./UploadPage.png"})
    }
    async checkUpload(){
        const fname = (await this.uploadedFileName.textContent())?.trim();

expect(fname).toBe(this.data.fileName);
    }

}
export default Upload;