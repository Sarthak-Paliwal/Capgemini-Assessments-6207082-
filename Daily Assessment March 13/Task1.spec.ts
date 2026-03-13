import { test, expect } from '@playwright/test';
import excel from "exceljs";
import path from "path";

test('Task 1', async ({ page }) => {

    const book = new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname, "./testdata/excel1.xlsx"))

    const sheet = book.getWorksheet("Sheet1");

    const fname = page.locator("#firstName");
    const lname = page.locator("#lastName");
    const emailId = page.locator("#userEmail")

    const male = page.locator("#gender-radio-1");
    const female = page.locator("#gender-radio-2")
    const other = page.locator("#gender-radio-3")

    const mobileNo = page.locator("#userNumber")
    const date = page.locator("#dateOfBirthInput")
    const subject = page.locator("#subjectsInput")

    const sport = page.locator("#hobbies-checkbox-1")
    const reading = page.locator("#hobbies-checkbox-2")
    const music = page.locator("#hobbies-checkbox-3")

    const uploadPicture = page.locator("#uploadPicture")
    const Curraddress = page.locator("#currentAddress")
    const states=await page.locator("#react-select-3-input");
    const cities=await page.locator("#react-select-4-input")
    for (let i = 1; i <= sheet?.rowCount!; i++) {

        await page.goto("https://demoqa.com/automation-practice-form")

        const firstname = sheet?.getRow(i).getCell(1).toString();
        const lastname = sheet?.getRow(i).getCell(2).toString();
        const email = sheet?.getRow(i).getCell(3).toString();
        const gender = sheet?.getRow(i).getCell(4).toString();
        const mobile = sheet?.getRow(i).getCell(5).toString();
        const dob = sheet?.getRow(i).getCell(6).toString();
        const subjects = sheet?.getRow(i).getCell(7).toString()
        const hobby = sheet?.getRow(i).getCell(8).toString();
        const picture = sheet?.getRow(i).getCell(9).toString();
        const address = sheet?.getRow(i).getCell(10).toString();
        const state = sheet?.getRow(i).getCell(11).toString();
        const city = sheet?.getRow(i).getCell(12).toString();


        await fname.fill(firstname!);
        await lname.fill(lastname!);
        await emailId.fill(email!);

        // Handle gender radio button
        if (gender?.toLowerCase() === "male") {
            await male.check();
        } 
        else if (gender?.toLowerCase() === "female") {
            await female.check();
        } 
        else if (gender?.toLowerCase() === "other") {
            await other.check();
        }

        await mobileNo.fill(mobile!)

        const subjectList = subjects?.split(",");

        for (const s of subjectList!) {
            const value = s.trim();
            await subject.fill(value);
            await subject.press("Tab");
        }

        const hobbies = hobby?.split(",");

        for (const h of hobbies!) {
            const value = h.trim().toLowerCase();

            if (value === "sports") {
                await sport.check();
            }
            else if (value === "reading") {
                await reading.check();
            }
            else if (value === "music") {
                await music.check();
            }
        }
        await uploadPicture.setInputFiles(`D:/Playwright/tests/profileImages/${picture}`);
        await Curraddress.fill(address!);
        await states.fill(state!);
        await states.press("Tab")
        await cities.fill(city!);
        await cities.press("Tab")

        await page.locator("#submit").click();
    }

});