# Simge Reklam - Kurumsal Web Sitesi & Portföy (Şanlıurfa)

Modern, ultra hızlı ve tam mobil uyumlu kurumsal açık hava reklamcılığı, tabela ve dijital baskı web platformu.

---

## 🏢 Firma & İletişim Bilgileri
- **Firma Adı:** Simge Reklam (Şanlıurfa Tabela & Baskı Atölyesi)
- **Logo:** `assets/images/logo.png` (Renkli Kurumsal Simge Amblemi)
- **Adres:** Atatürk Mah., 2. Sok., No: 13, Haliliye / Şanlıurfa
- **Telefon:** +90 507 379 02 72
- **WhatsApp:** [0507 379 02 72](https://wa.me/905073790272)
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

## 🚀 Yeni & Gelişmiş Özellikler

1. **Özel Projelerimiz & İmalat Galerisi (`projelerimiz.html`):**
   - 30+ gerçek Şanlıurfa montaj fotoğrafı ve atölye imalat videosu (`assets/videos/`).
   - **Kritik Görüntü İşleme Kuralı (Zero Cropping):** Hiçbir görsel kırpılmaz, bozulmaz veya kesilmez. `object-contain` ve doğal en-boy oranı (aspect-ratio) sahnelemesi ile geniş cephe tabelaları da, dikey pilon totemler de %100 eksiksiz görüntülenir.
   - Gerçek zamanlı arama, ilçe/malzeme filtreleme ve kategori sekmeleri.

2. **Gelişmiş Yüksek Çözünürlüklü Lightbox Modal:**
   - Hem fotoğrafları hem de atölye/saha videolarını (`.mp4`) tam boyutta oynatır.
   - Pürüzsüz interaktif yakınlaştırma (**Zoom In**, **Zoom Out**, **Reset 100%**, çift tıklama desteği).
   - Proje sayacı (`1 / 30`), önceki/sonraki yön tuşları (`←`, `→`, `ESC`), detaylı ilçe/kategori açıklaması ve tek tıkla o projeye özel önceden doldurulmuş WhatsApp teklif butonu.

3. **Homepage SEO & Dönüşüm (Conversion) Optimizasyonu:**
   - **Yerel SEO Meta Verileri:** "Şanlıurfa Tabela", "Haliliye Dijital Baskı", "Kutu Harf Tabela Şanlıurfa" hedefli meta başlık, açıklama ve zengin anahtar kelimeler.
   - **LocalBusiness JSON-LD Yapısal Veri (Schema.org):** Adres (Atatürk Mah., 2. Sok., No: 13, Haliliye), telefon (+90 507 379 02 72), coğrafi koordinatlar, 5.0 puanlı aggregateRating ve detaylı açık hava reklam hizmet kataloğu.
   - **Ekranın Üst Kısmı (Above the Fold) Güven & Sosyal Kanıt Unsurları:**
     - 15+ Yıl Tecrübe, %100 Müşteri Memnuniyeti, Yerinde Ücretsiz Keşif, Kendi Atölyemizden Aracısız Fiyat rozetleri.
     - 5 Yıldızlı Google Haritalar müşteri değerlendirme alıntısı.
     - Acil dönüşüm sağlayan hareketli **"Hemen Teklif Al / WhatsApp İletişim"** bildirim bandı (Floating Action Banner).
   - Anahtar kelime zengin H1, H2 ve H3 başlık hiyerarşisi (3D kutu harf, totem tabela, one-way vision, araç kaplama).

4. **Vercel Static Uyumlu WhatsApp Teklif Motoru & Yönetim Paneli (`yonetim.html`):**
   - %100 istemci tarafı (client-side) çalışan, Vercel statik barındırma ile tam uyumlu teklif sistemi.
   - Ziyaretçi ad, telefon, hizmet türü ve ölçüleri girdiğinde otomatik olarak biçimlendirilmiş kurumsal WhatsApp teklif mesajı oluşturur ve WhatsApp'a yönlendirir.
   - Tarayıcı `localStorage` kaydı ve `data/quotes.json` desteği ile yönetim paneli üzerinden canlı teklif takibi sağlar.

---

## 📂 Dosya & Dizin Yapısı

```
simgereklam/
├── index.html            # Ana web sitesi (SEO & dönüşüm optimizasyonlu, sadeleştirilmiş modern header)
├── projelerimiz.html     # Özel galeri ve video sayfası (30+ gerçek proje)
├── yonetim.html          # Yönetim paneli ve teklif takip ekranı
├── vercel.json           # Vercel statik dağıtım ve routing konfigürasyonu
├── README.md             # Proje dokümantasyonu
├── data/
│   ├── projects.json     # 30 adet gerçek proje veritabanı (JSON)
│   └── quotes.json       # Teklif kayıtları
├── assets/
│   ├── css/
│   │   └── style.css     # Özel stiller, animasyonlar, uncropped gallery & lightbox
│   ├── js/
│   │   └── main.js       # Dinamik galeri motoru, video/resim lightbox & WhatsApp teklif sistemi
│   ├── videos/           # Gerçek atölye imalat ve saha montaj videoları
│   │   ├── atolye-kutu-harf-imalat.mp4
│   │   └── tabela-montaj-uygulama.mp4
│   └── images/           # Gerçek Şanlıurfa montaj fotoğrafları & kurumsal logo
│       ├── logo.png
│       ├── hero.jpg
│       └── WhatsApp Image 2026-*.jpeg
└── data/
    ├── projects.json     # 30 adet gerçek proje & video veri tabanı
    └── quotes.json       # Gelen teklif talepleri kayıt dosyası
```

---

## 🛠️ XAMPP ile Test Etme

1. Proje `c:\xampp\htdocs\simgereklam` dizinindedir.
2. XAMPP Kontrol Panelinden **Apache** servisini başlatın (`Start`).
3. Tarayıcınızdan:
   - Ana sayfa: `http://localhost/simgereklam/`
   - Projeler & Galeri sayfası: `http://localhost/simgereklam/projelerimiz.html`
   - Yönetim paneli: `http://localhost/simgereklam/yonetim.html`
   adreslerini ziyaret edebilirsiniz.

