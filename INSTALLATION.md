# Installation Guide - Google URL Scraper

## 📋 Prerequisites

- Google Chrome browser (version 88 or higher)
- Basic understanding of Chrome extensions
- Developer mode access (no special permissions needed)

## 🔧 Installation Steps

### Method 1: Load Unpacked Extension (Recommended for Development)

1. **Download the Extension Files**
   ```
   Download all files to a folder on your computer:
   - manifest.json
   - background.js
   - content.js
   - popup.html
   - popup.js
   - org.pic.png
   - .gitignore (optional)
   ```

2. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Navigate to `chrome://extensions/`
   - Or click: Menu (⋮) → More Tools → Extensions

3. **Enable Developer Mode**
   - Look for "Developer mode" toggle in the top-right corner
   - Click to enable it
   - You'll see additional options appear

4. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to the folder containing the extension files
   - Select the folder and click "Select Folder"

5. **Verify Installation**
   - Extension should appear in your extensions list
   - You'll see the extension icon in your toolbar
   - Badge should show empty (ready state)

### Method 2: Install from CRX File (If Available)

1. **Download CRX File**
   - Download the `.crx` file to your computer

2. **Open Extensions Page**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode"

3. **Drag and Drop**
   - Drag the `.crx` file onto the extensions page
   - Click "Add extension" when prompted

## ✅ Verification

### Check Installation Success

1. **Extension Icon Visible**
   - Look for the extension icon in Chrome toolbar
   - Icon should be the org.pic.png image

2. **Click Extension Icon**
   - Popup should open showing the UI
   - Should see "Ready" status
   - All buttons should be visible

3. **Test Basic Functionality**
   - Go to https://google.com
   - Search for anything (e.g., "test")
   - Click extension icon
   - "Start Scraping" button should be enabled

### Troubleshooting Installation

#### Extension Not Loading
**Problem**: "Load unpacked" fails or shows error

**Solutions**:
- Ensure all required files are in the folder
- Check that manifest.json is valid JSON
- Verify no syntax errors in JavaScript files
- Make sure folder contains manifest.json at root level

#### Extension Icon Not Showing
**Problem**: Extension installed but icon not in toolbar

**Solutions**:
- Click the puzzle piece icon in Chrome toolbar
- Find "Google URL Scraper" in the list
- Click the pin icon to pin it to toolbar
- Refresh the extensions page

#### Permissions Error
**Problem**: Extension asks for unexpected permissions

**Solutions**:
- Review manifest.json permissions section
- Ensure only required permissions are listed:
  - activeTab
  - storage
  - notifications
  - google.com host permissions

## 🔄 Updating the Extension

### Update Unpacked Extension

1. **Make Changes to Files**
   - Edit any extension files as needed
   - Save all changes

2. **Reload Extension**
   - Go to `chrome://extensions/`
   - Find "Google URL Scraper"
   - Click the refresh/reload icon (🔄)
   - Extension will reload with new changes

3. **Verify Update**
   - Check version number in manifest.json
   - Test new functionality
   - Check console for errors

### Update from New Version

1. **Backup Data** (if needed)
   - Export any important scraped URLs
   - Note: Extension data is stored locally

2. **Remove Old Version**
   - Go to `chrome://extensions/`
   - Click "Remove" on old version
   - Confirm removal

3. **Install New Version**
   - Follow installation steps above
   - Load new version folder

## 🗑️ Uninstallation

### Remove Extension

1. **Open Extensions Page**
   - Navigate to `chrome://extensions/`

2. **Find Extension**
   - Locate "Google URL Scraper"

3. **Remove**
   - Click "Remove" button
   - Confirm removal when prompted

4. **Clean Up Data** (Optional)
   - Extension data is automatically removed
   - Delete extension folder from your computer if desired

## 🔐 Security Considerations

### Before Installation

- **Review Permissions**: Check what the extension can access
- **Verify Source**: Ensure you downloaded from trusted source
- **Check Code**: Review JavaScript files if you're technical

### After Installation

- **Monitor Behavior**: Watch for unexpected activity
- **Check Network**: Extension should only access Google
- **Review Storage**: Data should only be stored locally

## 📱 Platform-Specific Notes

### Windows
- Extension folder can be anywhere on your drive
- Recommended: `C:\Users\[YourName]\ChromeExtensions\google-scraper`

### macOS
- Extension folder can be anywhere
- Recommended: `~/ChromeExtensions/google-scraper`

### Linux
- Extension folder can be anywhere
- Recommended: `~/chrome-extensions/google-scraper`

## 🆘 Installation Support

### Common Issues

#### Issue: "Manifest file is missing or unreadable"
**Solution**: 
- Ensure manifest.json is in the root of the folder
- Check file is not corrupted
- Verify JSON syntax is valid

#### Issue: "Could not load icon"
**Solution**:
- Verify org.pic.png exists in folder
- Check file is a valid PNG image
- Ensure filename matches manifest.json

#### Issue: "Extension failed to load"
**Solution**:
- Check browser console for specific errors
- Verify all JavaScript files have no syntax errors
- Ensure Chrome version is compatible

### Getting Help

If you encounter issues:
1. Check browser console (F12) for error messages
2. Review manifest.json for configuration issues
3. Verify all files are present and named correctly
4. Try reloading the extension
5. Restart Chrome browser

## ✨ Post-Installation Setup

### Recommended Settings

1. **Pin Extension to Toolbar**
   - Click puzzle piece icon
   - Find extension
   - Click pin icon

2. **Test Functionality**
   - Go to Google search
   - Try scraping 1-2 pages
   - Verify CSV download works

3. **Configure Notifications** (Optional)
   - Chrome Settings → Privacy and Security → Site Settings
   - Notifications → Allow for extension

### First Use

1. **Navigate to Google**
   - Go to https://google.com
   - Perform a search

2. **Open Extension**
   - Click extension icon
   - Review the interface

3. **Start Small**
   - Try scraping just 2-3 pages first
   - Verify URLs are collected correctly
   - Test download functionality

4. **Review Data**
   - Check downloaded CSV file
   - Verify URLs are correct
   - Test copy to clipboard

---

**Installation Complete!** 🎉

You're now ready to use the Google URL Scraper extension. Check out the README.md for usage instructions and best practices.
