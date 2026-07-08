import { Route, Routes } from 'react-router';
import './App.css'
import HomePage from './pages/HomePage';
import NoteDetailPage from './pages/NoteDetailPage';
import CreatePage from './pages/CreatePage';
import toast from 'react-hot-toast';
import daisyui from 'daisyui';
import Navbar from './components/Navbar';
import NotesNotFound from './components/NotesNotFound';

function App() {

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/create' element={<CreatePage />}></Route>
        <Route path='/note/:id' element={<NoteDetailPage />}></Route>
      </Routes>  
    </div>
  )
}

export default App;
