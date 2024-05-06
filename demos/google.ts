import puppeteer from "puppeteer";

// Typescript forces us to deal with data types. This helps us write better code.

interface SearchResult {
    title: string,
    URL: string
}

(async () => {
        //Begin our code.
        const puppeteerLaunchOptions = { headless: false };
        const browser = await puppeteer.launch(puppeteerLaunchOptions);
        const page = await browser.newPage();
        page.goto("https://google.com");
        await page.waitForSelector("textarea");
        await page.type("textarea", "Hack the planet!");
        await page.keyboard.press("Enter");
        // Google randomizes their class names so we have to be sneaky and use css selectors to select a structure instead of class names!
        await page.waitForSelector("span>a>h3");
        const searchResults = await page.$$eval("span>a>h3", (nodeList) => {
            const results: Array<SearchResult> = [];
            nodeList.forEach(node => {
                const parent = node.parentElement as HTMLAnchorElement | undefined;
                const URL = parent?.href;
                if(!URL) return;
                const title = node.textContent;
                if(!title) return;
                results.push({
                    title,
                    URL
                });
            });
            return results;
        });
        console.log(searchResults);
})