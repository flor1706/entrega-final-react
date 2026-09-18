import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";

export function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando productos...</p>;
  }

  return (
    <section className="productos-container">
      <h1>Nuestros productos</h1>
      <ItemList productos={productos} />
    </section>
  );
}