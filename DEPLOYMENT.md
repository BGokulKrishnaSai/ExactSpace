# ExactSpace Android App - Deployment Guide

## Overview
This guide covers how to deploy the ExactSpace React Native Android application using Expo Application Services (EAS Build).

## Prerequisites

Before deploying, ensure you have:

1. **Node.js 16 or higher** installed
2. **npm or yarn** package manager
3. **Expo account** (free - create at https://expo.dev)
4. **EAS CLI** installed globally
5. **Git** installed

## Quick Start Deployment

### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 2: Login to Expo

```bash
eas login
```

Enter your Expo credentials when prompted.

### Step 3: Configure Your Project

The project already has `eas.json` configuration. Review it:

```bash
cat eas.json
```

### Step 4: Build Android APK

For a preview/testing APK:

```bash
eas build --platform android --profile preview
```

For production APK:

```bash
eas build --platform android --profile production
```

### Step 5: Download Your APK

After the build completes:
1. You'll receive a link to download the APK
2. Download the APK file
3. Install it on your Android device or share it

## Automated Deployment with GitHub Actions

This repository includes a GitHub Actions workflow for automated builds.

### Setup GitHub Secrets

1. Go to your repository Settings > Secrets and variables > Actions
2. Click "New repository secret"
3. Add the following secret:
   - Name: `EXPO_TOKEN`
   - Value: Your Expo access token (generate at https://expo.dev/accounts/[username]/settings/access-tokens)

### Trigger Automated Build

The workflow automatically runs on:
- Push to `main` branch
- Pull requests to `main`
- Manual trigger (Go to Actions tab > EAS Build > Run workflow)

## Distribution Methods

### Method 1: Direct APK Installation
1. Build the APK using EAS
2. Download the APK file
3. Share via:
   - Google Drive
   - Dropbox
   - Direct download link
   - Email
4. Users install by enabling "Unknown Sources" and opening the APK

### Method 2: Google Play Store

For official store distribution:

```bash
# Build AAB for Play Store
eas build --platform android --profile production

# Submit to Google Play
eas submit --platform android
```

You'll need:
- Google Play Developer account ($25 one-time fee)
- App signing key
- Store listing details

### Method 3: Internal Testing

For team testing:

```bash
eas build --platform android --profile preview
```

Share the build link with your team.

## Build Profiles Explained

### Development Profile
- Includes developer tools
- Larger file size
- For development/debugging

### Preview Profile
- Creates APK file
- Suitable for testing
- Can be directly installed

### Production Profile
- Optimized build
- Smaller file size
- For Play Store or production use

## Troubleshooting

### Build Fails

**Issue**: "No Expo account found"
**Solution**: Run `eas login` and enter credentials

**Issue**: "Android keystore not found"
**Solution**: EAS will automatically generate one on first build

**Issue**: "Dependencies conflict"
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Installation Issues

**Issue**: "App not installed"
**Solution**: Enable "Install from Unknown Sources" in Android settings

**Issue**: "Parse error"
**Solution**: Download the APK again, file may be corrupted

## Local Development Setup

Before building, test locally:

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android
```

## Configuration Files

### eas.json
Defines build profiles and settings

### app.json
Contains app metadata and configuration

### package.json
Lists dependencies and scripts

## Support & Resources

- **Expo Documentation**: https://docs.expo.dev/
- **EAS Build Docs**: https://docs.expo.dev/build/introduction/
- **React Native Docs**: https://reactnative.dev/

## Additional Notes

- **Build Time**: First build takes 10-15 minutes, subsequent builds are faster
- **Build Limits**: Free Expo accounts have build time limits
- **APK Size**: Expect ~50-80MB for the final APK
- **Android Version**: App supports Android 5.0 (API 21) and above

## Quick Commands Reference

```bash
# Login to Expo
eas login

# Build preview APK
eas build -p android --profile preview

# Build production APK  
eas build -p android --profile production

# Check build status
eas build:list

# Submit to Play Store
eas submit -p android

# View build logs
eas build:view [build-id]
```

## Security Notes

- Never commit `.env` files with secrets
- Keep your Expo token secure
- Use GitHub Secrets for CI/CD tokens
- Regularly update dependencies for security patches

---

**Last Updated**: January 2026
**Maintained By**: B Gokul Krishna Sai
