
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [mensajeStock, setMensajeStock] = useState("");

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find(
      (item) => item.id === producto.id
    );

    const cantidadActual = productoExistente
      ? productoExistente.cantidad
      : 0;

    if (cantidadActual >= producto.stock) {
      setMensajeStock(
        `No hay stock suficiente de ${producto.nombre}. Disponible: ${producto.stock}.`
      );
      return;
    }

    setMensajeStock("");

    setCarrito((carritoActual) => {
      const existente = carritoActual.find(
        (item) => item.id === producto.id
      );

      if (existente) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...carritoActual, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((producto) => producto.id !== id)
    );
    setMensajeStock("");
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setMensajeStock("");
  };

  const cantidadTotal = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  const precioTotal = carrito.reduce(
    (total, producto) =>
      total + producto.precio * producto.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        cantidadTotal,
        precioTotal,
        mensajeStock,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const contexto = useContext(CartContext);

  if (!contexto) {
    throw new Error(
      "useCart debe utilizarse dentro de CartProvider"
    );
  }

  return contexto;
}
