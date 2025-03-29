import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Login from './pages/LogInPage';
import Register from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import VendorDashboard from './pages/VendorDashboard';
import AlumniDashboard from './pages/AlumniDashboard';
import JobBoard from './pages/JobBoard';
import JobDetails from './components/JobDetails';
import AddEditJob from './components/AddEditJob';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Contact from './pages/Contact';
import About from './pages/About';
import GetInvolved from './pages/GetInvolved';
import RegisterPage from './pages/RegisterPage';
function App() {
  return (
    <div className="app">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/GetInvolved" element={<GetInvolved />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="/add" element={
            <ProtectedRoute allowedRoles={['admin', 'vendor']}>
              <AddEditJob />
            </ProtectedRoute>
          } />
          
          <Route path="/edit/:id" element={
            <ProtectedRoute allowedRoles={['admin', 'vendor']}>
              <AddEditJob />
            </ProtectedRoute>
          } />
          
          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/vendor-dashboard" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <VendorDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/alumni-dashboard" element={
            <ProtectedRoute allowedRoles={['alumni']}>
              <AlumniDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;