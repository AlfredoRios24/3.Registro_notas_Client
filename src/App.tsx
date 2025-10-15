import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import EditNote from './components/Notes/EditNote';
import { NoteList } from './components/Notes/NoteList';
import RegisterNote from './components/Notes/RegisterNote';
import { useEffect, useState } from 'react';
import LoginPage from './components/Auth/LoginPage';

function App() {
  const [userLogged, setUserLogged] = useState<boolean>(false);

  // Comprobar si hay token al iniciar la app
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUserLogged(true);
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // o usar navigate("/login");
};

  return (
    <Router>
      <div className="app-container">
        <div className="main-content">
          <header>
            <div className="header-left">
              <h1>Aplicación de Notas</h1>
            </div>
              <div className="header-right">
              <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
            </div>
          </header>

          {!userLogged ? (
            // Mostrar login si no está logueado
            <LoginPage onLogin={() => setUserLogged(true)} />
          ) : (
            // Mostrar contenido de notas si está logueado
            <>
              <nav>
                <ul>
                  <li><Link to="/">Lista de Notas</Link></li>
                  <li><Link to="/register">Registrar Nota</Link></li>
                  
                </ul>
              </nav>

              <div className="container">
                <Routes>
                  <Route path="/" element={<NoteList />} />
                  <Route path="/register" element={<RegisterNote />} />
                  <Route path="/edit/:id" element={<EditNote />} />
                </Routes>
              </div>
            </>
          )}

          <footer>
            <p className='p-footer'>&copy; 2025 Mi Aplicación de Notas</p>
            <li>
                <a
                href="https://three-registro-notas-server.onrender.com/swagger-ui/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="swagger-link"
              >
                Swagger
              </a>
             
            </li>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
