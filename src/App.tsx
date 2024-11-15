import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthGuard from './components/AuthGuard';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CarForm from './pages/CarForm';
import CarDetail from './pages/CarDetail';
import EditCarForm from './pages/EditCarForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          } />
          <Route path="/cars/new" element={
            <AuthGuard>
              <CarForm />
            </AuthGuard>
          } />
          <Route path="/cars/:id" element={
            <AuthGuard>
              <CarDetail />
            </AuthGuard>
          } />
          <Route path="/cars/:id/edit" element={
            <AuthGuard>
              <EditCarForm />
            </AuthGuard>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;