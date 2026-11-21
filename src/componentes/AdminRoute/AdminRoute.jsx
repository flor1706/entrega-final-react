
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminRoute({ children }) {
  const { usuario, cargando } = useAuth();

  const ADMIN_UID = import.meta.env.VITE_ADMIN_UID;

  if (cargando) {
    return <p>Verificando permisos...</p>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (!ADMIN_UID || usuario.uid !== ADMIN_UID) {
    return (
      <section className="pagina">
        <h1>Acceso denegado</h1>
        <p>No tenés permisos para acceder al panel de administración.</p>
      </section>
    );
  }

  return children;
}

export default AdminRoute;
