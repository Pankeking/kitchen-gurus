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

## Styling Selection

- Default Icon: MaterialCommunityIcons from @expo/vector-icons
  - Icon Size: 32
- Font Family
  - Main
    - PlaypenSans: SemiBold | Bold
  - Optional
    - Handlee: Regular
    - SpaceMono: Regular
  
## Database Firestore Collections

- Users
  - Each document represents a user and has fields like userId, username, email, profilePicture, BGprofilePicture, bio, etc.
  - Denormalized Followers/Followed
  
- Recipes
  - Each document represents a recipe and has fields like recipeId, title, description, ingredients, instructions, imageUrl, chefId, etc.
  - The chefId field references the ID of the user who created the recipe.

- Followers
  - Each document represents a follower relationship between two users and has fields like followerId and followingId.
  - This collection allows you to track which users are following each other.

- Likes
  - Each document represents a like given by a user to a recipe.
  - It has fields like userId and recipeId to track the association between users and recipes.

- Comments
  - Each document represents a comment made by a user on a recipe.
  - It has fields like commentId, userId, recipeId, content, timestamp, etc.

## TODO

- Delete user functionality
- Password security regEx
- Email Confirmation
- Email Link
- Email template
- On boarding tunnel
- Delete Image, Limit 10 Photos -> Content-Add Photo Screen/
- Re-work Login/Register Screens -> [Example Template](https://reactnativeexample.com/react-native-starter-kit-with-firebase-auth-and-facebook-login/)

## Current working tree - files (DATE)

- Profile Screen (WIP OCT 23)
  
  - DEVELOPER NOTES - ###
    - First template Sucked ### Had to re-start after whole day's work
    - The image selector / uri resets and actives useEffect provoking unexpected behavior on state.auth.user.photoURL

  - Components (Social Media, Followers, Likes, Recipes)
    - Network Components Container / View
    - Personal Feed
      - NetWork content
      - OutOf NetWork content
      - Ads
  
  - Content Screen (WIP OCT 30)  
    - Edit
    - Share
      - Structure the recipe as JSON/Firebase Format
      - Make firebase logic
      - Visualize

- Settings Screen (WIP OCT 24)
  - Alignment
    - Inner options containers
    - Option info / text / button
  - Background
    - Title
    - Options
    - Buttons
  - Re-usable component/s
    - Option with: Icon / Icon #2 / Text / Button
    - #2 Options group
  - Buttons
    - Toggle Dark/Light - On/Off - Profile Selector(Chef, Guest)  
  - Logic
    - Settings functionality

## Work Done (DATE)

- Bottom Tab & Profile ---> Route ----> (done 3 NOV)
- Index Screen (wip 1 nov ->>> done 28 NOV)
  - Alignment & Display
  - Re-usable CheckList Component
  - Add Name
  - Add Photo (wip 5 nov ----> done 17 NOV)
    - Photo Previewer (wip 6 nov ----> done 17 NOV)
    - Camera Component/Screen
  - Add Instructions (wip 18 nov ----> done 22 NOV)
    - Instructions Layout
    - Step Layout
    - Step-Title
    - Step-Text
    - Update/Dispatch + Auto-Display
  - Add Ingredients (wip 22 nov ----> done 27 NOV)
    - Align & Display
    - Add Ingredients Format
    - Flatlist Display Ingredients
    - New Ingredient
    - Save in Store
  - Add Extras ----> (done NOV 28)
    - Align Display
    - Chips of selection
    - List
    - Send To Store

- VACATIONS (NOV 8 - NOV 16)

- Profile Items persistance (DONE 29 OCT)
  - FireStore Visualization
  - FireBase Cloud Storage
  - FireStore Documents
  - FireBase Auth link to Store

- Profile Screen Alignment (DONE 28 OCT)
  - ProfilePic / Button
  - BackgroundPic / Button
  - Bio Text / Icons
  - NetWork Info Display
  - Upload New Button

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

## Dev Notes

- Decided to make the details screen only of ingredients -> moved cuisine type and approximate time to extra info screen. Reason for this is a better display and understanding of the ingredient actions (adding, editing, removing, selecting).
