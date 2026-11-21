
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [esRegistro, setEsRegistro] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (esRegistro && password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (esRegistro && password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setCargando(true);

    try {
      if (esRegistro) {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      navigate("/productos");
    } catch (error) {
      console.error("Error de autenticación:", error);

      if (error.code === "auth/email-already-in-use") {
        setError("Este correo electrónico ya está registrado.");
      } else if (error.code === "auth/invalid-email") {
        setError("El correo electrónico no es válido.");
      } else if (error.code === "auth/weak-password") {
        setError("La contraseña es demasiado débil.");
      } else {
        setError(
          esRegistro
            ? "No se pudo crear la cuenta. Intentá nuevamente."
            : "No se pudo iniciar sesión. Verificá tus datos."
        );
      }
    } finally {
      setCargando(false);
    }
  };

  const cambiarModo = () => {
    setEsRegistro(!esRegistro);
    setEmail("");
    setPassword("");
    setConfirmarPassword("");
    setError("");
  };

  return (
    <section className="pagina">
      <h1>
        {esRegistro ? "Crear cuenta" : "Iniciar sesión"}
      </h1>

      <p>
        {esRegistro
          ? "Registrate para crear tu cuenta en Tech Store."
          : "Ingresá tu correo electrónico y contraseña."}
      </p>

      <form onSubmit={manejarSubmit}>
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
            minLength={esRegistro ? 6 : undefined}
            required
          />
        </div>

        {esRegistro && (
          <div>
            <label htmlFor="confirmarPassword">
              Confirmar contraseña
            </label>

            <input
              id="confirmarPassword"
              type="password"
              value={confirmarPassword}
              onChange={(e) =>
                setConfirmarPassword(e.target.value)
              }
              placeholder="Repetí tu contraseña"
              required
            />
          </div>
        )}

        {error && <p role="alert">{error}</p>}

        <button
          className="boton"
          type="submit"
          disabled={cargando}
        >
          {cargando
            ? "Procesando..."
            : esRegistro
            ? "Crear cuenta"
            : "Iniciar sesión"}
        </button>
      </form>

      <p>
        {esRegistro
          ? "¿Ya tenés una cuenta?"
          : "¿Todavía no tenés una cuenta?"}
      </p>

      <button
        type="button"
        className="boton"
        onClick={cambiarModo}
        disabled={cargando}
      >
        {esRegistro
          ? "Ir a iniciar sesión"
          : "Registrarme"}
      </button>
    </section>
  );
}

export default Login;
