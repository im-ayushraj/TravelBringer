import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Home from './pages/Home';
import PostTravel from './pages/PostTravel';
import Dashboard from './pages/Dashboard'; // Correct for default export
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-blue-50 flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post-travel" element={<PostTravel />} />
            <Route path="/dashboard" element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
function isLoggedIn() {
  return !!localStorage.getItem("token");
}


export default App;
