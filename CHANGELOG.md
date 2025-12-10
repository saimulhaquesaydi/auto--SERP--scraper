# Changelog

All notable changes to the Google URL Scraper extension will be documented in this file.

## [1.2.0] - 2025-11-29

### Added
- Enhanced resume system with smart session management
- Extension badge with live status indicators (page number, pause, CAPTCHA, URL count)
- Session persistence across browser restarts
- Desktop notifications for important events
- Automatic CAPTCHA detection and pause
- Smart pause/resume workflow
- Download CSV marks session as complete
- Confirmation dialog when starting fresh with paused session

### Changed
- Scraping now always pauses instead of completing (until CSV download)
- Improved error handling with console.log instead of console.error
- Removed live status panel from Google search page (cleaner UI)
- Removed progress notifications every 5 pages (less intrusive)
- Updated notification icon path to use org.pic.png
- Enhanced resume logic to find valid Google search tabs

### Fixed
- Resume button now works correctly with async operations
- Notification creation errors resolved
- Session state properly saved on all pause events
- Badge updates correctly on all state changes

## [1.1.0] - 2024-XX-XX

### Added
- Session persistence with local storage
- Background scraping capability
- Auto-pagination through search results
- CAPTCHA detection system
- Copy to clipboard functionality
- Clear data option

### Changed
- Improved URL extraction selectors
- Better error handling and retry logic
- Enhanced UI with status indicators

### Fixed
- Duplicate URL prevention
- Memory management for large scrapes
- Tab closure handling

## [1.0.0] - 2024-XX-XX

### Added
- Initial release
- Basic URL scraping from Google search results
- CSV export functionality
- Simple popup interface
- Manual pagination support

---

## Version Format

[Major.Minor.Patch]
- Major: Breaking changes or major feature additions
- Minor: New features, backward compatible
- Patch: Bug fixes and minor improvements
