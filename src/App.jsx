import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MedicamentosPage from './pages/MedicamentosPage';
import IntegrantesPage from './pages/IntegrantesPage';
import CuidadoresPage from './pages/CuidadoresPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registrarme" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/medicamentos" element={<MedicamentosPage />} />
        <Route path="/integrantes" element={<IntegrantesPage />} />
        <Route path="/cuidadores" element={<CuidadoresPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
