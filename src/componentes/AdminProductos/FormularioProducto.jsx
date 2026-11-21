
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

function FormularioProducto({
  productoEditar,
  onProductoGuardado,
  onCancelar,
}) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (productoEditar) {
      setNombre(productoEditar.nombre);
      setPrecio(String(productoEditar.precio));
      setStock(String(productoEditar.stock));
      setImagen(productoEditar.imagen);
    } else {
      setNombre("");
      setPrecio("");
      setStock("");
      setImagen("");
    }

    setError("");
  }, [productoEditar]);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !nombre.trim() ||
      !imagen.trim() ||
      !Number.isFinite(Number(precio)) ||
      Number(precio) <= 0 ||
      !Number.isInteger(Number(stock)) ||
      Number(stock) < 0
    ) {
      setError("Revisá los datos del producto.");
      return;
    }

    setGuardando(true);

    const datosProducto = {
      nombre: nombre.trim(),
      precio: Number(precio),
      stock: Number(stock),
      imagen: imagen.trim(),
    };

    try {
      if (productoEditar) {
        const referencia = doc(
          db,
          "productos",
          productoEditar.id
        );

        await updateDoc(referencia, datosProducto);

        alert("Producto actualizado correctamente.");
      } else {
        await addDoc(
          collection(db, "productos"),
          datosProducto
        );

        alert("Producto agregado correctamente.");
      }

      setNombre("");
      setPrecio("");
      setStock("");
      setImagen("");

      if (onProductoGuardado) {
        onProductoGuardado();
      }
    } catch (error) {
      console.error("Error al guardar producto:", error);
      setError("No se pudo guardar el producto.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h2>
        {productoEditar
          ? "Editar producto"
          : "Agregar nuevo producto"}
      </h2>

      <div>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="precio">Precio</label>
        <input
          id="precio"
          type="number"
          min="1"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          type="number"
          min="0"
          step="1"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="imagen">
          Ruta de la imagen
        </label>
        <input
          id="imagen"
          type="text"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          placeholder="/images/producto.jpg"
          required
        />
      </div>

      {error && <p role="alert">{error}</p>}

      <button
        className="boton"
        type="submit"
        disabled={guardando}
      >
        {guardando
          ? "Guardando..."
          : productoEditar
          ? "Guardar cambios"
          : "Agregar producto"}
      </button>

      {productoEditar && (
        <button
          className="boton"
          type="button"
          onClick={onCancelar}
          disabled={guardando}
        >
          Cancelar edición
        </button>
      )}
    </form>
  );
}

export default FormularioProducto;
