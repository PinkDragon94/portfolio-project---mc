import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './src/pages/HomePage';
import Login from './src/pages/LogInPage';
import Register from './src/pages/RegisterPage';
import AdminDashboard from './src/pages/AdminDashboard';
import VendorDashboard from './src/pages/VendorDashboard';
import AlumniDashboard from './src/pages/AlumniDashboard';
import JobBoard from './src/pages/JobBoard';
import JobDetails from './src/components/JobDetails';
import AddEditJob from './src/components/AddEditJob';
import Profile from './src/components/Profile';
import NotFound from './src/components/NotFound';
import NavBar from './src/components/NavBar';
import ProtectedRoute from './src/components/ProtectedRoute';
import Contact from './src/pages/Contact';
import About from './src/pages/About';
import GetInvolved from './src/pages/GetInvolved';
import RegisterPage from './src/pages/RegisterPage';
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