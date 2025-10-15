import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import EditNote from './components/Notes/EditNote';
import { NoteList } from './components/Notes/NoteList';
import RegisterNote from './components/Notes/RegisterNote';
import LoginPage from './components/Auth/LoginPage';
import Header from './components/Header';
import { useEffect, useState } from 'react';

function App() {
  const [userLogged, setUserLogged] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUserLogged(true);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header userLogged={userLogged} setUserLogged={setUserLogged} />

        <div className="main-content">
          {!userLogged ? (
            <LoginPage onLogin={() => setUserLogged(true)} />
          ) : (
            <>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Lista de Notas</Link>
                  </li>
                  <li>
                    <Link to="/register">Registrar Nota</Link>
                  </li>
                </ul>
              </nav>

              {/* Contenido principal */}
              <div className="container">
                <Routes>
                  <Route path="/" element={<NoteList />} />
                  <Route path="/register" element={<RegisterNote />} />
                  <Route path="/edit/:id" element={<EditNote />} />

                  {/* Rutas protegidas: si no está logueado, redirige a login */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </>
          )}
        </div>

        <footer>
          <p className="p-footer">&copy; 2025 Mi Aplicación de Notas</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
