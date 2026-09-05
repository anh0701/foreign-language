import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WordGamePage from './pages/WordGamePage';
import FillInPage from './pages/FillInPage';
import MatchingPage from './pages/MatchingPage';
import FlashcardPage from './pages/FlashcardPage';
import ShortStoryPage from './pages/ShortStoryPage';
import QuoteBookPage from './pages/QuoteBookPage';
import EnglishNotesPage from './pages/EnglishNotesPage';
import EnglishNoteDetailPage from './pages/EnglishNoteDetailPage';
import ScrollToTop from './components/common/ScrollToTop';

function App() {

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/word-combination" element={<WordGamePage />} />
          <Route path="/fill-in" element={<FillInPage />} />
          <Route path="/matching" element={<MatchingPage />} />
          <Route path="/flashcards" element={<FlashcardPage />} />
          <Route path="/short-stories" element={<ShortStoryPage />} />
          <Route path="/quotes" element={<QuoteBookPage />} />
          <Route
            path="/english-notes"
            element={<EnglishNotesPage />}
          />

          <Route
            path="/english-notes/:slug"
            element={<EnglishNoteDetailPage />}
          />

          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;