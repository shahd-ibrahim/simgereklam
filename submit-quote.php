<?php
/**
 * Simge Reklam - Teklif Talep İşleyici
 * Haliliye / Şanlıurfa
 */

header('Content-Type: application/json; charset=utf-8');

// Sadece POST isteklerini kabul et
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Geçersiz istek türü.']);
    exit;
}

// Gelen JSON veya Form verisini al
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

$name       = trim($data['name'] ?? '');
$phone      = trim($data['phone'] ?? '');
$service    = trim($data['service'] ?? 'Genel Hizmet');
$dimensions = trim($data['dimensions'] ?? '');
$notes      = trim($data['notes'] ?? '');
$ip         = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$createdAt  = date('Y-m-d H:i:s');

if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Lütfen adınızı ve telefon numaranızı girin.']);
    exit;
}

// Kayıt objesi
$quoteRecord = [
    'id'         => uniqid('quote_'),
    'created_at' => $createdAt,
    'name'       => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
    'phone'      => htmlspecialchars($phone, ENT_QUOTES, 'UTF-8'),
    'service'    => htmlspecialchars($service, ENT_QUOTES, 'UTF-8'),
    'dimensions' => htmlspecialchars($dimensions, ENT_QUOTES, 'UTF-8'),
    'notes'      => htmlspecialchars($notes, ENT_QUOTES, 'UTF-8'),
    'ip'         => $ip
];

// JSON veritabanına ekle
$dataFile = __DIR__ . '/data/quotes.json';
$existingQuotes = [];

if (file_exists($dataFile)) {
    $content = file_get_contents($dataFile);
    $existingQuotes = json_decode($content, true) ?: [];
}

array_unshift($existingQuotes, $quoteRecord);
file_put_contents($dataFile, json_encode($existingQuotes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

/*
 * İsteğe Bağlı: E-posta ile Bildirim Gönderme
 * Host firmanızın mail ayarlarını tanımlayarak burayı aktif edebilirsiniz.
 *
 * $to = "info@simgereklam.com";
 * $subject = "Yeni Teklif Talebi: " . $name;
 * $message = "Ad Soyad: $name\nTelefon: $phone\nHizmet: $service\nÖlçüler: $dimensions\nNot: $notes";
 * @mail($to, $subject, $message);
 */

echo json_encode([
    'status'  => 'success',
    'message' => 'Teklif talebiniz başarıyla kaydedildi. En kısa sürede sizinle iletişime geçeceğiz.',
    'record'  => [
        'id'   => $quoteRecord['id'],
        'name' => $quoteRecord['name']
    ]
]);
