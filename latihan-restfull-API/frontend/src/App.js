import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';
import AddData from './components/AddData';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="details" element={<Details />} />
      <Route path="add" element={<AddData />} />
    </Routes>
  );
}

export default App;
