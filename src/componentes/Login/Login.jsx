
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarLogin = async (e) => {
    e.preventDefault();

    setError("");
    setCargando(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/productos");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      setError(
        "No se pudo iniciar sesión. Verificá tu correo y contraseña."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="pagina">
      <h1>Iniciar sesión</h1>

      <p>
        Ingresá tu correo electrónico y contraseña.
      </p>

      <form onSubmit={manejarLogin}>
        <div>
          <label htmlFor="email">Correo electrónico</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button
          className="boton"
          type="submit"
          disabled={cargando}
        >
          {cargando ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>
    </section>
  );
}

export default Login;
