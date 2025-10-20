// Popup script - UI controller
let currentState = {
    isRunning: false,
    currentPage: 1,
    searchKeyword: '-',
    captchaDetected: false,
    totalUrls: 0
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize buttons
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
    document.getElementById('downloadBtn').disabled = false;
    document.getElementById('copyBtn').disabled = false;
    document.getElementById('clearBtn').disabled = false;
    document.getElementById('resumeBtn').style.display = 'none';
    
    updatePopup();
    setInterval(updatePopup, 1000);
    
    // Start button
    document.getElementById('startBtn').addEventListener('click', function() {
        chrome.runtime.sendMessage({ action: 'startScraping' }, function(response) {
            if (response && response.status === 'started') {
                showNotification('🚀 Scraping started! Auto-collecting URLs...', 'success');
            } else {
                showNotification('❌ Please go to Google Search results first!', 'error');
            }
        });
    });
    
    // Stop button
    document.getElementById('stopBtn').addEventListener('click', function() {
        chrome.runtime.sendMessage({ action: 'stopScraping' }, function(response) {
            showNotification('⏹️ Scraping stopped', 'warning');
        });
    });
    
    // Resume button
    document.getElementById('resumeBtn').addEventListener('click', function() {
        chrome.runtime.sendMessage({ action: 'resumeScraping' }, function(response) {
            showNotification('🔄 Scraping resumed', 'success');
        });
    });
    
    // Download button
    document.getElementById('downloadBtn').addEventListener('click', function() {
        const btn = this;
        const originalText = btn.textContent;
        
        btn.textContent = '⏳ Downloading...';
        
        chrome.runtime.sendMessage({ action: 'getAllUrls' }, function(response) {
            if (response && response.urls && response.urls.length > 0) {
                downloadCSV(response.urls);
                showNotification(`✅ Downloading ${response.urls.length} URLs...`, 'success');
            } else {
                showNotification('❌ No URLs to download', 'error');
            }
            
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        });
    });
    
    // Copy button
    document.getElementById('copyBtn').addEventListener('click', function() {
        const btn = this;
        const originalText = btn.textContent;
        
        btn.textContent = '⏳ Copying...';
        
        chrome.runtime.sendMessage({ action: 'getAllUrls' }, function(response) {
            if (response && response.urls && response.urls.length > 0) {
                const urlsText = response.urls.join('\n');
                copyToClipboard(urlsText);
                showNotification(`✅ Copied ${response.urls.length} URLs to clipboard!`, 'success');
            } else {
                showNotification('❌ No URLs to copy', 'error');
            }
            
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        });
    });
    
    // Clear Data button
    document.getElementById('clearBtn').addEventListener('click', function() {
        const btn = this;
        const originalText = btn.textContent;
        
        btn.textContent = '⏳ Clearing...';
        
        chrome.runtime.sendMessage({ action: 'clearData' }, function(response) {
            if (response && response.status === 'cleared') {
                showNotification('✅ All data cleared!', 'success');
                updatePopup();
            } else {
                showNotification('❌ Failed to clear data', 'error');
            }
            
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        });
    });
});

// SIMPLE DOWNLOAD FUNCTION - UPDATED with "Url" header
function downloadCSV(urls) {
    const csvContent = "Url\n" + urls.map(url => `"${url}"`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `google_urls_${Date.now()}.csv`;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// COPY TO CLIPBOARD
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function updatePopup() {
    chrome.runtime.sendMessage({ action: 'getStatus' }, function(response) {
        if (response) {
            updateUI(response);
        }
    });
}

function updateUI(state) {
    currentState = state;
    
    document.getElementById('searchKeyword').textContent = state.searchKeyword || '-';
    document.getElementById('currentPage').textContent = state.currentPage || 1;
    document.getElementById('totalUrls').textContent = state.totalUrls || 0;
    
    const statusText = document.getElementById('statusText');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    // Enable/disable buttons based on state
    downloadBtn.disabled = state.totalUrls === 0;
    copyBtn.disabled = state.totalUrls === 0;
    clearBtn.disabled = state.totalUrls === 0 && (!state.searchKeyword || state.searchKeyword === '-');
    
    if (state.isRunning) {
        statusText.textContent = '🔄 Scraping...';
        statusText.style.color = '#2196F3';
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resumeBtn.style.display = 'none';
        showNotification(`📄 Page ${state.currentPage} • 📊 ${state.totalUrls} URLs`, 'info');
    } else if (state.captchaDetected) {
        statusText.textContent = '🚫 CAPTCHA';
        statusText.style.color = '#f44336';
        startBtn.disabled = true;
        stopBtn.disabled = true;
        resumeBtn.style.display = 'block';
        showNotification(`⚠️ CAPTCHA detected! Solve it and click Resume.`, 'error');
    } else {
        if (state.totalUrls > 0) {
            statusText.textContent = '💾 Data Saved';
            statusText.style.color = '#4CAF50';
            showNotification(`💾 ${state.totalUrls} URLs saved. Data persists across browser restarts!`, 'success');
        } else if (state.searchKeyword && state.searchKeyword !== '-') {
            statusText.textContent = '💾 Session Saved';
            statusText.style.color = '#FF9800';
            showNotification('💾 Session saved. You can close and reopen the extension.', 'info');
        } else {
            statusText.textContent = '✅ Ready';
            statusText.style.color = '#666';
            showNotification('1. Go to Google Search → 2. Click Start Auto', 'info');
        }
        
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resumeBtn.style.display = 'none';
    }
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification ' + type;
}