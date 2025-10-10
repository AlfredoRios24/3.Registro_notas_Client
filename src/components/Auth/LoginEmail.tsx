import { useState } from "react";
import { loginWithEmail, registerWithEmail } from "./emailAuth";

interface LoginEmailProps {
  onLogin: () => void;
}

export default function LoginEmail({ onLogin }: LoginEmailProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = isRegister
        ? await registerWithEmail(email, password)
        : await loginWithEmail(email, password);

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      onLogin();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="login-email-container">
      <h3>{isRegister ? "Registrar con Email" : "Iniciar sesión con Email"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegister ? "Registrar" : "Iniciar sesión"}</button>
      </form>
      <button className="toggle-btn" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Ya tengo cuenta" : "Crear nueva cuenta"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
