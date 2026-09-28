import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "./componentes/Layout/Layout";
import { ItemListContainer } from "./componentes/ItemListContainer/ItemListContainer";
import ProductoDetalle from "./componentes/ProductoDetalle/ProductoDetalle";
import Cart from "./componentes/Cart/Cart";
import ProtectedRoute from "./componentes/ProtectedRoute/ProtectedRoute";
import Login from "./componentes/Login/Login";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [autenticado, setAutenticado] = useState(false);

const iniciarSesion = () => {
  setAutenticado(true);
};

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find(
      (item) => item.id === producto.id
    );

    if (productoExistente) {
      const carritoActualizado = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );

      setCarrito(carritoActualizado);
    } else {
      setCarrito([
        ...carrito,
        {
          ...producto,
          cantidad: 1,
        },
      ]);
    }
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <section className="inicio">
              <h1>Bienvenidos a Tech Store</h1>
              <p>Encontrá tecnología para tu día a día.</p>

              <Link className="boton" to="/productos">
                Ver productos
              </Link>
            </section>
          }
        />

        <Route
          path="/productos"
          element={
            <ItemListContainer agregarAlCarrito={agregarAlCarrito} />
          }
        />

        <Route
          path="/producto/:id"
          element={<ProductoDetalle />}
        />
<Route
  path="/carrito"
  element={
    <ProtectedRoute autenticado={autenticado}>
      <Cart carrito={carrito} />
    </ProtectedRoute>
  }
/>

        <Route
  path="/login"
  element={<Login iniciarSesion={iniciarSesion} />}
/>
      </Route>
    </Routes>
  );
}

export default App;