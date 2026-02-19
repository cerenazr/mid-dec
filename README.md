# MİD-DEC: Shoulder Dystocia Risk Calculator

MİD-DEC is a premium medical decision support application designed for healthcare professionals (Physicians, Midwives, Nurses) to estimate the risk of shoulder dystocia during childbirth based on clinical parameters and ultrasound measurements.

## 🚀 Key Features

- **Precision Risk Assessment**: Utilizes specialized parameters to provide a statistical risk estimation for shoulder dystocia using machine learning models.
- **Dynamic Visualizations**: High-end interactive circular gauges that provide immediate visual feedback on risk levels (Low/Medium/High).
- **Patient Management**: Professional dashboard to track recent assessments, search through records, and manage patient data efficiently.
- **Native-like PWA Experience**: Optimized for iOS and Android with "Add to Home Screen" support, standalone mode, and safe area integration for a native app feel.
- **Premium UI/UX**: A clean, modern aesthetic tailored for clinical environments, featuring responsive mobile-first layouts and sophisticated motion backgrounds.

## 🛠 Technology Stack

- **Frontend**: React Native & Expo SDK 54
- **Web Support**: React Native Web with Metro Bundler
- **Navigation**: React Navigation (Stack & Tabs)
- **Data Visualization**: Custom SVG-based Gauge components using `react-native-svg`
- **Styling**: Premium color palettes (`#81B7C3`, `#144A5E`) with responsive mobile-first containers.
- **Deployment**: Firebase Hosting for PWA delivery.

## 📦 Getting Started

### Prerequisites
- Node.js (Latest LTS)
- Expo Go app on your mobile device (optional for testing)

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npx expo start
   ```
3. For Web/PWA:
   ```bash
   npx expo start --web
   ```

## 📱 PWA & Mobile Support

The application is fully optimized for Progressive Web App (PWA) usage. To install it on your device:
- **iOS Safari**: Tap the 'Share' button and select 'Add to Home Screen'.
- **Android Chrome**: Tap the üç nokta (three dots) and select 'Install/Add to Home Screen'.

## ⚖️ Medical Disclaimer

*This application is a clinical decision support tool and provides statistical estimates only. It is NOT a replacement for professional medical judgment. Final clinical decisions remain the responsibility of the attending healthcare professional.*

---
© 2026 MİD-DEC Team. All rights reserved.
