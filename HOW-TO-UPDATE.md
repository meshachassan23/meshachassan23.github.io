# How to update and publish your website

## Files you will edit
| File | What to change |
|---|---|
| `config.js` | Business name, WhatsApp number, email, addresses, countries, shipping prices, social links |
| `tracking.js` | Add or update customer shipments (no names or phone numbers — this file is public) |
| `terms.html` | Your terms and policies |
| `index.html` | Any other text on the page |

Open files with TextEdit (Format → Make Plain Text) or, better, the free editor VS Code.

## View it on your computer
Double-click `index.html`, and it opens in your browser.

## Put it online for free (GitHub Pages)
1. Create a free account at https://github.com
2. Click **+** (top right) → **New repository**. Name it e.g. `my-import-site`, set it to **Public**, and click **Create repository**.
3. Click **uploading an existing file**, drag in ALL the files from this folder, then click **Commit changes**.
4. Go to **Settings → Pages**. Under "Branch" choose **main** and **/ (root)**, then click **Save**.
5. Wait 1–2 minutes. Your site is live at `https://YOUR-USERNAME.github.io/my-import-site/`

To update later: open the repository, click the file (e.g. `tracking.js`), click the pencil icon ✏️, make your change, and click **Commit changes**. The site updates in about a minute.

## Tip
If you name the repository exactly `YOUR-USERNAME.github.io`, the address becomes the shorter `https://YOUR-USERNAME.github.io`.
A custom address like `yourcompany.com` is optional (about $10/year) and can be connected later in Settings → Pages.

## Visitors still see the old version after an update?
Browsers keep old copies of files. In `index.html` and `terms.html`, change every `?v=12` to the next number (`?v=13`, then `?v=14`…) whenever you edit `config.js`, `tracking.js`, `script.js` or `styles.css`.
