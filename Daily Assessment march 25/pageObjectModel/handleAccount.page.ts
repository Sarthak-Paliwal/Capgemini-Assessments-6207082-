import {Locator,expect,Page} from "@playwright/test"
import path from "path"
import fs from "fs"
const jsonData=fs.readFileSync(path.join(__dirname,"../utility/customerData.json"),'utf-8')
const customerData=JSON.parse(jsonData)

const jsonData2=fs.readFileSync(path.join(__dirname,"../utility/AccountInfo.json"),'utf-8')
const accountData=JSON.parse(jsonData2)
class Account{
    customerLoginbtn:Locator
    accountNameSelect:Locator
    withdrawBtn:Locator
    depositBtn:Locator
    page:Page
    loginBtn:Locator
    depositTf:Locator
    withdrawlTf:Locator
    depositMoney:Locator
    withdrawMoney:Locator
    balance:Locator
    constructor(page:Page){
        this.page=page
        this.customerLoginbtn=page.getByRole("button",{name:"Customer Login"})
        this.accountNameSelect=page.locator('#userSelect')
        this.loginBtn=page.getByRole("button",{name:"Login"})
        this.depositBtn=page.getByRole("button",{name:"Deposit ",exact:true})
        this.depositTf=page.getByPlaceholder("amount")
        this.depositMoney=page.getByRole("button",{name:"Deposit",exact:true}).last()
        this.withdrawBtn=page.getByRole("button",{name:"Withdrawl ",exact:true})
        this.withdrawlTf=page.getByPlaceholder("amount")
        this.withdrawMoney=page.getByRole("button",{name:"Withdraw",exact:true}).last()
        this.balance=page.locator('(//div[@ng-hide="noAccount"]/strong)[2]')

    }
    async accountLogin(){
        await this.customerLoginbtn.click()
        await this.accountNameSelect.selectOption({label:`${customerData.firstName} ${customerData.lastName}`})
        await this.loginBtn.click();
    }
    async depositAmmount(){
        await this.depositBtn.click();
        await this.depositTf.fill(accountData.deposit)
        await this.depositMoney.click();
        const balanceamt=this.balance
        await expect(balanceamt).toHaveText(accountData.deposit)

    }
    async withdrawlAmmount(){
        await this.withdrawBtn.click()
        await this.page.waitForSelector(this.withdrawlTf)
        await this.withdrawlTf.fill(accountData.withdraw)
        await this.withdrawMoney.click();
        const balanceamt=this.balance
        await this.page.waitForSelector(balanceamt)
        await expect(balanceamt).toHaveText(accountData.afterWithdraw)
        

    }
}
export default Account