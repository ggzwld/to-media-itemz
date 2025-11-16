import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Media from './pages/Media';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/media"
              element={
                <ProtectedRoute>
                  <Media />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
