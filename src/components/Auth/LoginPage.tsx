import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import googlelogo from "../../assets/logoGoogle.png";
import { auth, provider } from "./firebaseConfig";
import LoginEmail from "./LoginEmail";
import "./LoginPage.css";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      onLogin();
      navigate("/"); // redirige al NoteList
    } catch (error) {
      console.error("Error en login con Google:", error);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <h2>Iniciar sesión</h2>

        <button className="btn-primary" onClick={handleGoogleLogin}>
          <img src={googlelogo} alt="Google Logo" className="login-icon"/>
          Iniciar sesión con Google
        </button>

        <hr />

        <LoginEmail onLogin={() => {
          onLogin();
          navigate("/"); // mismo comportamiento para login con email
        }} />
      </div>
    </div>
  );
}
