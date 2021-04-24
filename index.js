const puppeteer = require('puppeteer');

const args = process.argv.slice(2)[0];

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://codequiz.azurewebsites.net/');
	await page.click('input[value="Accept"]');
	await page.screenshot({ path: 'snapshot.png' });

	const result = await page.evaluate(() => {
		const rows = document.querySelectorAll('tr');
		return Array.from(rows, (row) => {
			const columns = row.querySelectorAll('td');
			return Array.from(columns, (column) => column.innerText);
		});
	});

	const Funds = result.reduce((acc, curr) => {
		if (curr.length > 0) return { ...acc, [curr[0]]: curr[1] };
	}, {});

	console.log(args, Funds[args]);
	await browser.close();
})();
