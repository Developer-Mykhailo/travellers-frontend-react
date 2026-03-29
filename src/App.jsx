import { Navigate, Route, Routes } from 'react-router-dom';

import PublicLayout from './components/Layouts/PublicLayout';
import SharedLayout from './components/Layouts/SharedLayout';
import HomePage from './pages/HomePage/HomePage';
import StoriesPage from './pages/StoriesPage/StoriesPage';
import StoryPage from './pages/StoryPage/StoryPage';
import TravellersPage from './pages/TravellersPage/TravellersPage';
import TravellerPage from './pages/TravellerPage/TravellerPage';
import ProfilePage from './pages/ProfilePage/ProfilePage/ProfilePage';
import TravellersStoriesItem from './features/stories/components/TravellersStoriesItem/TravellersStoriesItem';

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
          <Route path="saved-stories" element={<TravellersStoriesItem />} />
          <Route path="published-stories" element={<TravellersStoriesItem />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
