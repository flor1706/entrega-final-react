
# Tech Store

Tech Store es una aplicación web de comercio electrónico desarrollada con React como proyecto final del curso de React JS.

La aplicación permite consultar productos tecnológicos, buscar productos por nombre, ver sus detalles y administrar un carrito de compras.

También cuenta con autenticación mediante Firebase y un panel de administración para gestionar los productos.

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

### Carrito de compras

- Agregar productos al carrito.
- Eliminar productos.
- Vaciar el carrito.
- Calcular cantidades, subtotales y total de la compra.
- Validar que no se supere el stock disponible.

### Autenticación

- Inicio y cierre de sesión mediante Firebase Authentication.
- Protección de rutas.
- Control de acceso al panel de administración.

### Administración de productos

El administrador puede:

- Consultar productos.
- Agregar nuevos productos.
- Editar productos existentes.
- Eliminar productos.

Los cambios se almacenan en Cloud Firestore.

## Instalación

1. Clonar el repositorio:

   git clone URL_DEL_REPOSITORIO
2. Ingresar a la carpeta del proyecto:

   cd preentrega-react
3. Instalar las dependencias:

   npm install
4. Configurar Firebase.
5. Ejecutar la aplicación:

   npm run dev
6. Abrir la dirección local que muestra Vite.

## Configuración de Firebase

La aplicación utiliza Firebase Authentication y Cloud Firestore.

Para ejecutarla con otro proyecto Firebase, es necesario configurar los datos de conexión en `src/firebase.js` y habilitar los servicios correspondientes.

El archivo `.env` se utiliza para configurar el UID del administrador:

VITE_ADMIN_UID=UID_DEL_ADMINISTRADOR

Las reglas de seguridad de Firestore deben configurarse para permitir la lectura pública de productos y restringir las modificaciones al administrador autorizado.

No se deben publicar contraseñas ni credenciales privadas.

## Rutas principales

- `/` - Página de inicio.
- `/productos` - Catálogo de productos.
- `/producto/:id` - Detalle de producto.
- `/carrito` - Carrito de compras.
- `/login` - Inicio de sesión.
- `/admin` - Administración de productos.

## Autor

Proyecto desarrollado como trabajo final del curso de React JS.
