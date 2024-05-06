const puppeteer = require("puppeteer");
// require() is importing the puppeteer library
// const puppeteer is the equivelent of a constant pointer. You can't change the address of puppeteer, but you can mutate the object it's pointing too.
// Comments! wow.

/**
 * Paragraph comment. Wow!
 * 
 * What is going on here?
 * This is a weird hack to define an anonymous function and call it immediately.
 * For example, (async () => ())();
 * the first set of parentheses casts the function as a variable.
 * we take "async () => ()"
 * wrap it in parentheses "(async () => ())"
 * and it becomes the equivelent of doing something like this.
 * const a = async() => ();
 * a(); // call a
 * JavaScript treats functions as first class citizens!
 */


// Begin async hack
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
        const results = [];
        nodeList.forEach(node => {
            const URL = node.parentElement.href;
            const title = node.textContent;
            results.push({
                title,
                URL
            });
        });
        return results;
    });
    console.log(searchResults);
    // This code has a behavioral bug, do you notice it?
    // End our code.
// End async hack.
})();