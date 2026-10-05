/**
 * Mr. Smile — customer reviews, stored in this Google Sheet.
 * Setup steps: see README.md in this folder.
 *
 * New reviews arrive as rows. To publish one on the website,
 * tick its box in the "Approve" column. Untick to hide it again.
 */
const SHEET_NAME = 'Reviews';
const NOTIFY_EMAIL = 'meshachassan23@gmail.com';   // gets an email for each new review
const HEADERS = ['Date', 'Name', 'City', 'Stars', 'Service', 'Review', 'OK to publish?', 'Approve ✅'];

// Run this ONCE from the editor (select "setup" and click Run).
function setup() {
  const sh = getSheet_();
  sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold').setBackground('#fff3cf');
  sh.setFrozenRows(1);
  sh.setColumnWidth(6, 420);
  sh.getRange('F:F').setWrap(true);
}

// Website sends a new review here.
function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.website) return json_({ ok: true });            // spam-bot trap field
  const stars = Math.round(Number(p.stars));
  const name = clean_(p.name, 40);
  const text = clean_(p.text, 600);
  if (!(stars >= 1 && stars <= 5) || !name || !text) return json_({ ok: false, error: 'invalid' });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = getSheet_();
    sh.appendRow([new Date(), name, clean_(p.city, 40), stars, clean_(p.service, 60), text,
                  p.consent === 'yes' ? 'Yes' : 'No', false]);
    sh.getRange(sh.getLastRow(), 8).insertCheckboxes();
  } finally {
    lock.releaseLock();
  }

  try {
    MailApp.sendEmail(NOTIFY_EMAIL,
      'New review ' + '★'.repeat(stars) + ' from ' + name,
      name + (p.city ? ' (' + clean_(p.city, 40) + ')' : '') + ' rated you ' + stars + '/5:\n\n"' + text + '"\n\n' +
      'To publish it on the website, tick its box in the "Approve" column:\n' +
      SpreadsheetApp.getActiveSpreadsheet().getUrl());
  } catch (err) { /* email is optional */ }

  return json_({ ok: true });
}

// Website reads the approved reviews from here.
function doGet() {
  const rows = getSheet_().getDataRange().getValues().slice(1);
  const reviews = rows
    .filter(r => r[7] === true && r[6] === 'Yes' && r[1] && r[5])
    .map(r => ({
      date: Utilities.formatDate(new Date(r[0]), 'GMT', 'yyyy-MM-dd'),
      name: String(r[1]), city: String(r[2]), stars: Number(r[3]),
      service: String(r[4]), text: String(r[5])
    }));
  return json_({ reviews: reviews });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}
function clean_(s, max) {
  let v = String(s || '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
  if (/^[=+\-@]/.test(v)) v = "'" + v;                 // stop text being read as a formula
  return v;
}
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
