# Development Logs & Info

## Dev Commands

- yarn dev
- npx expo dev
- npx expo start --tunnel --clear

     Tunnel-option provides a non-LAN connection.

     Clear-option clears cache for the async routing set in the app.json/plugins(origin/asyncroutes) files
     " plugins: [
        "expo-router",
        {
          "origin": "https://acme.com",
          "asyncRoutes": "development"
        }
      ],
      "

## VS Code configs / code style standard

- Reduced default tabSize from 4 to 2 spaces

## App architecture

- State management through redux @reduxjs/toolkit
- Back-end through firebase
- Themed by react native elements: @rneui/themed

## Themed Components

- Text: Default Text with lightText theme color
- CustomIcon: Icon with theme color as default
- View: Default View with background theme color
- ToggleMode: button to toggle dark/light theme mode

### Default Icon: MaterialCommunityIcons from @expo/vector-icons

## Current working tree - files (DATE)

- Profile Screen (WIP OCT 23)
  
  - DEVELOPER NOTES - ###
    - First template Sucked ### Had to re-start after whole day's work
    - The image selector / uri resets and actives useEffect provoking unexpected behavior on state.auth.user.photoURL
  - Alignment
    - Image / Button
    - Info Text / Icons
  - Components
    - Network Components Container / View
    - Personal Recipes
    - Personal Feed
  - Profile Items persistance (Social Media, Followers, Likes, Recipes)
    - FireStore Visualization
    - FireStore Storage
    - FireStore Documents
    - FireBase Auth link to Store

## Work Done (DATE)

- AuthFlow (DONE OCT 21):
  - redux/store.ts
  - redux/slices/authSlice.ts
  - app/modal.tsx
  - (auth)/register.tsx
  - (auth)/login.tsx
  - (auth)(index.tsx)

- Apple Buttons (DONE OCT 18):
  - Login.tsx
  - Register.tsx

## Added Dependencies

- expo-image-picker
- expo-linear-gradient
