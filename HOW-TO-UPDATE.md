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

## Updating the "Next shipments" board
Open `schedule.js` and add one line per upcoming shipment, for example:
```
{ from: "Guangzhou, China", method: "Sea freight · 40ft container", closes: "2026-10-20", arrives: "Early December", note: "Space filling fast" },
```
- `closes` must be written year-month-day. When the date passes, the card disappears by itself.
- If there are no upcoming shipments, the site shows "New closing dates coming soon" with a WhatsApp button.

## Getting found on Google (free)
1. **Google Business Profile** (most important for a local business):
   - Go to https://business.google.com and sign in with your Gmail.
   - Business name: *Mr. Smile Logistics & Delivery Services*. Category: *Shipping service* (add *Freight forwarding service* and *Car shipping service* as extra categories).
   - Address: Tesano, behind Lakeside Clinic, Accra. Place the pin on the map exactly.
   - Phone: +233 24 750 1144. Website: your GitHub address.
   - Google will verify you (usually by video or phone). Then add photos of your office, shipments and cars.
   - Ask happy customers to leave a Google review. Reviews push you up in "shipping to Ghana" searches.
2. **Google Search Console** (tells Google your site exists):
   - Go to https://search.google.com/search-console, add your site address, and verify it.
   - Under *Sitemaps*, submit `sitemap.xml`.
3. Share your link on WhatsApp status, Facebook and TikTok. A nice preview card with your logo shows automatically.
