const puppeteer = require('puppeteer');
const fetch = require("node-fetch");
const secrets = require("./secret");

const DOCTOLIB_PAGE = 'https://www.doctolib.fr/dentiste/ille-et-vilaine?availabilities=1'
const PUSHOVER_TOKEN = secrets.notif_token
const PUSHOVER_USER = secrets.notif_user

const sendNotification = async (title, message) => {
    const params = {
        token: PUSHOVER_TOKEN,
        user: PUSHOVER_USER,
        message,
        sound: "cashregister",
        title
    }
    let paramsStr = "";
    for (let param of Object.entries(params)) {
        paramsStr += `${param[0]}=${param[1]}&`
    }
    const res = await fetch(`https://api.pushover.net/1/messages.json?${paramsStr}`, {
        method: "POST",
    });
}

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    await page.goto(DOCTOLIB_PAGE);

    while (true) {
        try {
            await page.waitForSelector('.results');
            await page.waitFor(() => !document.querySelector('body > div.results > div > div.col-8.col-padding.search-results-col-list > div.js-filtered-search-results > div > div > div > div > div > div'));

            await new Promise(r => setTimeout(r, 100))
            const textContent = await page.evaluate(() => {
                return document.querySelector('.results').innerHTML;
            });
            if (textContent.indexOf("aucun résultat pour votre recherche") === -1) {
                sendNotification("APPOINTEMENT FOUND !", "APPOINTEMENT FOUND !")
                break
            } else {

            }
        } catch (error) {
            console.log(error);
        }

        await new Promise(r => setTimeout(r, 5000))
        await page.reload()

    }

    await browser.close();
})();

