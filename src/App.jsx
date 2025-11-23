import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import FilterButtons from './components/FilterButtons.js';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen text-slate-900 relative">
      <Navbar />
      <FilterButtons selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
      <Home selectedCategory={selectedCategory} />
    </div>
  );
}

export default App;
