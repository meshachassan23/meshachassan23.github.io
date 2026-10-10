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

// Website sends a new review (or a quote request from the help bot) here.
function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.website) return json_({ ok: true });            // spam-bot trap field
  if (p.kind === 'request') return saveRequest_(p);
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

// Quote requests from the "Ask Mr. Smile" bot: photos go to a Drive folder, details to a "Requests" tab.
function saveRequest_(p) {
  const name = clean_(p.name, 40), phone = clean_(p.phone, 20), details = clean_(p.details, 800);
  if (!name || !phone || !details) return json_({ ok: false, error: 'invalid' });
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName('Requests') || ss.insertSheet('Requests');
  if (sh.getLastRow() === 0) {
    sh.appendRow(['Date', 'Name', 'WhatsApp', 'Type', 'From', 'Details', 'Link', 'Photos', 'Done ✅']);
    sh.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#fff3cf'); sh.setFrozenRows(1);
  }
  const folders = DriveApp.getFoldersByName('Mr. Smile requests');
  const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder('Mr. Smile requests');
  const links = [];
  for (let i = 0; i < 4; i++) {
    const d = p['photo' + i];
    if (!d || d.indexOf('data:image/') !== 0) continue;
    const blob = Utilities.newBlob(Utilities.base64Decode(d.split(',')[1]), 'image/jpeg',
      Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM-dd_HHmm') + '_' + name + '_' + (i + 1) + '.jpg');
    links.push(folder.createFile(blob).getUrl());
  }
  const link = clean_(p.link, 500);
  sh.appendRow([new Date(), name, phone, clean_(p.type, 40), clean_(p.origin, 20), details, link, links.join('\n'), false]);
  sh.getRange(sh.getLastRow(), 9).insertCheckboxes();
  try {
    const wa = 'https://wa.me/' + phone.replace(/\D/g, '').replace(/^0/, '233');
    MailApp.sendEmail(NOTIFY_EMAIL, 'New request from ' + name + ' (' + clean_(p.type, 40) + ')',
      name + ' (WhatsApp ' + phone + ')\nFrom: ' + clean_(p.origin, 20) + ' → Ghana\n\n' + details +
      (link ? '\n\nLink: ' + link : '') + (links.length ? '\n\nPhotos:\n' + links.join('\n') : '') +
      '\n\nReply on WhatsApp: ' + wa + '\nAll requests: ' + ss.getUrl());
  } catch (err) { /* email is optional */ }
  return json_({ ok: true });
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
