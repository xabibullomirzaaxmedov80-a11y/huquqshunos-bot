# ====================================================================
# HUQUSHUNOS AI - LIGHTWEIGHT POWERSHELL WEB SERVER
# serves static files (HTML, CSS, JS) locally on http://localhost:8000
# ====================================================================

$port = 8000
$url = "http://localhost:$port/"
$currentDir = Get-Location

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Huqushunos AI - Mahalliy Serverini Ishga Tushirish" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Ishchi katalog: $currentDir" -ForegroundColor White
Write-Host "Tizim manzili: $url" -ForegroundColor Green
Write-Host "Dasturni to'xtatish uchun: [Ctrl + C] tugmalarini bosing" -ForegroundColor Yellow
Write-Host "--------------------------------------------------" -ForegroundColor Gray

# Try to start HttpListener
try {
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($url)
    $listener.Start()
    Write-Host "[MUVAFFAQIYAT] Server muvaffaqiyatli ishga tushdi!" -ForegroundColor Green
} catch {
    Write-Host "[XATO] Port $port band bo'lishi mumkin yoki administrator huquqi kerak." -ForegroundColor Red
    Write-Host "Xatolik tafsiloti: $_" -ForegroundColor Red
    Exit
}

# Open application in browser
try {
    Start-Process $url
    Write-Host "[TIZIM] Ilova brauzerda ochilmoqda..." -ForegroundColor Cyan
} catch {
    Write-Host "[DIQQAT] Brauzerni avtomatik ochib bo'lmadi. Iltimos, o'zingiz kiring: $url" -ForegroundColor Yellow
}

# Serve loop
while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawUrl = $request.RawUrl
        # Default file is index.html
        if ($rawUrl -eq "/" -or $rawUrl -eq "") {
            $filePath = Join-Path $currentDir "index.html"
        } else {
            # Strip query parameters if any
            $cleanUrl = $rawUrl.Split('?')[0].TrimStart('/')
            $filePath = Join-Path $currentDir $cleanUrl
        }

        # Check if file exists
        if (Test-Path $filePath -PathType Leaf) {
            $extension = [System.IO.Path]::GetExtension($filePath)
            
            # Content Type Header mapping
            switch ($extension) {
                ".html" { $contentType = "text/html; charset=utf-8" }
                ".css"  { $contentType = "text/css; charset=utf-8" }
                ".js"   { $contentType = "application/javascript; charset=utf-8" }
                ".png"  { $contentType = "image/png" }
                ".jpg"  { $contentType = "image/jpeg" }
                ".svg"  { $contentType = "image/svg+xml" }
                default { $contentType = "application/octet-stream" }
            }
            
            $response.ContentType = $contentType
            $response.StatusCode = 200
            
            # Read and write file content
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            
            Write-Host "[200 OK] Yuklandi: $rawUrl" -ForegroundColor Gray
        } else {
            # 404 Not Found
            $response.StatusCode = 404
            $errMessage = "404 - Fayl topilmadi: $rawUrl"
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($errMessage)
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            
            Write-Host "[404 Not Found] Fayl mavjud emas: $rawUrl" -ForegroundColor Red
        }
    } catch {
        # Catch connection aborts and other listener exceptions
        if ($listener.IsListening) {
            Write-Host "[XATO] So'rovni qayta ishlashda xatolik: $_" -ForegroundColor DarkRed
        }
    } finally {
        if ($null -ne $response) {
            try { $response.Close() } catch {}
        }
    }
}

$listener.Stop()
