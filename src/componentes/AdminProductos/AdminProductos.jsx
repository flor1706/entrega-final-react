
import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import FormularioProducto from "./FormularioProducto";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const obtenerProductos = async () => {
    try {
      setError("");

      const referencia = collection(db, "productos");
      const resultado = await getDocs(referencia);

      const listaProductos = resultado.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));

      setProductos(listaProductos);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError("No se pudieron cargar los productos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const editarProducto = (producto) => {
    setProductoEditar(producto);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelarEdicion = () => {
    setProductoEditar(null);
  };

  const productoGuardado = () => {
    setProductoEditar(null);
    obtenerProductos();
  };


const eliminarProducto = async (producto) => {
  const confirmar = window.confirm(
    `¿Estás segura de eliminar "${producto.nombre}"?`
  );

  if (!confirmar) {
    return;
  }

  try {
    const referencia = doc(db, "productos", producto.id);

    await deleteDoc(referencia);

    if (productoEditar?.id === producto.id) {
      setProductoEditar(null);
    }

    await obtenerProductos();

    alert("Producto eliminado correctamente.");
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    alert("No se pudo eliminar el producto.");
  }
};


  return (
    <section className="pagina">
      <h1>Administración de productos</h1>

      <p>
        Desde esta sección podemos agregar y editar
        los productos de Tech Store.
      </p>

      <FormularioProducto
        productoEditar={productoEditar}
        onProductoGuardado={productoGuardado}
        onCancelar={cancelarEdicion}
      />

      <h2>Productos registrados</h2>

      {cargando && <p>Cargando productos...</p>}

      {error && <p role="alert">{error}</p>}

      {!cargando && !error && (
        <div className="productos-grid">
          {productos.map((producto) => (
            <div className="producto-card" key={producto.id}>
              <img
                className="producto-imagen"
                src={producto.imagen}
                alt={producto.nombre}
              />

              <h3>{producto.nombre}</h3>

              <p>
  Precio: ${producto.precio.toLocaleString("es-AR")}
</p>
              <p>Stock: {producto.stock}</p>

              <button
                className="boton"
                onClick={() => editarProducto(producto)}
              >
                Editar
              </button>

              <button
  className="boton"
  onClick={() => eliminarProducto(producto)}
>
  Eliminar
</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminProductos;

