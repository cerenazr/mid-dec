/**
 * Post-build PWA patch script.
 * Runs automatically after `npm run build` (expo export -p web).
 *
 * Does two things:
 *  1. Creates dist/manifest.json (expo export does not generate this)
 *  2. Patches dist/index.html with all missing PWA tags
 */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const INDEX_HTML = path.join(DIST, 'index.html');
const MANIFEST_JSON = path.join(DIST, 'manifest.json');

// ── 1. Write manifest.json ──────────────────────────────────────────────────
const manifest = {
    name: 'MİD-DEC Risk Calculator',
    short_name: 'MİD-DEC',
    description: 'A medical risk assessment application for healthcare professionals.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    theme_color: '#81B7C3',
    background_color: '#FFFFFF',
    icons: [
        {
            src: '/assets/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any maskable',
        },
        {
            src: '/assets/logo.png',
            sizes: '512x512',
            type: 'image/png',
        },
    ],
};

fs.writeFileSync(MANIFEST_JSON, JSON.stringify(manifest, null, 2), 'utf8');
console.log('✓ dist/manifest.json created');

// ── 2. Patch dist/index.html ────────────────────────────────────────────────
if (!fs.existsSync(INDEX_HTML)) {
    console.error('✗ dist/index.html not found — run expo export first');
    process.exit(1);
}

let html = fs.readFileSync(INDEX_HTML, 'utf8');

// 2a. Add viewport-fit=cover if missing
html = html.replace(
    /(<meta name="viewport" content="[^"]*?)"/,
    (match, p1) => {
        if (match.includes('viewport-fit=cover')) return match;
        return p1 + ', viewport-fit=cover"';
    }
);

// 2b. Insert PWA tags before </head> if not already present
const PWA_TAGS = `
  <!-- PWA Manifest -->
  <link rel="manifest" href="/manifest.json" />

  <!-- Apple PWA Meta Tags -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="MİD-DEC" />

  <!-- Apple Touch Icons -->
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
  <link rel="apple-touch-icon" sizes="152x152" href="/assets/apple-touch-icon.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
  <link rel="apple-touch-icon" sizes="167x167" href="/assets/apple-touch-icon.png" />

  <!-- Apple Startup Images -->
  <link rel="apple-touch-startup-image" href="/assets/splash.png"
      media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)" />
  <link rel="apple-touch-startup-image" href="/assets/splash.png"
      media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)" />
  <link rel="apple-touch-startup-image" href="/assets/splash.png"
      media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)" />
  <link rel="apple-touch-startup-image" href="/assets/splash.png"
      media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)" />
  <link rel="apple-touch-startup-image" href="/assets/splash.png"
      media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" />

  <!-- Icon font FOUT prevention -->
  <style>
    @font-face { font-family: 'Ionicons'; font-display: block; }
    body {
      background-color: #F8F9FA;
      overscroll-behavior: none;
      padding-top: env(safe-area-inset-top);
      padding-bottom: env(safe-area-inset-bottom);
    }
  </style>
`;

if (!html.includes('rel="manifest"')) {
    html = html.replace('</head>', PWA_TAGS + '</head>');
}

fs.writeFileSync(INDEX_HTML, html, 'utf8');
console.log('✓ dist/index.html patched with PWA tags');
console.log('\nDone! Deploy the dist/ folder to Firebase Hosting.');
