# Beta Program Form — Google Sheet + Email Setup

The `/beta` application form posts to `/api/beta-application`, which forwards the
submission to a Google Apps Script web app. That script appends a row to a Google
Sheet and sends an email notification.

Nothing here requires a Google Cloud project or an API key. The sheet owner runs
the script under their own Google account.

---

## Step 1 — Create the sheet

1. Create a new Google Sheet named **MetrixAI Beta Applications**.
2. Leave it empty. The script writes the header row automatically on the first
   submission.

## Step 2 — Add the script

In the sheet, go to **Extensions → Apps Script**, delete the placeholder code,
and paste the following:

```javascript
// Email address that receives a notification on every submission.
var NOTIFY_EMAIL = 'REPLACE_WITH_YOUR_EMAIL@example.com';

var HEADERS = [
  'Submitted At',
  'First Name',
  'Last Name',
  'Company Name',
  'Title',
  'Email',
  'Phone',
  'Employee Count',
  'HR Systems',
  'Biggest Challenge',
  'Decision Maker',
  'Acknowledged Fee',
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.firstName || '',
      data.lastName || '',
      data.companyName || '',
      data.title || '',
      data.email || '',
      data.phone || '',
      data.employeeCount || '',
      data.hrSystems || '',
      data.challenge || '',
      data.decisionMaker || '',
      data.acknowledged || '',
    ]);

    sendNotification(data);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function sendNotification(data) {
  var name = (data.firstName || '') + ' ' + (data.lastName || '');
  var subject = 'New MetrixAI beta application: ' + (data.companyName || 'Unknown company');

  var body =
    'A new beta program application has been submitted.\n\n' +
    'Name: ' + name.trim() + '\n' +
    'Company: ' + (data.companyName || '') + '\n' +
    'Title: ' + (data.title || '') + '\n' +
    'Email: ' + (data.email || '') + '\n' +
    'Phone: ' + (data.phone || 'Not provided') + '\n' +
    'Employees: ' + (data.employeeCount || '') + '\n' +
    'HR systems: ' + (data.hrSystems || '') + '\n' +
    'Decision maker: ' + (data.decisionMaker || '') + '\n\n' +
    'Biggest challenge:\n' + (data.challenge || '') + '\n\n' +
    'Submitted at: ' + (data.submittedAt || '') + '\n\n' +
    'Full log: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl();

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}
```

Replace `NOTIFY_EMAIL` with the address that should receive notifications.
To notify several people, use a comma-separated string:
`'ayana@example.com,info@metrixai.io'`.

## Step 3 — Deploy it

1. Click **Deploy → New deployment**.
2. Next to "Select type", click the gear icon and choose **Web app**.
3. Set:
   - **Description**: `Beta form endpoint`
   - **Execute as**: **Me**
   - **Who has access**: **Anyone**
4. Click **Deploy**, then **Authorize access** and approve the permissions
   prompt (it needs permission to edit the sheet and send mail as you).
5. Copy the **Web app URL**. It looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

> **"Who has access" must be "Anyone".** With "Anyone with Google account" the
> site cannot post to it and every submission fails.

## Step 4 — Add the URL to Vercel

In the Vercel project → **Settings → Environment Variables**, add:

| Name | Value | Environments |
| --- | --- | --- |
| `GOOGLE_SCRIPT_URL` | the Web app URL from Step 3 | Production, Preview, Development |

Redeploy for it to take effect.

For local development, add the same line to `.env.local`:

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
```

---

## Behaviour when it is not configured

If `GOOGLE_SCRIPT_URL` is missing, the form still shows the success message so
the page stays reviewable, but the submission is **not stored anywhere** — it is
only written to the server logs with an error. Set the variable before sending
real traffic to `/beta`.

## Updating the script later

After editing the script, deploy again with **Deploy → Manage deployments →
edit → Version: New version → Deploy**. This keeps the same URL. Creating a
brand-new deployment instead issues a different URL and `GOOGLE_SCRIPT_URL`
would need updating.
