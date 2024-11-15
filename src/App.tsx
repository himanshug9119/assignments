import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AuthGuard from './components/AuthGuard';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CarForm from './pages/CarForm';
import CarDetail from './pages/CarDetail';
import EditCarForm from './pages/EditCarForm';
import Footer from './components/Footer';
import PageNotFound from './components/PageNotFound';
import Documentation from './pages/Documentation';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* documentation */}
          <Route path="/documentation" element={<Documentation />} />
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/cars/new"
            element={
              <AuthGuard>
                <CarForm />
              </AuthGuard>
            }
          />
          <Route
            path="/cars/:id"
            element={
              <AuthGuard>
                <CarDetail />
              </AuthGuard>
            }
          />
          <Route
            path="/cars/:id/edit"
            element={
              <AuthGuard>
                <EditCarForm />
              </AuthGuard>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;