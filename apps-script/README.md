# Customer reviews: Google Sheet setup (one time, about 10 minutes)

Reviews submitted on the website are saved in a Google Sheet in **your** Google account.
You approve each one by ticking a box, and it then appears on the website. It's free.

## 1. Create the sheet
1. Go to https://sheets.new while signed in as **meshachassan23@gmail.com**.
2. Name it **Mr. Smile Reviews** (click "Untitled spreadsheet" at the top left).

## 2. Add the script
1. In the sheet's menu: **Extensions → Apps Script**.
2. Delete everything in the editor, then paste in the whole contents of `Code.gs` (from this folder).
3. Click the 💾 **Save** icon.
4. In the toolbar, choose **setup** from the function drop-down, then click **▶ Run**.
5. Google asks for permission: click **Review permissions**, choose your account, then **Advanced → Go to (unsafe) → Allow**.
   (It says "unsafe" only because you wrote the script yourself. It just lets the script use this sheet and email you.)

## 3. Publish it as a web app
1. Click **Deploy → New deployment**.
2. Click the ⚙️ gear next to "Select type" and choose **Web app**.
3. Set **Execute as: Me** and **Who has access: Anyone**.
4. Click **Deploy** and copy the **Web app URL**. It looks like `https://script.google.com/macros/s/AKfy.../exec`.
5. Send that URL to Claude, or paste it into `config.js` as `reviewsApi: "PASTE-URL-HERE",` and publish.

## Approving reviews
- Each new review arrives as a new row, and you get an email.
- Tick the box in the **Approve ✅** column. The review appears on the website within a few seconds (customers just refresh).
- Untick it, or delete the row, to remove it.
- Reviews where the customer said "No" in **OK to publish?** never appear, even if ticked.
- You can do all of this from the Google Sheets app on your phone.

## If you change the script later
Use **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**, so the same URL keeps working.
