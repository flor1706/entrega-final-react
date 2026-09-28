function Cart({ carrito }) {
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

            <p>Precio: ${producto.precio}</p>

            <p>Cantidad: {producto.cantidad}</p>

            <p>
              Subtotal: ${producto.precio * producto.cantidad}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Cart;