# Kitchen Gurus

An application to share recipes with friends, amateur cooks and professional chefs.

## Prerequisites

### [1] Firebase

A [**FIREBASE**](https://firebase.google.com/docs) project set up.

Navigate to the Firebase [*Console*](https://console.firebase.google.com/u/0/) and find the SDK configuration info, it should look something similar to this:

```TypeScript
const firebaseConfig = {
  apiKey: "a1b2c3d4a1b2c3d4-e5f6g7h8e5f6g7h8",
  authDomain: "example-name.firebaseapp.com",
  projectId: "example-name",
  storageBucket: "example-name.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:aaaa1111bbbb2222"
};
```

Update each environment variable in the [*.env*](./.env) file with the corresponding from the Firebase Console
expo .env variables must follow this rule per the [**documentation**](https://docs.expo.dev/guides/environment-variables/) 

"add environment-specific variables on new lines in the form of `EXPO_PUBLIC_[NAME]=VALUE`"
Where apiKey corresponds to `EXPO_PUBLIC_API_KEY` and so on

### [2] Packages

On the terminal install the packages through yarn  

```shell
yarn
```

### [3] Expo Go

For development and quick showcase purpose `Expo Go` is prefered

- This can be downloaded on your phone via the corresponding application store

Alternatively it is also possible to build it on the corresponding platform and run it in an [**android**](https://developer.android.com/studio) or [**iOS**](https://developer.apple.com/xcode/) emulator

Take into consideration the [**building**](https://docs.expo.dev/develop/development-builds/create-a-build/) process can be much more extensive

## Dev Commands

```shell
npx expo start [options]
```

```shell
yarn dev
```

`yarn dev` automatically runs `npx expo start --tunnel --clear` for a non-LAN connection and a cache clearing

## App architecture

- State management through Redux  `@reduxjs/toolkit`
- Back-end through `Firebase`
- Themed by React Native Elements: `@rneui/themed`

## Styling Selection

```json
{
  "TabSize": "2 spaces",
  "Default Icon": "MaterialCommunityIcons from @expo/vector-icons",
  "Font Family": {
    "Main": "PlaypenSans",
    "Optional": [
      "Handlee Regular",
      "SpaceMono Regular"
      ]
  }
}
```
  
## TODO

- Delete functionality
- Password security regEx
- Email Confirmation
- Email Link
- Email template
- On boarding tunnel
- Delete Image, Limit 10 Photos -> Content-Add Photo Screen/
- Re-vamp add instructions screen

---

### If you liked this repo leave a ⭐

### If you want to copy code from this `DO IT` and also leave a ⭐

### If you want to improve something or you have found issues, open an [issue](https://github.com/Pankeking/kitchen-gurus/issues) or [fork](https://github.com/Pankeking/kitchen-gurus/fork) and [pull request](https://github.com/Pankeking/kitchen-gurus/pulls)
