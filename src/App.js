import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoggedInHome from './components/LoggedInHome';
import Login from './components/Login';
import Signup from './components/Signup';
import Memo from './components/Memo';
import NotFound from './components/NotFound';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// 보호된 라우트를 위한 컴포넌트
const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/memo" element={<Memo />} />
                    {/* <Route path="/memo" element={<ProtectedRoute><Memo /></ProtectedRoute>} /> */}
                    <Route path="/home" element={<ProtectedRoute><LoggedInHome /></ProtectedRoute>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;