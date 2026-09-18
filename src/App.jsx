import { Routes, Route, Link } from "react-router-dom";
import Layout from "./componentes/Layout/Layout";
import { ItemListContainer } from "./componentes/ItemListContainer/ItemListContainer";
import ProductoDetalle from "./componentes/ProductoDetalle/ProductoDetalle";
import Cart from "./componentes/Cart/Cart";

function App() {
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
          element={<ItemListContainer />}
        />

        <Route
          path="/producto/:id"
          element={<ProductoDetalle />}
        />

        <Route
          path="/carrito"
          element={<Cart />}
        />
      </Route>
    </Routes>
  );
}

export default App;