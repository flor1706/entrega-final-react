import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h2 className="logo">Tech Store</h2>

      <nav className="nav">
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
          Carrito
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;