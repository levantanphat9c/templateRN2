# Color Management

### Process

1. ask UI/UX team to export color. and then save to file figmaColor.json
2. copy data from Design Color.LightMode.tokens.json to figmaColor.json => Light Mode
3. copy data from Design Color.DarktMode.tokens.json to figmaColor.json => Dark Mode
4. copy data from Design Shinhan Color.Value.tokens.json to figmaColor.json => ref
5. run yarn compile or yarn color-generator

### Create style for dark and light mode

We already using hook: getStylesHook from src/hooks/useStyle.ts.  
Input parameter of this function can be a style object or a function to create style object.  
If input is a function, it will take dynamicColors as input. the function can use this object for switching light/dark mode.  
An example of input function is in this file: src/Containers/HomeTab/HomeScreen/styles.ts

# Icon Generator

1. We need to download which Icon svg file from Figma
2. Visit the website https://icomoon.io/app
3. Import project with file SSVIcons.json in source
4. Import new icon to project
5. Generate font and copy file selection.json to src/Components/Icon/
6. Generate file iconNames with command: yarn iconNames-generator
7. Update file SSVIcons.json

# Run App

```
Run uat: yarn ios:uat || yarn android:uat
Run staging: yarn ios:staging || yarn android:staging
Run prod" yarn ios:prod || yarn android:prod
```

# Build version

### Process

1. update version in file env
2. run command build with env

```
***IOS***
uat: yarn ios:archive:uat
staging: yarn ios:archive:staging
prod: yarn ios:archive::prod

***ANDROID*** APK
uat: yarn android:build:uat
staging: yarn android:build:staging
prod: android:build::prod

bundle release: android:build:bundle

3. output in
android: ~/output/android
ios: ~/output/ios

# Code push

### Process

1. Update code version (ddmmyy) in src/Containers/MoreTab/AboutUsScreen/index.tsx
2. run command

```

ios: yarn codepush:ios v2.0.3
android: yarn codepush:android v2.0.3

```

# Create component template

run command:
create Redux template

```

yarn new:redux nameRedux
yarn new:reduxStockInfo nameRedux

```

create Component template

```

yarn new:component componentName

```

# Subscribe data market from app

- use hook **useSubscribeSymbol** for subscribe symbol, example:

```

useSubscribeSymbol({
code: currentIndex ?? '',
compareFields: {
numOfBalance: true,
numOfDecreased: true,
numOfIncreased: true,
},
topics: ['MKT_INC_DEC'],
});

```

It's auto sub and unSub when focused - unFocused or mount - unmount component

# Locale

using extension **i18n Ally**, it's can check key no usage, no translation, empty and easily add key, translate diff language

# Structure

src
├── Assets
├── Components
├── Config
├── Constants
├── Containers
├── HOC
├── Handler
├── Hooks
├── Interfaces
├── NativeModules
├── Navigation
├── ReduxSaga
├── Services
├── Utils
├── styles
├── templates

- Assets: Contains static assets like images, fonts, and other media files.
- Components: Contains reusable UI components.
- Config: Configuration files for the application.
- Constants: Contains constant values used throughout the application.
- Containers: Higher-level components that manage state and logic, often connected to Redux or other state management libraries.
- HOC: Higher-Order Components, which are functions that take a component and return a new component with additional props or functionality.
- Handler: Contains functions or classes that handle specific tasks or events.
- Hooks: Custom React hooks for encapsulating reusable logic.
- Interfaces: TypeScript interfaces and types for type-checking.
- NativeModules: Modules specific to native platforms (e.g., React Native).
- Navigation: Contains navigation-related components and configurations.
- ReduxSaga: Contains Redux Saga-related files for managing side effects in Redux.
- Services: Contains service classes or functions for making API calls or other asynchronous operations.
- Utils: Utility functions and helpers.
- styles: Contains styling files, such as CSS or styled-components.
- templates: Contains template files or components.
```
