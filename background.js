// Background script - Main logic with persistent storage
let isRunning = false;
let currentPage = 1;
let searchKeyword = '';
let currentTabId = null;
let captchaDetected = false;
let allUrls = [];

// Load saved state when extension starts
loadSavedState();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Background received:', request.action);
    
    switch (request.action) {
        case 'startScraping':
            startScraping();
            sendResponse({ status: 'started' });
            break;
            
        case 'stopScraping':
            stopScraping();
            sendResponse({ status: 'stopped' });
            break;
            
        case 'resumeScraping':
            resumeScraping();
            sendResponse({ status: 'resumed' });
            break;
            
        case 'getStatus':
            sendResponse({
                isRunning,
                currentPage,
                searchKeyword,
                captchaDetected,
                totalUrls: allUrls.length
            });
            break;
            
        case 'getAllUrls':
            sendResponse({ urls: allUrls });
            break;
            
        case 'clearData':
            clearData();
            sendResponse({ status: 'cleared' });
            break;
    }
    return true;
});

// Load saved state from storage
async function loadSavedState() {
    try {
        const result = await chrome.storage.local.get(['scraperData']);
        if (result.scraperData) {
            const data = result.scraperData;
            isRunning = data.isRunning || false;
            currentPage = data.currentPage || 1;
            searchKeyword = data.searchKeyword || '';
            captchaDetected = data.captchaDetected || false;
            allUrls = data.allUrls || [];
            currentTabId = data.currentTabId || null;
            
            console.log('📂 Loaded saved state:', {
                urls: allUrls.length,
                searchKeyword,
                currentPage
            });
            
            // If it was running when saved, stop it (safety measure)
            if (isRunning) {
                isRunning = false;
                saveState();
                console.log('🛑 Auto-stopped previous scraping session');
            }
        }
    } catch (error) {
        console.error('Error loading saved state:', error);
    }
}

// Save state to storage
async function saveState() {
    try {
        const data = {
            isRunning,
            currentPage,
            searchKeyword,
            captchaDetected,
            allUrls,
            currentTabId,
            lastUpdated: Date.now()
        };
        
        await chrome.storage.local.set({ scraperData: data });
        console.log('💾 State saved:', { urls: allUrls.length, searchKeyword });
    } catch (error) {
        console.error('Error saving state:', error);
    }
}

// Clear all data
async function clearData() {
    isRunning = false;
    currentPage = 1;
    searchKeyword = '';
    captchaDetected = false;
    allUrls = [];
    currentTabId = null;
    
    await chrome.storage.local.remove(['scraperData']);
    console.log('🗑️ All data cleared');
}

function getSearchKeyword(url) {
    try {
        const urlObj = new URL(url);
        const query = urlObj.searchParams.get('q');
        return query || 'search_results';
    } catch (e) {
        return 'search_results';
    }
}

async function startScraping() {
    if (isRunning) return;

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab || !tab.url.includes('google.com/search')) {
            return;
        }

        isRunning = true;
        currentTabId = tab.id;
        searchKeyword = getSearchKeyword(tab.url);
        currentPage = 1;
        captchaDetected = false;
        allUrls = [];

        await saveState();
        console.log('🚀 Starting auto-scraping for:', searchKeyword);
        await scrapeCurrentPage();
        
    } catch (error) {
        console.error('Error starting scraping:', error);
        isRunning = false;
        await saveState();
    }
}

function stopScraping() {
    console.log('⏹️ Stopping auto-scraping');
    isRunning = false;
    captchaDetected = false;
    saveState();
}

function resumeScraping() {
    if (!isRunning) {
        console.log('🔄 Resuming scraping');
        isRunning = true;
        captchaDetected = false;
        saveState();
        scrapeCurrentPage();
    }
}

async function scrapeCurrentPage() {
    if (!isRunning || !currentTabId) return;

    console.log(`📄 Scraping page ${currentPage}...`);

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab || !tab.url.includes('google.com/search')) {
            stopScraping();
            return;
        }

        const response = await chrome.tabs.sendMessage(currentTabId, { action: 'scrapeUrls' });
        
        if (!response) {
            console.error('No response from content script');
            return;
        }

        if (response.captchaDetected) {
            console.log('🚫 CAPTCHA detected');
            captchaDetected = true;
            isRunning = false;
            await saveState();
            return;
        }

        if (response.urls && response.urls.length > 0) {
            const newUrls = response.urls.filter(url => !allUrls.includes(url));
            allUrls.push(...newUrls);
            console.log(`✅ Page ${currentPage}: ${newUrls.length} URLs (Total: ${allUrls.length})`);
            await saveState();
        }

        await new Promise(resolve => setTimeout(resolve, 2000));

        const nextResponse = await chrome.tabs.sendMessage(currentTabId, { action: 'goToNextPage' });
        
        if (nextResponse && nextResponse.success && isRunning) {
            currentPage++;
            await saveState();
            console.log(`⏳ Waiting for page ${currentPage}...`);
            await new Promise(resolve => setTimeout(resolve, 4000));
            scrapeCurrentPage();
        } else {
            console.log('🎉 Finished! No more pages.');
            isRunning = false;
            await saveState();
        }

    } catch (error) {
        console.error('Scraping error:', error);
        if (isRunning) {
            setTimeout(() => scrapeCurrentPage(), 3000);
        }
    }
}

// Save state when extension is suspended
chrome.runtime.onSuspend.addListener(() => {
    console.log('💾 Saving state before suspension...');
    saveState();
});