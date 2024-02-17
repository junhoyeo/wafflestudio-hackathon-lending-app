import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Button } from '@/components/ui/button';

function Hello() {
  return (
    <div>
      <h1 className="bg-gray-500 text-center text-white">
        <Button>SSS</Button>
      </h1>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
