import { Navigate, Route, Routes } from 'react-router-dom';

import PublicLayout from './components/Layouts/PublicLayout';
import SharedLayout from './components/Layouts/SharedLayout';
import PublishedStories from './features/stories/components/PublishedStories/PublishedStories';
import SavedStories from './features/stories/components/SavedStories/SavedStories';
import AddStoryPage from './pages/AddStoryPage/AddStoryPage';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage/ProfilePage';
import StoriesPage from './pages/StoriesPage/StoriesPage';
import StoryPage from './pages/StoryPage/StoryPage';
import TravellerPage from './pages/TravellerPage/TravellerPage';
import TravellersPage from './pages/TravellersPage/TravellersPage';
import EditStoryPage from './pages/EditStoryPage/EditStoryPage';

function App() {
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
        </Route>

        {/* Private routes */}
        <Route path="profile" element={<ProfilePage />}>
          <Route index element={<Navigate to="saved-stories" replace />} />
          <Route path="saved-stories" element={<SavedStories />} />
          <Route path="published-stories" element={<PublishedStories />} />
        </Route>
        <Route path="stories/create" element={<AddStoryPage />} />
        <Route path="stories/:storyId/edit" element={<EditStoryPage />} />
      </Route>
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
}

export default App;
