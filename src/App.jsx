
import { Routes, Route, Link } from "react-router-dom";

import Layout from "./componentes/Layout/Layout";
import { ItemListContainer } from "./componentes/ItemListContainer/ItemListContainer";
import ProductoDetalle from "./componentes/ProductoDetalle/ProductoDetalle";
import Cart from "./componentes/Cart/Cart";
import ProtectedRoute from "./componentes/ProtectedRoute/ProtectedRoute";
import Login from "./componentes/Login/Login";

import { useCart } from "./context/CartContext";
import AdminProductos from "./componentes/AdminProductos/AdminProductos";
import AdminRoute from "./componentes/AdminRoute/AdminRoute";

function App() {
  const { agregarAlCarrito } = useCart();

  return (
    <Routes>
      <Route element={<Layout />}>
      <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminProductos />
    </AdminRoute>
  }
/>
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
            <ItemListContainer
              agregarAlCarrito={agregarAlCarrito}
            />
          }
        />

        <Route
          path="/producto/:id"
          element={<ProductoDetalle />}
        />

        <Route
          path="/carrito"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />
      </Route>
    </Routes>
  );
}

export default App;
