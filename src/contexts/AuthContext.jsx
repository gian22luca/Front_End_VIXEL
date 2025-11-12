import { createContext, useContext,useState, useCallback, useMemo } from "react";

const AUTH_URL = 'http://127.0.0.1:8000/api/token/' // URL de la API de autenticación (si existe)

// 1. Creamos el contexto de autenticación
export const AuthContext = createContext(null);

// 2. Proveedor del contexto de autenticación
export function AuthProvider({ children }) {
    // Estado que guarde el JWT token
    const [token, setToken] = useState(
        localStorage.getItem('auth_token') || null
    );

    // 3. Función para iniciar sesión (login)
    // Intenta conectar con una API REST,
    const login = useCallback(async ({ username, password }) => {
        // Si hay una URL de auth, hacemos la petición POST
        try {
            const res = await fetch(AUTH_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            if (!res.ok) {
                const text = await res.text().catch(() => '')
                return { ok: false, error: text || `Auth failed ${res.status}` }
            }
            const body = await res.json().catch(() => null)
            //obtengo el jwt del body de la respuesta del servidor
            const jwt = body.access 
            if (jwt) {
                // Guardamos el token en el estado y en localStorage
                localStorage.setItem('auth_token', jwt)
                setToken(jwt)
                return { ok: true }
            }
            return { ok: false, error: 'No token in response' }
        } catch (e) {
            return { ok: false, error: e?.message || String(e) }
        }
    }, [setToken]);

    // 4. Función para cerrar sesión (logout)
    // Borra el usuario del estado y localStorage
    const logout = useCallback(() => {
        localStorage.removeItem('auth_token')
        setToken(null)
    }, [setToken]);

    // 5. Memoizamos el valor del contexto para optimizar renderizados
    const value = useMemo(
        () => ({
            token, // JWT (o null)
            isAuthenticated: !!token, // Booleano: ¿hay token autenticado?
            login, // Función para iniciar sesión (async)
            logout // Función para cerrar sesión
        }),
        [token, login, logout]
    );

    // 6. Proveemos el contexto a los componentes hijos
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 7. Hook personalizado para consumir el contexto de autenticación
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    return ctx;
}

//export const useAuth = () => useContext(AuthContext);
