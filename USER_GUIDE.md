# User Guide - Google URL Scraper Extension

## 📖 Table of Contents

1. [Getting Started](#getting-started)
2. [Basic Operations](#basic-operations)
3. [Advanced Features](#advanced-features)
4. [Understanding Status Indicators](#understanding-status-indicators)
5. [Data Management](#data-management)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

---

## 🚀 Getting Started

### First Time Setup

1. **Install the Extension**
   - Follow the INSTALLATION.md guide
   - Verify extension icon appears in toolbar

2. **Pin to Toolbar** (Recommended)
   - Click the puzzle piece icon (🧩) in Chrome toolbar
   - Find "Google URL Scraper"
   - Click the pin icon to keep it visible

3. **Test Basic Functionality**
   - Go to https://google.com
   - Search for "test"
   - Click extension icon
   - You should see the popup interface

---

## 🎯 Basic Operations

### Starting a Scraping Session

1. **Navigate to Google Search**
   ```
   1. Open https://google.com
   2. Enter your search query (e.g., "business blog")
   3. Press Enter or click Search
   4. Wait for results to load completely
   ```

2. **Open Extension Popup**
   ```
   - Click the extension icon in toolbar
   - Popup window will open
   ```

3. **Start Scraping**
   ```
   - Click "🚀 Start Scraping" button
   - Extension begins collecting URLs automatically
   - You can switch to other tabs while it works
   ```

4. **Monitor Progress**
   ```
   - Watch the extension badge for live updates
   - Badge shows current page number (e.g., "P5")
   - Open popup anytime to see detailed stats
   ```

### Stopping Scraping

**Method 1: Manual Stop**
```
1. Click extension icon
2. Click "⏹️ Stop" button
3. Session is paused (can resume later)
```

**Method 2: Automatic Stop**
```
- Extension stops automatically when:
  - Reaches last page of results
  - Encounters CAPTCHA
  - Hits maximum error count
```

### Downloading Results

**Download as CSV:**
```
1. Click extension icon
2. Click "📥 Download CSV" button
3. File saves as: google_urls_[timestamp].csv
4. Session marked as complete
```

**Copy to Clipboard:**
```
1. Click extension icon
2. Click "📋 Copy URLs" button
3. URLs copied (one per line)
4. Paste anywhere you need
```

---

## 🔥 Advanced Features

### Resume After Pause

**Scenario 1: Manual Pause**
```
1. You clicked "Stop" button
2. Extension shows "⏸️ Paused" status
3. Click "🔄 Resume Scraping" to continue
4. Scraping resumes from last page
```

**Scenario 2: CAPTCHA Detected**
```
1. Extension detects CAPTCHA automatically
2. Badge shows "⚠️" symbol
3. Solve CAPTCHA on Google page manually
4. Click "🔄 Resume Scraping" in popup
5. Scraping continues from where it stopped
```

**Scenario 3: Browser Restart**
```
1. Close browser with active session
2. Reopen browser later
3. Extension loads saved session
4. Click "🔄 Resume Scraping" to continue
5. Picks up from last saved page
```

### Session Management

**Starting Fresh vs Resuming:**

When you have a paused session and click "Start":
```
Dialog appears:
"You have a paused session with X URLs from Y pages.

Click OK to START FRESH (clear data)
Click Cancel to RESUME existing session"

- OK: Clears all data, starts new session
- Cancel: Resumes existing session
```

**Clearing Data:**
```
1. Click extension icon
2. Click "🗑️ Clear Data" button
3. Confirm action
4. All URLs and session data deleted
5. Ready for fresh start
```

### Working with Multiple Searches

**Best Practice:**
```
1. Complete one search fully
2. Download CSV
3. Clear data
4. Start new search

This prevents mixing URLs from different searches
```

**Alternative:**
```
1. Pause current session
2. Download CSV (marks as complete)
3. Start new search
4. Previous data automatically cleared
```

---

## 📊 Understanding Status Indicators

### Extension Badge

The badge on the extension icon shows real-time status:

| Badge | Color | Meaning | Action |
|-------|-------|---------|--------|
| P5 | 🔵 Blue | Scraping page 5 | Wait or monitor |
| ⏸ | 🟠 Orange | Paused | Resume or download |
| ⚠️ | 🔴 Red | CAPTCHA detected | Solve CAPTCHA |
| 420 | 🟢 Green | 420 URLs collected | Download or start new |
| (empty) | ⚪ Gray | Ready | Start scraping |

### Popup Status Display

**Status Text Colors:**
- 🔵 Blue "🔄 Scraping..." - Active scraping
- 🟠 Orange "⏸️ Paused" - Session paused
- 🔴 Red "🚫 CAPTCHA" - CAPTCHA detected
- 🟢 Green "✅ Complete" - Session complete
- ⚪ Gray "✅ Ready" - Ready to start

**Statistics Panel:**
```
Search Term: business "blog"
Current Page: 5
URLs Collected: 47
Status: 🔄 Scraping...
```

### Notification Messages

**Desktop Notifications:**
- "Scraping Started" - Session began
- "Scraping Paused" - Reached end or stopped
- "CAPTCHA Detected" - Solve CAPTCHA needed
- "Scraping Resumed" - Continuing from pause
- "Scraping Failed" - Too many errors

---

## 💾 Data Management

### Understanding Data Storage

**Where Data is Stored:**
- Chrome's local storage (on your computer)
- Not sent to any external servers
- Persists across browser restarts
- Cleared when you uninstall extension

**What Data is Stored:**
```javascript
{
  searchKeyword: "business blog",
  currentPage: 5,
  allUrls: ["url1", "url2", ...],
  sessionId: "unique-id",
  isPaused: true,
  lastUpdated: timestamp
}
```

### CSV File Format

**File Name:**
```
google_urls_1732901234567.csv
(timestamp in milliseconds)
```

**File Content:**
```csv
Url
"https://example.com/page1"
"https://example.com/page2"
"https://example.com/page3"
```

**Opening CSV Files:**
- Excel: File → Open → Select CSV
- Google Sheets: File → Import → Upload
- Text Editor: Any editor can open it

### Data Limits

**Maximum Storage:**
- Up to 10,000 URLs per session
- Older URLs removed if limit exceeded
- Typical session: 50-500 URLs

**Recommended Limits:**
- Pages per session: 50-100 pages
- URLs per session: 500-1000 URLs
- Session duration: 30-60 minutes

---

## 🔧 Troubleshooting

### Common Issues

#### Issue: "Start Scraping" Button Disabled

**Cause**: Not on Google search results page

**Solution**:
```
1. Navigate to https://google.com
2. Perform a search
3. Wait for results to load
4. Try clicking "Start Scraping" again
```

#### Issue: No URLs Being Collected

**Possible Causes & Solutions**:

**Cause 1**: Page not fully loaded
```
Solution: Wait 5-10 seconds after page loads
```

**Cause 2**: Google layout changed
```
Solution: Check console (F12) for errors
```

**Cause 3**: Search has no results
```
Solution: Try different search query
```

#### Issue: CAPTCHA Keeps Appearing

**Cause**: Scraping too fast or too many requests

**Solutions**:
```
1. Solve CAPTCHA and wait 30 seconds
2. Resume scraping
3. If persists, stop for 5-10 minutes
4. Consider increasing delays in settings
```

#### Issue: Resume Button Not Working

**Possible Causes & Solutions**:

**Cause 1**: Not on Google search page
```
Solution: Navigate to any Google search page first
```

**Cause 2**: Tab was closed
```
Solution: Open new Google search, then resume
```

**Cause 3**: Session data corrupted
```
Solution: Clear data and start fresh
```

#### Issue: Downloaded CSV is Empty

**Cause**: No URLs were collected

**Solution**:
```
1. Check "URLs Collected" count in popup
2. If 0, scraping didn't work
3. Try starting scraping again
4. Check console for errors
```

### Error Messages

| Error Message | Meaning | Solution |
|---------------|---------|----------|
| "Please navigate to Google search results first" | Not on Google | Go to Google search |
| "Too many errors occurred" | Multiple failures | Check internet, try again |
| "Could not find a valid Google search tab" | Tab closed/changed | Open Google search |
| "Resume failed" | Can't resume | Start fresh session |

---

## 💡 Best Practices

### For Optimal Results

**1. Start Small**
```
- Test with 5-10 pages first
- Verify URLs are correct
- Then scale up to larger scrapes
```

**2. Monitor Progress**
```
- Check badge status regularly
- Open popup every 10-20 pages
- Verify URLs are being collected
```

**3. Handle CAPTCHAs Promptly**
```
- Solve immediately when detected
- Wait a few seconds before resuming
- Don't ignore CAPTCHA warnings
```

**4. Download Regularly**
```
- For large scrapes (50+ pages):
  - Pause every 25-30 pages
  - Download CSV as backup
  - Resume scraping
```

**5. Respect Rate Limits**
```
- Don't scrape too aggressively
- Take breaks between large scrapes
- Avoid running 24/7
```

### Workflow Recommendations

**Single Search Workflow:**
```
1. Navigate to Google
2. Perform search
3. Start scraping
4. Monitor progress
5. Handle CAPTCHAs if needed
6. Wait for completion
7. Download CSV
8. Clear data
```

**Multiple Searches Workflow:**
```
For each search:
1. Perform search
2. Start scraping
3. Wait for completion/pause
4. Download CSV
5. Clear data
6. Move to next search
```

**Large Scrape Workflow:**
```
1. Start scraping
2. Every 25 pages:
   - Pause scraping
   - Download CSV backup
   - Resume scraping
3. Final download when complete
4. Combine CSV files if needed
```

### Tips for Success

**✅ DO:**
- Test with small scrapes first
- Monitor the extension badge
- Solve CAPTCHAs immediately
- Download data regularly
- Clear data between searches
- Check CSV files after download

**❌ DON'T:**
- Scrape too aggressively
- Ignore CAPTCHA warnings
- Mix multiple searches
- Leave scraping unattended for hours
- Forget to download before clearing
- Close tabs during active scraping

### Performance Tips

**For Faster Scraping:**
- Close unnecessary tabs
- Ensure stable internet connection
- Don't switch tabs too frequently
- Let pages load completely

**For More Reliable Scraping:**
- Start with fresh browser session
- Clear browser cache if issues occur
- Update Chrome to latest version
- Disable conflicting extensions

---

## 📞 Getting Help

### Self-Help Resources

1. **Check Console**
   ```
   - Press F12 in Chrome
   - Click "Console" tab
   - Look for error messages
   ```

2. **Review Status**
   ```
   - Check extension badge
   - Open popup for details
   - Read notification messages
   ```

3. **Test Basic Functionality**
   ```
   - Try simple search
   - Scrape just 2-3 pages
   - Verify download works
   ```

### Reporting Issues

When reporting problems, include:
- Chrome version
- Extension version
- Search query used
- Number of pages attempted
- Error messages from console
- Steps to reproduce issue

---

## 🎓 Advanced Usage

### Custom Configurations

Edit `background.js` to adjust:

```javascript
// Delay between page requests (milliseconds)
const MIN_REQUEST_DELAY = 1500;  // Increase to avoid CAPTCHAs

// Wait time for page load (milliseconds)
const PAGE_LOAD_DELAY = 3000;    // Increase for slow connections

// Maximum errors before stopping
const MAX_CONSECUTIVE_ERRORS = 3; // Increase for unreliable connections

// Maximum URLs to store
const MAX_URLS_STORED = 10000;   // Increase for larger scrapes
```

### Keyboard Shortcuts

While popup is open:
- `Esc` - Close popup
- `Enter` - Click focused button

### Browser Console Commands

Check extension status:
```javascript
chrome.storage.local.get(['scraperData'], (result) => {
  console.log(result.scraperData);
});
```

---

**Happy Scraping!** 🎉

For more information, see README.md and INSTALLATION.md
