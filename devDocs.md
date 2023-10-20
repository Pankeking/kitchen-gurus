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

## Icons theme: MaterialCommunityIcons
