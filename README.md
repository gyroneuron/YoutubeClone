
---

# YouTubeClone App

YouTubeClone is a React Native Expo app that replicates the core functionalities of YouTube. This project uses Supabase as the backend service for authentication, database, and storage.

## Features

### Authentication
- **Email-based Login**: Secure email-based authentication using Supabase.
- **Sign Up**: Register new users with email and password.
- **Session Management**: Persist user sessions with automatic session refresh.

### Home Screen
- **Video List**: Display a list of all videos available on the platform.
- **Thumbnail Display**: Show video thumbnails fetched from Supabase storage.
- **Video Details**: Display video titles and other metadata.

### Video Playback Screen
- **Video Player**: Play videos using the video player component.
- **Video Details**: Display video title, description, and upload date.
- **Latest Videos**: Show latest videos based on date of upload.

### Profile Screen
- **User Info**: Display user's name, email, and account creation date.
- **Profile Picture**: Update and display profile picture.
- **Video Count**: Show the number of videos uploaded by the user.
- **Logout**: Log out from the account and clear session.

### Search Functionality
- **Search Videos**: Search videos by title from the Supabase database.
- **Search Results**: Display the search results dynamically as the user types.

### Upload Functionality
- **Video Upload**: Upload videos from the device to Supabase storage.
- **Thumbnail Upload**: Upload video thumbnails.
- **Title and Decsription**: Add beautiful title and description for each video.

### Additional Features
- **User Avatar Update**: Update user profile avatar with an image picker.
- **Responsive Design**: Responsive UI for different screen sizes.
- **Custom Buttons**: Reusable custom button component for consistent styling.
- **Menu Navigation(To be made functional in upcoming pushes)**: Menu buttons for navigation to different sections like "Your Channel," "Your Videos," "Downloads," etc.
- **Authentication Error Handling**: Handle authentication errors gracefully with user-friendly messages.


## Tech Stack
- React Native: Framework for building native apps using React.
- Expo: Toolset for developing and building React Native apps.
- Supabase: Backend-as-a-Service providing authentication, database, and storage.
- React Navigation: Navigation library for React Native apps.
- Expo Router: Declarative routing for React Native.
- NativeWind: Utility-first CSS framework for styling (via tailwindcss-react-native).

## Getting Started
To get a local copy of the project up and running, follow these steps:

### Prerequisites
- Node.js installed on your machine.
- Supabase account for backend services.

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/gyroneuron/YoutubeClone.git
    cd YoutubeClone
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure Supabase:
    - Create a new project on Supabase.
    - Obtain your Supabase URL and public API key.
    - Create the necessary tables (profiles, videos, users) and configure storage buckets (avatars, videos).
    - Update the `supabase.js` configuration file with your Supabase project details.

4. Run the app:
    ```bash
    npx expo start
    ```

## Usage
- Register or log in with an email and password.
- Upload videos and thumbnails.
- Browse and search for videos.
- Update your profile picture.
- Navigate through different sections using the menu.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any bugs or feature requests.
