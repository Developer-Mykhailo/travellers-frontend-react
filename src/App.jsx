import { Route, Routes } from 'react-router-dom';

import PublicLayout from './components/Layouts/PublicLayout';
import SharedLayout from './components/Layouts/SharedLayout';
import HomePage from './pages/HomePage/HomePage';
import StoriesPage from './pages/StoriesPage/StoriesPage';
import StoryPage from './pages/StoryPage/StoryPage';
import TravellersPage from './pages/TravellersPage/TravellersPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {/* Public routs */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="stories" element={<StoriesPage />} />
          <Route path="stories/:storyId" element={<StoryPage />} />
          <Route path="travellers" element={<TravellersPage />} />
          <Route path="travellers/:travallerId" element={<TravellersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
