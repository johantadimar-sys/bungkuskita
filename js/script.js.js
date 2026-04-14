// ============ MENU POP-UP (SIDEBAR) ============
const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');

function openMenu() {
    sideMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    sideMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (menuToggle) menuToggle.addEventListener('click', openMenu);
if (menuClose) menuClose.addEventListener('click', closeMenu);
if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

// ============ NAVIGASI SECTION ============
const sections = document.querySelectorAll('.section');
const menuLinks = document.querySelectorAll('.menu-link');
const container = document.querySelector('.sections-container');

function showSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection && container) {
        const offsetTop = targetSection.offsetTop;
        container.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    closeMenu();
}

// Event listener untuk menu links
menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        if (sectionId) showSection(sectionId);
    });
});

// Scroll indicator click
const scrollIndicators = document.querySelectorAll('.scroll-indicator');
scrollIndicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        if (container) {
            const currentScroll = container.scrollTop;
            const sectionHeight = window.innerHeight;
            container.scrollTo({ top: currentScroll + sectionHeight, behavior: 'smooth' });
        }
    });
});

// ============ HANDLE URL HASH ============
function handleHash() {
    const hash = window.location.hash.substring(1);
    const validSections = ['beranda', 'tentang', 'produk', 'bahan', 'layanan', 'kontak'];
    if (hash && validSections.includes(hash)) {
        setTimeout(() => showSection(hash), 100);
    }
}

window.addEventListener('load', handleHash);
window.addEventListener('hashchange', handleHash);

// ============ DETECT SECTION CHANGE ON SCROLL ============
let isScrolling = false;
if (container) {
    container.addEventListener('scroll', () => {
        if (!isScrolling) {
            requestAnimationFrame(() => {
                const scrollPosition = container.scrollTop;
                const sectionHeight = window.innerHeight;
                const currentSectionIndex = Math.round(scrollPosition / sectionHeight);
                const currentSection = sections[currentSectionIndex];
                
                if (currentSection) {
                    const sectionId = currentSection.getAttribute('id');
                    history.replaceState(null, null, `#${sectionId}`);
                    
                    // Update active class on menu links
                    menuLinks.forEach(link => {
                        const linkSection = link.getAttribute('data-section');
                        if (linkSection === sectionId) {
                            link.style.color = '#ffb703';
                        } else {
                            link.style.color = '';
                        }
                    });
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
}

// ============ MODAL PRODUK & BAHAN ============
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalClose = document.querySelector('.modal-close');

function showModal(title, message) {
    if (modalTitle) modalTitle.innerText = title;
    if (modalMessage) modalMessage.innerText = message;
    if (modal) modal.classList.add('active');
}

function closeModal() {
    if (modal) modal.classList.remove('active');
}

if (modalClose) modalClose.addEventListener('click', closeModal);

// Klik di luar modal
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Event untuk produk items
const produkItems = document.querySelectorAll('.produk-item');
produkItems.forEach(item => {
    item.addEventListener('click', () => {
        const produkName = item.getAttribute('data-produk') || item.querySelector('span')?.innerText || 'Produk';
        showModal(produkName, `Tertarik dengan ${produkName}? Klik tombol di bawah untuk memesan via WhatsApp.`);
    });
});

// Event untuk bahan items
const bahanItems = document.querySelectorAll('.bahan-item');
bahanItems.forEach(item => {
    item.addEventListener('click', () => {
        const bahanName = item.getAttribute('data-bahan') || item.querySelector('span')?.innerText || 'Bahan';
        showModal(bahanName, `Informasi lebih lanjut tentang bahan ${bahanName}? Klik tombol di bawah untuk konsultasi.`);
    });
});

// ============ PREVENT DEFAULT SCROLL BEHAVIOR FOR ANCHOR ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#beranda' || href === '#tentang' || href === '#produk' || href === '#bahan' || href === '#layanan' || href === '#kontak') {
            e.preventDefault();
            const sectionId = href.substring(1) || 'beranda';
            showSection(sectionId);
        }
    });
});