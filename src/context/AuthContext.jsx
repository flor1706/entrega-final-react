
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cancelarSuscripcion = onAuthStateChanged(
      auth,
      (usuarioFirebase) => {
        setUsuario(usuarioFirebase);
        setCargando(false);
      },
      (error) => {
        console.error("Error de autenticación:", error);
        setUsuario(null);
        setCargando(false);
      }
    );

    return () => cancelarSuscripcion();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error(
      "useAuth debe utilizarse dentro de AuthProvider"
    );
  }

  return contexto;
}
