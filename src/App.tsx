import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WordGamePage from './pages/WordGamePage'; 
import FillInPage from './pages/FillInPage';

function App() {
  // Thay 'foreign-language' bằng tên repository của bạn trên GitHub
  const repoName = "/foreign-language";

  return (
    <Router basename={repoName}>
      <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/word-combination" element={<WordGamePage />} />
          <Route path="/fill-in" element={<FillInPage />} />
          
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;