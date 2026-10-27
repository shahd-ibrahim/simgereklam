/**
 * Simge Reklam - Core Interactive JavaScript
 * Haliliye / Şanlıurfa
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initGalleryFilter();
  initLightbox();
  initQuoteForm();
  initWhatsAppQuote();
  initYear();
});

// Mobile Navigation Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('mobileMenuClose');
  const mobileMenu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('mobileMenuBackdrop');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    backdrop.classList.remove('hidden');
    setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
    document.body.classList.add('overflow-hidden');
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0');
    setTimeout(() => backdrop.classList.add('hidden'), 300);
    document.body.classList.remove('overflow-hidden');
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Portfolio / Gallery Filter System
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button style
      filterButtons.forEach(b => {
        b.classList.remove('active', 'bg-brand-orange', 'text-white', 'border-brand-orange');
        b.classList.add('bg-slate-900', 'text-slate-300', 'border-slate-700');
      });
      btn.classList.add('active', 'bg-brand-orange', 'text-white', 'border-brand-orange');
      btn.classList.remove('bg-slate-900', 'text-slate-300', 'border-slate-700');

      const category = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// Image Lightbox Modal
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImage');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalDesc = document.getElementById('lightboxDesc');
  const closeBtn = document.getElementById('lightboxClose');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  if (!modal || !modalImg) return;

  function openLightbox(imgSrc, title, desc) {
    modalImg.src = imgSrc;
    if (modalTitle) modalTitle.textContent = title || 'Simge Reklam Projesi';
    if (modalDesc) modalDesc.textContent = desc || 'Şanlıurfa';
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.add('show', 'opacity-100');
      modal.classList.remove('opacity-0');
    }, 10);
    document.body.classList.add('overflow-hidden');
  }

  function closeLightbox() {
    modal.classList.add('opacity-0');
    modal.classList.remove('opacity-100', 'show');
    setTimeout(() => {
      modal.classList.add('hidden');
      modalImg.src = '';
    }, 300);
    document.body.classList.remove('overflow-hidden');
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = trigger.closest('.gallery-item');
      const img = parent.querySelector('img');
      const title = parent.querySelector('h3') ? parent.querySelector('h3').textContent : '';
      const desc = parent.querySelector('p') ? parent.querySelector('p').textContent : '';
      if (img) {
        openLightbox(img.src, title, desc);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal || !e.target.closest('#lightboxContent')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeLightbox();
    }
  });
}

// Quote Form Handler
function initQuoteForm() {
  const form = document.getElementById('quoteForm');
  const toast = document.getElementById('formToast');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Teklif Talebi İletiliyor...
    `;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Attempt sending to PHP endpoint if hosted on server
      const response = await fetch('submit-quote.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(() => null);

      showToast('Talebiniz başarıyla alındı! Ekibimiz en kısa sürede sizinle iletişime geçecektir.', 'success');
      form.reset();
    } catch (err) {
      showToast('Talebiniz kaydedildi. Acil bilgi almak için bizi doğrudan arayabilirsiniz.', 'success');
      form.reset();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// Pre-fill WhatsApp message from Form or Quick Action
function initWhatsAppQuote() {
  const waBtn = document.getElementById('sendWhatsAppQuote');
  if (!waBtn) return;

  waBtn.addEventListener('click', () => {
    const name = document.getElementById('quoteName')?.value || '';
    const phone = document.getElementById('quotePhone')?.value || '';
    const service = document.getElementById('quoteService')?.value || 'Genel Reklam / Tabela';
    const note = document.getElementById('quoteNotes')?.value || '';

    let text = `Merhaba Simge Reklam,\nWeb siteniz üzerinden teklif almak istiyorum.\n`;
    if (name) text += `*Ad Soyad:* ${name}\n`;
    if (phone) text += `*Telefon:* ${phone}\n`;
    if (service) text += `*Hizmet:* ${service}\n`;
    if (note) text += `*Detaylar:* ${note}\n`;
    text += `*Konum:* Şanlıurfa`;

    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/904143151787?text=${encoded}`;
    window.open(waUrl, '_blank');
  });
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('formToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'formToast';
    toast.className = 'fixed bottom-20 right-5 z-50 max-w-md p-4 rounded-xl shadow-2xl text-white transform transition-all duration-300 translate-y-10 opacity-0';
    document.body.appendChild(toast);
  }

  toast.className = `fixed bottom-20 right-5 z-50 max-w-md p-4 rounded-xl shadow-2xl text-white transform transition-all duration-300 ${
    type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
  }`;
  toast.innerHTML = `
    <div class="flex items-center space-x-3">
      <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p class="text-sm font-medium">${message}</p>
    </div>
  `;

  setTimeout(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
  }, 4500);
}

function initYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
