import { Locator, Page } from "@playwright/test";

class Amazon {
  CareerLink: Locator;
  page: Page;
  opportunityLink: Locator;
  universityLink: Locator;
  countryTf: Locator;
  stateTf: Locator;
  cityTf: Locator;
  EmploymentTypeCb: Locator;
  categoryCb: Locator;
  CareerCb: Locator;
  TeamCb: Locator;
  roleCb: Locator;
  job: Locator;
  page2!: Page;
  data: any;

  constructor(page: Page, data: any) {
    this.page = page;
    this.data = data;

    this.CareerLink = page.locator('//a[@href="https://amazon.jobs"]');
    this.opportunityLink = page.locator(
      '//a[@href="/content/en/career-programs/university"]'
    );
    this.universityLink = page
      .locator('//a[@data-test-component="StencilReactButton"]')
      .first();

    this.countryTf = page
      .locator('(//input[@data-test-component="StencilSearchFieldInput"])')
      .first();
    this.stateTf = page
      .locator('(//input[@data-test-component="StencilSearchFieldInput"])')
      .nth(1);
    this.cityTf = page
      .locator('(//input[@data-test-component="StencilSearchFieldInput"])')
      .nth(2);

    this.EmploymentTypeCb = page.getByLabel(this.data.FilterJobs.Type);
    this.categoryCb = page.getByLabel(this.data.FilterJobs.Category);
    this.CareerCb = page.getByLabel(this.data.FilterJobs.Career);
    this.TeamCb = page.getByLabel(this.data.FilterJobs.Team);
    this.roleCb = page.getByLabel(this.data.FilterJobs.Role);

    this.job = page.locator(
      '//div[@id="search"]/div/div[2]/ul/li[2]/div/div[1]/div[1]/div[1]/h3/a'
    );
  }

  async getCareers() {
    await this.CareerLink.scrollIntoViewIfNeeded();
    await this.CareerLink.click();
    await this.opportunityLink.click();
    await this.universityLink.click();
  }

  async filterJobs() {
    await this.countryTf.fill(this.data.FilterJobs.Country);
    await this.countryTf.focus();
    await this.page.waitForTimeout(800);
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");

    await this.stateTf.fill(this.data.FilterJobs.State);
    await this.stateTf.focus();
    await this.page.waitForTimeout(800);
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");

    await this.cityTf.fill(this.data.FilterJobs.City);
    await this.cityTf.focus();
    await this.page.waitForTimeout(800);
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");

    await this.EmploymentTypeCb.click();
    await this.categoryCb.click();
    await this.CareerCb.click();
    await this.TeamCb.click();
    await this.roleCb.click();
  }
  

  async getJob() {
    const [newPage] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.job.click(),
    ]);

    this.page2 = newPage;
    await this.page2.waitForLoadState();

    const applyBtn = this.page2.locator("#apply-button");

    await this.page2.screenshot({ path: "screenshot/Amazon-Jobs.png" });

    await applyBtn.click();
  }
}

export default Amazon;