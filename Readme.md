# Little Lemon Restaurant App

A React Native restaurant application built with Expo

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or newer)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository

```bash
git clone https://github.com/kdkundan/native-capstone-app.git
cd native-capstone-app
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

This will open the Expo Developer Tools in your browser. You can:

- Run on an iOS simulator (macOS only)
- Run on an Android emulator
- Run on your physical device using the Expo Go app

## 📱 Features

- Menu Browsing and Filtering
- Order Processing
- Profile Image Upload
- Form Validation
- Data Persistence using AsyncStorage and SQLite DB

## 📚 Tech Stack

- React Native
- Expo
- AsyncStorage for local data persistence
- Expo SQLite legacy
- React Navigation for routing
- Expo Image Picker for image handling

## 📦 Key Dependencies

- @react-native-async-storage/async-storage
- @react-navigation/native
- @react-navigation/native-stack
- expo
- expo-image-picker
- react-native

## 📄 Project Structure

```
restaurant-app/
├── assets/
├── src/
│   ├── components/
│   ├── navigation/
│   ├── screens/
│   ├── utils/
│   └── styles/
├── App.js
└── package.json
```

## 🔧 Development

To run the app in development mode:

```bash
# Start with Expo CLI
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 📱 Running on Physical Devices

1. Install the Expo Go app on your device:

   - [iOS App Store](https://apps.apple.com/app/apple-store/id982107779)
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code shown in the terminal or Expo Dev Tools

Made with ❤️ by Kundan Dheevar
