
# Tech Store

Tech Store es una aplicación web de comercio electrónico desarrollada con React como proyecto final del curso de React JS.

La aplicación permite consultar productos tecnológicos, buscar productos por nombre, ver sus detalles y administrar un carrito de compras.

También cuenta con registro e inicio de sesión mediante Firebase Authentication y un panel de administración para gestionar los productos.

## Demo online

La aplicación está publicada en Vercel y se puede visitar desde el siguiente enlace:

https://preentrega-react-chi.vercel.app/

## Repositorio de GitHub

https://github.com/flor1706/preentrega-react

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- CSS
- React Router DOM
- Context API
- Firebase Authentication
- Cloud Firestore

## Funcionalidades

### Catálogo de productos

- Visualización de productos almacenados en Firestore.
- Consulta del detalle de cada producto.
- Búsqueda de productos por nombre en tiempo real.
- Visualización de precios y stock disponible.
- Indicadores de carga y mensajes de error.

### Carrito de compras

- Agregar productos al carrito.
- Eliminar productos del carrito.
- Vaciar el carrito.
- Calcular cantidades, subtotales y total de la compra.
- Validar que no se supere el stock disponible.

### Autenticación

- Registro de nuevos usuarios mediante Firebase Authentication.
- Inicio y cierre de sesión.
- Validación de contraseñas durante el registro.
- Protección de rutas.
- Control de acceso al panel de administración.

### Administración de productos

El administrador puede:

- Consultar productos.
- Agregar nuevos productos.
- Editar productos existentes.
- Eliminar productos con confirmación previa.

Los formularios incluyen validaciones de campos obligatorios, precio y stock, además de mensajes de error e indicadores de carga.

Los cambios se almacenan en Cloud Firestore.

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/flor1706/preentrega-react.git
   ```
2. Ingresar a la carpeta del proyecto:

   ```bash
   cd preentrega-react
   ```
3. Instalar las dependencias:

   ```bash
   npm install
   ```
4. Configurar Firebase y las variables de entorno.
5. Ejecutar la aplicación:

   ```bash
   npm run dev
   ```
6. Abrir la dirección local que muestra Vite.

## Configuración de Firebase

La aplicación utiliza Firebase Authentication y Cloud Firestore.

Para ejecutarla con otro proyecto Firebase, es necesario configurar los datos de conexión en `src/firebase.js` y habilitar los servicios correspondientes.

El archivo `.env` se utiliza para configurar el UID del administrador:

```env
VITE_ADMIN_UID=UID_DEL_ADMINISTRADOR
```

Las reglas de seguridad de Firestore deben permitir la lectura pública de productos y restringir las modificaciones al administrador autorizado.

No se deben publicar contraseñas ni credenciales privadas.

## Rutas principales

- `/` - Página de inicio.
- `/productos` - Catálogo de productos.
- `/producto/:id` - Detalle de producto.
- `/carrito` - Carrito de compras.
- `/login` - Inicio de sesión y registro.
- `/admin` - Administración de productos.

## Autor

Proyecto desarrollado como trabajo final del curso de React JS.
