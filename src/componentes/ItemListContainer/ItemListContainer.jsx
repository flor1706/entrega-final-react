import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";

export function ItemListContainer({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((respuesta) => {
  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los productos");
  }

  return respuesta.json();
})
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        setError(true);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return (
      <p>
        Ocurrió un error al cargar los productos.
      </p>
    );
  }

  return (
    <section className="productos-container">
      <h1>Nuestros productos</h1>

      <ItemList
        productos={productos}
        agregarAlCarrito={agregarAlCarrito}
      />
    </section>
  );
}