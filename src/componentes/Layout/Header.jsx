
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

function Header() {
  const { cantidadTotal } = useCart();
  const { usuario, cargando } = useAuth();
  const esAdmin =
  !!usuario &&
  !!import.meta.env.VITE_ADMIN_UID &&
  usuario.uid === import.meta.env.VITE_ADMIN_UID;
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("No se pudo cerrar la sesión.");
    }
  };

  return (
    <header className="header">
      <h2 className="logo">Tech Store</h2>

      <nav className="nav">

        {esAdmin && (
  <NavLink
    to="/admin"
    className={({ isActive }) => (isActive ? "activo" : "")}
  >
    Administración
  </NavLink>
)}
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "activo" : "")}
        >
          Inicio
        </NavLink>

        <NavLink
          to="/productos"
          className={({ isActive }) => (isActive ? "activo" : "")}
        >
          Productos
        </NavLink>

        <NavLink
          to="/carrito"
          className={({ isActive }) => (isActive ? "activo" : "")}
        >
          Carrito ({cantidadTotal})
        </NavLink>

        {!cargando && (
          usuario ? (
            <button
              className="boton"
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "activo" : ""
              }
            >
              Iniciar sesión
            </NavLink>
          )
        )}
      </nav>
    </header>
  );
}

export default Header;
