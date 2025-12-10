# Extension Badge Guide

## 🎨 Badge System Overview

The extension badge provides real-time status updates directly on the extension icon, allowing you to monitor scraping progress without opening the popup.

## 📊 Badge States

### 1. Active Scraping (Blue Badge)
```
┌─────────┐
│  🔍 P5  │  ← Blue background
└─────────┘
```
**Display**: Page number (e.g., "P5", "P12", "P47")
**Color**: 🔵 Blue (#3b82f6)
**Meaning**: Currently scraping page 5
**Tooltip**: "🔄 Scraping Page 5 | 47 URLs"

**What to do**:
- ✅ Monitor progress
- ✅ Switch to other tabs
- ✅ Continue working
- ❌ Don't close the Google search tab

### 2. Paused Session (Orange Badge)
```
┌─────────┐
│  🔍 ⏸  │  ← Orange background
└─────────┘
```
**Display**: Pause symbol "⏸"
**Color**: 🟠 Orange (#f59e0b)
**Meaning**: Session paused, can resume
**Tooltip**: "⏸️ Paused at Page 12 | 120 URLs"

**What to do**:
- ✅ Click extension icon
- ✅ Click "Resume" to continue
- ✅ Or download CSV to complete
- ✅ Or start fresh session

### 3. CAPTCHA Detected (Red Badge)
```
┌─────────┐
│  🔍 ⚠️ │  ← Red background
└─────────┘
```
**Display**: Warning symbol "⚠️"
**Color**: 🔴 Red (#ef4444)
**Meaning**: CAPTCHA detected, action required
**Tooltip**: "🚫 CAPTCHA Detected | 85 URLs | Click to Resume"

**What to do**:
- ⚠️ Go to Google search tab
- ⚠️ Solve the CAPTCHA
- ⚠️ Wait a few seconds
- ⚠️ Click extension icon
- ⚠️ Click "Resume Scraping"

### 4. Session Complete (Green Badge)
```
┌─────────┐
│ 🔍 420 │  ← Green background
└─────────┘
```
**Display**: Total URL count (e.g., "420", "1.2K")
**Color**: 🟢 Green (#10b981)
**Meaning**: Session complete, URLs ready
**Tooltip**: "✅ 420 URLs Collected | Ready"

**What to do**:
- ✅ Click extension icon
- ✅ Download CSV or copy URLs
- ✅ Start new session when ready

### 5. Ready State (No Badge)
```
┌─────────┐
│   🔍   │  ← No badge
└─────────┘
```
**Display**: Empty (no text)
**Color**: ⚪ Gray (default)
**Meaning**: Ready to start scraping
**Tooltip**: "Google URL Scraper - Ready"

**What to do**:
- ✅ Go to Google search
- ✅ Perform a search
- ✅ Click extension icon
- ✅ Click "Start Scraping"

## 🔄 Badge Update Frequency

### Automatic Updates
- **Every 2 seconds**: Regular status check
- **Immediate**: On state changes
- **Immediate**: On page completion
- **Immediate**: On error/CAPTCHA

### Manual Refresh
- Open popup to force update
- Badge syncs with current state

## 📱 Badge Behavior

### During Scraping
```
P1 → P2 → P3 → P4 → P5 → ...
(Updates every page)
```

### On Pause
```
P15 → ⏸
(Immediately shows pause symbol)
```

### On CAPTCHA
```
P8 → ⚠️
(Immediately shows warning)
```

### On Complete
```
P25 → 250
(Shows total URL count)
```

## 🎯 Quick Reference

| Badge | State | Action Needed |
|-------|-------|---------------|
| P# | Scraping | Wait or monitor |
| ⏸ | Paused | Resume or download |
| ⚠️ | CAPTCHA | Solve CAPTCHA |
| ### | Complete | Download/start new |
| (empty) | Ready | Start scraping |

## 💡 Tips

### Monitoring Progress
- Glance at badge to see current page
- No need to open popup constantly
- Badge updates automatically

### Handling Interruptions
- Orange badge = safe to resume later
- Red badge = action required now
- Green badge = ready to download

### Multi-Tasking
- Badge visible while working in other tabs
- Quick status check without switching tabs
- Notifications complement badge updates

## 🔧 Troubleshooting

### Badge Not Updating
**Problem**: Badge shows old information

**Solutions**:
1. Open popup to force refresh
2. Reload extension (chrome://extensions/)
3. Check if scraping is actually running

### Badge Shows Wrong State
**Problem**: Badge doesn't match actual state

**Solutions**:
1. Open popup to see detailed status
2. Check browser console for errors
3. Reload extension if persists

### Badge Not Visible
**Problem**: Can't see badge on icon

**Solutions**:
1. Pin extension to toolbar
2. Check if badge is enabled in Chrome
3. Verify extension is active

## 📐 Technical Details

### Badge Text Limits
- Maximum 4 characters
- Large numbers abbreviated (e.g., "1.2K")
- Symbols use single character

### Color Codes
```javascript
Blue:   #3b82f6  // Active scraping
Orange: #f59e0b  // Paused
Red:    #ef4444  // CAPTCHA/Error
Green:  #10b981  // Complete
Gray:   #6b7280  // Ready/Default
```

### Update Logic
```javascript
setInterval(updateBadge, 2000);  // Every 2 seconds
updateBadge();                    // On state change
```

## 🎨 Visual Examples

### Scraping Progress
```
Start:  P1  (Blue)
        ↓
After:  P5  (Blue)
        ↓
After:  P10 (Blue)
        ↓
Pause:  ⏸   (Orange)
```

### CAPTCHA Flow
```
Scraping: P8  (Blue)
          ↓
CAPTCHA:  ⚠️  (Red)
          ↓
Solved:   P8  (Blue)
          ↓
Resume:   P9  (Blue)
```

### Complete Flow
```
Scraping: P25 (Blue)
          ↓
Paused:   ⏸   (Orange)
          ↓
Download: 250 (Green)
          ↓
Clear:    (empty)
```

## 🚀 Best Practices

### Do's
✅ Check badge regularly during scraping
✅ Act quickly on red (CAPTCHA) badge
✅ Download when green badge appears
✅ Use badge for quick status checks

### Don'ts
❌ Ignore red (CAPTCHA) badge
❌ Assume badge is always current
❌ Rely solely on badge (check popup too)
❌ Close tab when badge shows activity
