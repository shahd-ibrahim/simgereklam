import os
import base64
import subprocess
import time

def get_base64_img(path):
    if not os.path.exists(path):
        return ""
    ext = path.split('.')[-1].lower()
    mime = 'image/png' if ext == 'png' else 'image/jpeg'
    with open(path, 'rb') as f:
        return f"data:{mime};base64,{base64.b64encode(f.read()).decode('utf-8')}"

print("Encoding images...")
logo_b64 = get_base64_img('assets/images/logo.png')
hero_b64 = get_base64_img('assets/images/hero.jpg')
kutu_b64 = get_base64_img('assets/images/kutu-harf.jpg')
totem_b64 = get_base64_img('assets/images/totem-tabela.jpg')
baski_b64 = get_base64_img('assets/images/dijital-baski.jpg')
vitrin_b64 = get_base64_img('assets/images/folyo-vitrin.jpg')
arac_b64 = get_base64_img('assets/images/arac-kaplama.jpg')
isikli_b64 = get_base64_img('assets/images/isikli-pleksi.jpg')
qr_b64 = get_base64_img('assets/images/qr-whatsapp.png')

html_content = f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Simge Reklam - Kurumsal Ürün & Hizmet Kataloğu 2026</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap');

    @page {{
      size: A4 portrait;
      margin: 0;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}

    body {{
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #0b0f19;
      color: #f8fafc;
      margin: 0;
      padding: 0;
    }}

    .catalog-page {{
      width: 210mm;
      height: 297mm;
      min-height: 297mm;
      max-height: 297mm;
      position: relative;
      overflow: hidden;
      page-break-after: always;
      page-break-inside: avoid;
      background: #0b0f19;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 13mm 16mm;
    }}

    .catalog-page:last-child {{
      page-break-after: auto;
    }}

    /* Typography */
    .font-display {{
      font-family: 'Outfit', sans-serif;
    }}

    .text-orange {{
      color: #ff7a00;
    }}

    .text-gold {{
      color: #f59e0b;
    }}

    .bg-orange {{
      background-color: #ff7a00;
    }}

    .bg-surface {{
      background-color: #111827;
    }}

    .bg-card {{
      background-color: #151d30;
    }}

    .border-card {{
      border: 1px solid #1f293d;
    }}

    .border-orange {{
      border-color: #ff7a00;
    }}

    /* Decorative Elements */
    .glow-orange {{
      box-shadow: 0 0 25px rgba(255, 122, 0, 0.25);
    }}

    .glow-gold {{
      box-shadow: 0 0 25px rgba(245, 158, 11, 0.2);
    }}

    /* Card styling */
    .product-card {{
      background: #111827;
      border: 1px solid #1f293d;
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }}

    .badge {{
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 8.5pt;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }}

    .badge-orange {{
      background: rgba(255, 122, 0, 0.15);
      color: #ff7a00;
      border: 1px solid rgba(255, 122, 0, 0.3);
    }}

    .badge-gold {{
      background: rgba(245, 158, 11, 0.15);
      color: #f59e0b;
      border: 1px solid rgba(245, 158, 11, 0.3);
    }}

    .badge-blue {{
      background: rgba(59, 130, 246, 0.15);
      color: #60a5fa;
      border: 1px solid rgba(59, 130, 246, 0.3);
    }}

    .badge-emerald {{
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }}

    /* Header & Footer on internal pages */
    .page-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
      border-bottom: 1px solid #1f293d;
      margin-bottom: 14px;
    }}

    .page-footer {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 8px;
      border-top: 1px solid #1f293d;
      font-size: 8pt;
      color: #64748b;
      margin-top: 10px;
    }}

    /* Grid utilities */
    .grid-2 {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }}

    .grid-3 {{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
    }}
  </style>
</head>
<body>

  <!-- =========================================================================
       PAGE 1: COVER PAGE (LUXURY MINIMALIST DARK CARBON)
       ========================================================================= -->
  <div class="catalog-page" style="background: radial-gradient(circle at 80% 20%, #1c263c 0%, #0b0f19 70%); justify-content: space-between; padding: 20mm 18mm;">
    
    <!-- Top Bar: Logo & Location Tag -->
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="width: 58px; height: 58px; background: #111827; border: 1.5px solid rgba(255,122,0,0.5); border-radius: 16px; padding: 6px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
          <img src="{logo_b64}" alt="Simge Reklam Logo" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </div>
        <div>
          <div class="font-display" style="font-size: 20pt; font-weight: 900; letter-spacing: 1.5px; color: #ffffff; line-height: 1;">
            SİMGE <span style="color: #ff7a00;">REKLAM</span>
          </div>
          <div style="font-size: 8.5pt; color: #94a3b8; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px;">
            Şanlıurfa Tabela & Baskı Atölyesi
          </div>
        </div>
      </div>

      <div style="text-align: right;">
        <span class="badge badge-orange" style="font-size: 9pt; padding: 5px 12px;">
          Haliliye / Şanlıurfa
        </span>
        <div style="font-size: 8pt; color: #64748b; margin-top: 4px; font-weight: 500;">
          Atatürk Mah., 2. Sok., No: 13
        </div>
      </div>
    </div>

    <!-- Center Hero Section -->
    <div style="margin: 20px 0;">
      <div style="display: inline-flex; align-items: center; gap: 8px; padding: 4px 14px; background: rgba(255,122,0,0.12); border: 1px solid rgba(255,122,0,0.3); border-radius: 20px; color: #ff7a00; font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 18px;">
        <span style="width: 7px; height: 7px; background: #ff7a00; border-radius: 50%; display: inline-block;"></span>
        Açık Hava Reklamcılığı & Dijital Baskı Merkezi
      </div>

      <h1 class="font-display" style="font-size: 38pt; font-weight: 900; line-height: 1.08; color: #ffffff; letter-spacing: -0.5px; margin-bottom: 16px;">
        KURUMSAL ÜRÜN &<br>
        <span style="background: linear-gradient(90deg, #ff7a00 0%, #f59e0b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">HİZMET KATALOĞU</span>
      </h1>

      <div style="font-size: 16pt; color: #cbd5e1; font-weight: 300; letter-spacing: 1px; margin-bottom: 24px;">
        2026 EDİSYONU
      </div>

      <p style="font-size: 11pt; color: #94a3b8; line-height: 1.6; max-width: 580px; margin-bottom: 28px;">
        Haliliye merkezli yüksek teknolojili makine parkurumuz ve uzman ekibimizle; 3D paslanmaz kutu harf tabela, pilon totem, yüksek çözünürlüklü UV dijital baskı ve ticari filo araç kaplamada Şanlıurfa'nın anahtar teslim reklam çözüm ortağıyız.
      </p>

      <!-- 4 Pillars Grid on Cover -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
        <div style="background: #111827; border: 1px solid #1f293d; border-radius: 10px; padding: 12px; text-align: center;">
          <div class="font-display" style="font-size: 16pt; font-weight: 900; color: #ff7a00;">15+ Yıl</div>
          <div style="font-size: 8pt; color: #cbd5e1; font-weight: 600; margin-top: 2px;">Sektörel Deneyim</div>
        </div>
        <div style="background: #111827; border: 1px solid #1f293d; border-radius: 10px; padding: 12px; text-align: center;">
          <div class="font-display" style="font-size: 16pt; font-weight: 900; color: #f59e0b;">1.500+</div>
          <div style="font-size: 8pt; color: #cbd5e1; font-weight: 600; margin-top: 2px;">Tamamlanan Proje</div>
        </div>
        <div style="background: #111827; border: 1px solid #1f293d; border-radius: 10px; padding: 12px; text-align: center;">
          <div class="font-display" style="font-size: 16pt; font-weight: 900; color: #34d399;">%100</div>
          <div style="font-size: 8pt; color: #cbd5e1; font-weight: 600; margin-top: 2px;">Müşteri Memnuniyeti</div>
        </div>
        <div style="background: #111827; border: 1px solid #1f293d; border-radius: 10px; padding: 12px; text-align: center;">
          <div class="font-display" style="font-size: 16pt; font-weight: 900; color: #60a5fa;">3D</div>
          <div style="font-size: 8pt; color: #cbd5e1; font-weight: 600; margin-top: 2px;">Yerinde Ücretsiz Keşif</div>
        </div>
      </div>
    </div>

    <!-- Bottom Cover Footer -->
    <div style="background: #111827; border: 1px solid #1f293d; border-radius: 14px; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 24px;">
        <div>
          <div style="font-size: 7.5pt; color: #64748b; text-transform: uppercase; font-weight: 700;">Merkez Ofis & Atölye</div>
          <div style="font-size: 9pt; color: #ffffff; font-weight: 600;">Atatürk Mah., 2. Sok., No: 13, Haliliye / Şanlıurfa</div>
        </div>
        <div style="width: 1px; height: 26px; background: #1f293d;"></div>
        <div>
          <div style="font-size: 7.5pt; color: #64748b; text-transform: uppercase; font-weight: 700;">Hızlı İletişim & WhatsApp</div>
          <div style="font-size: 9.5pt; color: #ff7a00; font-weight: 800;">+90 507 379 02 72</div>
        </div>
      </div>
      <div>
        <div style="font-size: 8.5pt; color: #cbd5e1; font-weight: 700; text-align: right;">www.simgereklam.com</div>
        <div style="font-size: 7.5pt; color: #64748b; text-align: right;">info@simgereklam.com</div>
      </div>
    </div>

  </div>


  <!-- =========================================================================
       PAGE 2: TABELA SİSTEMLERİ & CEPHE ÇÖZÜMLERİ
       ========================================================================= -->
  <div class="catalog-page">
    
    <!-- Header -->
    <div>
      <div class="page-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 18px; height: 18px; background: #ff7a00; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 8pt; font-weight: 900; color: #fff;">01</div>
          <span class="font-display" style="font-size: 11pt; font-weight: 800; color: #fff; letter-spacing: 1px;">TABELA SİSTEMLERİ & DIŞ CEPHE</span>
        </div>
        <div style="font-size: 8pt; color: #94a3b8; font-weight: 600;">SİMGE REKLAM • ŞANLIURFA</div>
      </div>

      <div style="margin-bottom: 12px;">
        <h2 class="font-display" style="font-size: 18pt; font-weight: 900; color: #fff; line-height: 1.2;">
          3D Paslanmaz Kutu Harf, Totem & Kompozit Cephe
        </h2>
        <p style="font-size: 8.5pt; color: #94a3b8; margin-top: 3px; line-height: 1.4;">
          İşletmenizin caddeden ilk fark edilen kurumsal kimliği. CNC lazer hassas kesim, 304 kalite paslanmaz çelik ve Şanlıurfa yaz sıcağına dayanıklı Samsung IP67 LED donanımı.
        </p>
      </div>

      <!-- 3 Products Grid -->
      <div class="grid-3" style="margin-bottom: 12px;">
        
        <!-- PRODUCT 1: KUTU HARF -->
        <div class="product-card" style="padding: 10px;">
          <div style="width: 100%; height: 115px; background: #080c14; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; border: 1px solid #1f293d;">
            <img src="{kutu_b64}" alt="3D Kutu Harf" style="max-height: 100%; max-width: 100%; object-fit: contain;">
          </div>
          <span class="badge badge-orange" style="margin-bottom: 6px; align-self: flex-start;">En Çok Tercih Edilen</span>
          <h3 class="font-display" style="font-size: 11pt; font-weight: 800; color: #fff; margin-bottom: 4px;">
            3D Paslanmaz Kutu Harf
          </h3>
          <p style="font-size: 7.8pt; color: #94a3b8; line-height: 1.35; margin-bottom: 8px;">
            304 kalite gold/gümüş paslanmaz yan bantlar, dökme akrilik pleksi ve homojen LED aydınlatma.
          </p>
          <div style="background: #0b0f19; padding: 6px 8px; border-radius: 6px; font-size: 7.5pt; color: #cbd5e1; margin-bottom: 8px;">
            <div>• 304 Paslanmaz Çelik Gövde</div>
            <div>• 3mm / 5mm Dökme Pleksi</div>
            <div>• Samsung IP67 Su Geçirmez LED</div>
          </div>
          <div style="border-top: 1px solid #1f293d; padding-top: 6px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 7pt; color: #64748b; text-transform: uppercase;">Keşif Durumu</span>
            <span style="font-size: 8pt; color: #34d399; font-weight: 700;">Ücretsiz Keşif</span>
          </div>
        </div>

        <!-- PRODUCT 2: TOTEM TABELA -->
        <div class="product-card" style="padding: 10px;">
          <div style="width: 100%; height: 115px; background: #080c14; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; border: 1px solid #1f293d;">
            <img src="{totem_b64}" alt="Işıklı Totem Tabela" style="max-height: 100%; max-width: 100%; object-fit: contain;">
          </div>
          <span class="badge badge-gold" style="margin-bottom: 6px; align-self: flex-start;">Dev Boyut & Totem</span>
          <h3 class="font-display" style="font-size: 11pt; font-weight: 800; color: #fff; margin-bottom: 4px;">
            Işıklı Totem & Pilon
          </h3>
          <p style="font-size: 7.8pt; color: #94a3b8; line-height: 1.35; margin-bottom: 8px;">
            Otoyol, akaryakıt ve plaza girişleri için statik rüzgar hesaplamalı ağır çelik karkas kule tabela.
          </p>
          <div style="background: #0b0f19; padding: 6px 8px; border-radius: 6px; font-size: 7.5pt; color: #cbd5e1; margin-bottom: 8px;">
            <div>• Statik Rüzgar Mukavemeti</div>
            <div>• Alüminyum Kompozit Kaset</div>
            <div>• 4 Metreden 15 Metreye Kadar</div>
          </div>
          <div style="border-top: 1px solid #1f293d; padding-top: 6px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 7pt; color: #64748b; text-transform: uppercase;">Montaj Şekli</span>
            <span style="font-size: 8pt; color: #ff7a00; font-weight: 700;">Sepetli Vinçli</span>
          </div>
        </div>

        <!-- PRODUCT 3: KOMPOZİT CEPHE -->
        <div class="product-card" style="padding: 10px;">
          <div style="width: 100%; height: 115px; background: #080c14; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; border: 1px solid #1f293d;">
            <img src="{hero_b64}" alt="Kompozit Cephe Kaplama" style="max-height: 100%; max-width: 100%; object-fit: contain;">
          </div>
          <span class="badge badge-blue" style="margin-bottom: 6px; align-self: flex-start;">Modern Mimari</span>
          <h3 class="font-display" style="font-size: 11pt; font-weight: 800; color: #fff; margin-bottom: 4px;">
            Alüminyum Kompozit Cephe
          </h3>
          <p style="font-size: 7.8pt; color: #94a3b8; line-height: 1.35; margin-bottom: 8px;">
            Eski bina cephelerini modernleştiren 4mm alüminyum kompozit panel derzli kaset giydirme.
          </p>
          <div style="background: #0b0f19; padding: 6px 8px; border-radius: 6px; font-size: 7.5pt; color: #cbd5e1; margin-bottom: 8px;">
            <div>• 0.50mm Et Kalınlığı Alüminyum</div>
            <div>• CNC V-Derz Kusursuz Büküm</div>
            <div>• Yangına ve Suya Dayanıklı</div>
          </div>
          <div style="border-top: 1px solid #1f293d; padding-top: 6px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 7pt; color: #64748b; text-transform: uppercase;">Tasarım</span>
            <span style="font-size: 8pt; color: #60a5fa; font-weight: 700;">3D Simülasyon</span>
          </div>
        </div>

      </div>

      <!-- Technical Callout Box -->
      <div style="background: linear-gradient(90deg, #111827 0%, #151d30 100%); border: 1px solid rgba(255,122,0,0.3); border-radius: 10px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div class="font-display" style="font-size: 9.5pt; font-weight: 800; color: #ffffff;">
            Şanlıurfa Sıcağına ve Fırtınasına Karşı 2 Yıl Tam Garanti
          </div>
          <div style="font-size: 8pt; color: #94a3b8; margin-top: 2px;">
            Tüm tabela aydınlatmalarımızda Samsung IP67 lensli modül LED ve 12V Meanwell trafolar kullanılmaktadır.
          </div>
        </div>
        <span class="badge badge-orange" style="padding: 6px 12px; font-size: 8pt; white-space: nowrap;">
          Aracısız Fabrika Fiyatı
        </span>
      </div>
    </div>

    <!-- Footer -->
    <div class="page-footer">
      <div>Atatürk Mah., 2. Sok., No: 13, Haliliye / Şanlıurfa • Tel: +90 414 315 1787</div>
      <div style="font-weight: 700; color: #ff7a00;">Sayfa 02 / 05</div>
    </div>

  </div>


  <!-- =========================================================================
       PAGE 3: GENİŞ FORMAT DİJİTAL BASKI & VİTRİN
       ========================================================================= -->
  <div class="catalog-page">
    
    <!-- Header -->
    <div>
      <div class="page-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 18px; height: 18px; background: #60a5fa; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 8pt; font-weight: 900; color: #fff;">02</div>
          <span class="font-display" style="font-size: 11pt; font-weight: 800; color: #fff; letter-spacing: 1px;">DİJİTAL BASKI & VİTRİN ÇÖZÜMLERİ</span>
        </div>
        <div style="font-size: 8pt; color: #94a3b8; font-weight: 600;">SİMGE REKLAM • ŞANLIURFA</div>
      </div>

      <div style="margin-bottom: 12px;">
        <h2 class="font-display" style="font-size: 18pt; font-weight: 900; color: #fff; line-height: 1.2;">
          UV Solmayan Branda, One Way Vision & Folyo
        </h2>
        <p style="font-size: 8.5pt; color: #94a3b8; margin-top: 3px; line-height: 1.4;">
          Yüksek çözünürlüklü dijital baskı makinelerimizde orijinal Japon UV mürekkeplerle canlı, pürüzsüz ve güneşte solmayan dış mekan reklam baskıları üretiyoruz.
        </p>
      </div>

      <!-- 3 Products Grid -->
      <div class="grid-3" style="margin-bottom: 12px;">
        
        <!-- PRODUCT 1: UV BRANDA -->
        <div class="product-card" style="padding: 10px;">
          <div style="width: 100%; height: 115px; background: #080c14; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; border: 1px solid #1f293d;">
            <img src="{baski_b64}" alt="UV Branda Baskı" style="max-height: 100%; max-width: 100%; object-fit: contain;">
          </div>
          <span class="badge badge-blue" style="margin-bottom: 6px; align-self: flex-start;">Solmayan UV Baskı</span>
          <h3 class="font-display" style="font-size: 11pt; font-weight: 800; color: #fff; margin-bottom: 4px;">
            UV Dökme Vinil Branda
          </h3>
          <p style="font-size: 7.8pt; color: #94a3b8; line-height: 1.35; margin-bottom: 8px;">
            440gr ve 510gr Avrupa dökme vinil üzeri 1440 DPI çözünürlükte güneşe dayanıklı dev cephe brandaları.
          </p>
          <div style="background: #0b0f19; padding: 6px 8px; border-radius: 6px; font-size: 7.5pt; color: #cbd5e1; margin-bottom: 8px;">
            <div>• 440gr / 510gr Dökme Vinil</div>
            <div>• 3.20 Metre Eksiz Rulo Baskı</div>
            <div>• Takviyeli Kolon Dikiş & Kuşgözü</div>
          </div>
          <div style="border-top: 1px solid #1f293d; padding-top: 6px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 7pt; color: #64748b; text-transform: uppercase;">Teslim Süresi</span>
            <span style="font-size: 8pt; color: #60a5fa; font-weight: 700;">Aynı Gün / 24 Saat</span>
          </div>
        </div>

        <!-- PRODUCT 2: ONE WAY VISION -->
        <div class="product-card" style="padding: 10px;">
          <div style="width: 100%; height: 115px; background: #080c14; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; border: 1px solid #1f293d;">
            <img src="{vitrin_b64}" alt="One Way Vision Delikli Folyo" style="max-height: 100%; max-width: 100%; object-fit: contain;">
          </div>
          <span class="badge badge-orange" style="margin-bottom: 6px; align-self: flex-start;">Vitrin Giydirme</span>
          <h3 class="font-display" style="font-size: 11pt; font-weight: 800; color: #fff; margin-bottom: 4px;">
            One Way Vision (Delikli)
          </h3>
          <p style="font-size: 7.8pt; color: #94a3b8; line-height: 1.35; margin-bottom: 8px;">
            Dışarıdan canlı reklam görseli sunarken içeriden dışarısının net izlenmesini sağlayan delikli cam folyosu.
          </p>
          <div style="background: #0b0f19; padding: 6px 8px; border-radius: 6px; font-size: 7.5pt; color: #cbd5e1; margin-bottom: 8px;">
            <div>• %60-40 İdeal Perforasyon</div>
            <div>• Güneş Işığını Kırıcı Filtre</div>
            <div>• Kolay Sökülür, İz Bırakmaz</div>
          </div>
          <div style="border-top: 1px solid #1f293d; padding-top: 6px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 7pt; color: #64748b; text-transform: uppercase;">Kullanım Alanı</span>
            <span style="font-size: 8pt; color: #ff7a00; font-weight: 700;">Dükkan & Showroom</span>
          </div>
        </div>

        <!-- PRODUCT 3: ROLL-UP & STAND -->
        <div class="product-card" style="padding: 10px;">
          <div style="width: 100%; height: 115px; background: #080c14; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; border: 1px solid #1f293d;">
            <img src="{kutu_b64}" alt="Roll-up & Kumlama" style="max-height: 100%; max-width: 100%; object-fit: contain;">
          </div>
          <span class="badge badge-emerald" style="margin-bottom: 6px; align-self: flex-start;">Fuar & Ofis İçi</span>
          <h3 class="font-display" style="font-size: 11pt; font-weight: 800; color: #fff; margin-bottom: 4px;">
            Roll-Up & Kumlama Folyo
          </h3>
          <p style="font-size: 7.8pt; color: #94a3b8; line-height: 1.35; margin-bottom: 8px;">
            Fuar etkinlikleri için mekanizmalı alüminyum Roll-Up banner ve ofis bölme camları için dekoratif kumlama.
          </p>
          <div style="background: #0b0f19; padding: 6px 8px; border-radius: 6px; font-size: 7.5pt; color: #cbd5e1; margin-bottom: 8px;">
            <div>• 85x200cm & 100x200cm Roll-Up</div>
            <div>• Taşıma Çantalı Alüminyum Kasa</div>
            <div>• CNC Kesim Logolu Kumlama</div>
          </div>
          <div style="border-top: 1px solid #1f293d; padding-top: 6px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 7pt; color: #64748b; text-transform: uppercase;">Kullanım</span>
            <span style="font-size: 8pt; color: #34d399; font-weight: 700;">Taşınabilir / Kurumsal</span>
          </div>
        </div>

      </div>

      <!-- Large Format Specs Box -->
      <div style="background: #111827; border: 1px solid #1f293d; border-radius: 10px; padding: 10px 14px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center;">
        <div>
          <div style="font-size: 12pt; font-weight: 800; color: #60a5fa;">1440 DPI</div>
          <div style="font-size: 7.5pt; color: #94a3b8; margin-top: 1px;">Ultra HD Fotoğraf Kalitesi</div>
        </div>
        <div style="border-left: 1px solid #1f293d; border-right: 1px solid #1f293d;">
          <div style="font-size: 12pt; font-weight: 800; color: #ff7a00;">3.20 Metre</div>
          <div style="font-size: 7.5pt; color: #94a3b8; margin-top: 1px;">Eksiz Rulo Baskı Genişliği</div>
        </div>
        <div>
          <div style="font-size: 12pt; font-weight: 800; color: #34d399;">UV Korumalı</div>
          <div style="font-size: 7.5pt; color: #94a3b8; margin-top: 1px;">Güneşte 3+ Yıl Solmazlık</div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="page-footer">
      <div>Atatürk Mah., 2. Sok., No: 13, Haliliye / Şanlıurfa • WhatsApp: +90 507 379 02 72</div>
      <div style="font-weight: 700; color: #60a5fa;">Sayfa 03 / 05</div>
    </div>

  </div>


  <!-- =========================================================================
       PAGE 4: ARAÇ KAPLAMA & KURUMSAL TANITIM / İÇ MEKAN
       ========================================================================= -->
  <div class="catalog-page">
    
    <!-- Header -->
    <div>
      <div class="page-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 18px; height: 18px; background: #34d399; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 8pt; font-weight: 900; color: #fff;">03</div>
          <span class="font-display" style="font-size: 11pt; font-weight: 800; color: #fff; letter-spacing: 1px;">ARAÇ KAPLAMA & KURUMSAL TANITIM</span>
        </div>
        <div style="font-size: 8pt; color: #94a3b8; font-weight: 600;">SİMGE REKLAM • ŞANLIURFA</div>
      </div>

      <div style="margin-bottom: 12px;">
        <h2 class="font-display" style="font-size: 18pt; font-weight: 900; color: #fff; line-height: 1.2;">
          Ticari Filo Cast Giydirme & Pleksi Logo Panoları
        </h2>
        <p style="font-size: 8.5pt; color: #94a3b8; margin-top: 3px; line-height: 1.4;">
          Markanızı 7/24 trafikte gezen reklama dönüştürün. Kabarmayan özel dökme cast folyo teknolojisi ve şirket içi prestijinizi artıran şık 3D pleksi logo panoları.
        </p>
      </div>

      <!-- 3 Products Grid -->
      <div class="grid-3" style="margin-bottom: 12px;">
        
        <!-- PRODUCT 1: ARAÇ KAPLAMA -->
        <div class="product-card" style="padding: 10px;">
          <div style="width: 100%; height: 115px; background: #080c14; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; border: 1px solid #1f293d;">
            <img src="{arac_b64}" alt="Ticari Araç Kaplama" style="max-height: 100%; max-width: 100%; object-fit: contain;">
          </div>
          <span class="badge badge-emerald" style="margin-bottom: 6px; align-self: flex-start;">Mobil Gezen Reklam</span>
          <h3 class="font-display" style="font-size: 11pt; font-weight: 800; color: #fff; margin-bottom: 4px;">
            Ticari Filo Araç Giydirme
          </h3>
          <p style="font-size: 7.8pt; color: #94a3b8; line-height: 1.35; margin-bottom: 8px;">
            Panelvan, kamyonet ve filo araçları için boyaya zarar vermeyen özel hava kanallı dökme cast folyo.
          </p>
          <div style="background: #0b0f19; padding: 6px 8px; border-radius: 6px; font-size: 7.5pt; color: #cbd5e1; margin-bottom: 8px;">
            <div>• Hava Kanallı Kolay Uygulama</div>
            <div>• UV Koruyucu Cast Laminasyon</div>
            <div>• Basınçlı Oto Yıkamaya Dayanıklı</div>
          </div>
          <div style="border-top: 1px solid #1f293d; padding-top: 6px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 7pt; color: #64748b; text-transform: uppercase;">Atölye</span>
            <span style="font-size: 8pt; color: #34d399; font-weight: 700;">Kapalı Uygulama Alanı</span>
          </div>
        </div>

        <!-- PRODUCT 2: IŞIKLI PLEKSİ LOGO -->
        <div class="product-card" style="padding: 10px;">
          <div style="width: 100%; height: 115px; background: #080c14; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; border: 1px solid #1f293d;">
            <img src="{isikli_b64}" alt="Işıklı Resepsiyon Logo" style="max-height: 100%; max-width: 100%; object-fit: contain;">
          </div>
          <span class="badge badge-orange" style="margin-bottom: 6px; align-self: flex-start;">İç Mekan & Prestij</span>
          <h3 class="font-display" style="font-size: 11pt; font-weight: 800; color: #fff; margin-bottom: 4px;">
            Işıklı Resepsiyon Logo Pano
          </h3>
          <p style="font-size: 7.8pt; color: #94a3b8; line-height: 1.35; margin-bottom: 8px;">
            Plaza, klinik ve ofis resepsiyonları için arkadan gizli günışığı LED aydınlatmalı 3D lazer kesim logo.
          </p>
          <div style="background: #0b0f19; padding: 6px 8px; border-radius: 6px; font-size: 7.5pt; color: #cbd5e1; margin-bottom: 8px;">
            <div>• Aynalı Gold & Gümüş Pleksi</div>
            <div>• Gizli LED Modül Aydınlatma</div>
            <div>• Mat Siyah Kompozit Taban Pano</div>
          </div>
          <div style="border-top: 1px solid #1f293d; padding-top: 6px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 7pt; color: #64748b; text-transform: uppercase;">Tasarım</span>
            <span style="font-size: 8pt; color: #ff7a00; font-weight: 700;">Lazer Kesim Hassasiyet</span>
          </div>
        </div>

        <!-- PRODUCT 3: YÖNLENDİRME & CNC -->
        <div class="product-card" style="padding: 10px;">
          <div style="width: 100%; height: 115px; background: #080c14; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; border: 1px solid #1f293d;">
            <img src="{totem_b64}" alt="Kat Yönlendirme Levhaları" style="max-height: 100%; max-width: 100%; object-fit: contain;">
          </div>
          <span class="badge badge-gold" style="margin-bottom: 6px; align-self: flex-start;">Yönlendirme & Lazer</span>
          <h3 class="font-display" style="font-size: 11pt; font-weight: 800; color: #fff; margin-bottom: 4px;">
            Kat Yönlendirme & CNC Kesim
          </h3>
          <p style="font-size: 7.8pt; color: #94a3b8; line-height: 1.35; margin-bottom: 8px;">
            Hastaneler ve şirket binaları için modüler kat yönlendirme panoları ve 0.1 mm hassasiyetle CNC kesim.
          </p>
          <div style="background: #0b0f19; padding: 6px 8px; border-radius: 6px; font-size: 7.5pt; color: #cbd5e1; margin-bottom: 8px;">
            <div>• Eloksallı Alüminyum Modüller</div>
            <div>• 2000x3000mm CNC Router Parkuru</div>
            <div>• Pleksi, Dekota & Kompozit Kesim</div>
          </div>
          <div style="border-top: 1px solid #1f293d; padding-top: 6px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 7pt; color: #64748b; text-transform: uppercase;">Standart</span>
            <span style="font-size: 8pt; color: #f59e0b; font-weight: 700;">ISO Kurumsal Standart</span>
          </div>
        </div>

      </div>

      <!-- Vehicle & Interior Quality Banner -->
      <div style="background: linear-gradient(90deg, #111827 0%, #151d30 100%); border: 1px solid rgba(52,211,153,0.3); border-radius: 10px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div class="font-display" style="font-size: 9.5pt; font-weight: 800; color: #ffffff;">
            Filo Araçlarınız İçin Özel Şablon ve Kurumsal Giydirme İndirimi
          </div>
          <div style="font-size: 8pt; color: #94a3b8; margin-top: 2px;">
            Kapalı tozsuz atölyemizde yapılan kaplamalar orijinal boyaya zarar vermez, söküldüğünde iz bırakmaz.
          </div>
        </div>
        <span class="badge badge-emerald" style="padding: 6px 12px; font-size: 8pt; white-space: nowrap;">
          Filo Çözümleri
        </span>
      </div>
    </div>

    <!-- Footer -->
    <div class="page-footer">
      <div>Atatürk Mah., 2. Sok., No: 13, Haliliye / Şanlıurfa • info@simgereklam.com</div>
      <div style="font-weight: 700; color: #34d399;">Sayfa 04 / 05</div>
    </div>

  </div>


  <!-- =========================================================================
       PAGE 5: WHY CHOOSE US & CONTACT / ORDER (BACK PAGE)
       ========================================================================= -->
  <div class="catalog-page" style="background: radial-gradient(circle at 20% 80%, #1c263c 0%, #0b0f19 70%);">
    
    <div>
      <!-- Header -->
      <div class="page-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 18px; height: 18px; background: #ff7a00; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 8pt; font-weight: 900; color: #fff;">★</div>
          <span class="font-display" style="font-size: 11pt; font-weight: 800; color: #fff; letter-spacing: 1px;">NEDEN SİMGE REKLAM?</span>
        </div>
        <div style="font-size: 8pt; color: #ff7a00; font-weight: 700;">ŞANLIURFA'NIN GÜVENİLİR REKLAMCISI</div>
      </div>

      <!-- Why Choose Us 4 Pillars Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px;">
        
        <div style="background: #111827; border: 1px solid #1f293d; border-radius: 10px; padding: 12px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
            <div style="width: 26px; height: 26px; background: rgba(255,122,0,0.15); border: 1px solid rgba(255,122,0,0.4); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #ff7a00; font-weight: 900; font-size: 10pt;">1</div>
            <h4 class="font-display" style="font-size: 10.5pt; font-weight: 800; color: #fff;">15+ Yıllık Tecrübe & Güven</h4>
          </div>
          <p style="font-size: 8pt; color: #94a3b8; line-height: 1.4;">
            Haliliye'deki modern atölyemizde binlerce esnaf, kurumsal firma ve kamu kuruluşuna kusursuz teslimat gerçekleştirdik.
          </p>
        </div>

        <div style="background: #111827; border: 1px solid #1f293d; border-radius: 10px; padding: 12px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
            <div style="width: 26px; height: 26px; background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.4); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #f59e0b; font-weight: 900; font-size: 10pt;">2</div>
            <h4 class="font-display" style="font-size: 10.5pt; font-weight: 800; color: #fff;">Yerinde Ücretsiz Keşif</h4>
          </div>
          <p style="font-size: 8pt; color: #94a3b8; line-height: 1.4;">
            Haliliye, Karaköprü, Eyyübiye ve Şanlıurfa'nın 13 ilçesinde dükkanınıza gelip milimetrik ölçü alıyor, en doğru modeli belirliyoruz.
          </p>
        </div>

        <div style="background: #111827; border: 1px solid #1f293d; border-radius: 10px; padding: 12px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
            <div style="width: 26px; height: 26px; background: rgba(96,165,250,0.15); border: 1px solid rgba(96,165,250,0.4); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #60a5fa; font-weight: 900; font-size: 10pt;">3</div>
            <h4 class="font-display" style="font-size: 10.5pt; font-weight: 800; color: #fff;">3D Tasarım Simülasyonu</h4>
          </div>
          <p style="font-size: 8pt; color: #94a3b8; line-height: 1.4;">
            Tabela takılmadan önce cephenizde tam olarak nasıl görüneceğini birebir 3 boyutlu simüle edip onayınızı alıyoruz.
          </p>
        </div>

        <div style="background: #111827; border: 1px solid #1f293d; border-radius: 10px; padding: 12px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
            <div style="width: 26px; height: 26px; background: rgba(52,211,153,0.15); border: 1px solid rgba(52,211,153,0.4); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #34d399; font-weight: 900; font-size: 10pt;">4</div>
            <h4 class="font-display" style="font-size: 10.5pt; font-weight: 800; color: #fff;">Kendi Atölyemiz & Vinç Filosu</h4>
          </div>
          <p style="font-size: 8pt; color: #94a3b8; line-height: 1.4;">
            Aracısız doğrudan CNC tezgahlarımızda üretim yapıyor, kendi sepetli vinç filomuzla yüksek cephelere güvenle monte ediyoruz.
          </p>
        </div>

      </div>

      <!-- Luxury Contact & QR Box -->
      <div style="background: #111827; border: 1.5px solid rgba(255,122,0,0.4); border-radius: 14px; padding: 16px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 15px 35px rgba(0,0,0,0.4); margin-bottom: 12px;">
        
        <!-- Left Contact Info -->
        <div style="flex: 1; padding-right: 20px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span class="badge badge-orange" style="font-size: 8pt;">Hemen İletişime Geçin</span>
            <span style="font-size: 8pt; color: #94a3b8;">Haftanın 6 Günü Kesintisiz Hizmet</span>
          </div>

          <h3 class="font-display" style="font-size: 15pt; font-weight: 900; color: #fff; margin-bottom: 10px;">
            Projenizi Birlikte Hayata Geçirelim
          </h3>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 8.5pt;">
            <div>
              <div style="color: #64748b; font-size: 7pt; text-transform: uppercase; font-weight: 700;">Atölye & Ofis Adresi</div>
              <div style="color: #cbd5e1; font-weight: 600; margin-top: 1px;">Atatürk Mah., 2. Sok., No: 13, Haliliye / Şanlıurfa</div>
            </div>

            <div>
              <div style="color: #64748b; font-size: 7pt; text-transform: uppercase; font-weight: 700;">Sabit Telefon Hattı</div>
              <div style="color: #ffffff; font-weight: 700; margin-top: 1px;">+90 414 315 17 87</div>
            </div>

            <div>
              <div style="color: #64748b; font-size: 7pt; text-transform: uppercase; font-weight: 700;">WhatsApp & Hızlı Teklif</div>
              <div style="color: #ff7a00; font-weight: 900; font-size: 10.5pt; margin-top: 1px;">+90 507 379 02 72</div>
            </div>

            <div>
              <div style="color: #64748b; font-size: 7pt; text-transform: uppercase; font-weight: 700;">E-Posta & Web</div>
              <div style="color: #cbd5e1; font-weight: 600; margin-top: 1px;">info@simgereklam.com • www.simgereklam.com</div>
            </div>
          </div>
        </div>

        <!-- Right: Functional QR Code -->
        <div style="background: #ffffff; border-radius: 12px; padding: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 110px; flex-shrink: 0; box-shadow: 0 8px 20px rgba(0,0,0,0.5);">
          <img src="{qr_b64}" alt="WhatsApp QR Kod" style="width: 82px; height: 82px; object-fit: contain;">
          <div style="color: #0b0f19; font-size: 6.5pt; font-weight: 900; text-align: center; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
            KODU OKUTUN<br><span style="color: #ff7a00;">TEKLİF ALIN</span>
          </div>
        </div>

      </div>

      <!-- Trust Badges Bar -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; text-align: center;">
        <div style="background: #111827; border: 1px solid #1f293d; border-radius: 8px; padding: 8px 4px;">
          <div style="font-size: 8.5pt; font-weight: 800; color: #fff;">2 Yıl Garanti</div>
          <div style="font-size: 7pt; color: #64748b; margin-top: 1px;">Malzeme & LED Garantisi</div>
        </div>
        <div style="background: #111827; border: 1px solid #1f293d; border-radius: 8px; padding: 8px 4px;">
          <div style="font-size: 8.5pt; font-weight: 800; color: #fff;">15+ Yıllık Tecrübe</div>
          <div style="font-size: 7pt; color: #64748b; margin-top: 1px;">Şanlıurfa İmalat Lideri</div>
        </div>
        <div style="background: #111827; border: 1px solid #1f293d; border-radius: 8px; padding: 8px 4px;">
          <div style="font-size: 8.5pt; font-weight: 800; color: #fff;">CE & ISO 9001</div>
          <div style="font-size: 7pt; color: #64748b; margin-top: 1px;">Kalite Belgeli Üretim</div>
        </div>
        <div style="background: #111827; border: 1px solid #1f293d; border-radius: 8px; padding: 8px 4px;">
          <div style="font-size: 8.5pt; font-weight: 800; color: #fff;">3D Simülasyon</div>
          <div style="font-size: 7pt; color: #64748b; margin-top: 1px;">Ön Görselleştirme</div>
        </div>
      </div>
    </div>

    <!-- Final Page Footer -->
    <div class="page-footer">
      <div>&copy; 2026 Simge Reklam - Şanlıurfa. Tüm Hakları Saklıdır.</div>
      <div style="font-weight: 700; color: #ff7a00;">Sayfa 05 / 05</div>
    </div>

  </div>

</body>
</html>
"""

html_path = os.path.abspath("catalog.html")
pdf_path = os.path.abspath("Simge_Reklam_Katalog_2026.pdf")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"HTML catalog written to {html_path} ({len(html_content)} bytes)")

edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_exe):
    edge_exe = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

print("Compiling PDF with Microsoft Edge headless...")
cmd = [
    edge_exe,
    "--headless=new",
    "--disable-gpu",
    "--run-all-compositor-stages-before-draw",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    f"file:///{html_path.replace(os.sep, '/')}"
]

proc = subprocess.run(cmd, capture_output=True, text=True)
print("Edge return code:", proc.returncode)

time.sleep(2)
if os.path.exists(pdf_path):
    size = os.path.getsize(pdf_path)
    print(f"SUCCESS: Generated PDF at {pdf_path} (Size: {size:,} bytes)")
else:
    print("FAILED to generate PDF.")

