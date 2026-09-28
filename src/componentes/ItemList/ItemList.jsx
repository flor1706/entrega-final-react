import { Item } from "../Item/Item";

export function ItemList({ productos, agregarAlCarrito }) {
  return (
    <div className="productos-grid">
      {productos.map((producto) => (
        <Item
          key={producto.id}
          id={producto.id}
          nombre={producto.nombre}
          precio={producto.precio}
          stock={producto.stock}
          imagen={producto.imagen}
          agregarAlCarrito={agregarAlCarrito}
        />
      ))}
    </div>
  );
}