/**
 * Simge Reklam - Core Interactive JavaScript & Media Gallery Engine
 * Haliliye / Şanlıurfa
 * 100% Client-Side & Vercel Static Compatible (No PHP backend dependency)
 */

// Centralized Configuration
const SIMGE_CONFIG = {
  // Mobile WhatsApp Line (+90 507 379 02 72)
  whatsappPhone: '905073790272',
  // Office Landline Line (+90 414 315 1787)
  landlinePhone: '904143151787',
  displayPhone: '+90 507 379 02 72'
};

// Global State
let allProjects = [];
let currentFilteredProjects = [];
let currentLightboxIndex = 0;
let currentZoomLevel = 1;

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initYear();
  initQuoteForm();
  initWhatsAppQuote();
  initProjectsAndGallery();
  initCookieConsent();
});

// Mobile Navigation Drawer Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('mobileMenuClose');
  const mobileMenu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('mobileMenuBackdrop');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    if (backdrop) {
      backdrop.classList.remove('hidden');
      setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
    }
    document.body.classList.add('overflow-hidden');
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    if (backdrop) {
      backdrop.classList.add('opacity-0');
      setTimeout(() => backdrop.classList.add('hidden'), 300);
    }
    document.body.classList.remove('overflow-hidden');
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Year in footer
function initYear() {
  const yearEls = [document.getElementById('currentYear'), document.getElementById('galleryYear')];
  const year = new Date().getFullYear();
  yearEls.forEach(el => {
    if (el) el.textContent = year;
  });
}

// Load and initialize Projects & Gallery Engine
async function initProjectsAndGallery() {
  try {
    const res = await fetch('data/projects.json?' + Date.now());
    if (!res.ok) throw new Error('Projects file not found');
    allProjects = await res.json();
    currentFilteredProjects = [...allProjects];

    // Update counts if on projelerimiz.html
    const imgCountEl = document.getElementById('statImageCount');
    const vidCountEl = document.getElementById('statVideoCount');
    if (imgCountEl) {
      const imgCount = allProjects.filter(p => p.type === 'image').length;
      imgCountEl.textContent = imgCount;
    }
    if (vidCountEl) {
      const vidCount = allProjects.filter(p => p.type === 'video').length;
      vidCountEl.textContent = vidCount;
    }

    // Render on Index (Homepage featured)
    const homeContainer = document.getElementById('galleryContainer');
    if (homeContainer) {
      renderHomepageGallery(homeContainer);
      initHomepageFilters();
    }

    // Render on Dedicated Gallery Page (projelerimiz.html)
    const fullContainer = document.getElementById('fullGalleryGrid');
    if (fullContainer) {
      renderFullGallery(fullContainer, allProjects);
      initFullGalleryControls(fullContainer);
    }

    // Init unified Lightbox listeners
    initLightboxControls();

    // Re-initialize Lucide Icons for dynamic content
    if (window.lucide) {
      lucide.createIcons();
    }
  } catch (err) {
    console.warn('Projects load notice:', err);
  }
}

// Generate HTML card respecting CRITICAL IMAGE RENDERING RULE (object-contain, true uncropped aspect ratio)
function createProjectCardHTML(project, index) {
  const isVideo = project.type === 'video';
  const tagColor = isVideo 
    ? 'bg-brand-orange text-white' 
    : (project.category === 'tabela' ? 'bg-amber-500/20 text-brand-gold border border-brand-gold/30' 
    : (project.category === 'baski' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
    : (project.category === 'arac' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30')));

  return `
    <div class="gallery-card bg-brand-surface rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between group shadow-lg h-full" data-id="${project.id}" data-category="${project.category}">
      
      <!-- Uncropped Media Stage with object-contain -->
      <div class="gallery-stage cursor-pointer relative" onclick="openLightboxMedia(${project.id})">
        
        ${isVideo ? `
          <div class="relative w-full h-full flex items-center justify-center">
            <img src="${project.image}" alt="${project.title} - Simge Reklam Şanlıurfa" loading="lazy" decoding="async" class="max-h-full max-w-full object-contain filter drop-shadow">
            <!-- Glowing Play Button Overlay -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="w-9 h-9 sm:w-13 sm:h-13 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-xl video-pulse-icon group-hover:scale-110 transition-transform">
                <svg class="w-4 h-4 sm:w-6 sm:h-6 ml-0.5 fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </div>
        ` : `
          <img src="${project.image}" alt="${project.title} - Simge Reklam Şanlıurfa" loading="lazy" decoding="async" class="max-h-full max-w-full object-contain filter drop-shadow">
        `}

        <!-- Aspect Ratio / Media Type Badge -->
        <div class="absolute top-2 left-2 z-10 flex items-center gap-1">
          ${isVideo ? `
            <span class="px-2 py-0.5 rounded-md sm:rounded-lg bg-brand-orange text-white text-[9px] sm:text-[11px] font-bold flex items-center gap-1 shadow-md">
              <svg class="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <span>Video</span>
            </span>
          ` : `
            <span class="px-1.5 py-0.5 rounded-md sm:rounded-lg bg-black/80 backdrop-blur-sm text-slate-300 border border-slate-700 text-[8px] sm:text-[10px] font-semibold">
              Orijinal
            </span>
          `}
        </div>

        <!-- Hover Overlay Bar -->
        <div class="absolute inset-x-0 bottom-0 p-2 sm:p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
          <span class="text-white text-[10px] sm:text-xs font-bold flex items-center gap-1">
            <svg class="w-3 h-3 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
            <span class="hidden sm:inline">${isVideo ? 'Videoyu Tam Ekran İzle' : 'Büyük Fotoğrafı İncele'}</span>
            <span class="sm:hidden">Büyüt</span>
          </span>
          <span class="text-[9px] sm:text-[11px] text-brand-orange font-bold">Simge</span>
        </div>

      </div>

      <!-- Card Information -->
      <div class="p-3 sm:p-5 flex-1 flex flex-col justify-between bg-brand-surface border-t border-slate-800/80">
        <div>
          <div class="flex items-center justify-between gap-1 mb-1 sm:mb-2">
            <span class="text-[9px] sm:text-[10px] uppercase font-bold text-brand-orange tracking-wider truncate">
              ${project.categoryName}
            </span>
            <span class="px-1.5 py-0.5 rounded text-[8px] sm:text-[10px] font-bold ${tagColor} flex-shrink-0">
              ${project.tag}
            </span>
          </div>
          
          <h3 class="text-xs sm:text-base font-bold text-white font-display leading-tight line-clamp-1 sm:line-clamp-2 group-hover:text-brand-orange transition-colors">
            ${project.title}
          </h3>
          
          <p class="text-[10px] sm:text-xs text-slate-400 flex items-center gap-1 mt-0.5 sm:mt-1 truncate">
            <svg class="w-3 h-3 text-brand-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span class="truncate">${project.location}</span>
          </p>

          <p class="text-[10px] sm:text-xs text-slate-300 mt-1 sm:mt-2.5 line-clamp-1 sm:line-clamp-2 leading-relaxed">
            ${project.description}
          </p>
        </div>

        <!-- Action Row -->
        <div class="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-800 flex items-center justify-between">
          <button type="button" onclick="openLightboxMedia(${project.id})" class="inline-flex items-center space-x-1 text-[11px] sm:text-xs font-semibold text-brand-orange hover:text-white transition-colors">
            <span>${isVideo ? 'İzle' : 'İncele'}</span>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
          
          <a href="https://wa.me/905073790272?text=Merhaba,%20web%20sitenizdeki%20%22${encodeURIComponent(project.title)}%22%20projesi%20i%C3%A7in%20fiyat%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" class="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors" title="WhatsApp'tan Bu Model İçin Fiyat Al">
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          </a>
        </div>
      </div>

    </div>
  `;
}

// Render Homepage Gallery (First 6-8 featured projects, including videos)
function renderHomepageGallery(container) {
  // Select featured ones or top 8
  const featured = allProjects.filter(p => p.featured);
  const displayItems = featured.length >= 6 ? featured.slice(0, 8) : allProjects.slice(0, 8);

  container.innerHTML = displayItems.map((p, idx) => createProjectCardHTML(p, idx)).join('');
}

// Homepage Filter Tab Logic
function initHomepageFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const homeContainer = document.getElementById('galleryContainer');
  if (!homeContainer || !filterButtons.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active', 'bg-brand-orange', 'text-white', 'border-brand-orange');
        b.classList.add('bg-slate-900', 'text-slate-300', 'border-slate-700');
      });
      btn.classList.add('active', 'bg-brand-orange', 'text-white', 'border-brand-orange');
      btn.classList.remove('bg-slate-900', 'text-slate-300', 'border-slate-700');

      const category = btn.getAttribute('data-filter');
      let filtered = [];

      if (category === 'all') {
        const featured = allProjects.filter(p => p.featured);
        filtered = featured.length >= 6 ? featured.slice(0, 8) : allProjects.slice(0, 8);
      } else {
        filtered = allProjects.filter(p => p.category === category);
      }

      currentFilteredProjects = filtered;
      homeContainer.innerHTML = filtered.map((p, idx) => createProjectCardHTML(p, idx)).join('');

      if (window.lucide) lucide.createIcons();
    });
  });
}

// Render Full Gallery (projelerimiz.html)
function renderFullGallery(container, items) {
  const noResults = document.getElementById('noResults');
  if (items.length === 0) {
    container.innerHTML = '';
    if (noResults) noResults.classList.remove('hidden');
    return;
  }

  if (noResults) noResults.classList.add('hidden');
  container.innerHTML = items.map((p, idx) => createProjectCardHTML(p, idx)).join('');
  if (window.lucide) lucide.createIcons();
}

// Filter and Search System on Dedicated Page
function initFullGalleryControls(container) {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const searchInput = document.getElementById('projectSearch');
  const resetBtn = document.getElementById('resetFiltersBtn');

  let activeCategory = 'all';
  let searchTerm = '';

  function applyFilters() {
    let filtered = allProjects;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    currentFilteredProjects = filtered;
    renderFullGallery(container, filtered);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-brand-orange', 'text-white', 'border-brand-orange');
        b.classList.add('bg-slate-900', 'text-slate-300', 'border-slate-700');
      });
      btn.classList.add('active', 'bg-brand-orange', 'text-white', 'border-brand-orange');
      btn.classList.remove('bg-slate-900', 'text-slate-300', 'border-slate-700');

      activeCategory = btn.getAttribute('data-filter');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      applyFilters();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeCategory = 'all';
      searchTerm = '';
      if (searchInput) searchInput.value = '';
      filterBtns.forEach((b, i) => {
        if (i === 0) {
          b.classList.add('active', 'bg-brand-orange', 'text-white', 'border-brand-orange');
          b.classList.remove('bg-slate-900', 'text-slate-300', 'border-slate-700');
        } else {
          b.classList.remove('active', 'bg-brand-orange', 'text-white', 'border-brand-orange');
          b.classList.add('bg-slate-900', 'text-slate-300', 'border-slate-700');
        }
      });
      applyFilters();
    });
  }
}

// ==========================================================================
// UNIFIED HIGH-RESOLUTION LIGHTBOX MODAL WITH ZOOM & VIDEO SUPPORT
// ==========================================================================
window.openLightboxMedia = function(projectId) {
  // Find project in allProjects or currentFiltered
  const project = allProjects.find(p => p.id === projectId);
  if (!project) return;

  // Determine index in current active array
  const activeList = currentFilteredProjects.length ? currentFilteredProjects : allProjects;
  const idx = activeList.findIndex(p => p.id === projectId);
  currentLightboxIndex = idx >= 0 ? idx : 0;

  displayLightboxItem(activeList[currentLightboxIndex]);
};

function displayLightboxItem(project) {
  if (!project) return;

  // Check which modal is in DOM
  const advancedModal = document.getElementById('advancedLightboxModal');
  const simpleModal = document.getElementById('lightboxModal');
  const modal = advancedModal || simpleModal;
  if (!modal) return;

  const isAdvanced = !!advancedModal;

  if (isAdvanced) {
    // Advanced Lightbox on projelerimiz.html
    const imgEl = document.getElementById('lightboxMainImage');
    const vidEl = document.getElementById('lightboxMainVideo');
    const counterEl = document.getElementById('lightboxCounter');
    const badgeEl = document.getElementById('lightboxBadge');
    const titleEl = document.getElementById('captionTitle');
    const descEl = document.getElementById('captionDesc');
    const locEl = document.getElementById('captionLocation');
    const catEl = document.getElementById('captionCategory');
    const waLink = document.getElementById('captionWaLink');

    const total = currentFilteredProjects.length || allProjects.length;
    if (counterEl) counterEl.textContent = `${currentLightboxIndex + 1} / ${total}`;
    if (badgeEl) badgeEl.textContent = project.tag || project.categoryName;
    if (titleEl) titleEl.textContent = project.title;
    if (descEl) descEl.textContent = project.description;
    if (locEl) locEl.innerHTML = `<svg class="w-3.5 h-3.5 text-brand-gold mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg> <span>${project.location}</span>`;
    if (catEl) catEl.textContent = project.categoryName;
    if (waLink) {
      waLink.href = `https://wa.me/905073790272?text=Merhaba%20Simge%20Reklam,%20web%20sitenizdeki%20%22${encodeURIComponent(project.title)}%22%20(${encodeURIComponent(project.location)})%20projesi%20i%C3%A7in%20fiyat%20ve%20ke%C5%9Fif%20talep%20ediyorum.`;
    }

    currentZoomLevel = 1;
    applyZoom();

    if (project.type === 'video') {
      imgEl.classList.add('hidden');
      imgEl.removeAttribute('src');
      vidEl.classList.remove('hidden');
      vidEl.src = project.videoUrl;
      vidEl.currentTime = 0;
      vidEl.play().catch(() => {});
    } else {
      vidEl.pause();
      vidEl.removeAttribute('src');
      vidEl.load();
      vidEl.classList.add('hidden');
      imgEl.classList.remove('hidden');
      imgEl.src = project.image;
    }
  } else {
    // Simple Modal on index.html
    const imgEl = document.getElementById('lightboxImage');
    const titleEl = document.getElementById('lightboxTitle');
    const descEl = document.getElementById('lightboxDesc');
    const content = document.getElementById('lightboxContent');

    if (imgEl && titleEl && descEl) {
      titleEl.textContent = project.title;
      descEl.textContent = `${project.location} • ${project.description}`;

      // Check if project is video
      let existingVid = document.getElementById('lightboxDynamicVideo');
      if (project.type === 'video') {
        imgEl.classList.add('hidden');
        if (!existingVid) {
          existingVid = document.createElement('video');
          existingVid.id = 'lightboxDynamicVideo';
          existingVid.controls = true;
          existingVid.autoplay = true;
          existingVid.playsInline = true;
          existingVid.preload = 'none';
          existingVid.className = 'max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl bg-black border border-slate-700';
          imgEl.parentNode.insertBefore(existingVid, imgEl);
        }
        existingVid.classList.remove('hidden');
        existingVid.src = project.videoUrl;
        existingVid.play().catch(() => {});
      } else {
        if (existingVid) {
          existingVid.pause();
          existingVid.removeAttribute('src');
          existingVid.load();
          existingVid.classList.add('hidden');
        }
        imgEl.classList.remove('hidden');
        imgEl.src = project.image;
      }
    }
  }

  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.add('show', 'opacity-100');
    modal.classList.remove('opacity-0');
  }, 10);
  document.body.classList.add('overflow-hidden');
}

function closeLightbox() {
  const advancedModal = document.getElementById('advancedLightboxModal');
  const simpleModal = document.getElementById('lightboxModal');
  const modal = advancedModal || simpleModal;
  if (!modal) return;

  // Pause and reset videos to immediately release network streaming sockets
  const advVid = document.getElementById('lightboxMainVideo');
  if (advVid) {
    advVid.pause();
    advVid.removeAttribute('src');
    advVid.load();
  }
  const simpVid = document.getElementById('lightboxDynamicVideo');
  if (simpVid) {
    simpVid.pause();
    simpVid.removeAttribute('src');
    simpVid.load();
  }

  modal.classList.add('opacity-0');
  modal.classList.remove('opacity-100', 'show');
  setTimeout(() => {
    modal.classList.add('hidden');
    currentZoomLevel = 1;
    applyZoom();
  }, 250);
  document.body.classList.remove('overflow-hidden');
}

function applyZoom() {
  const imgEl = document.getElementById('lightboxMainImage') || document.getElementById('lightboxImage');
  const resetBtn = document.getElementById('zoomResetBtn');
  if (imgEl) {
    imgEl.style.transform = `scale(${currentZoomLevel})`;
  }
  if (resetBtn) {
    resetBtn.textContent = `${Math.round(currentZoomLevel * 100)}%`;
  }
}

function zoomIn() {
  if (currentZoomLevel < 3.0) {
    currentZoomLevel = Math.min(3.0, currentZoomLevel + 0.25);
    applyZoom();
  }
}

function zoomOut() {
  if (currentZoomLevel > 0.5) {
    currentZoomLevel = Math.max(0.5, currentZoomLevel - 0.25);
    applyZoom();
  }
}

function zoomReset() {
  currentZoomLevel = 1.0;
  applyZoom();
}

function navigateLightbox(direction) {
  const activeList = currentFilteredProjects.length ? currentFilteredProjects : allProjects;
  if (!activeList.length) return;

  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) {
    currentLightboxIndex = activeList.length - 1;
  } else if (currentLightboxIndex >= activeList.length) {
    currentLightboxIndex = 0;
  }

  displayLightboxItem(activeList[currentLightboxIndex]);
}

function initLightboxControls() {
  // Close buttons
  const closeBtns = [
    document.getElementById('advancedLightboxClose'),
    document.getElementById('lightboxClose')
  ];
  closeBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', closeLightbox);
  });

  // Zoom controls
  const inBtn = document.getElementById('zoomInBtn');
  const outBtn = document.getElementById('zoomOutBtn');
  const resetBtn = document.getElementById('zoomResetBtn');
  if (inBtn) inBtn.addEventListener('click', zoomIn);
  if (outBtn) outBtn.addEventListener('click', zoomOut);
  if (resetBtn) resetBtn.addEventListener('click', zoomReset);

  // Next / Prev buttons
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');
  if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));

  // Double click image to toggle zoom
  const mainImg = document.getElementById('lightboxMainImage');
  if (mainImg) {
    mainImg.addEventListener('dblclick', () => {
      currentZoomLevel = currentZoomLevel === 1 ? 2.0 : 1.0;
      applyZoom();
    });
  }

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('advancedLightboxModal') || document.getElementById('lightboxModal');
    if (!modal || modal.classList.contains('hidden')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === '+' || e.key === '=') zoomIn();
    if (e.key === '-' || e.key === '_') zoomOut();
    if (e.key === '0') zoomReset();
  });

  // Click background to close (unless clicking controls or image)
  const viewports = [
    document.getElementById('lightboxViewport'),
    document.getElementById('lightboxModal')
  ];
  viewports.forEach(vp => {
    if (vp) {
      vp.addEventListener('click', (e) => {
        if (e.target === vp) closeLightbox();
      });
    }
  });
}

// Quote Form Submission (100% Client-Side & Vercel Static Compatible)
function buildAndSendWhatsAppQuote(form) {
  const name = document.getElementById('quoteName')?.value.trim() || '';
  const phone = document.getElementById('quotePhone')?.value.trim() || '';
  const service = document.getElementById('quoteService')?.value || 'Genel Tabela / Reklam';
  const dimensions = document.getElementById('quoteDimensions')?.value.trim() || '';
  const note = document.getElementById('quoteNotes')?.value.trim() || '';

  if (!name || !phone) {
    showToast('Lütfen adınızı ve telefon numaranızı girin.', 'error');
    return;
  }

  // Build clean formatted WhatsApp message
  let text = `*Yeni Fiyat Teklifi Talebi - Simge Reklam*\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `👤 *Müşteri / Firma:* ${name}\n`;
  text += `📞 *Telefon:* ${phone}\n`;
  text += `🛠️ *İstenen Hizmet:* ${service}\n`;
  if (dimensions) text += `📐 *Tahmini Ölçüler:* ${dimensions}\n`;
  if (note) text += `📝 *Proje Notları:* ${note}\n`;
  text += `📍 *Konum:* Haliliye / Şanlıurfa\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Web sitesi üzerinden iletildi.`;

  const encoded = encodeURIComponent(text);

  // Store in localStorage for client-side persistence
  try {
    const existingQuotes = JSON.parse(localStorage.getItem('simge_local_quotes') || '[]');
    existingQuotes.unshift({
      id: 'quote_' + Date.now(),
      name,
      phone,
      service,
      dimensions,
      notes: note,
      date: new Date().toLocaleString('tr-TR')
    });
    localStorage.setItem('simge_local_quotes', JSON.stringify(existingQuotes.slice(0, 50)));
  } catch (e) {}

  showToast('Teklif talebiniz hazırlandı! WhatsApp üzerinden detaylarınızı iletiyoruz...', 'success');

  // Open WhatsApp directly
  const waUrl = `https://wa.me/${SIMGE_CONFIG.whatsappPhone}?text=${encoded}`;
  window.open(waUrl, '_blank');

  if (form) form.reset();
}

function initQuoteForm() {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    buildAndSendWhatsAppQuote(form);
  });
}

// WhatsApp Quote Builder Button
function initWhatsAppQuote() {
  const waBtn = document.getElementById('sendWhatsAppQuote');
  if (!waBtn) return;

  waBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.getElementById('quoteForm');
    buildAndSendWhatsAppQuote(form);
  });
}

// Toast notification
function showToast(message, type = 'success') {
  let toast = document.getElementById('formToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'formToast';
    document.body.appendChild(toast);
  }

  toast.className = `fixed bottom-20 right-5 z-50 max-w-md p-4 rounded-2xl shadow-2xl text-white transform transition-all duration-300 ${
    type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
  }`;
  toast.innerHTML = `
    <div class="flex items-center space-x-3">
      <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p class="text-xs sm:text-sm font-semibold">${message}</p>
    </div>
  `;

  setTimeout(() => toast.classList.remove('translate-y-10', 'opacity-0'), 10);
  setTimeout(() => toast.classList.add('translate-y-10', 'opacity-0'), 5000);
}

// ==========================================
// Legal Compliance Modal & Cookie Management
// ==========================================
const LEGAL_DATA = {
  gizlilik: {
    title: 'Gizlilik Politikası',
    badge: 'Veri Güvenliği',
    html: `
      <div class="space-y-4">
        <div>
          <h4 class="text-white font-bold text-sm mb-1">1. Bilgi Güvenliği ve Gizlilik İlkemiz</h4>
          <p class="text-slate-300 text-xs leading-relaxed">
            Simge Reklam (Haliliye / Şanlıurfa) olarak ziyaretçilerimizin kişisel bilgilerinin güvenliğine en üst düzeyde önem veriyoruz. Web sitemizdeki iletişim ve teklif alma formları vasıtasıyla iletilen ad, soyad, telefon numarası ve proje detayları yalnızca talebinize istinaden fiyat teklifi oluşturulması ve reklam montaj süreçlerinin planlanması amacıyla kullanılır.
          </p>
        </div>
        <div>
          <h4 class="text-white font-bold text-sm mb-1">2. Bilgilerin Korunması ve Üçüncü Şahıslar</h4>
          <p class="text-slate-300 text-xs leading-relaxed">
            Toplanan müşteri ve proje bilgileri hiçbir surette üçüncü şahıslara, aracı ajanslara veya ticari pazarlama platformlarına satılmaz, kiralanmaz ya da paylaşılmaz. Tüm veriler şifreli ve güvenli altyapılarda muhafaza edilir.
          </p>
        </div>
        <div>
          <h4 class="text-white font-bold text-sm mb-1">3. İletişim & Haklarınız</h4>
          <p class="text-slate-300 text-xs leading-relaxed">
            Kişisel verilerinizin silinmesi, düzeltilmesi veya güncellenmesi talepleriniz için dilediğiniz zaman <strong>info@simgereklam.com</strong> veya <strong>+90 414 315 17 87</strong> / <strong>+90 507 379 02 72</strong> üzerinden Simge Reklam veri sorumlusuna başvurabilirsiniz.
          </p>
        </div>
      </div>
    `
  },
  cerez: {
    title: 'Çerez (Cookie) Politikası',
    badge: 'Şeffaf Kullanım',
    html: `
      <div class="space-y-4">
        <div>
          <h4 class="text-white font-bold text-sm mb-1">1. Çerez Nedir?</h4>
          <p class="text-slate-300 text-xs leading-relaxed">
            Çerezler, sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza yerleştirilen hafif metin dosyalarıdır. Sitemizin hızlı yüklenmesi, ekran çözünürlüğünüze uygun ızgara sisteminin ayarlanması ve kullanıcı deneyiminin iyileştirilmesi için zorunlu ve işlevsel çerezler kullanılmaktadır.
          </p>
        </div>
        <div>
          <h4 class="text-white font-bold text-sm mb-1">2. Hangi Çerezleri Kullanıyoruz?</h4>
          <p class="text-slate-300 text-xs leading-relaxed">
            <strong>Zorunlu Çerezler:</strong> Web sitesinin temel fonksiyonlarının ve güvenlik protokollerinin çalışmasını sağlar.<br>
            <strong>İşlevsel Çerezler:</strong> Ziyaretçinin çerez onay durumunu (localStorage) ve galeri filtre tercihlerini hatırlar.
          </p>
        </div>
        <div>
          <h4 class="text-white font-bold text-sm mb-1">3. Çerezleri Nasıl Kapatabilirsiniz?</h4>
          <p class="text-slate-300 text-xs leading-relaxed">
            Tarayıcınızın (Chrome, Safari, Firefox, Edge) ayarlar kısmından çerezleri dilediğiniz zaman silebilir veya yeni çerez kabulünü engelleyebilirsiniz.
          </p>
        </div>
      </div>
    `
  },
  sartlar: {
    title: 'Kullanım Şartları',
    badge: 'Hukuki Şartlar',
    html: `
      <div class="space-y-4">
        <div>
          <h4 class="text-white font-bold text-sm mb-1">1. Web Sitesi Kullanımı ve Teklifler</h4>
          <p class="text-slate-300 text-xs leading-relaxed">
            Simge Reklam web sitesinde sunulan ürün ölçüleri, malzeme detayları ve görseller bilgilendirme amaçlıdır. Web sitemiz veya WhatsApp hattımız üzerinden iletilen tahmini fiyat teklifleri, yerinde keşif ve kesin ölçümlendirme sonrası nihai iş sözleşmesine bağlanır.
          </p>
        </div>
        <div>
          <h4 class="text-white font-bold text-sm mb-1">2. Fikri Mülkiyet & Telif Hakları</h4>
          <p class="text-slate-300 text-xs leading-relaxed">
            Sitede sergilenen tüm tabela montaj fotoğrafları, atölye imalat videoları, 3D çizimler ve Simge Reklam tescilli logosu şirketimize aittir. Yazılı izin alınmaksızın kopyalanması, başka mecralarda ticari amaçla kullanımı yasaktır.
          </p>
        </div>
        <div>
          <h4 class="text-white font-bold text-sm mb-1">3. İmalat ve Montaj Güvencesi</h4>
          <p class="text-slate-300 text-xs leading-relaxed">
            Tüm 3D kutu harf tabelalar, paslanmaz krom harfler ve UV dijital baskı uygulamalarımız Şanlıurfa iklim koşullarına uygun, solmaya ve su geçirmezliğe karşı garantili olarak üretilmektedir.
          </p>
        </div>
      </div>
    `
  },
  kvkk: {
    title: 'KVKK Aydınlatma Metni',
    badge: '6698 Sayılı Kanun',
    html: `
      <div class="space-y-4">
        <div>
          <h4 class="text-white font-bold text-sm mb-1">6698 Sayılı Kanun Kapsamında Veri Sorumlusu</h4>
          <p class="text-slate-300 text-xs leading-relaxed">
            Simge Reklam (Atatürk Mah., 2. Sok., No: 13, Haliliye / Şanlıurfa), 6698 Sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca Veri Sorumlusu sıfatıyla hareket etmektedir.
          </p>
        </div>
        <div>
          <h4 class="text-white font-bold text-sm mb-1">Veri İşleme Amaçları</h4>
          <p class="text-slate-300 text-xs leading-relaxed">
            Kişisel verileriniz; tabela ve reklam tasarım taleplerinizin alınması, yerinde ücretsiz keşif randevularının oluşturulması, teklif hazırlanması, montaj ve faturalandırma süreçlerinin yürütülmesi amaçlarıyla işlenmektedir.
          </p>
        </div>
        <div>
          <h4 class="text-white font-bold text-sm mb-1">Kanuni Haklarınız</h4>
          <p class="text-slate-300 text-xs leading-relaxed">
            KVKK'nın 11. maddesi kapsamında; verilerinizin işlenip işlenmediğini öğrenme, yanlış ise düzeltilmesini talep etme ve kanuni şartlar çerçevesinde silinmesini isteme hakkına sahipsiniz. Başvurularınızı yazılı olarak Haliliye'deki atölye adresimize veya <strong>info@simgereklam.com</strong> e-posta adresimize iletebilirsiniz.
          </p>
        </div>
      </div>
    `
  }
};

function openLegalModal(tab = 'gizlilik') {
  const modal = document.getElementById('legalModal');
  if (!modal) return;
  switchLegalTab(tab);
  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    if (window.lucide) lucide.createIcons();
  }, 10);
  document.body.style.overflow = 'hidden';
}

function closeLegalModal() {
  const modal = document.getElementById('legalModal');
  if (!modal) return;
  modal.classList.add('opacity-0');
  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

function switchLegalTab(tabKey) {
  const data = LEGAL_DATA[tabKey] || LEGAL_DATA.gizlilik;
  const titleEl = document.getElementById('legalModalTitle');
  const contentEl = document.getElementById('legalModalContent');
  if (titleEl) titleEl.textContent = data.title;
  if (contentEl) contentEl.innerHTML = data.html;

  // Update Tab Button Styles
  const tabButtons = document.querySelectorAll('.legal-tab-btn');
  tabButtons.forEach(btn => {
    const isTarget = btn.id === `tabBtn${tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}`;
    if (isTarget) {
      btn.className = 'legal-tab-btn px-4 py-3 text-brand-orange border-b-2 border-brand-orange whitespace-nowrap transition-colors font-bold';
    } else {
      btn.className = 'legal-tab-btn px-4 py-3 text-slate-400 hover:text-white border-b-2 border-transparent whitespace-nowrap transition-colors font-medium';
    }
  });
}

// Cookie Banner Controller
function initCookieConsent() {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  const consent = localStorage.getItem('simge_cookie_consent');
  if (!consent) {
    setTimeout(() => {
      banner.classList.remove('hidden');
      setTimeout(() => {
        banner.classList.remove('translate-y-6', 'opacity-0');
        if (window.lucide) lucide.createIcons();
      }, 50);
    }, 1500);
  }
}

function acceptCookies() {
  localStorage.setItem('simge_cookie_consent', 'accepted');
  const banner = document.getElementById('cookieBanner');
  if (banner) {
    banner.classList.add('translate-y-6', 'opacity-0');
    setTimeout(() => banner.classList.add('hidden'), 300);
  }
  showToast('Çerez tercihleriniz kaydedildi.', 'success');
}
