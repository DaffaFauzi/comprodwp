const { chromium } = require('playwright');
(async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const urls = [
      'http://localhost:3000/id/about',
      'http://127.0.0.1:3000/id/about',
      'http://192.168.1.97:3000/id/about',
    ];
    let ok = false;
    for (const u of urls) {
      try {
        await page.goto(u, { waitUntil: 'networkidle', timeout: 8000 });
        ok = true;
        break;
      } catch (e) {
        console.error('failed', u, e.message);
      }
    }
    if (!ok) {
      console.error('All urls failed');
      process.exit(2);
    }
    const el = await page.$('#struktur-organisasi');
    if (!el) {
      console.error('Selector not found');
      process.exit(2);
    }
    await el.screenshot({ path: 'org-structure.png', fullPage: false });
    await browser.close();
    console.log('screenshot saved');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
