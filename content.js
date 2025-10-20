// Content script - DOM interactions
console.log('🔍 Google URL Scraper content script loaded');

function scrapeUrls() {
    const urls = [];
    const selectors = [
        "a[jsname='UWckNb']",
        ".yuRUbf a",
        ".tF2Cxc a",
        ".MjjYud a",
        '.g .rc .r a',
        '[data-ved] a'
    ];

    for (const selector of selectors) {
        try {
            const elements = document.querySelectorAll(selector);
            
            for (const element of elements) {
                try {
                    const href = element.href;
                    if (href && 
                        href.includes('://') &&
                        !href.includes('google.com/search') &&
                        !href.includes('google.com/url?') &&
                        !urls.includes(href)) {
                        
                        urls.push(href);
                    }
                } catch (e) {
                    continue;
                }
            }
            
            if (urls.length > 0) break;
        } catch (error) {
            continue;
        }
    }

    console.log(`Found ${urls.length} URLs`);
    return { urls, captchaDetected: false };
}

function goToNextPage() {
    try {
        const nextBtn = document.querySelector('#pnnext') || 
                       document.querySelector('a[aria-label*="Next"]');
        
        if (nextBtn) {
            nextBtn.click();
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'scrapeUrls') {
        const result = scrapeUrls();
        sendResponse(result);
    } else if (request.action === 'goToNextPage') {
        const result = goToNextPage();
        sendResponse({ success: result });
    }
    
    return true;
});