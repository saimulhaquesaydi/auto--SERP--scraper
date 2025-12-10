# Google URL Scraper Extension

A powerful Chrome extension that automatically scrapes and collects URLs from Google search results with advanced features like auto-pagination, CAPTCHA detection, session persistence, and smart resume capabilities.

## 🌟 Features

### Core Functionality
- **Automatic URL Scraping**: Extracts all search result URLs from Google search pages
- **Auto-Pagination**: Automatically navigates through multiple pages of search results
- **Background Operation**: Works in the background while you use other tabs
- **Session Persistence**: Saves progress automatically, survives browser restarts

### Smart Features
- **CAPTCHA Detection**: Automatically detects and pauses when CAPTCHA appears
- **Smart Resume**: Resume scraping from where you left off
- **Duplicate Prevention**: Automatically filters out duplicate URLs
- **Live Badge Status**: Real-time status display on extension icon
- **Desktop Notifications**: Get notified about important events

### Data Management
- **CSV Export**: Download collected URLs as a CSV file
- **Copy to Clipboard**: Quick copy all URLs with one click
- **Data Persistence**: All data saved locally, never lost
- **Clear Data**: Easy cleanup when starting fresh

##  Installation

### From Source
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked."
5. Select the extension folder
6. The extension icon will appear in your toolbar

### Files Required
- `manifest.json` - Extension configuration
- `background.js` - Main scraping logic
- `content.js` - Page interaction script
- `popup.html` - Extension popup UI
- `popup.js` - Popup functionality
- `org.pic.png` - Extension icon

##  Usage Guide

### Basic Usage

1. **Navigate to Google Search**
   - Go to https://google.com
   - Search for anything (e.g., "business blog")
   - Wait for search results to load

2. **Start Scraping**
   - Click the extension icon in toolbar
   - Click "🚀 Start Scraping" button
   - Extension will automatically collect URLs and navigate pages

3. **Monitor Progress**
   - Check extension badge for live status
   - Badge shows current page number (e.g., "P5")
   - Open popup to see detailed statistics

4. **Download Results**
   - Click "📥 Download CSV" to export URLs
   - Or click "📋 Copy URLs" to copy to clipboard
   - CSV file will be named `google_urls_[timestamp].csv`

### Advanced Features

#### Resume After CAPTCHA
When Google shows a CAPTCHA:
1. Extension automatically pauses and shows "⚠️" badge
2. Solve the CAPTCHA manually on the Google page
3. Click "🔄 Resume Scraping" in the extension popup
4. Scraping continues from where it stopped

#### Session Management
- **Pause**: Click "⏹️ Stop" to pause scraping
- **Resume**: Click "🔄 Resume" to continue from last page
- **Fresh Start**: When paused, "Start" button offers to clear data or resume
- **Auto-Save**: Progress saved every page, survives browser restart

#### Status Indicators

**Extension Badge Colors:**
- 🔵 Blue (P#) - Actively scraping page #
- 🟠 Orange (⏸) - Paused, can resume
- 🔴 Red (⚠️) - CAPTCHA detected
- 🟢 Green (#) - Completed, showing URL count
- ⚪ Gray (empty) - Ready to start

**Popup Status:**
- ✅ Ready - Ready to start new session
- 🔄 Scraping - Currently collecting URLs
- ⏸️ Paused - Session paused, can resume
- 🚫 CAPTCHA - CAPTCHA detected, solve and resume
- ✅ Complete - Session completed after download

##  Statistics Display

The popup shows real-time statistics:
- **Search Term**: Current search query
- **Current Page**: Page number being scraped
- **URLs Collected**: Total unique URLs found
- **Status**: Current scraping state

##  Configuration

### Adjustable Settings (in background.js)

```javascript
const MIN_REQUEST_DELAY = 1500;        // Delay between requests (ms)
const PAGE_LOAD_DELAY = 3000;          // Wait time for page load (ms)
const MAX_CONSECUTIVE_ERRORS = 3;      // Max errors before stopping
const MAX_URLS_STORED = 10000;         // Maximum URLs to store
```

### Permissions Required
- `activeTab` - Access current tab for scraping
- `storage` - Save data locally
- `notifications` - Show desktop notifications
- `google.com/*` - Access Google search pages

##  Troubleshooting

### Extension Not Working
- **Check URL**: Must be on google.com/search page
- **Reload Extension**: Go to chrome://extensions/ and reload
- **Check Console**: Press F12 and check for errors

### No URLs Found
- **Wait for Load**: Ensure page fully loaded before starting
- **Check Search**: Make sure search has results
- **Try Different Search**: Some searches may have different layouts

### CAPTCHA Issues
- **Solve Manually**: Extension can't solve CAPTCHAs automatically
- **Wait Before Resume**: Give Google a few seconds after solving
- **Reduce Speed**: Increase MIN_REQUEST_DELAY if getting frequent CAPTCHAs

### Resume Not Working
- **Check Tab**: Must be on a Google search page
- **Reload Page**: Try refreshing the Google search page
- **Check Console**: Look for error messages in browser console

##  Data Format

### CSV Export Format
```csv
Url
"https://example.com/page1"
"https://example.com/page2"
"https://example.com/page3"
```

### Storage Structure
Data is stored in Chrome's local storage:
```javascript
{
  isRunning: boolean,
  currentPage: number,
  searchKeyword: string,
  captchaDetected: boolean,
  allUrls: string[],
  currentTabId: number,
  sessionId: string,
  isPaused: boolean,
  lastUpdated: timestamp
}
```

##  Privacy & Security

- **Local Storage Only**: All data stored locally in your browser
- **No External Servers**: No data sent to external servers
- **No Tracking**: Extension doesn't track your activity
- **Open Source**: All code is visible and auditable

##  Limitations

- **Google Rate Limits**: Google may show CAPTCHAs if scraping too fast
- **Layout Changes**: Google layout changes may affect scraping
- **Maximum Pages**: Practical limit around 50-100 pages per session
- **Chrome Only**: Currently only works in Chrome/Chromium browsers

##  Updates & Maintenance

### Version History
- **v1.2.0** - Current version with enhanced resume system
- **v1.1.0** - Added session persistence and badge status
- **v1.0.0** - Initial release with basic scraping

### Planned Features
- [ ] Custom delay settings in UI
- [ ] Export to JSON format
- [ ] Filter URLs by domain
- [ ] Scraping statistics dashboard
- [ ] Multi-search session support

##  Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

##  License

This project is provided as-is for educational and personal use.

##  Tips & Best Practices

1. **Start Small**: Test with 5-10 pages first
2. **Monitor Badge**: Keep an eye on the badge status
3. **Handle CAPTCHAs**: Solve them promptly to avoid delays
4. **Download Regularly**: Export data periodically for large scrapes
5. **Respect Rate Limits**: Don't scrape too aggressively
6. **Clear Old Data**: Use "Clear Data" before new searches

##  Support

For issues, questions, or suggestions:
- Check the troubleshooting section above
- Review the browser console for error messages
- Ensure you're using the latest version

##  Use Cases

- **SEO Research**: Analyze competitor rankings
- **Market Research**: Collect business listings
- **Content Discovery**: Find relevant articles and blogs
- **Link Building**: Discover potential link opportunities
- **Academic Research**: Gather sources for research papers

---

**Note**: This extension is for educational and research purposes. Always respect Google's Terms of Service and robots.txt. Use responsibly and ethically.

