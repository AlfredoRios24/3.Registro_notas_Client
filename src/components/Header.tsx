import { useNavigate } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  userLogged: boolean;
  setUserLogged: (value: boolean) => void;
}

export default function Header({ userLogged, setUserLogged }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserLogged(false);
    navigate('/login');
  };

  return (
    <header>
      <div className="header-left">
        <h1>Aplicación de Notas</h1>
      </div>

      <div className="header-right">
        <button
          className="swagger-btn"
          onClick={() =>
            window.open(
              'https://three-registro-notas-server.onrender.com/swagger-ui/index.html',
              '_blank'
            )
          }
        >
          Swagger
        </button>

        {userLogged && (
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        )}
      </div>
    </header>
  );
}
