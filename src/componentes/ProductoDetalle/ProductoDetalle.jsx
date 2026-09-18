import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductoDetalle() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        const productoEncontrado = datos.find(
          (producto) => producto.id === Number(id)
        );

        setProducto(productoEncontrado);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al cargar el producto:", error);
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return <p>Cargando producto...</p>;
  }

  if (!producto) {
    return (
      <div className="producto-detalle">
        <h2>Producto no encontrado</h2>
        <Link className="boton" to="/productos">
          Volver a productos
        </Link>
      </div>
    );
  }

  return (
    <section className="producto-detalle">
      <img
        className="detalle-imagen"
        src={producto.imagen}
        alt={producto.nombre}
      />

      <div>
        <h1>{producto.nombre}</h1>
        <p>Precio: ${producto.precio}</p>
        <p>Stock disponible: {producto.stock}</p>

        <Link className="boton" to="/productos">
          Volver a productos
        </Link>
      </div>
    </section>
  );
}

export default ProductoDetalle;