// ============================================
// DYNAMIC PRODUCT SWITCHER UTILITY
// ============================================
const activeSwitchers = [];

/**
 * Check if the page element is currently visible in the DOM
 */
function isPageVisible(pageElement) {
    const rect = pageElement.getBoundingClientRect();
    const style = window.getComputedStyle(pageElement);
    const parentStyle = window.getComputedStyle(pageElement.parentElement || pageElement);
    
    return rect.width > 0 && 
           rect.height > 0 && 
           style.display !== 'none' && 
           style.visibility !== 'hidden' && 
           parentStyle.display !== 'none' &&
           parentStyle.visibility !== 'hidden';
}

/**
 * Initialize a switcher on a given page
 */
function initGenericSwitcher(pageElement, buttons) {
    let currentIdx = 0;
    let timer = null;

    const selectModel = (index, isManual = false) => {
        if (index === currentIdx && !isManual) return;
        
        const btn = buttons[index];
        if (!btn) return;
        currentIdx = index;

        // Toggle active-cot-btn class
        buttons.forEach((b, idx) => {
            if (idx === index) {
                b.classList.add('active-cot-btn');
            } else {
                b.classList.remove('active-cot-btn');
            }
        });

        // Find target images scoped inside the current page only
        const textEl = pageElement.querySelector('.cot-text, #cot-text');
        const imgEl = pageElement.querySelector('.cot-image, #cot-image');
        const specEl = pageElement.querySelector('.cot-spec, #cot-spec');

        const els = [textEl, imgEl, specEl].filter(Boolean);

        // Apply fade-out animation
        els.forEach(el => el.classList.add('cot-fade-out'));

        // Swap sources and fade back in after transition delay
        setTimeout(() => {
            if (textEl && btn.dataset.text) textEl.src = btn.dataset.text;
            if (imgEl && btn.dataset.image) imgEl.src = btn.dataset.image;
            if (specEl && btn.dataset.spec) specEl.src = btn.dataset.spec;

            els.forEach(el => el.classList.remove('cot-fade-out'));
        }, 300);

        if (isManual) {
            startTimer(); // reset rotation schedule
        }
    };

    const startTimer = () => {
        stopTimer();
        timer = setInterval(() => {
            if (isPageVisible(pageElement)) {
                const nextIdx = (currentIdx + 1) % buttons.length;
                selectModel(nextIdx, false);
            }
        }, 4000);
    };

    const stopTimer = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    };

    // Bind click & touchstart event listeners
    buttons.forEach((btn, index) => {
        const handler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            selectModel(index, true);
        };
        btn.addEventListener('click', handler);
        btn.addEventListener('touchstart', handler, { passive: false });
    });

    const switcherInstance = {
        pageElement,
        startTimer,
        stopTimer,
        selectModel
    };
    activeSwitchers.push(switcherInstance);

    startTimer();
}

/**
 * Control all active switcher timers
 */
function startAllSwitcherTimers() {
    activeSwitchers.forEach(s => s.startTimer());
}

function stopAllSwitcherTimers() {
    activeSwitchers.forEach(s => s.stopTimer());
}

// Auto-discover switcher elements on ready and on page turns (for dynamically loaded pages)
$(document).ready(function () {
    const discoverAndInit = () => {
        const pages = document.querySelectorAll('#flipbook .page');
        pages.forEach((page) => {
            const buttons = page.querySelectorAll('.cot-btn');
            if (buttons.length > 0 && !page.dataset.switcherInitialized) {
                page.dataset.switcherInitialized = 'true';
                initGenericSwitcher(page, buttons);
            }
        });
    };

    discoverAndInit();

    // Re-check when Turn.js dynamically creates/reveals pages
    if (window.$ && $('#flipbook').length) {
        $('#flipbook').on('turned', function () {
            discoverAndInit();
        });
    }
});

// ============================================
// 3D EXPERIENCE STAGGER POPUP ANIMATION
// ============================================
$(document).ready(function () {
    const triggerCardAnimation = () => {
        if (!window.$ || !$('#flipbook').length) return;
        const currentView = $('#flipbook').turn('view');
        
        // If page 4 is visible in the current view
        if (currentView.includes(4)) {
            // Find all 3D experience links in page 4
            const page4El = document.querySelector('.page-wrapper[page="4"]') || document.querySelector('.page:nth-child(4)');
            if (page4El) {
                const cards = page4El.querySelectorAll('a[href*="lightBox/index.html"]');
                cards.forEach((card, index) => {
                    // Set initial state
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.6)';
                    card.classList.remove('threed-card-animate');
                    
                    // Trigger stagger entrance
                    setTimeout(() => {
                        card.classList.add('threed-card-animate');
                        card.style.opacity = '';
                        card.style.transform = '';
                    }, index * 80);
                });
            }
        } else {
            // Revert state when moving away from page 4
            const cards = document.querySelectorAll('a[href*="lightBox/index.html"]');
            cards.forEach(card => {
                card.classList.remove('threed-card-animate');
                card.style.opacity = '';
                card.style.transform = '';
            });
        }
    };

    // Bind to turn.js turned event
    if (window.$ && $('#flipbook').length) {
        $('#flipbook').on('turned', function () {
            triggerCardAnimation();
        });
        
        // Run once on load in case we start on page 4
        setTimeout(triggerCardAnimation, 500);
    }
});
