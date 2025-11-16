import { Link, useNavigate } from 'react-router-dom';
import { Crown, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={user ? '/dashboard' : '/'} className="flex items-center space-x-2">
            <Crown className="w-8 h-8 text-rose-400" />
            <span className="text-xl font-playfair font-bold text-white">FlourishTalents</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link to="/media" className="text-gray-300 hover:text-white transition-colors">
                  Media
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-300 text-sm">
                    {user.name}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
