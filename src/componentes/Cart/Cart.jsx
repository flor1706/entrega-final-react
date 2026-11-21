
import { useCart } from "../../context/CartContext";

function Cart() {
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito,
    precioTotal,
  } = useCart();

  if (carrito.length === 0) {
    return (
      <section className="pagina">
        <h1>Carrito de compras</h1>
        <p>El carrito está vacío.</p>
      </section>
    );
  }

  return (
    <section className="pagina">
      <h1>Carrito de compras</h1>

      <div className="productos-grid">
        {carrito.map((producto) => (
          <div className="producto-card" key={producto.id}>
            <img
              className="producto-imagen"
              src={producto.imagen}
              alt={producto.nombre}
            />

            <h3>{producto.nombre}</h3>

            <p>Precio: ${producto.precio.toLocaleString("es-AR")}</p>

            <p>Cantidad: {producto.cantidad}</p>

            <p>
  Subtotal: ${(producto.precio * producto.cantidad).toLocaleString("es-AR")}
</p>

            <button
              className="boton"
              onClick={() => eliminarDelCarrito(producto.id)}
            >
              Eliminar producto
            </button>
          </div>
        ))}
      </div>

      <div className="carrito-resumen">
       <h2>
  Total de la compra: ${precioTotal.toLocaleString("es-AR")}
</h2>

        <button
          className="boton"
          onClick={vaciarCarrito}
        >
          Vaciar carrito
        </button>
      </div>
    </section>
  );
}

export default Cart;
