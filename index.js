import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import {loginSelectors, searchResultSelectors, pages, searchParam} from './helpers/selectors';

dotenv.config();

(async () => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      timeout: 10000,
    });
    
    const page = await browser.newPage();

    await page.goto(pages.loginPage);

    await page.type(loginSelectors.usernameInput, process.env.USER_LOGIN);
    await page.type(loginSelectors.passwordInput, process.env.USER_PASSWORD);
    await page.click(loginSelectors.submitButton);
    await page.waitForSelector(loginSelectors.loggedInProfile);

    await page.goto(`${pages.searchPage}/${searchParam.query}`);
    await page.waitForSelector(searchResultSelectors.resultDiv);

    const data = await page.evaluate((searchResultSelectors) => {
      let legendas = [];
      const resultElements = Array.from(document.querySelectorAll(searchResultSelectors.resultItems));

      resultElements.forEach((resultElement) => {
        const language = resultElement.querySelector(searchResultSelectors.languageImage).title;
        const name = resultElement.querySelector(searchResultSelectors.itemName).innerText;
        const downloadUrl = resultElement.querySelector(searchResultSelectors.itemDownloadLink).href;
        const documentText = resultElement.querySelector(searchResultSelectors.itemDescription).innerText;

        const splitedText = documentText.split(' ');
        const score = Number(splitedText[3].replace(",", ""));
        const createDate = new Date(splitedText[8] + ' ' + splitedText[10]).toJSON();

        legendas.push({
          name: name,
          downloadQuantity: Number(splitedText[0]),
          score: score,
          likeRatio: parseFloat((score/10).toFixed(2)),
          author: splitedText[6],
          date: createDate,
          language: language,
          downloadUrl:  downloadUrl
        })
      })

      return legendas;
    }, searchResultSelectors);
    
    console.log(`Foram encontradas ${data.length} legendas`);
    await browser.close();
  } catch (e) {
    console.log(e);
  }
})();