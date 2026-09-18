import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h2 className="logo">Tech Store</h2>

      <nav className="nav">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/carrito">Carrito</Link>
      </nav>
    </header>
  );
}

export default Header;