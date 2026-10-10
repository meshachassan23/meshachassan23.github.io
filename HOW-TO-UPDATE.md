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

## Your live website
**https://meshachassan23.github.io**. It's hosted free by GitHub Pages from the repository
`meshachassan23/meshachassan23.github.io`.

## Publishing changes
After editing files in this folder, open Terminal and run:
```
cd ~/Desktop/import-website
git add -A
git commit -m "Describe your change"
git push
```
The live site updates in about a minute. (Your Mac remembers your GitHub token, so it won't ask again.)

You can also edit a file directly on github.com: open it in the repository, click the pencil icon, change it, then click **Commit changes**.

## Tip
A custom address like `yourcompany.com` is optional (about $10/year) and can be connected later in Settings → Pages.

## Visitors still see the old version after an update?
Browsers keep old copies of files. In `index.html` and `terms.html`, change every `?v=23` to the next number (`?v=24`, then `?v=25`…) whenever you edit `config.js`, `tracking.js`, `script.js` or `styles.css`.

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

## Publishing customer reviews
**Recommended: Google Sheet (reviews post on the website after you tick "Approve").**
Do the one-time setup in `apps-script/README.md`, then put the web-app link in `config.js` as `reviewsApi`.
After that, each new review lands in your Google Sheet (and you get an email). Tick **Approve ✅** and it appears on the site.

**Until that's set up,** reviews arrive on your WhatsApp. Replying on WhatsApp does NOT publish them.
To publish one by hand, add a line to `reviews.js`:
```
{ name: "Kofi", city: "Kumasi", stars: 5, service: "Car shipping", date: "2026-10-04", text: "My car arrived in perfect condition." },
```
- Only publish real reviews, with the customer's permission. Never make reviews up.

## The help bot ("Ask Mr. Smile")
All its answers are in `bot.js`, in the `BOT_ANSWERS` list at the top.
- To change an answer, edit its `answer:` text. `**words**` shows in bold.
- `keywords:` are words a customer might type that should lead to that answer. Add more if the bot misses questions.
- Questions it can't answer get a "Ask on WhatsApp" button, and so do 👎 ratings, so no customer gets stuck.
- When you change prices, payment methods or delivery times, update the bot's answers too.
- Customers can send **photos and links** through the bot's "📷 Send a photo or link" form.
  - Once the Google Sheet is set up (`apps-script/README.md`), requests go to the sheet's **Requests** tab, photos to the Drive folder **Mr. Smile requests**, and you get an email.
  - Until then, on phones the photos and details are shared straight to WhatsApp. On computers, the details open in WhatsApp and the customer attaches the photo there.
