# Testing Guide

## 🧪 Testing Overview

This guide covers how to test the Google URL Scraper extension to ensure it works correctly.

## ✅ Pre-Testing Checklist

Before testing:
- [ ] Extension installed correctly
- [ ] Chrome version 88 or higher
- [ ] Stable internet connection
- [ ] Google.com accessible
- [ ] Developer tools available (F12)

## 🎯 Test Scenarios

### 1. Basic Functionality Tests

#### Test 1.1: Extension Installation
```
Steps:
1. Load extension in Chrome
2. Check extension appears in toolbar
3. Click extension icon
4. Verify popup opens

Expected Result:
✅ Popup shows "Ready" status
✅ All buttons visible
✅ No console errors
```

#### Test 1.2: Start Scraping
```
Steps:
1. Go to google.com
2. Search for "test"
3. Click extension icon
4. Click "Start Scraping"

Expected Result:
✅ Badge shows "P1" (blue)
✅ Status changes to "Scraping"
✅ URLs start collecting
✅ Page count increases
```

#### Test 1.3: Stop Scraping
```
Steps:
1. Start scraping (Test 1.2)
2. Wait for 2-3 pages
3. Click "Stop" button

Expected Result:
✅ Badge shows "⏸" (orange)
✅ Status changes to "Paused"
✅ URLs preserved
✅ Can resume later
```

#### Test 1.4: Download CSV
```
Steps:
1. Complete scraping session
2. Click "Download CSV"

Expected Result:
✅ CSV file downloads
✅ File contains URLs
✅ One URL per line
✅ Proper CSV format
```

#### Test 1.5: Copy to Clipboard
```
Steps:
1. Complete scraping session
2. Click "Copy URLs"
3. Paste in text editor

Expected Result:
✅ URLs copied successfully
✅ One URL per line
✅ All URLs present
✅ No duplicates
```

### 2. Resume Functionality Tests

#### Test 2.1: Resume After Manual Stop
```
Steps:
1. Start scraping
2. Stop after 3 pages
3. Click "Resume Scraping"

Expected Result:
✅ Scraping continues from page 4
✅ Previous URLs preserved
✅ No duplicate URLs
✅ Badge updates correctly
```

#### Test 2.2: Resume After Browser Restart
```
Steps:
1. Start scraping
2. Stop after 5 pages
3. Close browser completely
4. Reopen browser
5. Click extension icon
6. Click "Resume Scraping"

Expected Result:
✅ Session data loaded
✅ Shows previous progress
✅ Can resume from page 6
✅ All URLs preserved
```

#### Test 2.3: Resume After CAPTCHA
```
Steps:
1. Start scraping
2. Wait for CAPTCHA (or trigger it)
3. Solve CAPTCHA
4. Click "Resume Scraping"

Expected Result:
✅ CAPTCHA detected automatically
✅ Badge shows "⚠️" (red)
✅ After solve, can resume
✅ Continues from same page
```

### 3. CAPTCHA Handling Tests

#### Test 3.1: CAPTCHA Detection
```
Steps:
1. Start aggressive scraping
2. Wait for Google CAPTCHA

Expected Result:
✅ Extension detects CAPTCHA
✅ Automatically pauses
✅ Badge shows "⚠️"
✅ Notification appears
```

#### Test 3.2: CAPTCHA Recovery
```
Steps:
1. Trigger CAPTCHA (Test 3.1)
2. Solve CAPTCHA manually
3. Wait 5 seconds
4. Click "Resume"

Expected Result:
✅ Scraping resumes
✅ No errors occur
✅ URLs continue collecting
✅ Badge returns to blue
```

### 4. Data Management Tests

#### Test 4.1: Clear Data
```
Steps:
1. Complete scraping session
2. Click "Clear Data"
3. Confirm action

Expected Result:
✅ All URLs cleared
✅ Status resets to "Ready"
✅ Badge clears
✅ Can start fresh
```

#### Test 4.2: Data Persistence
```
Steps:
1. Scrape 50 URLs
2. Close popup (don't stop)
3. Reopen popup

Expected Result:
✅ URLs still present
✅ Count unchanged
✅ Status preserved
✅ Can continue or download
```

#### Test 4.3: Large Dataset
```
Steps:
1. Scrape 500+ URLs
2. Check performance
3. Download CSV

Expected Result:
✅ No memory issues
✅ UI remains responsive
✅ CSV downloads successfully
✅ All URLs present
```

### 5. Edge Case Tests

#### Test 5.1: No Search Results
```
Steps:
1. Search for "asdfghjklqwertyuiop"
2. Start scraping

Expected Result:
✅ Handles gracefully
✅ Shows "0 URLs"
✅ Pauses automatically
✅ No errors
```

#### Test 5.2: Single Page Results
```
Steps:
1. Search with few results
2. Start scraping

Expected Result:
✅ Scrapes available URLs
✅ Detects last page
✅ Pauses automatically
✅ Shows completion
```

#### Test 5.3: Tab Closed During Scraping
```
Steps:
1. Start scraping
2. Close Google search tab

Expected Result:
✅ Extension detects closure
✅ Automatically pauses
✅ Data preserved
✅ Notification shown
```

#### Test 5.4: Multiple Tabs
```
Steps:
1. Open 2 Google search tabs
2. Start scraping in tab 1
3. Try starting in tab 2

Expected Result:
✅ Only one session active
✅ Second start fails gracefully
✅ Or first session stops
✅ No data corruption
```

### 6. Performance Tests

#### Test 6.1: Speed Test
```
Steps:
1. Start scraping
2. Time 10 pages
3. Calculate pages/minute

Expected Result:
✅ ~2-3 pages per minute
✅ Consistent speed
✅ No slowdown over time
✅ Respects rate limits
```

#### Test 6.2: Memory Usage
```
Steps:
1. Open Chrome Task Manager
2. Start scraping
3. Monitor memory usage
4. Scrape 100+ pages

Expected Result:
✅ Memory stays reasonable
✅ No memory leaks
✅ No browser slowdown
✅ Extension remains responsive
```

#### Test 6.3: CPU Usage
```
Steps:
1. Monitor CPU usage
2. Start scraping
3. Check CPU during scraping

Expected Result:
✅ Low CPU usage
✅ No excessive processing
✅ Browser remains responsive
✅ Other tabs work normally
```

## 🔍 Testing Tools

### Chrome DevTools
```
1. Press F12
2. Go to Console tab
3. Monitor for errors
4. Check Network tab for requests
```

### Extension Console
```
1. Go to chrome://extensions/
2. Find extension
3. Click "Inspect views: background page"
4. Monitor background script logs
```

### Storage Inspector
```javascript
// Check stored data
chrome.storage.local.get(['scraperData'], (result) => {
  console.log(result.scraperData);
});
```

## 📊 Test Results Template

```
Test Date: YYYY-MM-DD
Chrome Version: XX.X.XXXX.XX
Extension Version: 1.2.0

Test 1.1: ✅ PASS
Test 1.2: ✅ PASS
Test 1.3: ✅ PASS
Test 1.4: ❌ FAIL - CSV format issue
Test 1.5: ✅ PASS
...

Issues Found:
1. CSV header missing
2. Duplicate URLs in some cases
3. Badge not updating on slow connections

Notes:
- All critical tests passed
- Minor UI issues noted
- Performance acceptable
```

## 🐛 Bug Reporting Template

```
Bug Title: [Brief description]

Steps to Reproduce:
1. Step one
2. Step two
3. Step three

Expected Behavior:
[What should happen]

Actual Behavior:
[What actually happens]

Environment:
- Chrome Version: XX.X
- Extension Version: 1.2.0
- OS: Windows/Mac/Linux

Console Errors:
[Paste any error messages]

Screenshots:
[Attach if relevant]
```

## ✅ Acceptance Criteria

### Must Pass
- ✅ Basic scraping works
- ✅ Resume functionality works
- ✅ CAPTCHA detection works
- ✅ Data persists correctly
- ✅ CSV export works
- ✅ No data loss
- ✅ No console errors

### Should Pass
- ✅ Badge updates correctly
- ✅ Notifications appear
- ✅ UI is responsive
- ✅ Performance is good
- ✅ Memory usage reasonable

### Nice to Have
- ✅ Handles all edge cases
- ✅ Graceful error recovery
- ✅ Helpful error messages
- ✅ Smooth animations

## 🚀 Automated Testing (Future)

### Unit Tests
```javascript
describe('URL Extraction', () => {
  test('extracts valid URLs', () => {
    // Test implementation
  });
  
  test('filters duplicates', () => {
    // Test implementation
  });
});
```

### Integration Tests
```javascript
describe('Scraping Flow', () => {
  test('complete scraping session', async () => {
    // Test implementation
  });
});
```

## 📝 Testing Checklist

Before Release:
- [ ] All basic tests pass
- [ ] Resume functionality verified
- [ ] CAPTCHA handling tested
- [ ] Data persistence confirmed
- [ ] Performance acceptable
- [ ] No memory leaks
- [ ] No console errors
- [ ] Documentation updated
- [ ] Known issues documented
