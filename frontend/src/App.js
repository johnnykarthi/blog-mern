
import './App.css';
import AdminComponent from './components/AdminComponent';
import BlogContentLayout from './components/BlogContentLayout';
import Home from './components/Home';
import {Route,Routes} from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/blog/:blogId" element={<BlogContentLayout/>}/>
      <Route path="/admin" element={<AdminComponent/>}/>
    </Routes>
  );
}

export default App;
