import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './providers/AuthProvider';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseConfig';

const App: React.FC = () => {
  useEffect(() => {
    // Verifica si hay un usuario autenticado previamente al cargar la aplicación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si hay un usuario autenticado, redirige al dashboard u otra página privada
        // Aquí puedes llamar a tu función de inicio de sesión automática o establecer el estado de autenticación
        return <Navigate to="/dashboard" replace />;
      }
    });

    // Cancela la suscripción al desmontar el componente para evitar pérdida de rendimiento
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
