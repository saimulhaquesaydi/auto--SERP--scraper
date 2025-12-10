# Architecture Documentation

## 🏗️ System Architecture

### Overview
The Google URL Scraper is a Chrome extension built with a modular architecture consisting of three main components that communicate via Chrome's messaging API.

```
┌─────────────────────────────────────────────────────────────┐
│                     Chrome Extension                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐ │
│  │   Popup UI   │◄────►│  Background  │◄────►│  Content  │ │
│  │  (popup.js)  │      │ (background) │      │ (content) │ │
│  └──────────────┘      └──────────────┘      └───────────┘ │
│         │                      │                     │       │
│         │                      │                     │       │
│    [User Input]          [State Mgmt]          [DOM Access] │
│    [Display Data]        [Storage]             [Scraping]   │
│                          [Logic]                             │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │   Chrome Storage API  │
                    │   (Local Storage)     │
                    └───────────────────────┘
```

## 📦 Component Details

### 1. Background Script (background.js)
**Role**: Service worker that manages scraping logic and state

**Responsibilities**:
- Session state management
- Scraping orchestration
- Auto-pagination logic
- Error handling and retry
- Data persistence
- Badge updates
- Notification management

**Key Functions**:
```javascript
startScraping()      // Initialize new scraping session
stopScraping()       // Pause current session
resumeScraping()     // Resume paused session
scrapeCurrentPage()  // Scrape single page
saveState()          // Persist to storage
updateBadge()        // Update extension badge
```

**State Variables**:
```javascript
isRunning: boolean          // Currently scraping
currentPage: number         // Current page number
searchKeyword: string       // Search query
captchaDetected: boolean    // CAPTCHA flag
allUrls: string[]          // Collected URLs
currentTabId: number       // Active tab ID
sessionId: string          // Unique session ID
isPaused: boolean          // Paused state
```

### 2. Content Script (content.js)
**Role**: Injected into Google search pages for DOM interaction

**Responsibilities**:
- URL extraction from search results
- CAPTCHA detection
- Next page button detection
- Page navigation
- Last page detection

**Key Functions**:
```javascript
scrapeUrls()         // Extract URLs from page
goToNextPage()       // Navigate to next page
isLastPage()         // Check if last page
isCaptchaPage()      // Detect CAPTCHA
```

**Selectors Used**:
```javascript
[
  "a[jsname='UWckNb']",  // Primary result links
  ".yuRUbf a",           // Result title links
  ".tF2Cxc a",           // Result container links
  ".MjjYud a",           // Mobile result links
  // ... more fallback selectors
]
```

### 3. Popup UI (popup.js + popup.html)
**Role**: User interface for controlling the extension

**Responsibilities**:
- Display current status
- Handle user interactions
- Show statistics
- Manage data export
- Display notifications

**Key Functions**:
```javascript
updateUI()           // Refresh UI with current state
showNotification()   // Display in-popup notification
downloadCSV()        // Export URLs to CSV
copyToClipboard()    // Copy URLs to clipboard
```

## 🔄 Data Flow

### Scraping Flow
```
1. User clicks "Start" in Popup
   │
   ▼
2. Popup sends 'startScraping' message to Background
   │
   ▼
3. Background initializes session state
   │
   ▼
4. Background sends 'scrapeUrls' to Content Script
   │
   ▼
5. Content Script extracts URLs from DOM
   │
   ▼
6. Content Script returns URLs to Background
   │
   ▼
7. Background stores URLs and updates state
   │
   ▼
8. Background sends 'goToNextPage' to Content Script
   │
   ▼
9. Content Script clicks next button
   │
   ▼
10. Loop back to step 4 until complete
```

### Message Flow
```
Popup ──────► Background ──────► Content Script
      ◄──────          ◄──────
      
Messages:
→ startScraping, stopScraping, resumeScraping
→ getStatus, getAllUrls, clearData
→ scrapeUrls, goToNextPage, checkLastPage
← status updates, URL data, completion signals
```

## 💾 Storage Architecture

### Chrome Local Storage Schema
```javascript
{
  scraperData: {
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
}
```

### Storage Operations
- **Save**: After each page scraped
- **Load**: On extension startup
- **Clear**: On user request or new session
- **Update**: On state changes

## 🎯 State Management

### State Transitions
```
Ready ──► Scraping ──► Paused ──► Complete
  ▲          │           │           │
  │          ▼           ▼           │
  └────── CAPTCHA ◄──────────────────┘
```

### State Definitions
- **Ready**: No active session, ready to start
- **Scraping**: Actively collecting URLs
- **Paused**: Session paused, can resume
- **CAPTCHA**: CAPTCHA detected, waiting for solve
- **Complete**: Session finished after download

## 🔐 Security Architecture

### Permissions Model
```
activeTab       → Access current tab only
storage         → Local storage only
notifications   → Desktop notifications
google.com/*    → Google search pages only
```

### Data Privacy
- All data stored locally
- No external API calls
- No data transmission
- No tracking or analytics

## ⚡ Performance Optimizations

### Rate Limiting
```javascript
MIN_REQUEST_DELAY = 1500ms    // Between requests
PAGE_LOAD_DELAY = 3000ms      // Page load wait
```

### Memory Management
```javascript
MAX_URLS_STORED = 10000       // Prevent memory overflow
Automatic trimming when exceeded
```

### Error Handling
```javascript
MAX_CONSECUTIVE_ERRORS = 3    // Retry limit
Exponential backoff on errors
```

## 🔧 Extension Lifecycle

### Installation
```
1. Extension installed
2. Background script initialized
3. Load saved state (if exists)
4. Update badge
5. Ready for use
```

### Runtime
```
1. User opens popup
2. Popup requests status
3. Background returns current state
4. UI updates
5. User triggers action
6. Background processes
7. State saved
8. Badge updated
```

### Update/Reload
```
1. Extension reloaded
2. Background script restarted
3. Load saved state
4. Resume capability available
5. Notify user if session exists
```

## 📊 Badge System

### Badge States
```javascript
Badge Text    Color      Meaning
──────────────────────────────────
"P5"         Blue       Page 5
"⏸"          Orange     Paused
"⚠️"         Red        CAPTCHA
"420"        Green      420 URLs
""           Gray       Ready
```

### Update Frequency
- Every 2 seconds (automatic)
- On state change (immediate)
- On page completion (immediate)

## 🔔 Notification System

### Notification Types
```javascript
Desktop Notifications:
- Scraping Started
- Scraping Paused
- CAPTCHA Detected
- Scraping Resumed
- Scraping Failed

In-Popup Notifications:
- Success messages
- Error messages
- Info messages
- Warning messages
```

## 🧪 Testing Architecture

### Unit Testing (Recommended)
```javascript
// Test individual functions
test('scrapeUrls extracts URLs correctly')
test('isCaptchaPage detects CAPTCHA')
test('validateAndProcessUrls filters duplicates')
```

### Integration Testing
```javascript
// Test component communication
test('Popup to Background messaging')
test('Background to Content messaging')
test('State persistence')
```

### End-to-End Testing
```javascript
// Test complete workflows
test('Complete scraping session')
test('Resume after pause')
test('CAPTCHA handling')
```

## 🚀 Deployment Architecture

### Development
```
Local Files → Load Unpacked → Chrome
```

### Production
```
Local Files → Package → CRX → Chrome Web Store
```

## 📈 Scalability Considerations

### Current Limits
- 10,000 URLs per session
- ~100 pages per session
- Single tab operation
- Sequential page processing

### Future Enhancements
- Parallel tab scraping
- Unlimited URL storage
- Background tab operation
- Multi-search sessions
