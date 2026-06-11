import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/Layouts/PrivateRoute';
import PublicLayout from './components/Layouts/PublicLayout';
import SharedLayout from './components/Layouts/SharedLayout';
import AuthForm from './features/auth/components/AuthForm/AuthForm';
import PublishedStories from './features/stories/components/PublishedStories/PublishedStories';
import SavedStories from './features/stories/components/SavedStories/SavedStories';
import AddStoryPage from './pages/AddStoryPage/AddStoryPage';
import AuthPage from './pages/AuthPage/AuthPage';
import EditStoryPage from './pages/EditStoryPage/EditStoryPage';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage/ProfilePage';
import StoriesPage from './pages/StoriesPage/StoriesPage';
import StoryPage from './pages/StoryPage/StoryPage';
import TravellerPage from './pages/TravellerPage/TravellerPage';
import TravellersPage from './pages/TravellersPage/TravellersPage';

function App() {
  // JSX
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="stories" element={<StoriesPage />} />
          <Route path="stories/:storyId" element={<StoryPage />} />
          <Route path="travellers" element={<TravellersPage />} />
          <Route path="travellers/:travallerId" element={<TravellerPage />} />

          {/* Regidter */}
          <Route path="auth" element={<AuthPage />}>
            <Route index element={<Navigate to="register" replace />} />
            <Route path="register" element={<AuthForm />} />
            <Route path="login" element={<AuthForm />} />
          </Route>
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<ProfilePage />}>
            <Route index element={<Navigate to="saved-stories" replace />} />
            <Route path="saved-stories" element={<SavedStories />} />
            <Route path="published-stories" element={<PublishedStories />} />
          </Route>
          <Route path="stories/create" element={<AddStoryPage />} />
          <Route path="stories/:storyId/edit" element={<EditStoryPage />} />
        </Route>
      </Route>
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
}

export default App;
