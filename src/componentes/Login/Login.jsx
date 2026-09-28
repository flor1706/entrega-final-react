import { useNavigate } from "react-router-dom";

function Login({ iniciarSesion }) {
  const navigate = useNavigate();

  const manejarLogin = () => {
    iniciarSesion();
    navigate("/carrito");
  };

  return (
    <section className="pagina">
      <h1>Iniciar sesión</h1>

      <p>
        Debes iniciar sesión para acceder al carrito.
      </p>

      <button
        className="boton"
        onClick={manejarLogin}
      >
        Iniciar sesión
      </button>
    </section>
  );
}

export default Login;