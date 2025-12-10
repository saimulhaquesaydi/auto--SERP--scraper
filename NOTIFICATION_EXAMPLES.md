# Notification Examples

## 🔔 Notification System Overview

The extension uses two types of notifications to keep you informed:
1. **Desktop Notifications** - Chrome system notifications
2. **In-Popup Notifications** - Messages within the extension popup

## 📱 Desktop Notifications

### 1. Scraping Started
```
┌────────────────────────────────────┐
│ 🔍 Google Scraper: Scraping Started│
├────────────────────────────────────┤
│ Now scraping: "business blog" -    │
│ You can work in other tabs!        │
└────────────────────────────────────┘
```
**When**: Immediately after clicking "Start Scraping"
**Duration**: 5 seconds
**Action**: Informational only

### 2. Scraping Paused
```
┌────────────────────────────────────┐
│ 🔍 Google Scraper: Scraping Paused │
├────────────────────────────────────┤
│ Reached last page! Collected 420   │
│ URLs from 42 pages. Download CSV   │
│ or resume to continue.              │
└────────────────────────────────────┘
```
**When**: When scraping reaches end or is stopped
**Duration**: 5 seconds
**Action**: Click to open extension

### 3. CAPTCHA Detected
```
┌────────────────────────────────────┐
│ 🔍 Google Scraper: CAPTCHA Detected│
├────────────────────────────────────┤
│ Please solve the CAPTCHA on the    │
│ Google page, then click the Resume │
│ button.                             │
└────────────────────────────────────┘
```
**When**: CAPTCHA is detected on Google page
**Duration**: 5 seconds
**Action**: Solve CAPTCHA, then resume

### 4. Scraping Resumed
```
┌────────────────────────────────────┐
│ 🔍 Google Scraper: Scraping Resumed│
├────────────────────────────────────┤
│ Continuing from page 15 with 150   │
│ URLs collected so far.              │
└────────────────────────────────────┘
```
**When**: After clicking "Resume Scraping"
**Duration**: 5 seconds
**Action**: Informational only

### 5. Session Available (On Startup)
```
┌────────────────────────────────────┐
│ 🔍 Google Scraper: Session Available│
├────────────────────────────────────┤
│ Resume scraping "business blog"    │
│ from page 8 with 75 URLs collected.│
└────────────────────────────────────┘
```
**When**: Extension loads with saved session
**Duration**: 5 seconds
**Action**: Click to open and resume

### 6. Scraping Failed
```
┌────────────────────────────────────┐
│ 🔍 Google Scraper: Scraping Failed │
├────────────────────────────────────┤
│ Too many errors occurred. Please   │
│ check the console and try again.   │
└────────────────────────────────────┘
```
**When**: Multiple consecutive errors occur
**Duration**: 5 seconds
**Action**: Check console, restart scraping

### 7. Resume Failed
```
┌────────────────────────────────────┐
│ 🔍 Google Scraper: Resume Failed   │
├────────────────────────────────────┤
│ Please navigate to a Google search │
│ results page first.                 │
└────────────────────────────────────┘
```
**When**: Resume attempted without valid tab
**Duration**: 5 seconds
**Action**: Go to Google search page

## 💬 In-Popup Notifications

### Success Messages (Green)
```
┌────────────────────────────────────┐
│ ✅ Scraping started! Auto-collecting│
│    URLs...                          │
└────────────────────────────────────┘
```

```
┌────────────────────────────────────┐
│ ✅ Downloaded 420 URLs! Session    │
│    completed.                       │
└────────────────────────────────────┘
```

```
┌────────────────────────────────────┐
│ ✅ Copied 420 URLs to clipboard!   │
└────────────────────────────────────┘
```

```
┌────────────────────────────────────┐
│ ✅ All data cleared!                │
└────────────────────────────────────┘
```

### Error Messages (Red)
```
┌────────────────────────────────────┐
│ ❌ No URLs to download              │
└────────────────────────────────────┘
```

```
┌────────────────────────────────────┐
│ ❌ No URLs to copy                  │
└────────────────────────────────────┘
```

```
┌────────────────────────────────────┐
│ ❌ Failed to clear data             │
└────────────────────────────────────┘
```

```
┌────────────────────────────────────┐
│ 🚫 CAPTCHA detected! Solve it and  │
│    click Resume.                    │
└────────────────────────────────────┘
```

### Info Messages (Blue)
```
┌────────────────────────────────────┐
│ 📄 Page 5 • 📊 47 URLs             │
└────────────────────────────────────┘
```

```
┌────────────────────────────────────┐
│ 💾 420 URLs ready. Click Start for │
│    new session.                     │
└────────────────────────────────────┘
```

```
┌────────────────────────────────────┐
│ Go to Google Search → Click Start  │
└────────────────────────────────────┘
```

### Warning Messages (Orange)
```
┌────────────────────────────────────┐
│ ⏹️ Scraping stopped manually        │
└────────────────────────────────────┘
```

```
┌────────────────────────────────────┐
│ ⏹️ Collected 150 URLs from 15 pages│
│    Data saved - you can resume     │
│    anytime.                         │
└────────────────────────────────────┘
```

## 🎨 Urgent Notification Banners

### CAPTCHA Warning (Red, Animated)
```
┌────────────────────────────────────┐
│ ⚠️ Attention Required!             │
│ CAPTCHA detected! Solve it and     │
│ click Resume.                       │
└────────────────────────────────────┘
[Shaking animation]
```

### Paused Session (Orange, Pulsing)
```
┌────────────────────────────────────┐
│ ⚠️ Attention Required!             │
│ Session paused at page 12. Click   │
│ Resume to continue or Download CSV │
│ to complete.                        │
└────────────────────────────────────┘
[Pulsing animation]
```

### Scraping Progress (Blue, Pulsing)
```
┌────────────────────────────────────┐
│ ⚠️ Attention Required!             │
│ Scraping in progress... You can    │
│ work in other tabs.                 │
└────────────────────────────────────┘
[Slow pulsing animation]
```

### Scraping Complete (Green)
```
┌────────────────────────────────────┐
│ ⚠️ Attention Required!             │
│ Scraping completed! Collected 420  │
│ URLs from 42 pages.                 │
└────────────────────────────────────┘
[No animation]
```

## 🔔 Notification Timing

### Desktop Notifications
- **Display Duration**: 5 seconds
- **Auto-dismiss**: Yes
- **Click Action**: Opens extension popup
- **Sound**: System default (if enabled)

### In-Popup Notifications
- **Success/Info**: Auto-hide after 4 seconds
- **Error/Warning**: Stay until dismissed
- **Urgent Banners**: Stay until action taken

## 📊 Notification Priority

### High Priority (Always Show)
1. CAPTCHA Detected
2. Scraping Failed
3. Resume Failed

### Medium Priority (Show if Important)
1. Scraping Started
2. Scraping Paused
3. Session Available

### Low Priority (Optional)
1. Scraping Resumed
2. Progress Updates

## 🎯 Notification Best Practices

### For Users
✅ **Do**:
- Read notifications promptly
- Act on CAPTCHA notifications immediately
- Check popup for details
- Enable Chrome notifications

❌ **Don't**:
- Ignore CAPTCHA warnings
- Dismiss errors without reading
- Disable all notifications
- Assume notification = problem

### For Developers
✅ **Do**:
- Keep messages concise
- Use clear action words
- Include relevant data
- Provide context

❌ **Don't**:
- Spam notifications
- Use technical jargon
- Show redundant messages
- Overwhelm users

## 🔧 Customization

### Disable Desktop Notifications
```
Chrome Settings → Privacy and Security
→ Site Settings → Notifications
→ Find extension → Block
```

### Notification Preferences
Currently not configurable in extension.
Future versions may include:
- Notification frequency settings
- Sound on/off toggle
- Priority filtering
- Custom messages

## 📱 Platform-Specific Behavior

### Windows
- Notifications appear in Action Center
- Sound plays (if enabled)
- Persist in notification history

### macOS
- Notifications appear in Notification Center
- Sound plays (if enabled)
- Can be dismissed with swipe

### Linux
- Notifications appear in system tray
- Behavior depends on desktop environment
- May require notification daemon

## 🐛 Troubleshooting Notifications

### Not Receiving Notifications
**Problem**: No desktop notifications appear

**Solutions**:
1. Check Chrome notification permissions
2. Verify system notifications enabled
3. Check Do Not Disturb mode
4. Reload extension

### Too Many Notifications
**Problem**: Notifications are annoying

**Solutions**:
1. Disable desktop notifications
2. Keep popup open to see in-app only
3. Monitor badge instead

### Notification Errors
**Problem**: "Notification creation failed" in console

**Solutions**:
1. Check icon file exists (org.pic.png)
2. Verify notification permissions
3. Reload extension
4. Check Chrome version compatibility
