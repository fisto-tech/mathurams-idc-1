const navToggle = document.getElementById('navToggle');
const tocNav = document.getElementById('tocNav');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
    navToggle.classList.add('open');
    tocNav.classList.add('show');
    navOverlay.classList.add('show');
    navToggle.setAttribute('aria-expanded', 'true');

    // Toggle body class to lower z-index of navigation arrows
    document.body.classList.add('toc-active');

    // Hide brand logo when menu is open to prevent overlapping
    const logo = document.querySelector('.top-left-brand');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.pointerEvents = 'none';
    }

    // Hide thumbnails behind TOC
    const thumbs = document.querySelector('.thumbnail-preview-container');
    if (thumbs) thumbs.style.zIndex = '0';
}

function closeMenu() {
    navToggle.classList.remove('open');
    tocNav.classList.remove('show');
    navOverlay.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');

    // Restore body class to restore z-index of navigation arrows
    document.body.classList.remove('toc-active');

    // Restore brand logo
    const logo = document.querySelector('.top-left-brand');
    if (logo) {
        logo.style.opacity = '1';
        logo.style.pointerEvents = 'auto';
    }

    // Restore thumbnails
    const thumbs = document.querySelector('.thumbnail-preview-container');
    if (thumbs) thumbs.style.zIndex = '999999';
}

navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (tocNav.classList.contains('show')) closeMenu();
    else openMenu();
});

const closeTocBtn = document.getElementById('closeTocBtn');
if (closeTocBtn) {
    closeTocBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeMenu();
    });
}

// Click outside to close
document.addEventListener('click', (e) => {
    const isMenuVisible = tocNav.classList.contains('show');
    const isClickInsideMenu = tocNav.contains(e.target);
    const isClickOnToggle = navToggle.contains(e.target);

    if (isMenuVisible && !isClickInsideMenu && !isClickOnToggle) {
        closeMenu();
    }
});

// Prevent clicks inside menu from closing it
tocNav.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Close when clicking overlay
navOverlay.addEventListener('click', closeMenu);

// Close when clicking menu links
document.querySelectorAll('.toc-list a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ESC key to close
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && tocNav.classList.contains('show')) {
        closeMenu();
    }
});

function updateActiveThumbnail(currentPage) {
    if (window.$ && $('#flipbook').turn) {
        const currentView = $('#flipbook').turn('view', currentPage);
        document.querySelectorAll('.tb-link').forEach(item => {
            const itemPage = parseInt(item.dataset.page);
            const isActive = currentView.indexOf(itemPage) !== -1 || itemPage === currentPage;
            item.classList.toggle('active', isActive);
        });
    } else {
        document.querySelectorAll('.tb-link').forEach(item => {
            const itemPage = parseInt(item.dataset.page);
            item.classList.toggle('active', itemPage === currentPage);
        });
    }
}

// Unified handler (works for click + touch + pointer)
function handleThumbnailActivate(e) {
    e.preventDefault();
    e.stopPropagation();

    const link = e.currentTarget;
    const pageNumber = parseInt(link.dataset.page);
    const audioPath = link.dataset.audioPath;

    // Play audio
    if (audioPath) {
        const audio = new Audio(audioPath);
        audio.play().catch(err => console.log('Audio play failed:', err));
    }

    // Navigate flipbook with a small delay
    if (window.$ && $('#flipbook').turn) {
        setTimeout(() => {
            $('#flipbook').turn('page', pageNumber);
        }, 200);
    }

    // Update active thumbnail
    updateActiveThumbnail(pageNumber);

    closeMenu();
}

// Attach events
document.querySelectorAll('.tb-link').forEach(link => {

    // Pointer Events (best – covers mouse + touch + pen)
    link.addEventListener('pointerup', handleThumbnailActivate, {
        passive: false
    });

    // Fallback for older browsers
    // link.addEventListener('click', handleThumbnailActivate);
});


// Detect page change automatically in flipbook
$('#flipbook').bind("turned", function (event, page) {
    updateActiveThumbnail(page);
});

// Run once on page load
document.addEventListener("DOMContentLoaded", () => {
    const firstPage = $('#flipbook').turn('page');
    updateActiveThumbnail(firstPage);
});






// ************************bottom thumnail code start ------------------------------------- -->
const navToggle1 = document.getElementById('navToggle1');
const tocNav1 = document.getElementById('tocNav1');
const navOverlay1 = document.getElementById('navOverlay1');
function openMenu1() {
    navToggle1.classList.add('open');
    tocNav1.classList.add('show');
    navOverlay1.classList.add('show');
    navToggle1.setAttribute('aria-expanded', 'true');
} 1
function closeMenu1() {
    navToggle1.classList.remove('open');
    tocNav1.classList.remove('show');
    navOverlay1.classList.remove('show');
    navToggle1.setAttribute('aria-expanded', 'false');
}
navToggle1.addEventListener('click', function () {
    if (tocNav1.classList.contains('show')) closeMenu1();
    else openMenu1();
});
navOverlay1.addEventListener('click', closeMenu1);
const closeTocBtn1 = document.getElementById('closeTocBtn1');
if (closeTocBtn1) {
    closeTocBtn1.addEventListener('click', function(e) {
        e.stopPropagation();
        closeMenu1();
    });
}
document.querySelectorAll('#tocNav1 .toc-list a').forEach(link => {
    link.addEventListener('click', closeMenu1);
});
// Keyboard: ESC to close
document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") closeMenu1();
});




// // Set your current page number (dynamic)
// let currentPage = 4; // example: you are on page 4-5

// document.addEventListener("DOMContentLoaded", () => {

//     // Apply active based on current page
//     document.querySelectorAll(".tb-link").forEach(item => {
//         if (item.getAttribute("data-page") == currentPage) {
//             item.classList.add("active");
//         }
//     });

//     // On click update active thumbnail
//     document.querySelectorAll('.tb-link').forEach(item => {
//         item.addEventListener('click', function () {

//             // Remove previous active
//             document.querySelectorAll('.tb-link')
//                 .forEach(el => el.classList.remove('active'));

//             // Add active to clicked item
//             this.classList.add('active');

//             // Update currentPage variable
//             currentPage = this.getAttribute("data-page");
//         });
//     });
// });



// ************************bottom thumnail code end  ------------------------------------- -->





// ****************************share button navbar functionality start************************** 

var triggerIcon = document.getElementById('navMenuBarMobile');
var overlay = document.getElementById('navMobileOverlay');

function setIcon(iName) {
    if (iName == 'menu') {
        triggerIcon.src = '../global assets/icons/doted-icon.svg';
        triggerIcon.style.scale = 1;
        triggerIcon.style.transform = 'translateY(-50%)';
    }
    else if (iName == 'close') {
        triggerIcon.src = '../global assets/bottom-navbar/close-icon.svg';
        triggerIcon.style.scale = .7;
        triggerIcon.style.transform = 'translateY(-65%)';
    }
    else triggerIcon.src = '';
}

function openOverlay() {
    if (overlay.classList.contains('nav-mobile-overlay--visible')) {
        overlay.classList.remove('nav-mobile-overlay--visible');
        setIcon('menu');
    }
    else {
        overlay.classList.add('nav-mobile-overlay--visible');
        setIcon('close');
    }
}

function closeOverlay() {
    overlay.classList.remove('nav-mobile-overlay--visible');
    setIcon('menu');
}

triggerIcon.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    openOverlay();
});


overlay
    .querySelector('.nav-mobile-overlay__backdrop')
    .addEventListener('click', closeOverlay);

const shareBtn = document.getElementById('shareBtn');
const navMobileShareIcon = document.getElementById('navMobileShareIcon');
const shareModal = document.getElementById('shareModal');
const shareOverlay = document.getElementById('shareOverlay');
const closeBtn = document.getElementById('closeBtn');
const shareInput = document.getElementById('shareInput');
const copyBtn = document.getElementById('copyBtn');
const copiedMsg = document.getElementById('copiedMsg');

// Set link
shareInput.value = "";

// Open modal
shareBtn.addEventListener('click', () => {
    showShareMenu();
});



function showShareMenu() {
    shareModal.classList.remove('hidden');
    shareOverlay.classList.remove('hidden');
    shareInput.select();
}

// Close modal
const closeModal = () => {
    shareModal.classList.add('hidden');
    shareOverlay.classList.add('hidden');
};

closeBtn.addEventListener('click', closeModal);
shareOverlay.addEventListener('click', closeModal);

// Copy link
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(shareInput.value).then(() => {
        copiedMsg.classList.remove('hidden');
        setTimeout(() => copiedMsg.classList.add('hidden'), 1500);
    });
});

// Social share functions
document.getElementById('whatsappBtn').addEventListener('click', () => {
    const url = encodeURIComponent(shareInput.value);
    window.open(`https://wa.me/?text=${url}`, '_blank');
});

document.getElementById('twitterBtn').addEventListener('click', () => {
    const url = encodeURIComponent(shareInput.value);
    window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank');
});

document.getElementById('facebookBtn').addEventListener('click', () => {
    const url = encodeURIComponent(shareInput.value);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
});

// LinkedIn Share
document.getElementById('linkedInBtn').addEventListener('click', () => {
    const url = encodeURIComponent(shareInput.value);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
});


// mobile share
const mobileShareModal = document.getElementById('shareModalMobile');
const mobileShareOverlay = document.getElementById('shareOverlayMobile');
const mobileShareCloseBtn = document.getElementById('shareCloseBtnMobile');

const mobileShareLinkInput = document.getElementById('shareInputMobile');
const mobileCopyLinkBtn = document.getElementById('copyBtnMobile');
const mobileCopiedToast = document.getElementById('copiedMsgMobile');

// Set link
mobileShareLinkInput.value = "";


// Open modal - use desktop share modal for mobile too
navMobileShareIcon.addEventListener('click', function () {
    closeOverlay();
    showShareMenu(); // reuse the desktop share function
});
// Close modal
function closeMobileShareMenu() {
    mobileShareModal.classList.add('hidden');
    mobileShareOverlay.classList.add('hidden');
}

mobileShareCloseBtn.addEventListener('click', closeMobileShareMenu);
mobileShareOverlay.addEventListener('click', closeMobileShareMenu);

// Copy link
mobileCopyLinkBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(mobileShareLinkInput.value).then(() => {
        mobileCopiedToast.classList.remove('hidden');
        setTimeout(() => mobileCopiedToast.classList.add('hidden'), 1500);
    });
});

// Social shares
document.getElementById('waShareMobile').addEventListener('click', () => {
    const url = encodeURIComponent(mobileShareLinkInput.value);
    window.open(`https://wa.me/?text=${url}`, '_blank');
});

document.getElementById('twShareMobile').addEventListener('click', () => {
    const url = encodeURIComponent(mobileShareLinkInput.value);
    window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank');
});

document.getElementById('fbShareMobile').addEventListener('click', () => {
    const url = encodeURIComponent(mobileShareLinkInput.value);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
});

document.getElementById('lnShareMobile').addEventListener('click', () => {
    const url = encodeURIComponent(mobileShareLinkInput.value);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
});



// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});





// ****************************share button navbar functionality end************************** ]
// ****************************music button navbar functionality start************************** 
// ==================== MUSIC/AUDIO FUNCTIONALITY (Alternative) ====================
window.addEventListener('load', function () {
    const bgmAudio = document.getElementById('bgmAudio');
    const bgmButton = document.getElementById('bgmButton');
    const musicOnImg = document.getElementById('musicOnImg');
    const musicOffImg = document.getElementById('musicOffImg');

    const mobileAudioIcon = document.getElementById('navMobileAudioIcon');
    const mobileAudioBtn = document.getElementById('mobileAudioBtn');
    const mobileAudioStatus = document.getElementById('mobileAudioStatus');

    const MOBILE_MUSIC_ON_SRC = "../global assets/icons/music-on-icon.svg";
    const MOBILE_MUSIC_OFF_SRC = "../global assets/icons/music-off-icon.svg";

    if (bgmAudio) {
        bgmAudio.volume = 0.50;
    }

    let isPlaying = false;

    // Initially show "OFF" icon (music not playing)
    updateIcons(false);

    function updateIcons(playing) {
        // Desktop icons
        if (musicOnImg && musicOffImg) {
            if (playing) {
                musicOnImg.classList.remove("hidden");
                musicOffImg.classList.add("hidden");
            } else {
                musicOnImg.classList.add("hidden");
                musicOffImg.classList.remove("hidden");
            }
        }

        // Mobile icons
        if (mobileAudioIcon) {
            mobileAudioIcon.src = playing ? MOBILE_MUSIC_ON_SRC : MOBILE_MUSIC_OFF_SRC;
        }

        const mobileDropdownAudioIcon = document.getElementById('mobileAudioIcon');
        if (mobileDropdownAudioIcon) {
            mobileDropdownAudioIcon.src = playing ? MOBILE_MUSIC_ON_SRC : MOBILE_MUSIC_OFF_SRC;
        }

        if (mobileAudioStatus) {
            mobileAudioStatus.textContent = playing ? 'ON' : 'OFF';
            mobileAudioStatus.classList.toggle('on', playing);
        }
    }

    function toggleMusic() {
        if (!bgmAudio) return;

        if (isPlaying) {
            bgmAudio.pause();
        } else {
            bgmAudio.play().catch((error) => {
                console.log('Could not play music:', error);
            });
        }
    }

    // Event listeners
    if (bgmButton) bgmButton.addEventListener('click', toggleMusic);
    if (mobileAudioIcon) mobileAudioIcon.addEventListener('click', toggleMusic);
    if (mobileAudioBtn) mobileAudioBtn.addEventListener('click', toggleMusic);

    // Sync with actual audio state
    if (bgmAudio) {
        bgmAudio.addEventListener('pause', () => {
            isPlaying = false;
            updateIcons(false);
        });

        bgmAudio.addEventListener('play', () => {
            isPlaying = true;
            updateIcons(true);
        });
    }

    // Visibility handling
    let wasPlayingBeforeHidden = false;
    document.addEventListener('visibilitychange', () => {
        if (!bgmAudio) return;
        if (document.hidden) {
            wasPlayingBeforeHidden = isPlaying;
            if (isPlaying) bgmAudio.pause();
        } else {
            if (wasPlayingBeforeHidden) {
                bgmAudio.play().catch(() => { });
            }
        }
    });

    // Auto-play music on the first interaction anywhere on the document
    let hasInteracted = false;
    function playOnInteraction() {
        if (!hasInteracted && !isPlaying && bgmAudio) {
            hasInteracted = true;
            bgmAudio.play().catch((e) => console.log('Autoplay interaction failed:', e));
        }
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('touchstart', playOnInteraction);
    }
    
    document.addEventListener('click', playOnInteraction);
    document.addEventListener('touchstart', playOnInteraction);

    window.toggleBgmMusic = toggleMusic;
});
// ****************************music button navbar functionality start************************** 



// *********************home button start**************
const goToPage1 = document.getElementById("goToPage1");

goToPage1.addEventListener("click", function () {
    if ($("#flipbook").turn) {
        $("#flipbook").turn("page", 1);
    }

    const audioPath = goToPage1.dataset.audioPath;
    if (audioPath) {
        const audio = new Audio(audioPath);
        audio.play();
    }
});


// *********************home button end**************




$('#flipbook').bind('turned', function (event, page, view) {

    // ✅ UPDATE PAGE COUNTER WITH LAST PAGE FIX
    const totalPages = $('#flipbook').turn('pages');
    const pageNoElement = document.getElementById('page-no');

    if (pageNoElement) {
        if (page === 1) {
            // First page (cover)
            pageNoElement.textContent = `1 / ${totalPages}`;
        } else if (page === totalPages) {
            // Last page (back cover) - show single number
            pageNoElement.textContent = `${totalPages} / ${totalPages}`;
        } else if (page % 2 === 0) {
            // Even page - show as spread
            pageNoElement.textContent = `${page}-${page + 1} / ${totalPages}`;
        } else {
            // Odd page - show as spread
            pageNoElement.textContent = `${page - 1}-${page} / ${totalPages}`;
        }
    }

    // Update active thumbnail (your existing code)
    updateActiveThumbnail(page);
});






// *****************************search icon code*******************************

// ==================== SEARCH MODAL FUNCTIONALITY ====================
// ==================== SEARCH MODAL - CLICK OUTSIDE TO CLOSE ====================

const searchIcon = document.querySelector('img[alt="search-icon"]');
const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const closeSearchModal = document.getElementById('closeSearchModal');

// Define your pages with search keywords
const pages = [
    { page: 1, title: "Home page", keywords: ["cover", "front", "home", "title", "1", "mathurams", "engineering", "idc"] },
    { page: 2, title: "About Us", keywords: ["intro", "introduction", "about us", "2", "values", "mission", "vision", "profile"] },
    { page: 3, title: "Table of Contents", keywords: ["3", "table of contents", "toc", "index", "chapters", "products", "categories"] },
    { page: 4, title: "3D Experience", keywords: ["4", "3d", "experience", "interactive", "virtual", "models", "icu cot", "fowler cot", "examination", "hi-lo", "labour", "semi fowler", "attender", "bedside locker", "overbed"] },
    { page: 5, title: "Semi Fowler Cot", keywords: ["5", "semi fowler cot", "ward furniture", "bed", "MF-35"] },
    { page: 6, title: "Fowler Cot", keywords: ["6", "fowler cot", "ward furniture", "bed", "MF-39"] },
    { page: 7, title: "Plain Cot", keywords: ["7", "plain cot", "ward furniture", "bed", "MF-62", "MF-61"] },
    { page: 8, title: "Attender Cot", keywords: ["8", "attender cot", "attender bed", "ward furniture", "MF-19", "MF-20", "MF-22"] },
    { page: 9, title: "Bed Side Locker", keywords: ["9", "bed side locker", "bedside cabinet", "locker", "cabinet", "ward furniture", "MF-01", "MF-02"] },
    { page: 10, title: "Over Bed Table", keywords: ["10", "over bed table", "cardiac table", "ward furniture", "MF-08", "MF-09"] },
    { page: 11, title: "ICU Cot 5 Functions", keywords: ["11", "icu cot", "5 functions", "critical care", "electric", "motor", "remote", "bed", "MF-31", "MF-32"] },
    { page: 12, title: "ICU Cot 3 Functions", keywords: ["12", "icu cot", "3 functions", "critical care", "manual", "crank", "bed", "MF-33", "MF-34"] },
    { page: 13, title: "Labour Cot", keywords: ["13", "labour cot", "maternity", "delivery bed", "MF-71", "MF-72"] },
    { page: 14, title: "Baby Cradle & Pediatric Cot", keywords: ["14", "baby cradle", "cradle", "pediatric cot", "child bed", "maternity", "MF-36", "MF-90", "MF-37", "MF-38"] },
    { page: 15, title: "Trolley Cum Cot", keywords: ["15", "trolley cum cot", "emergency", "patient transfer", "trolley", "MF-38"] },
    { page: 16, title: "Transfer Trolley Plain", keywords: ["16", "transfer trolley plain", "stretcher", "emergency", "patient transfer", "trolley", "MF-67"] },
    { page: 17, title: "Hi-Lo Stretcher", keywords: ["17", "hi-lo stretcher", "emergency", "patient transfer", "stretcher", "trolley", "MF-68"] },
    { page: 18, title: "Stretcher Trolley", keywords: ["18", "stretcher trolley", "emergency", "patient transfer", "stretcher", "trolley", "MF-44"] },
    { page: 19, title: "Wheel Chair", keywords: ["19", "wheel chair", "foldable wheel chair", "emergency", "patient transfer", "MF-52", "MF-49"] },
    { page: 20, title: "Patient Shifter & Foldable Wheel Chair", keywords: ["20", "patient shifter", "aluminum shifter", "wheel chair", "foldable", "emergency", "patient transfer", "MF-115", "MF-49"] },
    { page: 21, title: "Instrument & Dressing Trolley", keywords: ["21", "instrument trolley", "dressing trolley", "medical trolleys", "trolley", "ss", "MF-10", "MF-57"] },
    { page: 22, title: "Mayo's & Dressing Trolley", keywords: ["22", "mayo's trolley", "dressing trolley", "medical trolleys", "trolley", "MF-46", "MF-57"] },
    { page: 23, title: "Crash Cart", keywords: ["23", "crash cart", "emergency cart", "medical trolleys", "trolley", "MF-84", "MF-86"] },
    { page: 24, title: "Drug & Laparoscopy Trolley", keywords: ["24", "drug trolley", "laparoscopy trolley", "medical trolleys", "trolley", "MF-47", "MF-111"] },
    { page: 25, title: "Endoscopy & ECG Trolley", keywords: ["25", "endoscopy trolley", "ecg trolley", "medical trolleys", "trolley", "MF-113", "MF-58"] },
    { page: 26, title: "Nebulizer & Linen Trolley", keywords: ["26", "nebulizer trolley", "linen trolley", "laundry trolley", "medical trolleys", "trolley", "MF-88", "MF-91", "MF-92"] },
    { page: 27, title: "Waste Bin & Cylinder Trolley", keywords: ["27", "waste bin trolley", "biomedical waste", "cylinder trolley", "oxygen cylinder", "medical trolleys", "trolley", "MF-107", "MF-77", "MF-75", "MF-78"] },
    { page: 28, title: "Deluxe Examination Couch", keywords: ["28", "deluxe examination couch", "examination", "couch", "table", "MF-65"] },
    { page: 29, title: "Examination Table", keywords: ["29", "examination table", "examination", "table", "MF-65"] },
    { page: 30, title: "Gynec Examination Couch", keywords: ["30", "gynec examination couch", "gynecology", "examination", "couch", "table", "MF-93"] },
    { page: 31, title: "Scan Table & Revolving Stool", keywords: ["31", "scan table", "scan couch", "revolving stool", "stool", "examination", "table", "MF-96", "MF-13", "MF-14", "MF-15"] },
    { page: 32, title: "Blood Collection Table & X-Ray Lobby", keywords: ["32", "blood collection table", "x-ray lobby", "examination", "table", "MF-101", "MF-119"] },
    { page: 33, title: "IV Stand", keywords: ["33", "iv stand", "infusion stand", "drip stand", "stainless steel furniture", "ward accessories", "MF-05"] },
    { page: 34, title: "Saline Stands & Foot Step", keywords: ["34", "saline stand", "foot step", "double step", "stainless steel furniture", "ward accessories", "MF-06", "MF-16", "MF-17"] },
    { page: 35, title: "Scrub Station & Kick Bucket", keywords: ["35", "scrub station", "kick bucket", "basin stand", "stainless steel furniture", "ward accessories", "MF-105", "MF-24", "MF-25"] },
    { page: 36, title: "Viewing Box & Shadowless Lamp", keywords: ["36", "viewing box", "x-ray viewer", "shadowless lamp", "ot light", "stainless steel furniture", "ward accessories", "MF-118", "MF-112"] },
    { page: 37, title: "Sofa Cum Bed & Visitor Chair", keywords: ["37", "sofa cum bed", "visitor chair", "general furniture", "furniture", "MF-121", "MF-122", "MF-123"] },
    { page: 38, title: "General Furniture Stretcher & Bed", keywords: ["38", "general furniture", "stretcher", "bed", "furniture", "MF-124", "MF-125"] },
    { page: 39, title: "Waiting & Doctor Chair", keywords: ["39", "waiting chair", "doctor chair", "general furniture", "furniture", "MF-126", "MF-127"] },
    { page: 40, title: "Dustbin & Trolley", keywords: ["40", "dustbin", "waste bin", "general furniture", "trolley", "MF-128", "MF-129"] },
    { page: 41, title: "Accessories", keywords: ["41", "accessories", "saline stands", "cushions", "mattress", "hooks", "parts"] },
    { page: 42, title: "Contact Us", keywords: ["42", "contact us", "address", "phone", "email", "location", "maps", "website", "mathurams"] }
];

// ✅ CLOSE SEARCH FUNCTION
const closeSearch = () => {
    searchModal.classList.remove('show');
    searchModal.classList.add('hidden');
    searchInput.value = '';
    searchResults.innerHTML = '';
};

// ✅ OPEN SEARCH MODAL
if (searchIcon) {
    searchIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate closure
        searchModal.classList.remove('hidden');

        requestAnimationFrame(() => {
            searchModal.classList.add('show');
        });

        searchInput.focus();
    });
}

// ✅ CLOSE BUTTON CLICK
if (closeSearchModal) {
    closeSearchModal.addEventListener('click', (e) => {
        e.stopPropagation();
        closeSearch();
    });
}

// ✅ CLICK OUTSIDE MODAL TO CLOSE - THIS IS THE KEY!
document.addEventListener('click', (e) => {
    // Check if modal is visible
    const isModalVisible = !searchModal.classList.contains('hidden');

    // Check if click is inside modal or on search icon
    const isClickInsideModal = searchModal.contains(e.target);
    const isClickOnSearchIcon = searchIcon && searchIcon.contains(e.target);

    // Close if clicking outside and modal is open
    if (isModalVisible && !isClickInsideModal && !isClickOnSearchIcon) {
        closeSearch();
    }
});

// ✅ PREVENT CLICKS INSIDE MODAL FROM CLOSING IT
searchModal.addEventListener('click', (e) => {
    e.stopPropagation();
});

// ✅ ESC KEY TO CLOSE
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
        closeSearch();
    }
});

// ✅ SEARCH FUNCTIONALITY
function runSearch() {
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
        searchResults.innerHTML = '';
        return;
    }

    const filtered = pages.filter(page =>
        page.title.toLowerCase().includes(query) ||
        page.keywords.some(kw => kw.toLowerCase().includes(query))
    );

    if (filtered.length === 0) {
        searchResults.innerHTML = '<p class="text-gray-500 text-center">No results found</p>';
        return;
    }

    searchResults.innerHTML = filtered.map(page => `
        <div class="search-result-item p-3 hover:bg-gray-700 cursor-pointer border-b rounded" data-page="${page.page}">
            <div class="text-white font-semibold text-[.9vw]">${page.title}</div>
            <div class="text-gray-400 text-[.7vw]">Page ${page.page}</div>
        </div>
    `).join('');

    // Add click events to results
    document.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const pageNum = parseInt(item.dataset.page);
            if ($('#flipbook').turn) {
                $('#flipbook').turn('page', pageNum);
            }
            closeSearch();
        });
    });
}

// ✅ SEARCH INPUT - TYPE TO FILTER
if (searchInput) {
    searchInput.addEventListener('input', runSearch);

    // Enter key to navigate to first result
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const firstResult = document.querySelector('.search-result-item');
            if (firstResult) firstResult.click();
        }
    });
}

// ✅ SEARCH BUTTON CLICK
document.getElementById("SearchModal")?.addEventListener("click", (e) => {
    e.stopPropagation();
    runSearch();
    const firstResult = document.querySelector('.search-result-item');
    if (firstResult) firstResult.click();
});

// *****************************search icon code end*******************************



// *********************************zoom in zoom out button start ********************************** */


// ***********************************download code start******************************************

const downloadBtn = document.getElementById("download-btn");
const navMobileDownloadIcon = document.getElementById("navMobileDownloadIcon");
const downloadPopup = document.getElementById("downloadPopup");

downloadBtn.addEventListener("click", () => {
    startDownload();
});
navMobileDownloadIcon.addEventListener("click", () => {
    startDownload();
});

function startDownload() {

    // 1. Show notification popup
    downloadPopup.classList.remove("hidden");
    setTimeout(() => {
        downloadPopup.classList.add("opacity-100");
    }, 10);

    // 2. Auto-hide popup after 2 seconds
    setTimeout(() => {
        downloadPopup.classList.remove("opacity-100");
        setTimeout(() => downloadPopup.classList.add("hidden"), 300);
    }, 2000);

    // 3. Trigger PDF download
    const link = document.createElement("a");
    link.href = "../global assets/Mathurams_IDC.pdf";   // <<-- put your PDF file path
    link.download = "Mathurams_IDC.pdf";                 // <<-- filename user will download
    document.body.appendChild(link);
    link.click();
    link.remove();
}
// ***********************************download code end******************************************

// const searchModal1 = document.getElementById("searchModal");
// const searchIcon1 = document.querySelector('img[alt="search-icon"]');
// const closeSearchModal1 = document.getElementById("closeSearchModal");

// // OPEN MODAL WITH ANIMATION
// searchIcon1.addEventListener("click", () => {
//     searchModal1.classList.remove("hidden");

//     // allow browser to apply display change
//     requestAnimationFrame(() => {
//         searchModal1.classList.add("show");
//     });
// });

// // CLOSE MODAL WITH ANIMATION
// closeSearchModal1.addEventListener("click", () => {
//     searchModal1.classList.remove("show");

//     // after animation ends, hide it
//     searchModal1.addEventListener(
//         "transitionend",
//         () => {
//             searchModal1.classList.add("hidden");
//         },
//         { once: true }
//     );
// });




document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.svg-container').forEach(container => {
        const src = container.getAttribute('data-src');
        if (src) {
            fetch(src)
                .then(response => {
                    if (!response.ok) throw new Error(`Failed to load ${src}`);
                    return response.text();
                })
                .then(svgText => {
                    const parser = new DOMParser();
                    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
                    const svgEl = svgDoc.querySelector("svg");
                    if (svgEl) {
                        // Clean up SVG dimensions
                        svgEl.removeAttribute("width");
                        svgEl.removeAttribute("height");
                        svgEl.style.width = "100%";
                        svgEl.style.height = "100%";
                        svgEl.style.cursor = "pointer";
                        svgEl.classList.add("line-reveal9"); // keep your reveal animation
                    }
                    container.innerHTML = svgEl ? svgEl.outerHTML : svgText;
                })
                .catch(err => console.error("SVG Load Error:", err));
        }
    });




});




// ************************ Zoom In Zoom Out Code Start ******************************
// ************************ COMPLETE ZOOM SYSTEM WITH BLOCK FUNCTIONALITY ************************

(function () {
    'use strict';

    // ==================== ELEMENT REFERENCES ====================
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const zoomSlider = document.getElementById('zoomSlider');
    const zoomPercentage = document.getElementById('zoomPercentage');
    const flipbookContainer = document.getElementById('flipbook');
    const wrapper = document.querySelector('.flipbook-scroll-wrapper');

    // ==================== STATE VARIABLES ====================
    let currentZoom = 100;
    let isZoomed = false;

    // ==================== 🔥 ZOOM ALERT POPUP SYSTEM ====================
    function createZoomAlertElements() {
        if (!document.getElementById('zoom-alert-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'zoom-alert-overlay';
            overlay.innerHTML = `
                <style>
                    #zoom-alert-overlay {
                        position: fixed;
                        inset: 0;
                        background: rgba(0, 0, 0, 0.6);
                        backdrop-filter: blur(8px);
                        z-index: 999999999;
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        pointer-events: none;
                    }
                    
                    #zoom-alert-overlay.show {
                        opacity: 1;
                        visibility: visible;
                    }
                    
                    #zoom-alert-box {
                        background: linear-gradient(135deg, #0f766e 0%, #134e4a 50%, #0d5c52 100%);
                        color: white;
                        padding: 2vw 3vw;
                        border-radius: 1.5vw;
                        text-align: center;
                        box-shadow: 
                            0 25px 50px rgba(0, 0, 0, 0.4),
                            0 0 0 1px rgba(255, 255, 255, 0.1),
                            inset 0 1px 0 rgba(255, 255, 255, 0.2);
                        transform: scale(0.9) translateY(20px);
                        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                        max-width: 90vw;
                        min-width: 300px;
                        pointer-events: auto;
                    }
                    
                    #zoom-alert-overlay.show #zoom-alert-box {
                        transform: scale(1) translateY(0);
                    }
                    
                    .zoom-alert-icon {
                        width: 4vw;
                        height: 4vw;
                        min-width: 50px;
                        min-height: 50px;
                        background: rgba(255, 255, 255, 0.15);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 1vw;
                        animation: pulse-icon 2s ease-in-out infinite;
                    }
                    
                    @keyframes pulse-icon {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                    }
                    
                    .zoom-alert-icon svg {
                        width: 2vw;
                        height: 2vw;
                        min-width: 24px;
                        min-height: 24px;
                        stroke: #4ade80;
                    }
                    
                    .zoom-alert-title {
                        font-size: 1.3vw;
                        font-weight: 700;
                        margin-bottom: 0.5vw;
                        font-family: 'Inter', sans-serif;
                    }
                    
                    .zoom-alert-message {
                        font-size: 0.9vw;
                        opacity: 0.9;
                        margin-bottom: 1vw;
                        line-height: 1.5;
                    }
                    
                    .zoom-alert-hint {
                        font-size: 0.75vw;
                        opacity: 0.7;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5vw;
                    }
                    
                    .zoom-alert-hint kbd {
                        background: rgba(255, 255, 255, 0.2);
                        padding: 0.2vw 0.5vw;
                        border-radius: 0.3vw;
                        font-family: monospace;
                    }
                    
                    .zoom-alert-progress {
                        width: 100%;
                        height: 4px;
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 2px;
                        margin-top: 1vw;
                        overflow: hidden;
                    }
                    
                    .zoom-alert-progress-bar {
                        height: 100%;
                        background: linear-gradient(90deg, #4ade80, #22c55e);
                        border-radius: 2px;
                        animation: progress-shrink 3s linear forwards;
                    }
                    
                    @keyframes progress-shrink {
                        from { width: 100%; }
                        to { width: 0%; }
                    }
                    
                    /* Mobile Responsive */
                    @media (max-width: 768px) {
                        #zoom-alert-box {
                            padding: 20px 25px;
                            border-radius: 16px;
                            min-width: 280px;
                        }
                        
                        .zoom-alert-title {
                            font-size: 16px;
                        }
                        
                        .zoom-alert-message {
                            font-size: 13px;
                        }
                        
                        .zoom-alert-hint {
                            font-size: 11px;
                        }
                    }
                </style>
                
                <div id="zoom-alert-box">
                    <div class="zoom-alert-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            <line x1="11" y1="8" x2="11" y2="14"/>
                            <line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                    </div>
                    <div class="zoom-alert-title">Action Blocked</div>
                    <div class="zoom-alert-message">Please zoom out first to use this feature</div>
                    <div class="zoom-alert-hint">
                        Press <kbd>Ctrl</kbd> + <kbd>0</kbd> or use zoom buttons
                    </div>
                    <div class="zoom-alert-progress">
                        <div class="zoom-alert-progress-bar"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            // ❌ REMOVED: Click overlay to dismiss - popup only auto-hides now
        }
    }

    // ==================== SHOW ZOOM ALERT ====================
    function showZoomAlert(title, message) {
        createZoomAlertElements();

        const overlay = document.getElementById('zoom-alert-overlay');
        const alertBox = document.getElementById('zoom-alert-box');

        if (!overlay || !alertBox) return;

        // Update content
        const titleEl = alertBox.querySelector('.zoom-alert-title');
        const messageEl = alertBox.querySelector('.zoom-alert-message');
        const progressBar = alertBox.querySelector('.zoom-alert-progress-bar');

        if (titleEl) titleEl.textContent = title || 'Action Blocked';
        if (messageEl) messageEl.innerHTML = message || 'Please zoom out first to use this feature';

        // Reset progress bar animation
        if (progressBar) {
            progressBar.style.animation = 'none';
            progressBar.offsetHeight; // Trigger reflow
            progressBar.style.animation = 'progress-shrink 3s linear forwards';
        }

        // Show overlay
        overlay.classList.add('show');

        // Auto-hide after 3 seconds (ONLY way to close)
        clearTimeout(overlay.hideTimer);
        overlay.hideTimer = setTimeout(hideZoomAlert, 3000);
    }

    // ==================== HIDE ZOOM ALERT ====================
    function hideZoomAlert() {
        const overlay = document.getElementById('zoom-alert-overlay');
        if (overlay) {
            overlay.classList.remove('show');
            clearTimeout(overlay.hideTimer);
        }
    }

    // ==================== BLOCK ACTION WHEN ZOOMED ====================
    function blockIfZoomed(e, title, message) {
        if (!isZoomed) return false;

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        showZoomAlert(title, message);
        return true;
    }

    // ==================== APPLY ZOOM FUNCTION ====================
    function applyZoom(zoomLevel) {
        currentZoom = Math.max(100, Math.min(130, zoomLevel));
        const scale = currentZoom / 100;
        isZoomed = currentZoom > 100;

        if (flipbookContainer) {
            flipbookContainer.style.transform = `scale(${scale})`;
            flipbookContainer.style.transformOrigin = 'top center';
            flipbookContainer.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }

        if (wrapper) {
            if (isZoomed) {
                wrapper.classList.add('zoomed');
                wrapper.classList.remove('no-scrollbar');
                wrapper.style.overflowY = 'auto';
            } else {
                wrapper.classList.remove('zoomed');
                wrapper.classList.add('no-scrollbar');
                wrapper.style.overflowY = 'hidden';
                wrapper.scrollTop = 0;
            }
        }

        // Update UI
        if (zoomPercentage) zoomPercentage.textContent = currentZoom + '%';
        if (zoomSlider) zoomSlider.value = currentZoom;

        // Button states
        if (zoomOutBtn) {
            zoomOutBtn.style.opacity = currentZoom <= 100 ? '0.4' : '1';
            zoomOutBtn.style.pointerEvents = currentZoom <= 100 ? 'none' : 'auto';
        }
        if (zoomInBtn) {
            zoomInBtn.style.opacity = currentZoom >= 130 ? '0.4' : '1';
            zoomInBtn.style.pointerEvents = currentZoom >= 130 ? 'none' : 'auto';
        }

        // Update blocked elements visual state
        updateBlockedElementsState();

      

        // Add this inside your applyZoom function (at the end, before the console.log)

        // Hide/Show Page Controller based on zoom
        const pageController = document.querySelector('.page-controller');
        if (pageController) {
            if (isZoomed) {
                pageController.classList.add('zoom-hidden');
            } else {
                pageController.classList.remove('zoom-hidden');
            }
        }
    }

    // ==================== UPDATE BLOCKED ELEMENTS VISUAL STATE ====================
    function updateBlockedElementsState() {
        const blockedSelectors = [
            '#iconTOC', '#navToggle', '#mobileTocBtn',
            '.thumb-dot', '.tb-link', '#navToggle1',
            '#iconText', '#searchIconDesktop', 'img[alt="search-icon"]',
            '#iconNextPage', '#iconPrevPage', '#iconFrontPage', '#iconSkipForward',
            '.ui-arrow-next-page', '.ui-arrow-previous-page', '.next-arrow', '.prev-arrow',
            '#iconAutoplay' // ✅ ADDED: Autoplay icon
        ];

        blockedSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                if (isZoomed) {
                    el.style.opacity = '0.5';
                    el.style.cursor = 'not-allowed';
                    el.classList.add('zoom-blocked');
                } else {
                    el.style.opacity = '';
                    el.style.cursor = '';
                    el.classList.remove('zoom-blocked');
                }
            });
        });
    }

    // ==================== BLOCK HANDLERS ====================

    // 🔒 TABLE OF CONTENTS
    function blockTOC(e) {
        if (blockIfZoomed(e, '📋 Table of Contents Blocked', 'Zoom out to access Table of Contents')) {
            return false;
        }
    }

    // 🔒 THUMBNAIL NAVIGATION
    function blockThumbnail(e) {
        if (blockIfZoomed(e, '🖼️ Thumbnail Navigation Blocked', 'Zoom out to navigate using thumbnails')) {
            return false;
        }
    }

    // 🔒 SEARCH
    function blockSearch(e) {
        if (blockIfZoomed(e, '🔍 Search Blocked', 'Zoom out to use the search feature')) {
            return false;
        }
    }

    // 🔒 PAGE NAVIGATION (Next/Prev/First/Last)
    function blockPageNav(e) {
        if (blockIfZoomed(e, '📄 Page Navigation Blocked', 'Zoom out to navigate between pages')) {
            return false;
        }
    }

    // 🔒 FLIPBOOK PAGE FLIP
    function blockFlip(e) {
        if (blockIfZoomed(e, '📖 Page Flip Blocked', 'Zoom out to flip pages')) {
            return false;
        }
    }

    // 🔒 AUTOPLAY - NEW!
    function blockAutoplay(e) {
        if (blockIfZoomed(e, '▶️ Autoplay Blocked', 'Zoom out to use autoplay feature')) {
            return false;
        }
    }

    // ==================== ATTACH BLOCK HANDLERS ====================
    function attachBlockHandlers() {

        // ===== TABLE OF CONTENTS =====
        ['iconTOC', 'navToggle', 'mobileTocBtn'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('click', blockTOC, true);
                el.addEventListener('touchstart', blockTOC, true);
            }
        });

        // ===== BOTTOM THUMBNAIL DOTS =====
        document.querySelectorAll('.thumb-dot').forEach(dot => {
            dot.addEventListener('click', blockThumbnail, true);
            dot.addEventListener('touchstart', blockThumbnail, true);
        });

        // ===== TOC LIST LINKS (tb-link) =====
        document.querySelectorAll('.tb-link').forEach(link => {
            link.addEventListener('click', blockThumbnail, true);
            link.addEventListener('touchstart', blockThumbnail, true);
        });

        // ===== THUMBNAIL TOGGLE (navToggle1) =====
        const navToggle1 = document.getElementById('navToggle1');
        if (navToggle1) {
            navToggle1.addEventListener('click', blockThumbnail, true);
            navToggle1.addEventListener('touchstart', blockThumbnail, true);
        }

        // ===== SEARCH ICONS =====
        ['iconText', 'searchIconDesktop'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('click', blockSearch, true);
                el.addEventListener('touchstart', blockSearch, true);
            }
        });

        document.querySelectorAll('img[alt="search-icon"]').forEach(el => {
            el.addEventListener('click', blockSearch, true);
            el.addEventListener('touchstart', blockSearch, true);
        });

        // ===== PAGE NAVIGATION BUTTONS =====
        ['iconNextPage', 'iconPrevPage', 'iconFrontPage', 'iconSkipForward'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('click', blockPageNav, true);
                el.addEventListener('touchstart', blockPageNav, true);
            }
        });

        // ===== ARROW CONTROLS =====
        document.querySelectorAll('.ui-arrow-next-page, .ui-arrow-previous-page, .next-arrow, .prev-arrow').forEach(el => {
            el.addEventListener('click', blockFlip, true);
            el.addEventListener('touchstart', blockFlip, true);
        });

        // ===== AUTOPLAY BUTTON - NEW! =====
        const autoplayBtn = document.getElementById('iconAutoplay');
        if (autoplayBtn) {
            autoplayBtn.addEventListener('click', blockAutoplay, true);
            autoplayBtn.addEventListener('touchstart', blockAutoplay, true);
        }

        // ===== FLIPBOOK DIRECT CLICKS (for page corners) =====
        if (flipbookContainer) {
            ['mousedown', 'touchstart'].forEach(eventType => {
                flipbookContainer.addEventListener(eventType, function (e) {
                    if (isZoomed) {
                        const isCornerClick = e.target.closest('.page') ||
                            e.target.closest('.p') ||
                            e.target.closest('.even') ||
                            e.target.closest('.odd');
                        if (isCornerClick) {
                            blockFlip(e);
                        }
                    }
                }, true);
            });
        }

        // ===== TURN.JS EVENTS =====
        if (typeof $ !== 'undefined' && $('#flipbook').turn) {
            $('#flipbook').bind('start', function (e, pageObject, corner) {
                if (isZoomed && corner) {
                    e.preventDefault();
                    showZoomAlert('📖 Page Flip Blocked', 'Zoom out to flip pages');
                    return false;
                }
            });

            $('#flipbook').bind('turning', function (e, page, view) {
                if (isZoomed) {
                    e.preventDefault();
                    return false;
                }
            });
        }

        // ===== MOBILE TOC ITEMS =====
        document.querySelectorAll('.mobile-toc-item').forEach(item => {
            item.addEventListener('click', blockThumbnail, true);
            item.addEventListener('touchstart', blockThumbnail, true);
        });

        
    }

    // ==================== ZOOM BUTTON HANDLERS ====================
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (currentZoom < 150) {
                applyZoom(currentZoom + 10);
            }
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (currentZoom > 100) {
                applyZoom(currentZoom - 10);
            }
        });
    }

    if (zoomSlider) {
        zoomSlider.addEventListener('input', function (e) {
            applyZoom(parseInt(e.target.value, 10));
        });
    }

    // ==================== KEYBOARD SHORTCUTS ====================
    document.addEventListener('keydown', function (e) {
        // Ctrl/Cmd + Plus/Minus for zoom
        if (e.ctrlKey || e.metaKey) {
            if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                applyZoom(Math.min(150, currentZoom + 10));
            } else if (e.key === '-') {
                e.preventDefault();
                applyZoom(Math.max(100, currentZoom - 10));
            } else if (e.key === '0') {
                e.preventDefault();
                applyZoom(100);
            }
        }

        // ESC to reset zoom
        if (e.key === 'Escape' && isZoomed) {
            applyZoom(100);
            hideZoomAlert();
        }
    });

    // ==================== MOUSE WHEEL ZOOM ====================
    let wheelTimeout;
    document.addEventListener('wheel', function (e) {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            clearTimeout(wheelTimeout);

            const delta = e.deltaY > 0 ? -10 : 10;
            const newZoom = Math.max(100, Math.min(150, currentZoom + delta));

            wheelTimeout = setTimeout(() => {
                applyZoom(newZoom);
            }, 10);
        }
    }, { passive: false });

    // ==================== INITIALIZE ====================
    function init() {
        createZoomAlertElements();
        attachBlockHandlers();
        applyZoom(100);
     
    }

    // Wait for DOM and flipbook
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setTimeout(init, 500);
        });
    } else {
        setTimeout(init, 500);
    }

    // Expose functions globally
    window.applyZoom = applyZoom;
    window.isZoomed = () => isZoomed;
    window.showZoomAlert = showZoomAlert;
    window.hideZoomAlert = hideZoomAlert;

})();

/* ========================================
   TOP ICON NAVIGATION FUNCTIONALITY
   ======================================== */
document.addEventListener('DOMContentLoaded', function () {

    // Get all icon buttons
    const iconTOC = document.getElementById('iconTOC');
    const iconZoomOut = document.getElementById('iconZoomOut');
    const iconZoomIn = document.getElementById('iconZoomIn');
    const iconAudio = document.getElementById('iconAudio');
    const iconPrevPage = document.getElementById('iconPrevPage');
    const iconNextPage = document.getElementById('iconNextPage');
    const iconSkipForward = document.getElementById('iconSkipForward');
    const iconFrontPage = document.getElementById('iconFrontPage');
    const iconRotate = document.getElementById('iconRotate');
    const iconText = document.getElementById('iconText');
    const iconFullscreen = document.getElementById('iconFullscreen');

    // ========== TABLE OF CONTENTS ==========
    if (iconTOC && navToggle) {
        iconTOC.addEventListener('click', function (e) {
            e.stopPropagation();
            navToggle.click(); // Trigger existing TOC
        });
    }

    // ========== ZOOM OUT ==========
    if (iconZoomOut && zoomOutBtn) {
        iconZoomOut.addEventListener('click', function () {
            zoomOutBtn.click();
        });
    }


    // ========== ZOOM IN ==========
    if (iconZoomIn && zoomInBtn) {
        iconZoomIn.addEventListener('click', function () {
            zoomInBtn.click();
        });
    }

    // ========== AUDIO TOGGLE ==========
    if (iconAudio && typeof toggleMusic === 'function') {
        // Update icon based on music state
        function updateAudioIcon() {
            if (musicOn) {
                iconAudio.classList.add('active');
                iconAudio.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          </svg>
        `;
            } else {
                iconAudio.classList.remove('active');
                iconAudio.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        `;
            }
        }

        iconAudio.addEventListener('click', function () {
            toggleMusic();
            updateAudioIcon();
        });

        // Initial state
        updateAudioIcon();
    }

    // ========== PREVIOUS PAGE ==========
    if (iconPrevPage) {
        iconPrevPage.addEventListener('click', function () {
            if ($('#flipbook').turn) {
                $('#flipbook').turn('previous');
            }
        });
    }

    // ========== NEXT PAGE ==========
    if (iconNextPage) {
        iconNextPage.addEventListener('click', function () {
            if ($('#flipbook').turn) {
                $('#flipbook').turn('next');
            }
        });
    }

    // ========== SKIP FORWARD (Go to last page) ==========
    if (iconSkipForward) {
        iconSkipForward.addEventListener('click', function () {
            if ($('#flipbook').turn) {
                const totalPages = $('#flipbook').turn('pages');
                $('#flipbook').turn('page', totalPages);
            }
        });
    }

    // ========== front PAGE (Example: Jump to specific page) ==========
    if (iconFrontPage) {
        iconFrontPage.addEventListener('click', function () {
            const currentPage = $('#flipbook').turn('page');
            const jumpTo = 1; // Jump 2 pages forward
            const totalPages = $('#flipbook').turn('pages');

            if (jumpTo <= totalPages) {
                $('#flipbook').turn('page', jumpTo);
            }
        });
    }

    // ========== ROTATE (Example: Rotate current view) ==========
    if (iconRotate) {
        let rotationAngle = 0;
        iconRotate.addEventListener('click', function () {
            rotationAngle = (rotationAngle + 90) % 360;
            const flipbook = document.getElementById('flipbook');
            if (flipbook) {
                flipbook.style.transform = `rotate(${rotationAngle}deg)`;
                flipbook.style.transition = 'transform 0.5s ease';
            }
        });
    }

    // ========== TEXT TOOL (Example: Toggle search) ==========
    if (iconText && searchIcon) {
        iconText.addEventListener('click', function () {
            searchIcon.click(); // Trigger search modal
        });
    }

    // ========== FULLSCREEN ==========
    if (iconFullscreen) {
        iconFullscreen.addEventListener('click', function () {
            const fsBtn = document.getElementById('full-screen-btn');
            if (fsBtn) {
                fsBtn.click();
            } else {
                // Fallback: toggle fullscreen directly
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
            }
        });
    }

    // ========== UPDATE BUTTON STATES BASED ON PAGE ==========
    if ($('#flipbook').turn) {
        $('#flipbook').bind('turned', function (event, page) {
            const totalPages = $('#flipbook').turn('pages');

            // FIRST PAGE
            if (page === 1) {
                iconFrontPage?.setAttribute('disabled', true);
                iconPrevPage?.setAttribute('disabled', true);
            } else {
                iconFrontPage?.removeAttribute('disabled');
                iconPrevPage?.removeAttribute('disabled');
            }

            // LAST PAGE
            if (page === totalPages) {
                iconNextPage?.setAttribute('disabled', true);
                iconSkipForward?.setAttribute('disabled', true);
            } else {
                iconNextPage?.removeAttribute('disabled');
                iconSkipForward?.removeAttribute('disabled');
            }
        });
    }

});

$(document).ready(function () {

    const $flipbook = $('#flipbook');
    const $pageInput = $('#pageInput');
    const $totalPages = $('#totalPages');
    const $goPageBtn = $('#goPageBtn');

    // ========== FUNCTION: GO TO PAGE ==========
    function goToPage() {
        const totalPages = $flipbook.turn('pages');
        let page = parseInt($pageInput.val(), 10);

        // Validate page number
        if (!page || page < 1) {
            page = 1;
        }
        if (page > totalPages) {
            page = totalPages;
        }

        // Update input and go to page
        $pageInput.val(page);
        $flipbook.turn('page', page);
    }

    // ========== UPDATE INPUT WHEN PAGE TURNS ==========
    $flipbook.on('turned', function (event, page) {
        $pageInput.val(page);
    });

    // ========== INITIALIZE TOTAL PAGES ==========
    setTimeout(() => {
        const totalPages = $flipbook.turn('pages');

        if (!totalPages) return;

        $totalPages.text(totalPages);
        $pageInput.attr('max', totalPages);

        const currentPage = $flipbook.turn('page');
        $pageInput.val(currentPage);
    }, 300);

    // ========== GO BUTTON CLICK ==========
    $goPageBtn.on('click', function () {
        goToPage();
    });

    // ========== ENTER KEY TO GO ==========
    $pageInput.on('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            goToPage();
            $(this).blur(); // Remove focus
        }
    });

    // ========== PREVENT INVALID INPUT ==========
    $pageInput.on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

});

// ========== THUMBNAIL DRAWER SYSTEM (DESKTOP ONLY) ==========
document.addEventListener("DOMContentLoaded", function () {
    const thumbToggleBtn = document.getElementById('desktopThumbToggle');
    const thumbDrawer = document.getElementById('thumbnailDrawer');
    const closeThumbBtn = document.getElementById('closeThumbBtn');
    const thumbGrid = document.getElementById('thumbnailGrid');

    if (!thumbGrid || !thumbDrawer) return;

    // Generate thumbnails dynamically for 42 pages
    // Page 1 (Single)
    createThumbItem(1, 'page 1', '../global assets/Images/Thumbnail-Images/page-1.webp');

    // Pages 2-3, 4-5, ..., 40-41 (Double pages)
    for (let p = 2; p <= 40; p += 2) {
        let imgSrc = '../global assets/Images/Thumbnail-Images/page-4-5.webp'; // Default placeholder image
        if (p === 2) {
            imgSrc = '../global assets/Images/Thumbnail-Images/page-2-3.webp';
        } else if (p === 4) {
            imgSrc = '../global assets/Images/Thumbnail-Images/page-4-5.webp';
        }
        createThumbItem(p, `page ${p}-${p+1}`, imgSrc);
    }

    // Page 42 (Single)
    createThumbItem(42, 'page 42', '../global assets/Images/Thumbnail-Images/page-42.webp');

    function createThumbItem(pageNumber, label, imageSrc) {
        const item = document.createElement('div');
        item.className = 'thumb-grid-item';
        if (pageNumber === 1 || pageNumber === 42) {
            item.classList.add('portrait-card');
        }
        item.setAttribute('data-page', pageNumber);

        const img = document.createElement('img');
        img.className = 'thumb-grid-img';
        img.src = imageSrc;
        img.alt = label;
        // Fallback placeholder if image fails to load
        img.onerror = function() {
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="130" viewBox="0 0 100 130"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9" font-weight="600" fill="%23E67429">Page ' + pageNumber + '</text></svg>';
        };

        const labelDiv = document.createElement('div');
        labelDiv.className = 'thumb-grid-label';
        labelDiv.textContent = label;

        item.appendChild(img);
        item.appendChild(labelDiv);

        // Click event to flip book
        item.addEventListener('click', function () {
            if (window.jQuery && $('#flipbook').turn) {
                $('#flipbook').turn('page', pageNumber);
            }
            closeThumbDrawer();
        });

        thumbGrid.appendChild(item);
    }

    // Toggle Thumbnail Drawer
    if (thumbToggleBtn) {
        thumbToggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (thumbDrawer.classList.contains('show')) {
                closeThumbDrawer();
            } else {
                openThumbDrawer();
            }
        });
    }

    if (closeThumbBtn) {
        closeThumbBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            closeThumbDrawer();
        });
    }

    function openThumbDrawer() {
        // Close TOC if open
        if (typeof closeMenu === 'function') closeMenu();
        
        thumbDrawer.classList.add('show');
        document.body.classList.add('toc-active'); // Reuses backdrop logic to push arrows back
        const overlay = document.getElementById('navOverlay');
        if (overlay) overlay.classList.add('show');

        // Highlight active page item in grid
        updateActiveThumbnailItem();
    }

    function closeThumbDrawer() {
        thumbDrawer.classList.remove('show');
        // Only remove overlay if TOC is not showing
        const tocNav = document.getElementById('tocNav');
        if (!tocNav || !tocNav.classList.contains('show')) {
            document.body.classList.remove('toc-active');
            const overlay = document.getElementById('navOverlay');
            if (overlay) overlay.classList.remove('show');
        }
    }

    // Close when clicking overlay
    const overlay = document.getElementById('navOverlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeThumbDrawer();
        });
    }

    // Close when clicking outside of the drawer
    document.addEventListener('click', function(e) {
        const isDrawerVisible = thumbDrawer.classList.contains('show');
        const isClickInsideDrawer = thumbDrawer.contains(e.target);
        const isClickOnToggle = thumbToggleBtn.contains(e.target);
        if (isDrawerVisible && !isClickInsideDrawer && !isClickOnToggle) {
            closeThumbDrawer();
        }
    });

    // Close when pressing Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === "Escape" && thumbDrawer.classList.contains('show')) {
            closeThumbDrawer();
        }
    });

    // Update active item inside grid based on flipbook page
    function updateActiveThumbnailItem() {
        if (!window.jQuery || !$('#flipbook').turn) return;
        const currentPage = $('#flipbook').turn('page');
        
        document.querySelectorAll('.thumb-grid-item').forEach(item => {
            const pageVal = parseInt(item.getAttribute('data-page'));
            // If current page matches target page or target page + 1 (for double spreads)
            if (pageVal === currentPage || (pageVal > 1 && pageVal + 1 === currentPage)) {
                item.classList.add('active');
                // Scroll item into view smoothly
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Listen to flipbook turning events to update active grid item
    if (window.jQuery) {
        $('#flipbook').on('turned', function () {
            if (thumbDrawer.classList.contains('show')) {
                updateActiveThumbnailItem();
            }
        });
    }
});





