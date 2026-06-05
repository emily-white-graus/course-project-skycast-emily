## SkyCast

SkyCast shows current weather and forecasts for your current location and saved places. it is useful for quickly checking weather in places you care about without searching for them every time.

The app is built with Expo and React native using Expo router for tabs, stacks, and the settings drawer. the weather screens call Open-Meteo directly for current weather and forecast data, while Expo location is used to find the user's local place. favorites are stored locally with AsyncStorage, and the UI uses shared design components for typography, icons, form fields, cards, and toggles.

**important tech**

- Expo SDK 56
- React native and TypeScript
- Expo router
- AsyncStorage
- Expo location
- Expo notifications and haptics
- Expo system UI
- Open-Meteo forecast API
- Jest, Testing library, ESLint, Prettier, and Knip

**getting started**

you need Node.js and npm installed. this project uses npm with `legacy-peer-deps=true`, which is already set in `.npmrc`.

there are no environment variables needed right now. the app uses public Open-Meteo APIs, so there is no API key to add.

```bash
npm install
npm start
```

then open the app with Expo Go, or run one of these:

```bash
npm run ios
npm run android
npm run web
```

before submitting or opening a pull request, run:

```bash
npm run lint
npm test -- --watchAll=false
npx expo-doctor
```

**main features**

current weather for your location

forecast for your location

saved favorites

add and edit favorite places
