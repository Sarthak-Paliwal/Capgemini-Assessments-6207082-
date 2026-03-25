import {Locator,expect,Page} from "@playwright/test"
import path from "path"
import fs from "fs"
const jsonData=fs.readFileSync(path.join(__dirname,"../utility/customerData.json"),'utf-8')
const customerData=JSON.parse(jsonData)

class Banking{
    bankManagerLoginBtn:Locator
    addCustomerBtn:Locator
    firstNameTf:Locator
    lastNameTf:Locator
    postCodeTf:Locator
    submitDataBtn:Locator
    openAccountBtn:Locator
    customerNameSelect:Locator
    currencySelect:Locator
    processBtn:Locator
    homeBtn:Locator
    page:Page
    data:any=customerData
    constructor(page:Page){
        this.page=page
        this.bankManagerLoginBtn=page.getByRole("button",{name:"Bank Manager Login"})
        this.addCustomerBtn=page.getByRole("button",{name:"Add Customer "})
        this.firstNameTf=page.getByPlaceholder("First Name")
        this.lastNameTf=page.getByPlaceholder("Last Name")
        this.postCodeTf=page.getByPlaceholder("Post Code")
        this.submitDataBtn=page.getByRole("button",{name:"Add Customer"}).last();
        this.openAccountBtn=page.getByRole("button",{name:"Open Account "});
        this.customerNameSelect=page.locator("#userSelect")
        this.currencySelect=page.locator("#currency")
        this.processBtn=page.getByRole("button",{name:"Process"})
        this.homeBtn=page.getByRole("button",{name:"Home"})




    }
    

    async addNewCustomer(){
        await this.bankManagerLoginBtn.click()
        await this.addCustomerBtn.click();
        await this.firstNameTf.fill(this.data.firstName);
        await this.lastNameTf.fill(this.data.lastName)
        await this.postCodeTf.fill(this.data.postCode)
        await this.submitDataBtn.click();
        
    }
    async createAccount(){
        await this.openAccountBtn.click();
        await this.customerNameSelect.selectOption({label:`${this.data.firstName} ${this.data.lastName}`});
        await this.currencySelect.selectOption("Rupee");
        await this.processBtn.click();
        this.homeBtn.click()
    }
    
}
export default Banking;