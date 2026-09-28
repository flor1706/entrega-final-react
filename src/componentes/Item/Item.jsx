import { Link } from "react-router-dom";

export function Item({
  id,
  nombre,
  precio,
  stock,
  imagen,
  agregarAlCarrito,
}) {
  const producto = {
    id,
    nombre,
    precio,
    stock,
    imagen,
  };

  return (
    <div className="producto-card">
      <img
        className="producto-imagen"
        src={imagen}
        alt={nombre}
      />

      <h3>{nombre}</h3>

      <p>Precio: ${precio}</p>

      <p>Stock: {stock}</p>

      <Link className="boton" to={`/producto/${id}`}>
        Ver detalle
      </Link>

      <button
        className="boton"
        onClick={() => agregarAlCarrito(producto)}
      >
        Agregar al carrito
      </button>
    </div>
  );
}