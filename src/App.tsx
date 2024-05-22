import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './providers/AuthProvider';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseConfig';
import { User } from 'firebase/auth';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Ajusta la ruta de inicio para redirigir al dashboard si el usuario ya está autenticado */}
          <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
