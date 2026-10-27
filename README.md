# Simge Reklam - Kurumsal Web Sitesi & Portföy (Şanlıurfa)

Modern, ultra hızlı ve tam mobil uyumlu kurumsal tanıtım ve portföy web sitesi.

---

## 🏢 Firma & İletişim Bilgileri
- **Firma Adı:** Simge Reklam (Şanlıurfa Tabela & Baskı Atölyesi)
- **Logo:** `assets/images/logo.png` (Renkli Kurumsal Simge Amblemi)
- **Adres:** Atatürk Mah., 2. Sok., No: 13, Haliliye / Şanlıurfa
- **Telefon:** +90 414 315 1787
- **WhatsApp:** [0414 315 17 87](https://wa.me/904143151787)
- **E-Posta:** info@simgereklam.com
- **Hizmet Bölgesi:** Haliliye, Karaköprü, Eyyübiye, OSB ve tüm Şanlıurfa ilçeleri

---

## 🎨 Resmi Marka Kimliği & Renk Paleti
- **Koyu Karbon Arka Planlar (Carbon Dark):** `#0b0f19`, `#111827`
- **Canlı Reklam Turuncusu (Advertising Orange):** `#ff7a00` (Hover: `#e06500`)
- **Sıcak Kehribar Sarısı (Amber Gold):** `#f59e0b`
- **Metin & Tipografi:** Kristal Beyaz (`#ffffff`), `Inter` ve `Outfit` (Google Fonts)
- **İkon Seti:** Lucide Icons (SVG tabanlı)

---

## 🚀 Öne Çıkan Özellikler

1. **Mobil Optimizasyon & Hızlı Aksiyon:**
   - Mobilde tek dokunuşla çalışan **"Hemen Ara"**, **"WhatsApp"** ve **"Teklif Al"** alt aksiyon çubuğu (Sticky bottom bar).
   - Akıcı açılır menü (Off-canvas mobile drawer).

2. **İnteraktif Proje Galerisi & Filtreleme:**
   - Kategorilere göre filtreleme (Tümü, Tabela Sistemleri, Dijital Baskı, Araç Giydirme, Işıklı Harf).
   - Fotoğraflara tıklandığında açılan tam ekran **Lightbox** modal penceresi.
   - Gerçek yüksek çözünürlüklü imalat ve atölye görselleri.

3. **Çift Fonksiyonlu Teklif Formu:**
   - Form doldurulduğunda hem sunucuya (`submit-quote.php` ve `data/quotes.json`) kayıt yapar,
   - Hem de tek tıkla **WhatsApp** üzerinden müşterinin girdiği tüm detayları (İsim, Telefon, Hizmet, Ölçüler) formatlayarak işletme numarasına mesaj olarak hazırlar.

4. **Yönetim Paneli (`yonetim.html`):**
   - Web sitesinden gelen teklif taleplerini listeleme,
   - Tek tıkla müşteriye WhatsApp'tan yanıt verme veya telefonla arama,
   - Yayındaki portföy projelerini inceleme ve yeni proje ekleme arayüzü.

5. **SEO & Yerel Arama (Local SEO) Uyumu:**
   - Şanlıurfa ve Haliliye anahtar kelimeleriyle optimize edilmiş meta etiketleri,
   - Google Haritalar entegrasyonu,
   - `LocalBusiness` JSON-LD schema yapısal veri entegrasyonu.

---

## 📂 Dosya & Dizin Yapısı

```
simgereklam/
├── index.html            # Ana web sitesi
├── yonetim.html          # Yönetim paneli ve teklif takip ekranı
├── submit-quote.php      # Teklif formu PHP kayıt ve işleyici scripti
├── README.md             # Dokümantasyon
├── assets/
│   ├── css/
│   │   └── style.css     # Özel stiller, animasyonlar ve cam efektleri
│   ├── js/
│   │   └── main.js       # Filtreleme, Lightbox, form ve WhatsApp mantığı
│   └── images/           # Yüksek çözünürlüklü proje fotoğrafları
│       ├── hero.jpg
│       ├── kutu-harf.jpg
│       ├── dijital-baski.jpg
│       ├── arac-kaplama.jpg
│       ├── totem-tabela.jpg
│       ├── folyo-vitrin.jpg
│       └── isikli-pleksi.jpg
└── data/
    ├── projects.json     # Portföy projeleri veri tabanı
    └── quotes.json       # Gelen teklif talepleri kayıt dosyası
```

---

## 🛠️ XAMPP ile Çalıştırma

1. Proje zaten `c:\xampp\htdocs\simgereklam` dizininde bulunmaktadır.
2. XAMPP Kontrol Panelinden **Apache** servisini başlatın (`Start`).
3. Tarayıcınızdan:
   - Ana site için: `http://localhost/simgereklam/`
   - Yönetim paneli için: `http://localhost/simgereklam/yonetim.html`
   adreslerine gidebilirsiniz.
