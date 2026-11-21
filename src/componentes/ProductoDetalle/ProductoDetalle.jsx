
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

function ProductoDetalle() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function obtenerProducto() {
      setCargando(true);
      setError(false);
      setProducto(null);

      try {
        const referencia = doc(db, "productos", id);
        const resultado = await getDoc(referencia);

        if (resultado.exists()) {
          setProducto({
            ...resultado.data(),
            id: resultado.id,
          });
        }
      } catch (error) {
        console.error("Error al cargar el producto:", error);
        setError(true);
      } finally {
        setCargando(false);
      }
    }

    obtenerProducto();
  }, [id]);

  if (cargando) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return <p>Ocurrió un error al cargar el producto.</p>;
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
        <p>
  Precio: ${producto.precio.toLocaleString("es-AR")}
</p>
        <p>Stock disponible: {producto.stock}</p>

        <Link className="boton" to="/productos">
          Volver a productos
        </Link>
      </div>
    </section>
  );
}

export default ProductoDetalle;
