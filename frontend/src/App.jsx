import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IGCNominas from './IGCNominas';
import EmpresasPage from './pages/EmpresasPage';
import ObrasPage from './pages/ObrasPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IGCNominas />} />
        <Route path="/empresas" element={<EmpresasPage />} />
        <Route path="/obras" element={<ObrasPage />} />
      </Routes>
    </Router>
  );
}

export default App;