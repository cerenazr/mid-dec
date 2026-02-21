# Sync assets to dist folder
if (Test-Path "dist") {
    if (-not (Test-Path "dist\assets")) {
        New-Item -ItemType Directory -Path "dist\assets"
    }
    Copy-Item "assets\apple-touch-icon.png" "dist\assets\apple-touch-icon.png" -ErrorAction SilentlyContinue
    Copy-Item "assets\logo.png" "dist\assets\logo.png" -ErrorAction SilentlyContinue
    Copy-Item "assets\splash.png" "dist\assets\splash.png" -ErrorAction SilentlyContinue
    Copy-Item "assets\logo.png" "dist\logo.png" -ErrorAction SilentlyContinue
    Write-Host "Assets synced to dist folder successfully."
} else {
    Write-Host "Dist folder not found. Please run build first."
}
