import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen text-slate-900 relative">
      <Navbar />
      <Home selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
    </div>
  );
}

export default App;
