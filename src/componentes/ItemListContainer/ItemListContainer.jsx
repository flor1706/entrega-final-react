
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { ItemList } from "../ItemList/ItemList";
import { useCart } from "../../context/CartContext";


export function ItemListContainer({ agregarAlCarrito }) {
  const { mensajeStock } = useCart();
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function obtenerProductos() {
      try {
        const referencia = collection(db, "productos");
        const resultado = await getDocs(referencia);

        const listaProductos = resultado.docs.map((documento) => ({
          ...documento.data(),
          id: documento.id,
        }));

        setProductos(listaProductos);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setError(true);
      } finally {
        setCargando(false);
      }
    }

    obtenerProductos();
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase())
  );

  if (cargando) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Ocurrió un error al cargar los productos.</p>;
  }

  return (
    <section className="productos-container">
      <h1>Nuestros productos</h1>
  {mensajeStock && (
  <p className="mensaje-stock" role="alert">
    {mensajeStock}
  </p>
)}

      <div>
        <label htmlFor="busqueda">Buscar productos</label>

        <input
          id="busqueda"
          type="text"
          placeholder="Escribí el nombre de un producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {productosFiltrados.length > 0 ? (
        <ItemList
          productos={productosFiltrados}
          agregarAlCarrito={agregarAlCarrito}
        />
      ) : (
        <p>No se encontraron productos con ese nombre.</p>
      )}
    </section>
  );
}
