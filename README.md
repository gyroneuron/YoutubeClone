YouTubeClone App
YouTubeClone is a React Native Expo app that replicates the core functionalities of YouTube. This project uses Supabase as the backend service for authentication, database, and storage.

Features
Authentication
Email-based Login: Secure email-based authentication using Supabase.
Sign Up: Register new users with email and password.
Password Recovery: Recover password via email.
Session Management: Persist user sessions with automatic session refresh.
Home Screen
Video List: Display a list of all videos available on the platform.
Thumbnail Display: Show video thumbnails fetched from Supabase storage.
Video Details: Display video titles and other metadata.
Video Playback Screen
Video Player: Play videos using the video player component.
Video Details: Display video title, description, and upload date.
Related Videos: Show related videos based on tags or categories.
Profile Screen
User Info: Display user's name, email, and account creation date.
Profile Picture: Update and display profile picture.
Video Count: Show the number of videos uploaded by the user.
Logout: Log out from the account and clear session.
Search Functionality
Search Videos: Search videos by title from the Supabase database.
Search Results: Display the search results dynamically as the user types.
Upload Functionality
Video Upload: Upload videos from the device to Supabase storage.
Thumbnail Upload: Upload video thumbnails.
Progress Indicator: Show upload progress for videos and thumbnails.
Additional Features
User Avatar Update: Update user profile avatar with an image picker.
Responsive Design: Responsive UI for different screen sizes.
Custom Buttons: Reusable custom button component for consistent styling.
Menu Navigation: Menu buttons for navigation to different sections like "Your Channel", "Your Videos", "Downloads", etc.
Authentication Error Handling: Handle authentication errors gracefully with user-friendly messages.
Tech Stack
React Native: Framework for building native apps using React.
Expo: Toolset for developing and building React Native apps.
Supabase: Backend-as-a-Service providing authentication, database, and storage.
React Navigation: Navigation library for React Native apps.
Expo Router: Declarative routing for React Native.
Tailwind CSS: Utility-first CSS framework for styling (via tailwindcss-react-native).
Getting Started
To get a local copy of the project up and running, follow these steps.

Prerequisites
Node.js installed on your machine.
Expo CLI installed globally (npm install -g expo-cli).
Supabase account for backend services.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/gyroneuron/YoutubeClone.git
cd YoutubeClone
Install dependencies:

bash
Copy code
npm install
Configure Supabase:

Create a new project on Supabase.
Obtain your Supabase URL and public API key.
Create the necessary tables (profiles, videos, users) and configure storage buckets (avatars, videos).
Update the supabase.js configuration file with your Supabase project details.
Run the app:

bash
Copy code
expo start
Usage
Register or log in with an email and password.
Upload videos and thumbnails.
Browse and search for videos.
Update your profile picture.
Navigate through different sections using the menu.
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any bugs or feature requests.


Feel free to customize this description further based on your specific implementation and preferences.
