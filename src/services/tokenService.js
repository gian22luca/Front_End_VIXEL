// CAPA DE SERVICIO PARA MANEJO DE ACCESS y REFRESH TOKENS

//URLs de la API de backend para obtener access_token y refresh_token 


const AUTH_URL = 'https://gian22luca.pythonanywhere.com/api/token/';
//'http://127.0.0.1:8000/api/token/';


const REFRESH_URL = 'https://gian22luca.pythonanywhere.com/api/token/refresh/';
//'http://127.0.0.1:8000/api/token/refresh/';

//para forzar el cambio

//Obtener el access token desde el localStorage
export function getAccessToken(){
    const token = localStorage.getItem('auth_token');
    return token
}

//Obtener el refresh token desde el localStorage
export function getRefreshToken(){
    const refreshToken = localStorage.getItem('refresh_token');
    return refreshToken
}

//Funcion para guardar los tokens en el localstorage
export function saveTokens(accessToken, refreshToken){
    localStorage.setItem('auth_token',accessToken);
    localStorage.setItem('refresh_token',refreshToken);
    console.log('Tokens guardados en el storage exitosamente');
}

//Funcion para eliminar los tokens del localstorage
export function clearTokens(){
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    console.log('Se han eliminado los tokens del storage')
}

// Función que obtiene los tokens (access y refresh)
export async function loginWithTokens(username,password){
    console.log('Iniciando proceso de login para: ',username);

    try{
        // Paso 1: Enviar credenciales al servicio de autenticacion
        const response =  await fetch(AUTH_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        // Paso 2: Verificar si las credenciales son correctas
        if (!response.ok){
            const errorText = await response.text().catch(()=>'');
            console.log('Login fallido: ', response.status, errorText)
            return {
                success: false,
                error: errorText                
            }
        }

        //Paso 3: Extraer y guardar los tokens en el localstorage
        const data = await response.json();
        // los atributos de data, dependen de como responde el servicio
        const accessToken = data.access; 
        const refreshToken = data.refresh;
        
        if(accessToken && refreshToken){
            //llamo a la funcion para guardar en el storage
            saveTokens(accessToken,refreshToken);
            // respuesta en caso de exito
            return { success: true }
        }

        return { success: false, error: 'Tokens no recibidos.'}
    }catch (err){
        //En caso de una excepción devuelvo el objeto siguiente
        return { success: false, error: err.message}
    }
}

//Funcion para conectar con el servicio de obtención de token por
// medio del refresh
export async function renewAccessToken(){

    //Paso 1: verificar si tengo refresh token
    const refreshToken = getRefreshToken();
    if(!refreshToken){
        console.log('No existe refresh token disponible');
        return { success: false, error: 'No existe refresh token disponible'};
    }

    //Paso 2: llamar al endpoint de renovación de tokent
    try{
         const response =  await fetch(REFRESH_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }) // 'refresh' es el nombre del parametro que necesita el servicio de backend
        });

        // Paso 3: Verificar respuesta del servidor
        if (!response.ok){
            //verificar si el refreshToken expiro
            if(response.status === 401){
                //si expiro, deberia limpiar los tokens y responder con un error
                clearTokens();
                return { success: false, error:'Refresh token ha expirado.'}
            }
            const errorText = await response.text().catch(()=>'');
            return {
                success: false,
                error: errorText                
            }
        }

        // Paso 4: Si el endpoint respondio OK, extraer el nuevo access token
        const data = await response.json();
        const newAccessToken = data.access;

        if(newAccessToken){
            //guardar el nuevo access token en el localstorage
            localStorage.setItem('auth_token',newAccessToken);
            return { success : true, token: newAccessToken }
        }

        console.log('No se recibio el nuevo access token.')
        return { success: false, error: 'No se recibio el nuevo access token.' }
    }catch (err){
        //En caso de una excepción devuelvo el objeto siguiente
        return { success: false, error: err.message}
    }
}


